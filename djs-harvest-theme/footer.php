    <!-- Footer -->
    <footer class="w-full rounded-t-xl bg-surface-container-low dark:bg-tertiary-container mt-3xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-xl px-lg py-3xl max-w-7xl mx-auto">
            <div class="md:col-span-1">
                <a class="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed-dim"
                    href="<?php echo esc_url(home_url('/')); ?>">DJ's Harvest</a>
                <p class="mt-md font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-container">
                    Sustainably managing Himalayan heritage estates since 1924. Experience the stillness.</p>
            </div>
            <div>
                <h4 class="font-label-caps text-label-caps text-primary dark:text-primary-fixed-dim mb-lg uppercase tracking-widest">Stay</h4>
                <ul class="space-y-sm">
                    <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                            href="<?php echo esc_url(home_url('/stay')); ?>">Our Cottages</a></li>
                    <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                            href="<?php echo esc_url(home_url('/stay')); ?>">Group Retreats</a></li>
                    <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                            href="<?php echo esc_url(home_url('/stay')); ?>">Work-from-Orchard</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-label-caps text-label-caps text-primary dark:text-primary-fixed-dim mb-lg uppercase tracking-widest">Discover</h4>
                <ul class="space-y-sm">
                    <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                            href="<?php echo esc_url(home_url('/shop')); ?>">Orchard Shop</a></li>
                    <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                            href="<?php echo esc_url(home_url('/stories')); ?>">Stories</a></li>
                    <li><a class="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors"
                            href="<?php echo esc_url(home_url('/stories')); ?>">Mountain Life Journal</a></li>
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
            <p class="text-[10px] uppercase tracking-widest text-on-surface-variant">© 2026 DJ's Harvest Himalayan Homestays. All rights reserved.</p>
            <div class="flex gap-lg">
                <a class="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                    href="#">Privacy Policy</a>
                <a class="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                    href="#">Terms of Service</a>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Support Floating Overlay -->
    <div id="whatsapp-chat-drawer" class="fixed bottom-lg right-lg z-50 pointer-events-none">
        <!-- Floating Trigger Icon Button -->
        <button id="whatsapp-drawer-trigger"
            class="pointer-events-auto w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,211,102,0.4)] transition-all duration-300">
            <svg viewBox="0 0 24 24" class="w-7 h-7 fill-current">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997a11.9 11.9 0 01-5.748-1.488L0 24zm6.476-3.882l.307.182a9.923 9.923 0 005.22 1.482h.007c5.46-.002 9.902-4.385 9.905-9.777.001-2.611-1.015-5.066-2.863-6.918s-4.33-2.871-6.942-2.872c-5.464 0-9.91 4.386-9.913 9.779a9.71 9.71 0 001.503 5.097l.2.317-1 3.654 3.783-.987zM17.487 14.39c-.3-.149-1.783-.879-2.059-.979s-.477-.149-.677.15-1.783 1.834-1.783 1.834-.22.25-.52.1-.879-.323-1.637-.999c-.59-.525-.987-1.174-1.103-1.373s-.012-.307.087-.456c.09-.133.2-.249.3-.374.099-.117.133-.2.2-.332s.033-.266-.017-.365-.477-1.147-.653-1.571c-.172-.416-.363-.357-.477-.362l-.409-.008c-.141 0-.374.053-.57.266s-.75.731-.75 1.783.77 2.07.876 2.21c.11.14 1.516 2.315 3.67 3.242.513.22 1.05.378 1.498.497.669.213 1.278.183 1.76.111.537-.08 1.783-.73 2.033-1.437.25-.707.25-1.313.175-1.437-.07-.123-.27-.197-.57-.346z"/>
            </svg>
        </button>

        <!-- Dynamic Chat Window Drawer -->
        <div id="whatsapp-chat-window"
            class="hidden pointer-events-auto absolute bottom-20 right-0 w-[calc(100vw-48px)] sm:w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 scale-95 opacity-0 origin-bottom-right">
            <!-- Header bar -->
            <div class="bg-[#1b3022] text-white p-md flex items-center justify-between">
                <div class="flex items-center gap-sm">
                    <div class="relative">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">DJ</div>
                        <span class="w-3 h-3 bg-emerald-500 rounded-full absolute bottom-0 right-0 border-2 border-[#1b3022]"></span>
                    </div>
                    <div>
                        <h4 class="font-semibold text-sm">DJ's Harvest Homestay</h4>
                        <p class="text-[9px] opacity-75 font-label-caps uppercase tracking-wider">Typically replies within 30m</p>
                    </div>
                </div>
                <button id="whatsapp-drawer-close" class="text-white/80 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            <!-- Body messages -->
            <div class="p-md bg-[#f4f7f6] space-y-md h-64 overflow-y-auto">
                <div class="bg-white p-sm rounded-xl rounded-tl-none shadow-sm max-w-[85%]">
                    <p class="text-xs text-slate-700 leading-relaxed">Namaste! Reaching out from the orchards. How can we help you plan your Himalayan getaway today?</p>
                </div>
            </div>

            <!-- Input area -->
            <div class="p-sm bg-white border-t border-slate-100 flex items-center gap-xs">
                <input type="text" id="whatsapp-chat-input" placeholder="Type a message..."
                    class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-md py-sm text-xs focus:ring-1 focus:ring-[#1b3022] outline-none">
                <button id="whatsapp-chat-send"
                    class="w-8 h-8 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl flex items-center justify-center transition-colors">
                    <span class="material-symbols-outlined text-sm">send</span>
                </button>
            </div>
        </div>
    </div>

    <?php wp_footer(); ?>
</body>
</html>
