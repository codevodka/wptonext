<?php get_header(); ?>
<section class="innerpage-hero-area" style="background: url('<?php the_field('blog_header_image', 'option'); ?>'); background-size: cover;background-position: center;background-repeat: no-repeat;">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 offset-lg-1 col-12">
                    <div class="innerpage-hero-content">
                            <?php
                                $s=get_search_query();
                                $args = array(
                                                's' =>$s
                            ); 
                        echo'<h2 class="title">Search Results for: <span style="color:#FFC576">'.get_query_var('s') .'</span></h2>'?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="page-blog-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12">
                    <div class="page-all-blog">
                        <div class="row justify-content-left">
                            <?php
$s=get_search_query();
$args = array(
                's' =>$s
            );
$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {
        while ( $the_query->have_posts() ) {
           $the_query->the_post();
                 ?>
                    <div class="col-lg-6 col-sm-6 col-12">
                                        <div class="single-related-article">
                                            <div class="content">
                                                <p class="date"><?php echo get_the_date(); ?></p>
                                                <a href="<?php the_permalink() ?>"><h4 class="title"><?php echo wp_trim_words( get_the_title(), 6 ,'..'); ?></h4></a>
                                                <p class="text"><?php echo mb_strimwidth( the_field('banner_subtitle'), 0, 110, '...' ); ?></p>
                                            </div>
                                        </div>
                                    </div>
                                     <?php wp_reset_postdata(); 
                            }
                        }else{
                    ?>
                            <h2 style='font-weight:bold;color:#FFC576'>Nothing Found</h2>
                            <div class="alert">
                              <p>Sorry, but nothing matched your search criteria. Please try again with some different keywords.</p>
                            </div>
                    <?php } ?>
                            <div class="col-lg-12 col-sm-12 col-12">
                                <div class="nav-links">
                                    <?php echo paginate_links( array(
                                      'prev_text' => '<span><</span>',
                                      'next_text' => '<span>></span>'
                                    )); ?>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-0 col-sm-8 offset-sm-2 col-12">
                    <?php include 'sidebar.php' ?>
                </div>
            </div>
        </div>
    </section>




<?php get_footer(); ?>
