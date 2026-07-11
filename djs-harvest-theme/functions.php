<?php
/**
 * DJ's Harvest Theme Functions and Definitions
 * Enqueues assets, registers menu scopes, and defines Custom Post Types.
 */

// 1. Enqueue Theme Styles and JavaScript Scripts
function djs_harvest_enqueue_assets() {
    // Google Typography Font Families
    wp_enqueue_style(
        'google-fonts-primary',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500&family=Manrope:wght@600;700;800&family=Kalam:wght@300;400;700&display=swap',
        array(),
        null
    );

    // Google Material Symbols Icon Fonts
    wp_enqueue_style(
        'material-symbols',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
        array(),
        null
    );

    // Main stylesheet asset
    wp_enqueue_style(
        'theme-style-base',
        get_template_directory_uri() . '/css/style.css',
        array(),
        '1.0.0'
    );

    // Tailwind CSS Framework CDN Loading
    wp_enqueue_script(
        'tailwind-framework-cdn',
        'https://cdn.tailwindcss.com?plugins=forms,container-queries',
        array(),
        null,
        false
    );

    // Tailwind Config definitions script
    wp_enqueue_script(
        'tailwind-config-script',
        get_template_directory_uri() . '/js/tailwind.config.js',
        array('tailwind-framework-cdn'),
        '1.0.0',
        false
    );

    // Main Interactive Logic Script (loads in footer)
    wp_enqueue_script(
        'theme-main-logic',
        get_template_directory_uri() . '/js/main.js',
        array('tailwind-config-script'),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'djs_harvest_enqueue_assets');

// 2. Setup Theme Setup Hooks
function djs_harvest_setup() {
    // Dynamic Title tag support
    add_theme_support('title-tag');

    // Enable Featured Image Post thumbnails
    add_theme_support('post-thumbnails');

    // Register primary navigation positions
    register_nav_menus(array(
        'header-navigation' => esc_html__('Header Navigation Menu', 'djs-harvest'),
        'footer-navigation' => esc_html__('Footer Quick Links Menu', 'djs-harvest')
    ));
}
add_action('after_setup_theme', 'djs_harvest_setup');

// 3. Register Custom Post Type "Sanctuary" (Stays)
function djs_harvest_register_cpts() {
    register_post_type('sanctuary', array(
        'labels' => array(
            'name' => _x('Sanctuaries', 'Post Type General Name', 'djs-harvest'),
            'singular_name' => _x('Sanctuary', 'Post Type Singular Name', 'djs-harvest'),
            'menu_name' => __('Sanctuaries (Stays)', 'djs-harvest'),
            'all_items' => __('All Sanctuaries', 'djs-harvest'),
            'add_new_item' => __('Add New Sanctuary', 'djs-harvest'),
            'edit_item' => __('Edit Sanctuary', 'djs-harvest'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-admin-home',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields', 'excerpt'),
        'rewrite' => array('slug' => 'sanctuary'),
    ));

    register_post_type('harvest_product', array(
        'labels' => array(
            'name' => _x('Products', 'Post Type General Name', 'djs-harvest'),
            'singular_name' => _x('Product', 'Post Type Singular Name', 'djs-harvest'),
            'menu_name' => __('Orchard Shop Inventory', 'djs-harvest'),
            'all_items' => __('All Products', 'djs-harvest'),
            'add_new_item' => __('Add New Product', 'djs-harvest'),
            'edit_item' => __('Edit Product', 'djs-harvest'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-cart',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields', 'excerpt'),
        'rewrite' => array('slug' => 'shop-inventory'),
    ));
}
add_action('init', 'djs_harvest_register_cpts');
