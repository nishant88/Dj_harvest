<?php get_header(); ?>
<main class="pt-24">
        <!-- Hero Section: Feature Article -->
        <section class="relative w-full h-[870px] flex items-end px-lg pb-2xl overflow-hidden">
            <div class="absolute inset-0 z-0">
                <div class="w-full h-full parallax-bg"
                    data-alt="A cinematic, high-angle panoramic photograph of a lush Himalayan DJ's Harvest."
                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2gtPvqZebsvZ09GBo2mUP2aL2pQIk1AsBeM8ZmxIX8zKd_AjlI9AOhNjDxxCPQSPbu9edrGGdFEDvX7SrsOvi2YdYF0Xc7HsAD9IYLkqf038jf9ZXvmtsoD6AlD7_lZL1u_K9raNUfdJ6pt5KkPyAU2R24kLUnP7_pTwp0RPpncNMUiZMh6gO_ISWMfMW1CfYsMhWovYqZQoJ70stKOqJOqYFLMoSnRCiXNlcLUCXxH4nvGaQfnijpQ');">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
            </div>
            <div class="relative z-10 max-w-4xl mx-auto text-center md:text-left">
                <span
                    class="inline-block bg-primary-fixed text-on-primary-fixed px-md py-xs rounded-full font-label-caps text-label-caps mb-md">
                    FEATURE STORY
                </span>
                <h1 id="stories-hero-title" class="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-lg leading-tight">
                    Harvest Stories: The Silent Rhythms of the High Himalaya
                </h1>
                <div
                    class="flex flex-wrap items-center justify-center md:justify-start gap-md text-white/90 font-label-caps text-label-caps">
                    <span>BY TASHI DORJE</span>
                    <span class="w-1 h-1 bg-white/40 rounded-full"></span>
                    <span>12 MIN READ</span>
                    <span class="w-1 h-1 bg-white/40 rounded-full"></span>
                    <button class="bookmark-btn flex items-center gap-xs hover:text-white transition-colors"
                        data-title="Harvest Stories: The Silent Rhythms of the High Himalaya">
                        <span class="material-symbols-outlined text-[18px]">bookmark</span>
                        <span class="bookmark-text">SAVE TO JOURNAL</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Category Filter -->
        <section class="max-w-7xl mx-auto px-lg mt-2xl mb-xl">
            <div class="flex flex-wrap items-center justify-between gap-lg border-b border-outline-variant pb-md">
                <div class="flex gap-xl overflow-x-auto no-scrollbar pb-xs" id="category-filters-list">
                    <button
                        class="filter-tab-btn font-label-caps text-label-caps text-primary border-b-2 border-primary pb-md whitespace-nowrap cursor-pointer"
                        data-category="all">Latest Journal</button>
                    <button
                        class="filter-tab-btn font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors pb-md whitespace-nowrap cursor-pointer"
                        data-category="mountain-living">Mountain Living</button>
                    <button
                        class="filter-tab-btn font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors pb-md whitespace-nowrap cursor-pointer"
                        data-category="recipes">Recipes</button>
                    <button
                        class="filter-tab-btn font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors pb-md whitespace-nowrap cursor-pointer"
                        data-category="travel-guides">Travel Guides</button>
                    <button
                        class="filter-tab-btn font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors pb-md whitespace-nowrap cursor-pointer"
                        data-category="craftsmanship">Craftsmanship</button>
                </div>
                <div class="flex items-center gap-sm border border-outline-variant/30 rounded-lg px-md py-xs bg-white">
                    <span class="material-symbols-outlined text-on-surface-variant">search</span>
                    <input id="search-journal-input"
                        class="bg-transparent border-none p-0 text-sm focus:ring-0 placeholder:text-outline italic w-48 outline-none"
                        placeholder="Search the journal..." type="text" />
                </div>
            </div>
        </section>

        <!-- Blog Grid: Modern Asymmetric Layout -->
        <section class="max-w-7xl mx-auto px-lg mb-3xl">
            <div class="journal-grid" id="blog-grid-container">
                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                    <?php
                    $categories = get_the_category();
                    $cat_slug = !empty($categories) ? $categories[0]->slug : 'general';
                    $cat_name = !empty($categories) ? $categories[0]->name : 'Journal';
                    $read_time = get_post_meta(get_the_ID(), 'read_time', true);
                    ?>
                    <article class="blog-card-item group cursor-pointer border border-outline-variant/40 bg-white rounded-2xl p-md hover:-translate-y-1 hover:shadow-xl transition-all duration-350" data-category="<?php echo esc_attr($cat_slug); ?>" onclick="window.location.href='<?php the_permalink(); ?>';">
                        <div class="overflow-hidden rounded-xl mb-md aspect-[16/10]">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('full', array('class' => 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105')); ?>
                            <?php else : ?>
                                <div class="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <span class="material-symbols-outlined text-4xl">image</span>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div>
                            <span class="font-label-caps text-label-caps text-secondary mb-xs block text-[10px] tracking-wider font-bold uppercase"><?php echo esc_html($cat_name); ?></span>
                            <h3 class="article-title font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-sm">
                                <?php the_title(); ?>
                            </h3>
                            <p class="article-desc text-on-surface-variant text-body-md line-clamp-3 mb-md leading-relaxed">
                                <?php echo esc_html(get_the_excerpt()); ?>
                            </p>
                            <div class="flex items-center justify-between text-outline">
                                <span class="font-label-caps text-[10px] uppercase font-bold tracking-wider"><?php echo esc_html($read_time ? $read_time : '8 Min Read'); ?></span>
                                <button class="bookmark-btn hover:text-primary transition-colors flex items-center p-xs" data-title="<?php the_title_attribute(); ?>" onclick="event.stopPropagation();">
                                    <span class="material-symbols-outlined text-[18px]">bookmark</span>
                                </button>
                            </div>
                        </div>
                    </article>
                <?php endwhile; else : ?>
                    <div class="col-span-full py-2xl text-center text-slate-400">
                        <p>No stories found yet. Publish some articles inside WordPress dashboard!</p>
                    </div>
                <?php endif; ?>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="max-w-7xl mx-auto px-lg mb-3xl">
            <div
                class="bg-surface-container-low dark:bg-tertiary-container rounded-3xl p-xl md:p-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-2xl">
                <!-- Background Decoration -->
                <div class="absolute top-[-50%] right-[-10%] w-96 h-96 bg-primary-fixed/20 rounded-full blur-[100px]">
                </div>
                <div class="relative z-10 max-w-xl text-center md:text-left">
                    <h2 class="font-headline-md text-headline-md text-primary mb-md">Join the Mountain Life Journal</h2>
                    <p class="text-body-lg text-on-surface-variant leading-relaxed">
                        Curated stories of mountain heritage, organic living, and exclusive seasonal updates from our
                        Himalayan homestays. Delivered monthly to your inbox.
                    </p>
                </div>
                <div class="relative z-10 w-full max-w-md">
                    <form class="flex flex-col gap-md">
                        <div class="relative">
                            <input
                                class="w-full bg-background border border-outline-variant px-lg py-md rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                                placeholder="Email Address" type="email" required />
                        </div>
                        <button
                            class="bg-primary text-on-primary font-button-text text-button-text px-xl py-md rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98]">
                            Subscribe Now
                        </button>
                        <p
                            class="text-[10px] text-center md:text-left font-label-caps text-outline tracking-wider uppercase">
                            Privacy first. No spam, ever.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
<?php get_footer(); ?>