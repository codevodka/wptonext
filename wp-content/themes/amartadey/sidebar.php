<div class="sidebar">
    <div class="sidebar-widget">
        <?php echo do_shortcode('[wpdreams_ajaxsearchlite]'); ?>
    </div>
    
    <div class="sw-news sidebar-widget">
        <h3 class="widget-title">Recent Blogs and Stories</h3>
        <ul class="sw-news-nav nav nav-tabs" id="newsTab" role="tablist">
            <li class="nav-item">
                <p class="nav-link active">recent Blogs</p>
            </li>
            
            
        </ul>
        <div class="sw-news-tab-content tab-content" id="newsTabContent">
            <div class="tab-pane fade show active" id="recent" role="tabpanel" aria-labelledby="recent-tab">
                <?php
                    $my_query = new WP_Query( array( 'post_type' => 'post', 'orderby' => 'id', 'order' => 'DESC','posts_per_page' => '4' ) );
                        while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <div class="sw-news-box">
                            <div class="img">
                                <?php $thumbnail_image = get_field('thumbnail_image');  ?>
                                <img src="<?php echo $thumbnail_image['url']; ?>" title="<?php echo $thumbnail_image['title']; ?>" alt="<?php echo $thumbnail_image['alt']; ?>">
                            </div>
                            <div class="content">
                                <span class="date"><?php echo get_the_date(); ?></span>
                                <a href="<?php the_permalink() ?>" class="title" title="<?php the_title_attribute(); ?>"><?php echo wp_trim_words( get_the_title(), 6 ,'..'); ?></a>
                            </div>
                        </div>      
                <?php endwhile; ?>
            </div>
            
        </div>
    </div>
        <div class="sw-news sidebar-widget">
        <ul class="sw-news-nav nav nav-tabs" id="newsTab" role="tablist">
            
            <li class="nav-item">
                <p class="nav-link active">Web Stories</p>
            </li>
        </ul>
        <div class="sw-news-tab-content tab-content" id="newsTabContent">
            <div class="tab-pane fade show active" id="story" role="tabpanel" aria-labelledby="story-tab">
                <?php
                    $my_query = new WP_Query( array( 'post_type' => 'web-story', 'orderby' => 'id', 'order' => 'DESC','posts_per_page' => '4' ) );
                        while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <div class="sw-news-box" style="margin-bottom: 10px;">
                            <div class="img"><?php the_post_thumbnail( 'medium' );   ?></div>
                            <div class="content">
                                
                                <span class="date"><?php echo get_the_date(); ?></span>
                                <a href="<?php the_permalink() ?>" class="title"><?php echo wp_trim_words( get_the_title(), 6 ,'..'); ?></a>
                            </div>
                        </div>      
                <?php endwhile; ?>
            </div>
        </div>
    </div>


    <section class="all-category sidebar-widget">
        <h3 class="widget-title">Categories</h3>
        <ul class="tagcloud">
             
                   <?php $categories = get_categories();
            foreach($categories as $category) {
               echo '<li><a href="' . get_category_link($category->term_id) . '">' . $category->name . '</a><li>';
            } ?>
             
        </ul>
        
    </section>
        
</div>