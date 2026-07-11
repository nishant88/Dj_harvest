/**
 * Unified Header and Footer Components for DJ's Harvest website.
 * This dynamically injects a consistent, fully responsive navigation header
 * and page footer on all pages using simple markup placeholder tags:
 * <header id="global-header"></header>
 * <footer id="global-footer"></footer>
 */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('global-header');
    const footer = document.getElementById('global-footer');
    
    // Resolve relative path depth based on window location
    const pathParts = window.location.pathname.split('/');
    const cleanParts = pathParts.filter(p => p.length > 0);
    let prefix = "";
    
    const rootIndex = cleanParts.findIndex(p => 
        p.includes("Dj's Harvest") || 
        p.includes("Dj_harvest") || 
        p.includes("Dj's%20Harvest")
    );
    
    if (rootIndex !== -1) {
        const depth = cleanParts.length - 1 - rootIndex - 1;
        prefix = depth > 0 ? "../".repeat(depth) : "";
    } else {
        const depth = cleanParts.length - 1;
        prefix = depth > 0 ? "../".repeat(depth) : "";
    }

    const path = window.location.pathname;

    // 1. Dynamic Header Injection
    if (header) {
        const isCheckout = path.endsWith('checkout.html');
        
        if (isCheckout) {
            // Simplified Secure Checkout Header
            header.className = "w-full bg-white border-b border-outline-variant py-md px-lg";
            header.innerHTML = `
                <div class="max-w-6xl mx-auto flex items-center justify-between">
                    <a href="${prefix}index.html" class="flex items-center gap-sm">
                        <span class="material-symbols-outlined text-primary text-2xl">arrow_back</span>
                        <img class="w-[180px] h-[48px] sm:w-[240px] sm:h-[64px] md:w-[300px] md:h-[80px] object-contain rounded-md" src="${prefix}img/DJ_logo.png" alt="DJ's Harvest Logo" />
                    </a>
                    <div class="flex items-center gap-xs text-xs font-label-caps uppercase text-on-surface-variant tracking-wider font-bold">
                        <span class="material-symbols-outlined text-sm">lock</span>
                        <span>Secure Gateway</span>
                    </div>
                </div>
            `;
        } else {
            // Standard Navigation Header
            const isStay = path.endsWith('stay.html') || path.includes('/our_sanctuaries_accommodations/');
            const isShop = path.endsWith('shop.html');
            const isStories = path.endsWith('stories.html') || path.includes('article-') || path.includes('/mountain_life_journal_stories/');

            header.className = "fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-container-highest/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300";
            header.innerHTML = `
                <nav class="flex justify-between items-center w-full px-lg py-md max-w-7xl mx-auto">
                    <a class="font-headline-md text-headline-md text-primary tracking-tighter hover:opacity-85 transition-opacity"
                        href="${prefix}index.html">
                        <img class="w-[180px] h-[48px] sm:w-[240px] sm:h-[64px] md:w-[300px] md:h-[80px] object-contain rounded-md" src="${prefix}img/DJ_logo.png" alt="DJ's Harvest Logo" />
                    </a>

                    <div class="hidden md:flex items-center gap-xl">
                        <a class="${isStay ? 'text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors'} font-label-caps text-label-caps"
                            href="${prefix}stay.html">Stay</a>
                        <a class="${isShop ? 'text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors'} font-label-caps text-label-caps"
                            href="${prefix}shop.html">Shop</a>
                        <a class="${isStories ? 'text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors'} font-label-caps text-label-caps"
                            href="${prefix}stories.html">Stories</a>

                        <!-- Cart Icon -->
                        <button class="cart-toggle-btn text-on-surface-variant hover:text-primary p-xs relative flex items-center">
                            <span class="material-symbols-outlined">shopping_bag</span>
                            <span class="cart-badge-count absolute -top-1 -right-1 bg-secondary text-on-secondary text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
                        </button>
                    </div>

                    <!-- Actions & Mobile Menu -->
                    <div class="flex items-center gap-sm md:hidden">
                        <!-- Shopping Bag icon (mobile-only) -->
                        <button class="cart-toggle-btn text-on-surface-variant hover:text-primary w-10 h-10 rounded-full hover:bg-primary/5 active:bg-primary/10 flex md:hidden items-center justify-center relative transition-colors">
                            <span class="material-symbols-outlined text-2xl">shopping_bag</span>
                            <span class="cart-badge-count absolute top-1 right-1 bg-secondary text-on-secondary text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
                        </button>
                        <button class="mobile-menu-trigger text-primary w-10 h-10 rounded-full hover:bg-primary/5 active:bg-primary/10 flex items-center justify-center transition-colors">
                            <span class="material-symbols-outlined text-2xl">menu</span>
                        </button>
                    </div>
                </nav>
            `;
            
            // Scroll behavior logic for dynamic navbar padding reduction
            window.addEventListener('scroll', () => {
                const nav = header.querySelector('nav');
                if (nav) {
                    if (window.scrollY > 50) {
                        nav.classList.add('py-sm', 'shadow-md');
                        nav.classList.remove('py-md', 'shadow-sm');
                    } else {
                        nav.classList.add('py-md', 'shadow-sm');
                        nav.classList.remove('py-sm', 'shadow-md');
                    }
                }
            });
        }
    }

    // 2. Dynamic Footer Injection
    if (footer) {
        footer.className = "w-full rounded-t-xl bg-surface-container-low dark:bg-tertiary-container";
        footer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-4 gap-xl px-lg py-3xl max-w-7xl mx-auto">
                <div class="md:col-span-1">
                    <a class="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed-dim"
                        href="${prefix}index.html">DJ's Harvest</a>
                    <p class="mt-md font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-container">
                        Sustainably managing Himalayan heritage estates since 1924. Experience the stillness.</p>
                </div>
                <div>
                    <h4 class="font-label-caps text-label-caps text-primary dark:text-primary-fixed-dim mb-lg uppercase tracking-widest">Stay</h4>
                    <ul class="space-y-sm">
                        <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                                href="${prefix}stay.html">Our Cottages</a></li>
                        <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                                href="${prefix}stay.html">Group Retreats</a></li>
                        <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                                href="${prefix}stay.html">Work-from-Orchard</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-label-caps text-label-caps text-primary dark:text-primary-fixed-dim mb-lg uppercase tracking-widest">Discover</h4>
                    <ul class="space-y-sm">
                        <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                                href="${prefix}shop.html">Orchard Shop</a></li>
                        <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                                href="${prefix}stories.html">Stories</a></li>
                        <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                                href="${prefix}stories.html">Mountain Life Journal</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-label-caps text-label-caps text-primary dark:text-primary-fixed-dim mb-lg uppercase tracking-widest">Connect</h4>
                    <p class="text-sm text-on-surface-variant dark:text-on-tertiary-container mb-md">Kotgarh, Himachal Pradesh, India</p>
                    <div class="flex gap-md">
                        <a class="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:border-secondary transition-colors text-primary"
                            href="#">
                            <span class="material-symbols-outlined">public</span>
                        </a>
                        <a class="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:border-secondary transition-colors text-primary"
                            href="mailto:harvest@djsharvest.com">
                            <span class="material-symbols-outlined">mail</span>
                        </a>
                        <a class="whatsapp-footer-link w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:border-[#25D366] transition-colors text-primary hover:text-[#25D366]"
                            href="https://wa.me/919876543210?text=Hi%20there!%20I'm%20interested%20in%20booking%20a%20sanctuary%20at%20DJ's%20Harvest."
                            target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current">
                                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.138-1.346a9.921 9.921 0 004.87 1.28h.005c5.507 0 9.99-4.479 9.99-9.986C22.002 6.478 17.518 2 12.012 2zm6.09 14.555c-.25.708-1.25 1.3-1.722 1.388-.473.09-1.07.135-3.327-.79-2.73-1.116-4.514-3.896-4.65-4.08-.137-.182-1.11-1.478-1.11-2.82 0-1.34.703-1.997.95-2.263.25-.266.543-.332.724-.332.18 0 .36.002.518.01.163.007.38-.063.593.45.22.53.75 1.834.814 1.968.064.133.107.288.019.464-.088.176-.133.286-.263.438-.13.153-.277.34-.395.457-.132.13-.27.272-.116.537.153.265.68 1.12 1.455 1.81.997.89 1.837 1.163 2.096 1.293.26.13.41.11.564-.07.154-.18.66-.77.836-1.03.177-.26.353-.22.597-.13.244.09 1.554.733 1.82 1.0.266.13.443.197.508.31.066.113.066.653-.184 1.36z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-lg py-lg border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-md">
                <p class="text-[10px] uppercase tracking-widest text-on-surface-variant">© 2024 DJ's Harvest Himalayan Homestays. All rights reserved.</p>
                <div class="flex gap-lg">
                    <a class="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                        href="#">Privacy Policy</a>
                    <a class="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                        href="#">Terms of Service</a>
                </div>
            </div>
        `;
    }
});
