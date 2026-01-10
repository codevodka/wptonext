<?php 
/*
*Template Name: Contact Page
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
                    <?php $headers = get_field('header'); ?>
	                <h2 class="title"><?php echo $headers['page_title'] ?></h2>
	                <p class="text"><?php echo $headers['page_subtitle'] ?></p>
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
<section class="contact-form-area" id="_cfa">
        <div class="container">
                <div class="contact-form">
                    <div class="row">
                        <div class="col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1">
                            <div class="row">
                                <div class="col-12">
                                    <div class="section-title">
                                        <?php $contact_form = get_field('contact_form'); ?>
                                        <p class="intro"><?php echo $contact_form['subtitle']; ?></p>
                                        <h2 class="title"><?php echo $contact_form['title']; ?></h2>
                                        <p class="text"><?php echo $contact_form['text']; ?></p>
                                    </div>
                                </div>
                            </div>
                                <?php echo do_shortcode('[contact-form-7 id="298" title="Contact Page"]'); ?>
                        </div>
                    </div>
                </div>
        </div>
    </section>
    <section class="contact-address-area">
        <div class="container">
            <div class="row justify-content-center">             
                <?php
                    if ( have_rows( 'contact_information' ) ) : ?>
                        <?php while ( have_rows( 'contact_information' ) ) : the_row();
                            if ( have_rows( 'all_email' ) ) : ?>
                                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div class="single-contact-address">
                                            <h6 class="title"><span class="icon"><i class="fas fa-envelope"></i></span> EMAIL:</h6>
                                            <ul class="info">
                                                <?php
                                                   while ( have_rows( 'all_email' ) ) : the_row();
                                                       $email = get_sub_field( 'email' );
                                                   ?>
                                                    <li><a href="mailto:<?php echo esc_html( $email ); ?>"><?php echo esc_html( $email ); ?></a></li>
                                                <?php endwhile; ?>
                                            </ul>
                                        </div>
                                    </div>
                               <?php endif; ?>
                        <?php endwhile; ?>
                <?php endif; ?>
                <?php
                    if ( have_rows( 'contact_information' ) ) : ?>
                        <?php while ( have_rows( 'contact_information' ) ) : the_row();
                            if ( have_rows( 'all_phone_number' ) ) : ?>
                                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div class="single-contact-address">
                                            <h6 class="title"><span class="icon"><i class="fas fa-phone"></i></span> PHONE:</h6>
                                            <ul class="info">
                                                <?php
                                                   while ( have_rows( 'all_phone_number' ) ) : the_row();
                                                       $phone_number = get_sub_field( 'phone_number' );
                                                   ?>
                                                    <li><?php echo esc_html( $phone_number ); ?></li>
                                                <?php endwhile; ?>
                                            </ul>
                                        </div>
                                    </div>
                               <?php endif; ?>
                        <?php endwhile; ?>
                <?php endif; ?> 
                <?php
                    if ( have_rows( 'contact_information' ) ) : ?>
                        <?php while ( have_rows( 'contact_information' ) ) : the_row();
                            if ( have_rows( 'address' ) ) : ?>
                                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div class="single-contact-address">
                                            <h6 class="title"><span class="icon"><i class="fas fa-map-marker-alt"></i></span> ADDRESS:</h6>
                                            <ul class="info">
                                                <?php
                                                   while ( have_rows( 'address' ) ) : the_row();
                                                       $address_line = get_sub_field( 'address_line' );
                                                   ?>
                                                    <li><?php echo esc_html( $address_line ); ?></li>
                                                <?php endwhile; ?>
                                            </ul>
                                        </div>
                                    </div>
                               <?php endif; ?>
                        <?php endwhile; ?>
                <?php endif; ?>      
            </div>
        </div>
    </section>
<?php include 'testimonials.php'; ?>
<?php include 'social.php'; ?>
<?php get_footer(); ?>