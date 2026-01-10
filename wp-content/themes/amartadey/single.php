<?php get_header(); ?>
  <?php if (has_post_thumbnail( $post->ID ) ): ?>
<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
        <section class="innerpage-hero-area" style="background: url('<?php echo $image[0]; ?>'); background-size: cover;background-position: center;background-repeat: no-repeat;">
<?php endif; ?>
        <div class="container">
            <div class="row">
                <div class="col-lg-9 offset-lg-1 col-12">
                    <div class="innerpage-hero-content">
                        <h2 class="title"><?php the_title(); ?></h2>
                        <p class="text"><?php the_field('banner_subtitle') ?></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="iha-meta">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 offset-lg-1 col-12">
                        <div class="iha-all-meta">
                            <div class="iha-meta-box">
                                <p class="title">PUBLISH DATE</p>
                                <p class="info"><?php echo get_the_date( 'M j, Y' ); ?></p>
                            </div>
                            <div class="iha-meta-box">
                                <p class="title">CATEGORIES</p>
                                <?php 
                                    $categories = wp_get_post_categories(get_the_ID());
                                    $cati=0;
                                      foreach($categories as $category){
                                        echo '<p class="info">' . get_cat_name($category) . '</p>';
                                          $cati++;
                                        }
                                 ?>
                            </div>
                            <div class="iha-meta-box">
                                <p class="title">READ TIME</p>
                                <p class="info"><?php the_field('read_time') ?></p>
                            </div>
                            <div class="iha-meta-box">
                                <p class="title">SHARE</p>
                                <?php echo do_shortcode('[Sassy_Social_Share]'); ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="single-blog-post-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 offset-lg-1 col-12">
                    <div class="sbpa-content">
                            <?php 
                                if ( have_posts() ) {
                                    while ( have_posts() ) {
                                        the_post(); 
                                        the_content();
                                    }
                                }
                            ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="related-articles-area">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <p class="intro">MY BLOG</p>
                        <h2 class="title">New Articles</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <?php
                    $my_query = new WP_Query( array( 'post_type' => 'post', 'orderby' => 'id', 'order' => 'DESC', 'posts_per_page' => '3') );
                        while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <div class="col-lg-4 col-sm-6 col-12">
                            <div class="single-related-article">
                                <div class="img"><a href="<?php the_permalink() ?>">
                                    <?php $thumbnail_image = get_field('thumbnail_image');  ?>
                                        <img src="<?php echo $thumbnail_image['url']; ?>" title="<?php echo $thumbnail_image['title']; ?>" alt="<?php echo $thumbnail_image['alt']; ?>">
                                </a></div>
                                <div class="content">
                                    <p class="date"><?php echo get_the_date(); ?></p>
                                    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><h4 class="title"><h4 class="title"><?php echo wp_trim_words( get_the_title(), 6 ,'..'); ?></h4></a>
                                    
                                    <p class="text"><?php echo mb_strimwidth( the_field('banner_subtitle'), 0, 110, '...' ); ?></p>
                                </div>
                            </div>
                        </div>
                <?php endwhile; ?>
            </div>
        </div>
    </section>
    <section class="post-comment-aera">
        <div class="container">
            <h3 class="pca-title text-center">Leave an Opinion</h3>
             <?php 
                if ( have_posts() ) {
                    while ( have_posts() ) {
                        the_post(); 
                        echo do_shortcode("[wpdiscuz_comments]");
                    }
                }
            ?>
             <?php  ?>
        </div>
    </section>
<?php get_footer(); ?>
