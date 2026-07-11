<?php
/**
 * The template for displaying all single posts
 */
get_header();
?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <main class="pt-24 pb-3xl">
        <!-- Hero Section: Featured Content -->
        <section class="max-w-4xl mx-auto px-lg pt-xl pb-lg">
            <div class="max-w-3xl text-center md:text-left flex flex-col items-center md:items-start mx-auto md:mx-0">
                <div class="flex items-center justify-center md:justify-start gap-sm mb-sm">
                    <span class="font-label-caps text-label-caps text-secondary uppercase font-bold tracking-wider">
                        <?php
                        $categories = get_the_category();
                        if (!empty($categories)) {
                            echo esc_html($categories[0]->name);
                        } else {
                            echo "Journal";
                        }
                        ?>
                    </span>
                    <span class="text-outline text-xs">•</span>
                    <span class="text-xs text-on-surface-variant font-medium uppercase tracking-wider font-label-caps">
                        <?php 
                        $read_time = get_post_meta(get_the_ID(), 'read_time', true);
                        echo esc_html($read_time ? $read_time : '8 Min Read'); 
                        ?>
                    </span>
                </div>
                <h1 class="font-display-lg-mobile md:font-display-lg text-primary leading-tight mb-md text-center md:text-left">
                    <?php the_title(); ?>
                </h1>
                <p class="text-on-surface-variant text-body-lg leading-relaxed max-w-3xl text-center md:text-left mx-auto md:mx-0">
                    <?php echo esc_html(get_the_excerpt()); ?>
                </p>
            </div>

            <!-- Author details -->
            <div class="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-md border-y border-outline-variant py-md mt-xl">
                <div class="flex items-center gap-md">
                    <div class="w-10 h-10 rounded-full bg-cover bg-center bg-[#1b3022]/10 flex items-center justify-center font-bold text-[#1b3022] text-xs">
                        <?php echo esc_html(substr(get_the_author(), 0, 2)); ?>
                    </div>
                    <div>
                        <p class="font-bold text-primary text-sm"><?php the_author(); ?></p>
                        <p class="text-[10px] text-on-surface-variant font-label-caps uppercase"><?php echo get_the_date(); ?></p>
                    </div>
                </div>
                <div class="flex items-center gap-sm">
                    <button class="bookmark-btn flex items-center justify-center w-8 h-8 rounded-full border border-outline-variant hover:bg-surface-container transition-colors text-primary" data-title="<?php the_title_attribute(); ?>">
                        <span class="material-symbols-outlined text-[18px]">bookmark</span>
                    </button>
                    <button class="flex items-center justify-center w-8 h-8 rounded-full border border-outline-variant hover:bg-surface-container transition-colors text-primary" onclick="navigator.clipboard.writeText(window.location.href); alert('Article link copied to clipboard!');">
                        <span class="material-symbols-outlined text-[18px]">share</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Article Banner Image (from Featured Image) -->
        <?php if (has_post_thumbnail()) : ?>
            <section class="max-w-7xl mx-auto px-lg mb-2xl">
                <div class="h-96 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-lg">
                    <?php the_post_thumbnail('full', array('class' => 'w-full h-full object-cover')); ?>
                </div>
            </section>
        <?php endif; ?>

        <!-- Article Body -->
        <section class="max-w-4xl mx-auto px-lg mb-3xl">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-xl">
                <!-- Sidebar metadata desktop -->
                <aside class="hidden md:block md:col-span-3 space-y-lg">
                    <div>
                        <h4 class="font-label-caps text-[10px] text-outline uppercase font-bold tracking-widest mb-xs">Published</h4>
                        <p class="text-sm font-medium text-primary"><?php echo get_the_date(); ?></p>
                    </div>
                    <div>
                        <h4 class="font-label-caps text-[10px] text-outline uppercase font-bold tracking-widest mb-xs">Category</h4>
                        <p class="text-sm font-medium text-primary">
                            <?php
                            if (!empty($categories)) {
                                echo esc_html($categories[0]->name);
                            } else {
                                echo "Himalayan Journal";
                            }
                            ?>
                        </p>
                    </div>
                </aside>

                <!-- Text Content -->
                <div class="md:col-span-9 space-y-lg text-on-surface/90 leading-relaxed text-base md:text-lg">
                    <?php the_content(); ?>
                </div>
            </div>
        </section>
    </main>
<?php endwhile; endif; ?>

<?php get_footer(); ?>
