<!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .glass {
            background: rgba(251, 249, 246, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glass-nav {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
    </style>
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container'); ?>>

    <!-- Dynamic Header System -->
    <?php
    $is_checkout = is_page_template('template-checkout.php');
    if ($is_checkout) :
    ?>
        <!-- Secure Checkout Header -->
        <header class="w-full bg-white border-b border-outline-variant py-md px-lg shrink-0">
            <div class="max-w-6xl mx-auto flex items-center justify-between">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-sm hover:opacity-80 transition-opacity">
                    <span class="material-symbols-outlined text-primary text-2xl">arrow_back</span>
                    <img class="w-[180px] h-[48px] sm:w-[240px] sm:h-[64px] md:w-[300px] md:h-[80px] object-contain rounded-md" src="<?php echo get_template_directory_uri(); ?>/img/DJ_logo.png" alt="DJ's Harvest Logo" />
                </a>
                <div class="flex items-center gap-xs text-xs font-label-caps uppercase text-on-surface-variant tracking-wider font-bold">
                    <span class="material-symbols-outlined text-sm">lock</span>
                    <span>Secure Gateway</span>
                </div>
            </div>
        </header>
    <?php else : ?>
        <!-- Public Navigation Header -->
        <header id="global-header" class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
            <nav class="flex justify-between items-center w-full px-lg py-md max-w-7xl mx-auto">
                <a class="font-headline-md text-headline-md text-primary tracking-tighter hover:opacity-85 transition-opacity"
                    href="<?php echo esc_url(home_url('/')); ?>">
                    <img class="w-[180px] h-[48px] sm:w-[240px] sm:h-[64px] md:w-[300px] md:h-[80px] object-contain rounded-md" src="<?php echo get_template_directory_uri(); ?>/img/DJ_logo.png" alt="DJ's Harvest Logo" />
                </a>

                <!-- Desktop Navigation Menu -->
                <div class="hidden md:flex items-center gap-xl">
                    <a class="<?php echo is_page_template('template-stay.php') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary transition-colors'; ?> font-label-caps text-label-caps uppercase font-bold tracking-wider"
                        href="<?php echo esc_url(home_url('/stay')); ?>">Stay</a>
                    <a class="<?php echo is_page_template('template-shop.php') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary transition-colors'; ?> font-label-caps text-label-caps uppercase font-bold tracking-wider"
                        href="<?php echo esc_url(home_url('/shop')); ?>">Shop</a>
                    <a class="<?php echo (is_home() || is_single()) ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary transition-colors'; ?> font-label-caps text-label-caps uppercase font-bold tracking-wider"
                        href="<?php echo esc_url(home_url('/stories')); ?>">Stories</a>

                    <!-- Cart Trigger button -->
                    <button class="cart-toggle-btn text-on-surface-variant hover:text-primary p-xs relative flex items-center transition-colors">
                        <span class="material-symbols-outlined">shopping_bag</span>
                        <span class="cart-badge-count absolute -top-1 -right-1 bg-secondary text-on-secondary text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
                    </button>
                </div>

                <!-- Actions & Mobile Triggers -->
                <div class="flex items-center gap-sm md:hidden">
                    <button class="cart-toggle-btn text-on-surface-variant hover:text-primary w-10 h-10 rounded-full hover:bg-primary/5 active:bg-primary/10 flex items-center justify-center relative transition-colors">
                        <span class="material-symbols-outlined text-2xl">shopping_bag</span>
                        <span class="cart-badge-count absolute top-1 right-1 bg-secondary text-on-secondary text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
                    </button>
                    <button class="mobile-menu-trigger text-primary w-10 h-10 rounded-full hover:bg-primary/5 active:bg-primary/10 flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined text-2xl">menu</span>
                    </button>
                </div>
            </nav>
        </header>

        <!-- Mobile Drawer Navigation Overlay -->
        <div id="mobile-nav-menu" class="fixed inset-0 bg-background/95 z-40 hidden flex-col justify-between p-xl transition-all duration-300">
            <div class="flex flex-col pt-3xl space-y-xl">
                <a href="<?php echo esc_url(home_url('/stay')); ?>" class="font-display-lg text-4xl text-primary flex items-baseline gap-md border-b border-primary/5 pb-md">
                    <span class="font-mono text-xs text-slate-400">01</span> Stay
                </a>
                <a href="<?php echo esc_url(home_url('/shop')); ?>" class="font-display-lg text-4xl text-primary flex items-baseline gap-md border-b border-primary/5 pb-md">
                    <span class="font-mono text-xs text-slate-400">02</span> Shop
                </a>
                <a href="<?php echo esc_url(home_url('/stories')); ?>" class="font-display-lg text-4xl text-primary flex items-baseline gap-md border-b border-primary/5 pb-md">
                    <span class="font-mono text-xs text-slate-400">03</span> Stories
                </a>
            </div>
            <div class="flex flex-col gap-md pt-lg border-t border-primary/10">
                <a href="https://wa.me/919876543210?text=Hi%20there!" target="_blank" class="w-full bg-[#25D366] text-white py-md rounded-xl font-bold flex items-center justify-center gap-sm">
                    <span class="material-symbols-outlined">chat</span> Contact Host on WhatsApp
                </a>
                <button class="mobile-menu-close w-full border border-primary text-primary py-md rounded-xl font-bold uppercase tracking-widest text-xs">
                    Close Menu
                </button>
            </div>
        </div>
    <?php endif; ?>
