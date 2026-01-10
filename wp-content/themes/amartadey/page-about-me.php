<?php 
/*
*Template Name: About Us Page
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
	                <h2 class="title"><?php echo get_field('page_title'); ?></h2>
	                <p class="text"><?php echo get_field('page_subtitle'); ?></p>
	            </div>
	        </div>
	    </div>
	    <div class="scroll-icon">
	        <div class="container">
	            <div class="scroll-icon-box">
	                <a href="#_iha" class="up smoothscroll"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-up.png" alt="" loading="lazy"></a>
	                <span class="box"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-box.png" alt="" loading="lazy"></span>
	                <span class="inner"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-inner.png" alt="" loading="lazy"></span>
	                <a href="#_cfa" class="down smoothscroll"><img src="<?php echo get_template_directory_uri(); ?>/img/contact/scroll-down.png" alt="" loading="lazy"></a>
	            </div>
	        </div>
	    </div>
	</div>
</section>
<section class="info-tab-area">
<div class="container">
    <div class="info-tab">
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade active show" id="about" role="tabpanel" aria-labelledby="about-tab">
                <div class="content-about">
                    <?php $about_me = get_field('about_me'); ?>
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <div class="banner">
                                <img src="<?php echo $about_me['image']['url'] ?>" alt="" loading="lazy">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <div class="content">
                                <p class="intro"><?php echo $about_me['subtitle'] ?></p>
                                <h2 class="title"><?php echo $about_me['title'] ?></h2>
                                <?php echo $about_me['text'] ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
<section class="page-single-service-area">
<div class="container">
    <div class="page-single-service">
        <?php $first_block = get_field('first_block') ?>
        <h2 class="title"><?php echo $first_block['title'] ?></h2>
        <div class="row">
            <div class="col-lg-6 col-12">
                <p class="text"><?php echo $first_block['text_1'] ?></p>
            </div>
            <div class="col-lg-6 col-12">
                <p class="text"><?php echo $first_block['text_2'] ?></p>
            </div>
        </div>
        <div class="row mb-5">
            <?php $image_text = get_field('image_text') ?>
            <div class="col-lg-6 col-md-12 col-12">
                
                <img src="<?php echo $image_text['image']['url']; ?>" title="<?php echo $image_text['image']['title']; ?>" alt="<?php echo $image_text['image']['alt']; ?>" loading="lazy">
                
            </div>
            <div class="col-lg-6 col-md-12 col-12">
                <h3 class="title-2"><?php echo $image_text['title'] ?></h3>
                <p class="text"><?php echo $image_text['text'] ?></p>
                <h4 class="title-3"><?php echo $image_text['list_title'] ?></h4>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                            <?php
                                if ( ! have_rows( 'image_text' ) ) {
                                    return false;
                                }
                                if ( have_rows( 'image_text' ) ) : ?>
                                        <?php while ( have_rows( 'image_text' ) ) : the_row();
                                            // Services Sub Repeater.
                                            if ( have_rows( 'list_items_left' ) ) : ?>
                                            <ul class="list">
                                                   <?php
                                                   while ( have_rows( 'list_items_left' ) ) : the_row();
                                                       $item = get_sub_field( 'item' );
                                                   ?>
                                                    <li><?php echo esc_html( $item ); ?></li>
                                                   <?php endwhile; ?> 
                                            </ul>
                                               <?php endif; ?>
                                        <?php endwhile; ?>
                                <?php endif; ?>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                        <?php
                                if ( ! have_rows( 'image_text' ) ) {
                                    return false;
                                }
                                if ( have_rows( 'image_text' ) ) : ?>
                                        <?php while ( have_rows( 'image_text' ) ) : the_row();
                                            // Services Sub Repeater.
                                            if ( have_rows( 'list_items_right' ) ) : ?>
                                            <ul class="list">
                                                   <?php
                                                   while ( have_rows( 'list_items_right' ) ) : the_row();
                                                       $item = get_sub_field( 'item' );
                                                   ?>
                                                    <li><?php echo esc_html( $item ); ?></li>
                                                   <?php endwhile; ?> 
                                            </ul>
                                               <?php endif; ?>
                                        <?php endwhile; ?>
                                <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-5">
            <?php $all_images = get_field('all_images') ?>
            <div class="col-lg-6 col-md-6 col-12">
                <div class="img mb-5">
                    <img src="<?php echo $all_images['image_1']['url']; ?>" title="<?php echo $all_images['image_1']['title']; ?>" alt="<?php echo $all_images['image_1']['alt']; ?>" loading="lazy">
                </div>
                <div class="img">
                    <img src="<?php echo $all_images['image_2']['url']; ?>" title="<?php echo $all_images['image_2']['title']; ?>" alt="<?php echo $all_images['image_2']['alt']; ?>" loading="lazy">
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12 mt-lg-0 mt-md-0 mt-sm-5 mt-5">
                <div class="img">
                    <img src="<?php echo $all_images['image_3']['url']; ?>" title="<?php echo $all_images['image_3']['title']; ?>" alt="<?php echo $all_images['image_3']['alt']; ?>" loading="lazy">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                <?php $list_details_1 = get_field('list_details_1'); ?>
                <h4 class="title-3"><?php echo $list_details_1['title'] ?></h4>
                <?php
                    if ( ! have_rows( 'list_details_1' ) ) {
                        return false;
                    }
                    if ( have_rows( 'list_details_1' ) ) : ?>
                            <?php while ( have_rows( 'list_details_1' ) ) : the_row();
                                // Services Sub Repeater.
                                if ( have_rows( 'list' ) ) : ?>
                                <ul class="list">
                                       <?php
                                       while ( have_rows( 'list' ) ) : the_row();
                                           $item = get_sub_field( 'item' );
                                       ?>
                                        <li><?php echo esc_html( $item ); ?></li>
                                       <?php endwhile; ?> 
                                </ul>
                                   <?php endif; ?>
                            <?php endwhile; ?>
                    <?php endif; ?>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                <?php $list_details_2 = get_field('list_details_2'); ?>
                <h4 class="title-3"><?php echo $list_details_2['title'] ?></h4>
                <?php
                    if ( ! have_rows( 'list_details_2' ) ) {
                        return false;
                    }
                    if ( have_rows( 'list_details_2' ) ) : ?>
                            <?php while ( have_rows( 'list_details_2' ) ) : the_row();
                                // Services Sub Repeater.
                                if ( have_rows( 'list' ) ) : ?>
                                <ul class="list">
                                       <?php
                                       while ( have_rows( 'list' ) ) : the_row();
                                           $item = get_sub_field( 'item' );
                                       ?>
                                        <li><?php echo esc_html( $item ); ?></li>
                                       <?php endwhile; ?> 
                                </ul>
                                   <?php endif; ?>
                            <?php endwhile; ?>
                    <?php endif; ?>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                <?php $list_details_3 = get_field('list_details_3'); ?>
                <h4 class="title-3"><?php echo $list_details_3['title'] ?></h4>
                <?php
                    if ( ! have_rows( 'list_details_3' ) ) {
                        return false;
                    }
                    if ( have_rows( 'list_details_3' ) ) : ?>
                            <?php while ( have_rows( 'list_details_3' ) ) : the_row();
                                // Services Sub Repeater.
                                if ( have_rows( 'list' ) ) : ?>
                                <ul class="list">
                                       <?php
                                       while ( have_rows( 'list' ) ) : the_row();
                                           $item = get_sub_field( 'item' );
                                       ?>
                                        <li><?php echo esc_html( $item ); ?></li>
                                       <?php endwhile; ?> 
                                </ul>
                                   <?php endif; ?>
                            <?php endwhile; ?>
                    <?php endif; ?>
            </div>
        </div>
    </div>
</div>
</section>
<?php include 'testimonials.php'; ?>
<?php include 'social.php'; ?>
<?php get_footer(); ?>