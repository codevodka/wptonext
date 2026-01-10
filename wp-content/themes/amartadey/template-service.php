<?php 
/*
*Template Name: Service Page
*/
?>

<?php get_header(); ?>


<?php if (has_post_thumbnail( $post->ID ) ): ?>
<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
<section class="iha-contact innerpage-hero-area" id="_iha" style="background: url('<?php echo $image[0]; ?>'); background-size: cover;">
<?php endif; ?>
	<div class="container">
	    <div class="row">
	        <div class="col-lg-6 col-12">
	            <div class="innerpage-hero-content">
                    <?php $header = get_field('header'); ?>
	                <h2 class="title"><?php the_title(); ?></h2>
	                <p class="text"><?php the_field('banner_subtitle'); ?></p>
	            </div>
	        </div>
	    </div>
	    <div class="scroll-icon">
	        <div class="container">
	            <div class="scroll-icon-box">
	                <a href="#_iha" class="up smoothscroll"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-up.png" alt=""></a>
	                <span class="box"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-box.png" alt=""></span>
	                <span class="inner"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-inner.png" alt=""></span>
	                <a href="#_cfa" class="down smoothscroll"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-down.png" alt=""></a>
	            </div>
	        </div>
	    </div>
	</div>
</section>

<section class="single-blog-post-area">
    <div class="container">
        <div class="row">
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
</section>


<?php include 'testimonials.php'; ?>
<?php include 'social.php'; ?>

<?php get_footer(); ?>