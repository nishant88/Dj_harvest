import os
import subprocess
from flask import Flask, jsonify, request, send_from_directory
from bs4 import BeautifulSoup

app = Flask(__name__, static_folder=".", static_url_path="")

# Port configuration
PORT = 8080

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/api/pages')
def get_editable_pages():
    # Scan root directory for editable HTML files (exclude admin.html)
    pages = []
    for file in os.listdir('.'):
        if file.endswith('.html') and file != 'admin.html':
            # Generate friendly labels
            label = file.replace('.html', '').replace('article-', 'Article: ').replace('-', ' ').title()
            pages.append({
                "filename": file,
                "label": label
            })
    # Sort pages to keep root pages first, then articles
    pages.sort(key=lambda x: (x['filename'].startswith('article-'), x['filename']))
    return jsonify(pages)

@app.route('/api/page')
def get_page_content():
    filename = request.args.get('name')
    if not filename or '/' in filename or '..' in filename:
        return jsonify({"error": "Invalid filename"}), 400
    
    file_path = os.path.join(".", filename)
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        return jsonify({"error": f"Failed to read file: {str(e)}"}), 500
        
    soup = BeautifulSoup(html, 'html.parser')
    elements = []
    
    tags_to_edit = ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'button']
    
    for tag_name in tags_to_edit:
        tag_elements = soup.find_all(tag_name)
        for index, el in enumerate(tag_elements):
            # Get stripped text
            text = el.get_text().strip()
            
            # Skip empty, tiny tags (unless price / badge)
            if len(text) < 3 and "₹" not in text:
                continue
                
            # Skip if tag contains block children
            if el.find(['div', 'section', 'article', 'nav', 'header', 'footer']):
                continue
                
            # Heuristic for determining edit type (plain text vs rich HTML)
            has_child_tags = len(el.find_all()) > 0
            
            # Render HTML content as-is if it has inline tags (like strong, span, em)
            if has_child_tags:
                edit_type = "html"
                raw_val = "".join([str(c) for c in el.contents])
            else:
                edit_type = "text"
                raw_val = text
                
            label = f"{tag_name.upper()} #{index + 1}"
            if el.get('id'):
                label += f" ({el.get('id')})"
                
            elements.append({
                "id": f"{tag_name}_{index}",
                "tag": tag_name,
                "index": index,
                "label": label,
                "type": edit_type,
                "value": raw_val
            })
            
    return jsonify({
        "filename": filename,
        "elements": elements
    })

@app.route('/api/save', methods=['POST'])
def save_page_content():
    payload = request.json
    filename = payload.get('filename')
    updates = payload.get('updates', [])
    
    if not filename or '/' in filename or '..' in filename:
        return jsonify({"error": "Invalid filename"}), 400
        
    file_path = os.path.join(".", filename)
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        return jsonify({"error": f"Failed to read file: {str(e)}"}), 500
        
    soup = BeautifulSoup(html, 'html.parser')
    
    for update in updates:
        tag_name = update.get('tag')
        index = update.get('index')
        new_value = update.get('value')
        edit_type = update.get('type')
        
        tag_elements = soup.find_all(tag_name)
        if index < len(tag_elements):
            el = tag_elements[index]
            if edit_type == "html":
                # Clear and append parsed html fragment safely
                el.clear()
                fragment = BeautifulSoup(new_value, 'html.parser')
                el.append(fragment)
            else:
                el.string = new_value
                
    # Save the updated file back to disk
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {str(e)}"}), 500
        
    # Commit changes to GitHub
    try:
        subprocess.run(["git", "add", filename], check=True, capture_output=True)
        subprocess.run(["git", "commit", "-m", f"CMS: update content for {filename}"], check=True, capture_output=True)
        subprocess.Popen(["git", "push"])
        print(f"Committed and pushed content changes for: {filename}")
    except Exception as git_err:
        # Don't fail the save operation if Git fails (e.g. clean workspace, or offline)
        print(f"Git commit/push skipped or failed: {git_err}")
        
    return jsonify({
        "status": "success", 
        "message": "Content successfully saved and published."
    })

if __name__ == '__main__':
    print(f"Starting DJ's Harvest CMS Backend on http://localhost:{PORT}...")
    app.run(host='0.0.0.0', port=PORT, debug=True)
