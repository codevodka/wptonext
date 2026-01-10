<?php get_header(); ?>

  <?php if (has_post_thumbnail( $post->ID ) ): ?>
<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
        <section class="innerpage-hero-area" style="background: url('<?php echo $image[0]; ?>'); background-size: cover;background-position: center;background-repeat: no-repeat;">
<?php endif; ?>
        <div class="container">
            <div class="row">
                <div class="col-lg-9 offset-lg-1 col-12">
                    <div class="innerpage-hero-content">
                        <h2 class="title">All blogs of category : <?php single_cat_title(); ?></h2>
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
						
						<div class="row justify-content-center">
                    		<?php
                                $my_query = new WP_Query( array('cat' => get_query_var('cat'), 'post_type' => 'post', 'orderby' => 'id', 'order' => 'DESC','paged' => $paged ) );
                                    while ($my_query->have_posts()) : $my_query->the_post(); ?>
                                    <div class="col-lg-6 col-sm-6 col-12">
		                                <div class="single-related-article">
		                                    <div class="img">
		                                    	<a href="<?php the_permalink() ?>">
		                                    		<?php $thumbnail_image = get_field('thumbnail_image');  ?>
													<img src="<?php echo $thumbnail_image['url']; ?>" title="<?php echo $thumbnail_image['title']; ?>" alt="<?php echo $thumbnail_image['alt']; ?>">
		                                    	</a>
		                                    </div>
		                                    <div class="content">
		                                        <p class="date"><?php echo get_the_date(); ?></p>
		                                        <a href="<?php the_permalink() ?>"><h4 class="title"><?php echo wp_trim_words( get_the_title(), 6 ,'..'); ?></h4></a>
		                                        <p class="text"><?php echo mb_strimwidth( the_field('banner_subtitle'), 0, 110, '...' ); ?></p>
		                                    </div>
		                                </div>
		                            </div>           
                            <?php endwhile; ?>
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