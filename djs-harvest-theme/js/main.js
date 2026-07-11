// Shared JavaScript for Himalayan Orchard Retreat Website
// Controls: Global Booking Drawer, Shopping Cart Drawer, Mobile Navigation, and Toast Notifications

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State & Elements Injection
    injectDynamicElements();

    // 2. Initialize State
    let cart = JSON.parse(localStorage.getItem('orchard_cart')) || [];
    updateCartUI();

    // 3. Event Listeners Setup
    setupGlobalEventListeners();
    setupBookingEngine();
    setupCartEngine();
    setupMobileMenu();
    setupNewsletterForms();
    setupBlankLinkInterceptor();
    setupHorizontalBookingBar();
    setupWhatsAppWidget();
});

// Dynamic Injection of Drawer and Toast HTML elements
function injectDynamicElements() {
    // Toast Container
    if (!document.getElementById('toast-container')) {
        const tc = document.createElement('div');
        tc.id = 'toast-container';
        tc.className = 'fixed bottom-lg right-lg z-[60] flex flex-col gap-sm pointer-events-none max-w-sm w-full px-lg';
        document.body.appendChild(tc);
    }

    // Persistent Horizontal Booking Control Widget
    if (!document.getElementById('persistent-booking-bar') && !window.location.pathname.endsWith('checkout.html')) {
        const pbb = document.createElement('aside');
        pbb.id = 'persistent-booking-bar';
        pbb.className = 'fixed bottom-lg left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[55%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-outline-variant/60 shadow-[0px_25px_50px_rgba(0,0,0,0.15)] rounded-2xl p-md z-40 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-stretch lg:items-center justify-between gap-md';
        pbb.innerHTML = `
            <!-- Sanctuary Selection -->
            <div class="flex flex-col gap-xs col-span-1 flex-1">
                <label class="font-label-caps text-[9px] uppercase tracking-wider text-outline font-bold">Select Cabin</label>
                <select id="bar-sanctuary-select" class="bg-transparent border-0 text-xs font-bold text-primary focus:ring-0 p-0 cursor-pointer outline-none">
                    <option value="luxury-cottage" data-price="450">Heritage Cottage</option>
                    <option value="family-suite" data-price="620">Family Suite</option>
                    <option value="view-loft" data-price="380">Summit View Loft</option>
                    <option value="treehouse" data-price="750">Glass Treehouse</option>
                </select>
            </div>
            <!-- Divider -->
            <div class="hidden lg:block h-8 w-px bg-outline-variant/60"></div>
            <!-- Check-in Date -->
            <div class="flex flex-col gap-xs col-span-1 flex-1">
                <label class="font-label-caps text-[9px] uppercase tracking-wider text-outline font-bold">Check In</label>
                <input type="date" id="bar-checkin" class="bg-transparent border-0 text-xs font-bold text-primary focus:ring-0 p-0 cursor-pointer outline-none w-full" />
            </div>
            <!-- Divider -->
            <div class="hidden lg:block h-8 w-px bg-outline-variant/60"></div>
            <!-- Check-out Date -->
            <div class="flex flex-col gap-xs col-span-1 flex-1">
                <label class="font-label-caps text-[9px] uppercase tracking-wider text-outline font-bold">Check Out</label>
                <input type="date" id="bar-checkout" class="bg-transparent border-0 text-xs font-bold text-primary focus:ring-0 p-0 cursor-pointer outline-none w-full" />
            </div>
            <!-- Divider -->
            <div class="hidden lg:block h-8 w-px bg-outline-variant/60"></div>
            <!-- Guests Selection -->
            <div class="flex flex-col gap-xs col-span-1 flex-1">
                <label class="font-label-caps text-[9px] uppercase tracking-wider text-outline font-bold">Guests</label>
                <select id="bar-guests-select" class="bg-transparent border-0 text-xs font-bold text-primary focus:ring-0 p-0 cursor-pointer outline-none">
                    <option value="1">1 Guest</option>
                    <option value="2" selected>2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                </select>
            </div>
            <!-- Divider -->
            <div class="hidden lg:block h-8 w-px bg-outline-variant/60"></div>
            <!-- Search & Book CTA -->
            <button id="bar-book-btn" class="col-span-2 lg:col-span-1 bg-secondary text-on-secondary px-lg py-sm rounded-xl font-button-text text-button-text uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-xs whitespace-nowrap">
                <span class="material-symbols-outlined text-[14px]">search</span> Check Rates
            </button>
        `;
        document.body.appendChild(pbb);
    }

    // Booking Drawer
    if (!document.getElementById('booking-drawer')) {
        const bd = document.createElement('div');
        bd.id = 'booking-drawer';
        bd.className = 'fixed inset-0 z-50 overflow-hidden hidden';
        bd.innerHTML = `
            <div class="absolute inset-0 overflow-hidden">
                <!-- Backdrop -->
                <div id="booking-drawer-backdrop" class="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300"></div>
                
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div id="booking-drawer-panel" class="pointer-events-auto w-screen max-w-md transform translate-x-full transition-transform duration-300 ease-in-out bg-[#ffffff] shadow-2xl flex flex-col border-l border-outline-variant">
                        <!-- Header -->
                        <div class="px-lg py-md border-b border-outline-variant flex items-center justify-between bg-surface-container">
                            <div>
                                <h2 class="font-headline-sm text-headline-sm text-primary">Book Your Sanctuary</h2>
                                <p class="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant">Himalayan Escape</p>
                            </div>
                            <button id="close-booking" class="text-primary hover:opacity-75 transition-opacity p-sm flex items-center">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <!-- Form Area -->
                        <div class="flex-1 overflow-y-auto p-lg space-y-lg no-scrollbar">
                            <!-- Sanctuary Selector -->
                            <div class="flex flex-col gap-xs">
                                <label class="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold">Select Sanctuary</label>
                                <select id="book-sanctuary-select" class="w-full bg-white border border-outline-variant rounded-lg p-md text-primary font-medium focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                                    <option value="luxury-cottage" data-price="450">Luxury Heritage Cottage - ₹450/night</option>
                                    <option value="family-suite" data-price="620">Orchard Family Suite - ₹620/night</option>
                                    <option value="view-loft" data-price="380">Summit View Loft - ₹380/night</option>
                                    <option value="treehouse" data-price="750">Glass-Wing Treehouse - ₹750/night</option>
                                </select>
                            </div>
                            
                            <!-- Date Selectors -->
                            <div class="grid grid-cols-2 gap-md">
                                <div class="flex flex-col gap-xs">
                                    <label class="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold">Check-In</label>
                                    <input type="date" id="book-checkin" class="bg-white border border-outline-variant rounded-lg p-md text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm" />
                                </div>
                                <div class="flex flex-col gap-xs">
                                    <label class="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold">Check-Out</label>
                                    <input type="date" id="book-checkout" class="bg-white border border-outline-variant rounded-lg p-md text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm" />
                                </div>
                            </div>
                            
                            <!-- Guests Selector -->
                            <div class="flex flex-col gap-xs">
                                <label class="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold">Guests</label>
                                <select id="book-guests" class="w-full bg-white border border-outline-variant rounded-lg p-md text-primary font-medium focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                                    <option value="1">1 Guest</option>
                                    <option value="2" selected>2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                    <option value="5">5+ Guests (Enquiry Needed)</option>
                                </select>
                            </div>

                            <!-- Pricing Details Summary Card -->
                            <div class="bg-surface-container rounded-xl p-md border border-outline-variant space-y-sm">
                                <h4 class="font-label-caps text-[11px] text-primary uppercase font-bold pb-xs border-b border-outline-variant/30">Price Breakdown</h4>
                                <div class="flex justify-between text-sm">
                                    <span class="text-on-surface-variant">Rate per night</span>
                                    <span class="font-medium text-primary" id="calc-rate">₹450.00</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-on-surface-variant">Total Nights</span>
                                    <span class="font-medium text-primary" id="calc-nights">0</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-on-surface-variant">Service Fee (10%)</span>
                                    <span class="font-medium text-primary" id="calc-fee">₹0.00</span>
                                </div>
                                <div class="flex justify-between text-base font-bold text-primary pt-xs border-t border-outline-variant/30">
                                    <span>Total Est.</span>
                                    <span id="calc-total">₹0.00</span>
                                </div>
                            </div>
                            
                            <!-- Special Request Field -->
                            <div class="flex flex-col gap-xs">
                                <label class="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold">Special Requests</label>
                                <textarea id="book-notes" rows="3" placeholder="Dietary preferences, arrival details, bonfire setup..." class="w-full bg-white border border-outline-variant rounded-lg p-md text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm resize-none"></textarea>
                            </div>
                        </div>
                        
                        <!-- Actions Footer -->
                        <div class="px-lg py-md border-t border-outline-variant bg-surface-container">
                            <button id="confirm-booking-btn" class="w-full bg-primary text-on-primary py-lg rounded-lg font-button-text text-button-text uppercase tracking-widest hover:bg-primary-container transition-colors shadow-lg">
                                Complete Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(bd);
    }

    // Shopping Cart Drawer
    if (!document.getElementById('cart-drawer')) {
        const cd = document.createElement('div');
        cd.id = 'cart-drawer';
        cd.className = 'fixed inset-0 z-50 overflow-hidden hidden';
        cd.innerHTML = `
            <div class="absolute inset-0 overflow-hidden">
                <!-- Backdrop -->
                <div id="cart-drawer-backdrop" class="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300"></div>
                
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div id="cart-drawer-panel" class="pointer-events-auto w-screen max-w-md transform translate-x-full transition-transform duration-300 ease-in-out bg-[#ffffff] shadow-2xl flex flex-col border-l border-outline-variant">
                        <!-- Header -->
                        <div class="px-lg py-md border-b border-outline-variant flex items-center justify-between bg-surface-container">
                            <div>
                                <h2 class="font-headline-sm text-headline-sm text-primary">Your Harvest Basket</h2>
                                <p class="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant">Organic Store</p>
                            </div>
                            <button id="close-cart" class="text-primary hover:opacity-75 transition-opacity p-sm flex items-center">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <!-- Cart Items Container -->
                        <div id="cart-items-list" class="flex-1 overflow-y-auto p-lg space-y-md no-scrollbar">
                            <!-- Injected Dynamically -->
                        </div>
                        
                        <!-- Subtotal & Checkout Footer -->
                        <div class="px-lg py-md border-t border-outline-variant bg-surface-container space-y-md">
                            <div class="flex justify-between items-center text-primary">
                                <span class="font-label-caps text-label-caps text-on-surface-variant font-bold">Subtotal</span>
                                <span id="cart-subtotal" class="font-headline-sm text-headline-sm">₹0.00</span>
                            </div>
                            <p class="text-xs text-on-surface-variant">Tax and zero-waste shipping calculated at checkout.</p>
                            <button id="checkout-btn" class="w-full bg-secondary text-on-secondary py-lg rounded-lg font-button-text text-button-text uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(cd);
    }

    // Mobile Menu Drawer
    if (!document.getElementById('mobile-nav-menu')) {
        const mn = document.createElement('div');
        mn.id = 'mobile-nav-menu';
        mn.className = 'fixed inset-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col p-lg hidden';
        mn.innerHTML = `
            <div class="flex justify-between items-center mb-2xl">
                <span class="font-kalam font-bold text-3xl text-primary dark:text-white">DJ's Harvest</span>
                <button id="close-mobile-menu" class="w-12 h-12 rounded-full hover:bg-primary/5 dark:hover:bg-white/5 flex items-center justify-center text-primary dark:text-white transition-colors">
                    <span class="material-symbols-outlined text-3xl">close</span>
                </button>
            </div>
            <div class="flex-1 flex flex-col justify-center gap-lg items-start text-left pl-lg border-l border-primary/10 dark:border-white/10">
                <a class="group flex items-baseline gap-md py-sm w-full" href="index.html">
                    <span class="font-mono text-xs text-secondary/60">01</span>
                    <span class="font-headline-md text-4xl text-primary dark:text-white group-hover:text-secondary group-hover:translate-x-2 transition-all duration-200">Home</span>
                </a>
                <a class="group flex items-baseline gap-md py-sm w-full" href="stay.html">
                    <span class="font-mono text-xs text-secondary/60">02</span>
                    <span class="font-headline-md text-4xl text-primary dark:text-white group-hover:text-secondary group-hover:translate-x-2 transition-all duration-200">Stay</span>
                </a>
                <a class="group flex items-baseline gap-md py-sm w-full" href="shop.html">
                    <span class="font-mono text-xs text-secondary/60">03</span>
                    <span class="font-headline-md text-4xl text-primary dark:text-white group-hover:text-secondary group-hover:translate-x-2 transition-all duration-200">Shop</span>
                </a>
                <a class="group flex items-baseline gap-md py-sm w-full" href="stories.html">
                    <span class="font-mono text-xs text-secondary/60">04</span>
                    <span class="font-headline-md text-4xl text-primary dark:text-white group-hover:text-secondary group-hover:translate-x-2 transition-all duration-200">Stories</span>
                </a>
            </div>
            <div class="mt-auto pt-xl">
                <button class="booking-trigger-btn w-full bg-secondary hover:bg-secondary-container text-on-secondary py-lg rounded-xl font-button-text text-button-text uppercase tracking-widest shadow-xl transition-all active:scale-95">
                    Book Stay
                </button>
                <p class="text-center text-[10px] text-on-surface-variant font-label-caps uppercase tracking-widest mt-md">© 2024 DJ's Harvest Himalayan Homestays</p>
            </div>
        `;
        document.body.appendChild(mn);
    }

    // Floating WhatsApp Widget Overlay Markup
    if (!document.getElementById('whatsapp-chat-widget')) {
        const widget = document.createElement('div');
        widget.id = 'whatsapp-chat-widget';
        widget.className = 'fixed bottom-lg left-lg z-[45] flex flex-col items-start';
        widget.innerHTML = `
            <!-- Chat Card (Hidden initially) -->
            <div id="whatsapp-overlay-card" class="mb-sm w-[calc(100vw-48px)] sm:w-[320px] bg-white dark:bg-slate-900 border border-outline-variant shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform scale-90 translate-y-10 opacity-0 pointer-events-none origin-bottom-left">
                <!-- Header -->
                <div class="bg-[#075E54] text-white p-md flex items-center justify-between">
                    <div class="flex items-center gap-sm">
                        <div class="relative">
                            <img class="w-10 h-10 rounded-full object-cover border border-white/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2cQn8-D5vk9fDTTaEZMjgcZnZklAodI6zs6BK4q3zBeiP8NyCaLT7P3lxuCS5QWjGx1vUXtTmTwQWEJSn66t0Y3N2u3M1HBQceQGJxcTp9KrfZ5T0vNebzf0G66mpNxMbOolGmSJzdwFG_m9QyYF53fWyt_f6jwJLp790fkTTLg6N-Sth49Im0i4SMl-hnsdxubscQU_lWKdzIQ8icDUfJfW2cIfCv5dbNQq3UpVrJ35a5ue-9fHjGg" alt="Host Avatar" />
                            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-[#075E54] rounded-full animate-pulse"></span>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm leading-tight text-white">DJ's Harvest Homestay</h4>
                            <p class="text-[10px] text-white/80">Typically replies within an hour</p>
                        </div>
                    </div>
                    <button id="close-whatsapp-card" class="text-white/80 hover:text-white transition-colors flex items-center">
                        <span class="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>
                
                <!-- Chat Window Content -->
                <div id="whatsapp-chat-content" class="p-md bg-[#efeae2] dark:bg-slate-950 space-y-md h-64 overflow-y-auto no-scrollbar flex flex-col justify-start">
                    <!-- Dynamic bot & user message bubbles injected here -->
                </div>

                <!-- Dynamic Quick Actions Container -->
                <div id="whatsapp-quick-actions" class="p-sm bg-white dark:bg-slate-900 border-t border-outline-variant/50 flex flex-wrap gap-xs">
                    <!-- Bot options injected here -->
                </div>

                <!-- Footer input -->
                <div class="p-sm bg-surface-container border-t border-outline-variant flex items-center gap-xs">
                    <input id="whatsapp-user-message" type="text" placeholder="Type a message..." class="flex-1 bg-white border border-outline-variant rounded-full px-md py-xs text-xs focus:outline-none focus:ring-1 focus:ring-[#075E54] dark:bg-slate-800 dark:text-white" />
                    <button id="send-whatsapp-chat" class="w-8 h-8 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white flex items-center justify-center transition-colors shadow-md">
                        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </div>
            </div>

            <!-- Floating Badge Button -->
            <button id="whatsapp-trigger-btn" class="bg-[#25D366] text-white w-12 h-12 rounded-full shadow-[0px_8px_24px_rgba(37,211,102,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-250 cursor-pointer relative z-50">
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.138-1.346a9.921 9.921 0 004.87 1.28h.005c5.507 0 9.99-4.479 9.99-9.986C22.002 6.478 17.518 2 12.012 2zm6.09 14.555c-.25.708-1.25 1.3-1.722 1.388-.473.09-1.07.135-3.327-.79-2.73-1.116-4.514-3.896-4.65-4.08-.137-.182-1.11-1.478-1.11-2.82 0-1.34.703-1.997.95-2.263.25-.266.543-.332.724-.332.18 0 .36.002.518.01.163.007.38-.063.593.45.22.53.75 1.834.814 1.968.064.133.107.288.019.464-.088.176-.133.286-.263.438-.13.153-.277.34-.395.457-.132.13-.27.272-.116.537.153.265.68 1.12 1.455 1.81.997.89 1.837 1.163 2.096 1.293.26.13.41.11.564-.07.154-.18.66-.77.836-1.03.177-.26.353-.22.597-.13.244.09 1.554.733 1.82 1.0.266.13.443.197.508.31.066.113.066.653-.184 1.36z"/>
                </svg>
            </button>
        `;
        document.body.appendChild(widget);
    }

    // Appends WhatsApp icon link to all footers
    document.querySelectorAll('footer .flex.gap-md').forEach(footerSocials => {
        if (!footerSocials.querySelector('.whatsapp-footer-link')) {
            const waFooterLink = document.createElement('a');
            waFooterLink.className = 'whatsapp-footer-link w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:border-[#25D366] transition-colors text-primary hover:text-[#25D366]';
            waFooterLink.href = 'https://wa.me/919876543210?text=Hi%20there!%20I\'m%20interested%20in%20booking%20a%20sanctuary%20at%20Apple%20Orchards.';
            waFooterLink.target = '_blank';
            waFooterLink.rel = 'noopener noreferrer';
            waFooterLink.innerHTML = `
                <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.138-1.346a9.921 9.921 0 004.87 1.28h.005c5.507 0 9.99-4.479 9.99-9.986C22.002 6.478 17.518 2 12.012 2zm6.09 14.555c-.25.708-1.25 1.3-1.722 1.388-.473.09-1.07.135-3.327-.79-2.73-1.116-4.514-3.896-4.65-4.08-.137-.182-1.11-1.478-1.11-2.82 0-1.34.703-1.997.95-2.263.25-.266.543-.332.724-.332.18 0 .36.002.518.01.163.007.38-.063.593.45.22.53.75 1.834.814 1.968.064.133.107.288.019.464-.088.176-.133.286-.263.438-.13.153-.277.34-.395.457-.132.13-.27.272-.116.537.153.265.68 1.12 1.455 1.81.997.89 1.837 1.163 2.096 1.293.26.13.41.11.564-.07.154-.18.66-.77.836-1.03.177-.26.353-.22.597-.13.244.09 1.554.733 1.82 1.0.266.13.443.197.508.31.066.113.066.653-.184 1.36z"/>
                </svg>
            `;
            footerSocials.appendChild(waFooterLink);
        }
    });
}

// Global System for displaying beautiful Feedback Alerts
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-md p-md rounded-xl shadow-lg border pointer-events-auto bg-[#ffffff] border-outline-variant animate-toast-in';

    let icon = 'check_circle';
    let iconColor = 'text-primary';

    if (type === 'info') {
        icon = 'info';
        iconColor = 'text-primary-container';
    } else if (type === 'warning') {
        icon = 'warning';
        iconColor = 'text-secondary';
    }

    toast.innerHTML = `
        <span class="material-symbols-outlined ${iconColor}">${icon}</span>
        <div class="flex-1 text-sm text-primary font-medium">${message}</div>
    `;

    container.appendChild(toast);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
        toast.classList.replace('animate-toast-in', 'animate-toast-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}

// Basic hooks for general buttons
function setupGlobalEventListeners() {
    // Open Booking Drawer buttons
    document.querySelectorAll('.booking-trigger-btn, .booking-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Check if room selection is implied
            let preSelectedRoom = '';
            const btnText = btn.textContent.toLowerCase();
            if (btnText.includes('treehouse') || btn.closest('article')?.innerHTML.toLowerCase().includes('treehouse')) {
                preSelectedRoom = 'treehouse';
            } else if (btnText.includes('cottage') || btn.closest('article')?.innerHTML.toLowerCase().includes('cottage')) {
                preSelectedRoom = 'luxury-cottage';
            } else if (btnText.includes('suite') || btn.closest('article')?.innerHTML.toLowerCase().includes('suite')) {
                preSelectedRoom = 'family-suite';
            } else if (btnText.includes('loft') || btnText.includes('summit') || btn.closest('article')?.innerHTML.toLowerCase().includes('loft')) {
                preSelectedRoom = 'view-loft';
            }

            openBookingDrawer(preSelectedRoom);
        });
    });

    // Custom text matching function fallback since :contains is jQuery-specific
    // Walk tree to find buttons labeled Book Now/Check Availability
    document.querySelectorAll('button, a').forEach(el => {
        const text = el.textContent.trim().toLowerCase();
        if (text === 'book now' || text === 'book your stay' || text === 'check availability' || text === 'select sanctuary') {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                // Determine preselection context
                let preSelectedRoom = '';
                const itemHTML = el.closest('article')?.innerHTML.toLowerCase() || '';
                if (itemHTML.includes('treehouse')) {
                    preSelectedRoom = 'treehouse';
                } else if (itemHTML.includes('cottage')) {
                    preSelectedRoom = 'luxury-cottage';
                } else if (itemHTML.includes('suite')) {
                    preSelectedRoom = 'family-suite';
                } else if (itemHTML.includes('loft') || itemHTML.includes('summit')) {
                    preSelectedRoom = 'view-loft';
                }
                openBookingDrawer(preSelectedRoom);
            });
        }
    });

    // Connect Shopping Cart triggers
    document.querySelectorAll('.cart-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCartDrawer();
        });
    });
}

// -------------------------------------------------------------
// BOOKING DRAWER ENGINE
// -------------------------------------------------------------
function openBookingDrawer(preSelectedRoom = '') {
    const drawer = document.getElementById('booking-drawer');
    const backdrop = document.getElementById('booking-drawer-backdrop');
    const panel = document.getElementById('booking-drawer-panel');
    const select = document.getElementById('book-sanctuary-select');

    if (preSelectedRoom && select) {
        select.value = preSelectedRoom;
    }

    // Set default dates if empty
    const checkinInput = document.getElementById('book-checkin');
    const checkoutInput = document.getElementById('book-checkout');
    if (checkinInput && !checkinInput.value) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(dayAfter.getDate() + 4);

        checkinInput.value = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = dayAfter.toISOString().split('T')[0];
    }

    drawer.classList.remove('hidden');
    // Force reflow
    drawer.offsetHeight;

    backdrop.classList.replace('opacity-0', 'opacity-100');
    panel.classList.replace('translate-x-full', 'translate-x-0');

    updateBookingCalculations();
}

function closeBookingDrawer() {
    const drawer = document.getElementById('booking-drawer');
    const backdrop = document.getElementById('booking-drawer-backdrop');
    const panel = document.getElementById('booking-drawer-panel');

    backdrop.classList.replace('opacity-100', 'opacity-0');
    panel.classList.replace('translate-x-0', 'translate-x-full');

    setTimeout(() => {
        drawer.classList.add('hidden');
    }, 300);
}

function updateBookingCalculations() {
    const select = document.getElementById('book-sanctuary-select');
    const checkin = document.getElementById('book-checkin').value;
    const checkout = document.getElementById('book-checkout').value;

    if (!select || !checkin || !checkout) return;

    const option = select.options[select.selectedIndex];
    const pricePerNight = parseFloat(option.getAttribute('data-price')) || 450;

    // Calculate nights
    const dateIn = new Date(checkin);
    const dateOut = new Date(checkout);
    let nights = 0;

    if (dateOut > dateIn) {
        const diffTime = Math.abs(dateOut - dateIn);
        nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const subtotal = pricePerNight * nights;
    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    document.getElementById('calc-rate').textContent = `₹${pricePerNight.toFixed(2)}`;
    document.getElementById('calc-nights').textContent = nights;
    document.getElementById('calc-fee').textContent = `₹${serviceFee.toFixed(2)}`;
    document.getElementById('calc-total').textContent = `₹${total.toFixed(2)}`;
}

function setupBookingEngine() {
    const closeBtn = document.getElementById('close-booking');
    const backdrop = document.getElementById('booking-drawer-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeBookingDrawer);
    if (backdrop) backdrop.addEventListener('click', closeBookingDrawer);

    // Change handlers
    const select = document.getElementById('book-sanctuary-select');
    const checkin = document.getElementById('book-checkin');
    const checkout = document.getElementById('book-checkout');

    if (select) select.addEventListener('change', updateBookingCalculations);
    if (checkin) checkin.addEventListener('change', updateBookingCalculations);
    if (checkout) checkout.addEventListener('change', updateBookingCalculations);

    // Confirm Booking Action
    const confirmBtn = document.getElementById('confirm-booking-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const selectVal = select.options[select.selectedIndex].text.split(' - ')[0];
            const checkinVal = checkin.value;
            const checkoutVal = checkout.value;

            if (!checkinVal || !checkoutVal || new Date(checkoutVal) <= new Date(checkinVal)) {
                showToast('Please select valid check-in and check-out dates.', 'warning');
                return;
            }

            // Calculate nights
            const dateIn = new Date(checkinVal);
            const dateOut = new Date(checkoutVal);
            let nights = 0;
            if (dateOut > dateIn) {
                const diffTime = Math.abs(dateOut - dateIn);
                nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }
            const pricePerNight = parseFloat(select.options[select.selectedIndex].getAttribute('data-price')) || 450;

            const bookingDetails = {
                sanctuaryName: selectVal,
                nights: nights,
                checkin: checkinVal,
                checkout: checkoutVal,
                rate: pricePerNight
            };

            localStorage.setItem('current_booking_details', JSON.stringify(bookingDetails));
            localStorage.setItem('checkout_type', 'booking');

            closeBookingDrawer();
            window.location.href = 'checkout.html';
        });
    }
}

// -------------------------------------------------------------
// SHOPPING CART ENGINE
// -------------------------------------------------------------
let cartState = JSON.parse(localStorage.getItem('orchard_cart')) || [];

function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const panel = document.getElementById('cart-drawer-panel');

    drawer.classList.remove('hidden');
    // Force reflow
    drawer.offsetHeight;

    backdrop.classList.replace('opacity-0', 'opacity-100');
    panel.classList.replace('translate-x-full', 'translate-x-0');

    updateCartUI();
}

function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const panel = document.getElementById('cart-drawer-panel');

    backdrop.classList.replace('opacity-100', 'opacity-0');
    panel.classList.replace('translate-x-0', 'translate-x-full');

    setTimeout(() => {
        drawer.classList.add('hidden');
    }, 300);
}

function addProductToCart(product) {
    const existing = cartState.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cartState.push({
            id: product.id,
            title: product.title,
            price: parseFloat(product.price),
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('orchard_cart', JSON.stringify(cartState));
    updateCartUI();
    showToast(`Added ${product.title} to your basket.`, 'success');
}

function changeQuantity(id, change) {
    const item = cartState.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cartState = cartState.filter(i => i.id !== id);
    }

    localStorage.setItem('orchard_cart', JSON.stringify(cartState));
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-list');
    const subtotalText = document.getElementById('cart-subtotal');

    if (!container || !subtotalText) return;

    // Sync cart badge counts
    const totalQty = cartState.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-badge-count').forEach(badge => {
        badge.textContent = totalQty;
        if (totalQty > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });

    if (cartState.length === 0) {
        container.innerHTML = `
            <div class="h-64 flex flex-col items-center justify-center text-center p-md">
                <span class="material-symbols-outlined text-primary-container text-5xl mb-md">shopping_basket</span>
                <h4 class="font-headline-sm text-primary">Your basket is empty</h4>
                <p class="text-xs text-on-surface-variant max-w-[200px] mt-xs">Explore the organic store and load up on mountain treats.</p>
            </div>
        `;
        subtotalText.textContent = "₹0.00";
        return;
    }

    let subtotal = 0;
    container.innerHTML = '';

    cartState.forEach(item => {
        subtotal += item.price * item.quantity;

        const card = document.createElement('div');
        card.className = 'flex items-center gap-md bg-white rounded-xl p-md border border-outline-variant';
        card.innerHTML = `
            <img class="w-16 h-16 object-cover rounded-lg border border-outline-variant" src="${item.image}" alt="${item.title}" />
            <div class="flex-1">
                <h4 class="font-medium text-primary text-sm leading-snug">${item.title}</h4>
                <span class="text-xs text-secondary font-bold font-label-caps">₹${item.price.toFixed(2)}</span>
                
                <!-- Qty Adjustment Controls -->
                <div class="flex items-center gap-sm mt-sm">
                    <button class="qty-minus-btn bg-surface border border-outline-variant w-6 h-6 rounded flex items-center justify-center text-xs hover:bg-surface-container" data-id="${item.id}">-</button>
                    <span class="text-sm font-semibold text-primary w-4 text-center">${item.quantity}</span>
                    <button class="qty-plus-btn bg-surface border border-outline-variant w-6 h-6 rounded flex items-center justify-center text-xs hover:bg-surface-container" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-cart-item-btn text-on-surface-variant hover:text-secondary p-sm" data-id="${item.id}">
                <span class="material-symbols-outlined text-[20px]">delete</span>
            </button>
        `;
        container.appendChild(card);
    });

    subtotalText.textContent = `₹${subtotal.toFixed(2)}`;

    // Wire up quantities adjusting events inside the list
    container.querySelectorAll('.qty-minus-btn').forEach(btn => {
        btn.addEventListener('click', () => changeQuantity(btn.getAttribute('data-id'), -1));
    });
    container.querySelectorAll('.qty-plus-btn').forEach(btn => {
        btn.addEventListener('click', () => changeQuantity(btn.getAttribute('data-id'), 1));
    });
    container.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
        btn.addEventListener('click', () => changeQuantity(btn.getAttribute('data-id'), -9999));
    });
}

function setupCartEngine() {
    const closeBtn = document.getElementById('close-cart');
    const backdrop = document.getElementById('cart-drawer-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (backdrop) backdrop.addEventListener('click', closeCartDrawer);

    // Checkout action trigger
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartState.length === 0) return;

            localStorage.setItem('checkout_type', 'cart');
            closeCartDrawer();
            window.location.href = 'checkout.html';
        });
    }

    // Global delegation for Add To Cart buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            e.preventDefault();
            const product = {
                id: btn.getAttribute('data-product-id'),
                title: btn.getAttribute('data-product-title'),
                price: btn.getAttribute('data-product-price'),
                image: btn.getAttribute('data-product-image')
            };
            addProductToCart(product);
            openCartDrawer();
        }
    });
}

// -------------------------------------------------------------
// MOBILE NAVIGATION MENU ENGINE
// -------------------------------------------------------------
function openMobileMenu() {
    const menu = document.getElementById('mobile-nav-menu');
    if (menu) {
        menu.classList.remove('hidden');
        menu.offsetHeight; // force reflow
        menu.classList.replace('translate-x-full', 'translate-x-0');
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-nav-menu');
    if (menu) {
        menu.classList.replace('translate-x-0', 'translate-x-full');
        setTimeout(() => {
            if (menu.classList.contains('translate-x-full')) {
                menu.classList.add('hidden');
            }
        }, 300);
    }
}

function setupMobileMenu() {
    // Hamburger icon listeners
    document.querySelectorAll('.mobile-menu-trigger').forEach(el => {
        el.closest('button')?.addEventListener('click', (e) => {
            e.preventDefault();
            openMobileMenu();
        });
    });

    // Fallback: match any button that has class/id matching menu
    document.querySelectorAll('button').forEach(btn => {
        if (btn.querySelector('.material-symbols-outlined')?.textContent.trim() === 'menu') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openMobileMenu();
            });
        }
    });

    const closeBtn = document.getElementById('close-mobile-menu');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
}

// -------------------------------------------------------------
// NEWSLETTER & OTHER GENERAL FORMS
// -------------------------------------------------------------
function setupNewsletterForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            const input = form.querySelector('input[type="email"]');
            if (input && input.value) {
                e.preventDefault();
                const email = input.value;
                input.value = '';
                showToast(`Thank you! ${email} has been subscribed to the Mountain Journal.`, 'success');
            }
        });
    });
}

// -------------------------------------------------------------
// INTERCEPT BLANK LINKS & PREVENT PAGE RELOADS
// -------------------------------------------------------------
function setupBlankLinkInterceptor() {
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' || href === 'javascript:void(0)') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showToast("This policy / information page is coming soon!", "info");
            });
        }
    });
}

// -------------------------------------------------------------
// PERSISTENT HORIZONTAL BOOKING BAR SYNC (INDEX.HTML)
// -------------------------------------------------------------
function setupHorizontalBookingBar() {
    const barBookBtn = document.getElementById('bar-book-btn');
    if (!barBookBtn) return;

    barBookBtn.addEventListener('click', () => {
        const barSelect = document.getElementById('bar-sanctuary-select');
        const barCheckin = document.getElementById('bar-checkin');
        const barCheckout = document.getElementById('bar-checkout');

        if (barSelect && barCheckin && barCheckout) {
            const selectVal = barSelect.value;
            const checkinVal = barCheckin.value;
            const checkoutVal = barCheckout.value;

            if (!checkinVal || !checkoutVal || new Date(checkoutVal) <= new Date(checkinVal)) {
                showToast('Please select valid check-in and check-out dates.', 'warning');
                return;
            }

            // Sync values to the side booking drawer inputs
            const drawerSelect = document.getElementById('book-sanctuary-select');
            const drawerCheckin = document.getElementById('book-checkin');
            const drawerCheckout = document.getElementById('book-checkout');

            if (drawerSelect && drawerCheckin && drawerCheckout) {
                drawerSelect.value = selectVal;
                drawerCheckin.value = checkinVal;
                drawerCheckout.value = checkoutVal;

                updateBookingCalculations();
                openBookingDrawer();
            } else {
                showToast('Booking drawer elements missing.', 'error');
            }
        }
    });
}

// -------------------------------------------------------------
// WHATSAPP WIDGET INTERACTIVITY & OVERLAY
// -------------------------------------------------------------
function setupWhatsAppWidget() {
    const triggerBtn = document.getElementById('whatsapp-trigger-btn');
    const overlayCard = document.getElementById('whatsapp-overlay-card');
    const closeBtn = document.getElementById('close-whatsapp-card');
    const sendBtn = document.getElementById('send-whatsapp-chat');
    const inputField = document.getElementById('whatsapp-user-message');
    const chatContent = document.getElementById('whatsapp-chat-content');
    const quickActionsContainer = document.getElementById('whatsapp-quick-actions');

    if (!triggerBtn || !overlayCard || !chatContent || !quickActionsContainer) return;

    let botState = 'initial';
    let queryBrief = [];
    let userContactInfo = '';
    let customNotes = '';

    function toggleWidget() {
        const isOpen = !overlayCard.classList.contains('pointer-events-none');
        if (isOpen) {
            overlayCard.classList.add('opacity-0', 'pointer-events-none', 'scale-90', 'translate-y-10');
        } else {
            overlayCard.classList.remove('opacity-0', 'pointer-events-none', 'scale-90', 'translate-y-10');
            if (chatContent.children.length === 0) {
                initBot();
            }
            if (inputField) inputField.focus();
        }
    }

    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWidget();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            overlayCard.classList.add('opacity-0', 'pointer-events-none', 'scale-90', 'translate-y-10');
        });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!overlayCard.contains(e.target) && e.target !== triggerBtn && !triggerBtn.contains(e.target)) {
            overlayCard.classList.add('opacity-0', 'pointer-events-none', 'scale-90', 'translate-y-10');
        }
    });

    // Helper to add Bot message bubble
    function addBotMessage(text) {
        const bubble = document.createElement('div');
        bubble.className = 'bg-white dark:bg-slate-800 text-primary dark:text-white rounded-xl rounded-tl-none p-md text-xs shadow-sm max-w-[85%] self-start relative border border-outline-variant/30 transition-all duration-300 transform translate-y-2 opacity-0';
        bubble.innerHTML = `
            <p class="leading-relaxed whitespace-pre-line">${text}</p>
            <span class="text-[8px] text-on-surface-variant/70 block mt-xs text-right font-medium">Orchard Bot</span>
        `;
        chatContent.appendChild(bubble);
        // Trigger transition
        setTimeout(() => {
            bubble.classList.remove('translate-y-2', 'opacity-0');
        }, 50);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Helper to add User message bubble
    function addUserMessage(text) {
        const bubble = document.createElement('div');
        bubble.className = 'bg-[#DCF8C6] dark:bg-[#056162] text-primary dark:text-white rounded-xl rounded-tr-none p-md text-xs shadow-sm max-w-[85%] self-end relative border border-outline-variant/30 transition-all duration-300 transform translate-y-2 opacity-0';
        bubble.innerHTML = `
            <p class="leading-relaxed whitespace-pre-line">${text}</p>
            <span class="text-[8px] text-on-surface-variant/70 block mt-xs text-right font-medium">You</span>
        `;
        chatContent.appendChild(bubble);
        setTimeout(() => {
            bubble.classList.remove('translate-y-2', 'opacity-0');
        }, 50);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Helper to render quick action option pills
    function renderOptions(options) {
        quickActionsContainer.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'border border-outline-variant text-[10px] px-sm py-xs rounded-full hover:bg-primary hover:text-on-primary dark:text-white dark:hover:text-primary dark:hover:bg-white transition-all duration-200 font-medium whitespace-nowrap cursor-pointer';
            btn.textContent = opt.label;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                opt.action();
            });
            quickActionsContainer.appendChild(btn);
        });
    }

    // Initial bot greeting
    function initBot() {
        chatContent.innerHTML = '';
        botState = 'initial';
        queryBrief = [];
        userContactInfo = '';
        customNotes = '';
        if (inputField) {
            inputField.placeholder = "Type a message...";
            inputField.value = '';
        }
        
        addBotMessage("Namaste! ⛰️ Welcome to the DJ's Harvest Homestay assistant. I can answer questions about our services instantly without waiting. What would you like to explore?");
        showMainMenu();
    }

    function showMainMenu() {
        renderOptions([
            {
                label: '🏡 Accommodations',
                action: () => {
                    addUserMessage('🏡 Accommodations');
                    queryBrief.push('Explored: Cottage Accommodations');
                    botState = 'cottages';
                    addBotMessage('We feature 4 signature cottages:\n• Luxury Cottage (₹12,000/night)\n• Family Suite (₹18,000/night)\n• View Loft (₹9,500/night)\n• Glass-wing Treehouse (₹15,000/night)\nAll include organic farm-to-table breakfast.');
                    showCottageMenu();
                }
            },
            {
                label: '🍎 Organic Store',
                action: () => {
                    addUserMessage('🍎 Organic Store');
                    queryBrief.push('Explored: Organic Store');
                    botState = 'organic';
                    addBotMessage('Our estate store offers hand-picked organic jams, preserves, pure mountain honey, and visual crafts. We ship carbon-neutrally nationwide.');
                    showStoreMenu();
                }
            },
            {
                label: '🏔️ Activities & Packages',
                action: () => {
                    addUserMessage('🏔️ Activities & Packages');
                    queryBrief.push('Explored: Activities & Packages');
                    botState = 'retreats';
                    addBotMessage('We customize organic farming workshops, apple harvesting trails, cooking classes, guided trekking routes, and campfire nights.');
                    showRetreatMenu();
                }
            },
            {
                label: '📞 Owner Callback',
                action: () => {
                    startContactFlow('Direct Owner Callback requested');
                }
            }
        ]);
    }

    function showCottageMenu() {
        renderOptions([
            { label: '📞 Book via Owner Callback', action: () => startContactFlow('Wants to book a cottage') },
            { label: '🔙 Back to Menu', action: () => { addUserMessage('🔙 Main Menu'); showMainMenu(); } }
        ]);
    }

    // Helper to request custom package
    function showStoreMenu() {
        renderOptions([
            { label: '📞 Ask about Custom Orders', action: () => startContactFlow('Inquired about store custom order') },
            { label: '🔙 Back to Menu', action: () => { addUserMessage('🔙 Main Menu'); showMainMenu(); } }
        ]);
    }

    function showRetreatMenu() {
        renderOptions([
            { label: '📞 Request Custom Package', action: () => startContactFlow('Requested custom activities package') },
            { label: '🔙 Back to Menu', action: () => { addUserMessage('🔙 Main Menu'); showMainMenu(); } }
        ]);
    }

    // Trigger contact details pending state
    function startContactFlow(reason) {
        addUserMessage('Requesting Callback');
        queryBrief.push(`Action: Callback Request (${reason})`);
        botState = 'contact_pending';
        addBotMessage('Understood! To forward your brief to the homestay owner, please type your Name, Phone Number, and details below.');
        if (inputField) {
            inputField.placeholder = "Type your Name, Phone & Details here...";
            inputField.focus();
        }
        quickActionsContainer.innerHTML = ''; // No options while typing details
    }

    // Send custom message input
    function handleMessageSubmit() {
        const msg = inputField.value.trim();
        if (!msg) return;
        
        addUserMessage(msg);
        inputField.value = '';

        if (botState === 'contact_pending') {
            userContactInfo = msg;
            botState = 'summary_ready';
            
            addBotMessage('Thank you! I have compiled your query brief.');
            
            // Render Send button
            renderOptions([
                {
                    label: '🟢 Send Brief to Owner',
                    action: () => {
                        const briefText = `*Guest Inquiry Brief (DJ's Harvest Homestay)*\n-------------------------------------------\n*Contact*: ${userContactInfo}\n*Explore History*:\n${queryBrief.map(item => `• ${item}`).join('\n')}\n${customNotes ? `*User Notes*: ${customNotes}\n` : ''}-------------------------------------------\nSent via Homestay Assistant Bot.`;
                        const encodedText = encodeURIComponent(briefText);
                        window.open(`https://wa.me/919876543210?text=${encodedText}`, '_blank');
                    }
                },
                {
                    label: '🔄 Restart Bot',
                    action: () => {
                        initBot();
                    }
                }
            ]);
        } else if (botState === 'summary_ready') {
            customNotes += (customNotes ? ' | ' : '') + msg;
            addBotMessage('Notes appended to brief. Click "Send Brief to Owner" to submit.');
        } else {
            // General query during exploration
            customNotes += (customNotes ? ' | ' : '') + msg;
            queryBrief.push(`Notes: ${msg}`);
            addBotMessage('I have saved your query details in the brief! Click "📞 Request Callback" when you are ready to forward them to the owner.');
            renderOptions([
                { label: '📞 Request Callback', action: () => startContactFlow('Exploration custom notes') },
                { label: '🔙 Back to Menu', action: () => showMainMenu() }
            ]);
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleMessageSubmit);
    }

    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleMessageSubmit();
            }
        });
    }
}
