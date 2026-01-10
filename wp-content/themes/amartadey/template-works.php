<?php 
/*
*Template Name: My Works
*/
?>
<?php get_header(); ?>

<script>
	jQuery(document).ready(function() {
    jQuery('a.nav-link').click(function() {
        jQuery('a.nav-link.active').removeClass("active");
	        jQuery(this).addClass("active");
	    });
	});

	jQuery(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    jQuery('html, body').animate({
        scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top - 100
    }, 500);
});

</script>

<?php if (has_post_thumbnail( $post->ID ) ): ?>
<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
    <section class="iha-contact innerpage-hero-area" id="_iha" style="background: url('<?php echo $image[0]; ?>'); background-size: cover;">
<?php endif; ?>
	<div class="container">
	    <div class="row">
	        <div class="col-lg-6 col-12">
	            <div class="innerpage-hero-content">
                    <?php $header = get_field('header'); ?>
	                <h2 class="title"><?php echo $header['page_title'] ?></h2>
	                <p class="text"><?php echo $header['page_subtitle'] ?></p>
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
<section class="client-area">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-12" id="sticky">
                <div class="client-area-left-side">
                    <?php $all_works = get_field('all_works'); ?>
                    <div class="section-title">
                        <p class="intro"><?php echo $all_works['subtitle'] ?></p>
                        <h2 class="title"><?php echo $all_works['title'] ?></h2>
                    </div>
                    <ul class="nav nav-tabs" id="clientTab" role="tablist">
                        <?php
                        if ( ! have_rows( 'all_works' ) ) {
                            return false;
                        }
                        if ( have_rows( 'all_works' ) ) :$c = 1; ?>
                                <?php  while ( have_rows( 'all_works' ) ) : the_row(); 
                                    if ( have_rows( 'repeater' ) ) : ?>
                                    
                                           <?php
                                           while ( have_rows( 'repeater' ) ) : the_row();
                                               $id_for_tab = get_sub_field( 'id_for_tab' );
                                               $name = get_sub_field( 'name' ); 
                                           ?>
                                           
                                        <li class="nav-item">
                                            <a class="nav-link" id="<?php echo esc_html( $id_for_tab  ); ?>-id" href="#<?php echo esc_html( $id_for_tab  ); ?>" aria-selected="<?php echo $class; ?>"><?php echo esc_html( $name  ); ?><span class="icon"><i class="fas fa-caret-right"></i></span></a>
                                        </li>
                                           <?php $c++;endwhile; ?> 
                                    
                                       <?php  endif; ?>
                                <?php endwhile; ?>
                        <?php endif; ?>
                    </ul> 
                </div>
            </div>
            <div class="col-lg-9 col-md-8 col-12">
                <div class="client-area-right-side">
                    <div class="tab-content" id="clientTabContent">
                        <?php
                        if ( ! have_rows( 'all_works' ) ) {
                            return false;
                        }
                        if ( have_rows( 'all_works' ) ) :$c = 1; ?>
                                <?php while ( have_rows( 'all_works' ) ) : the_row();
                                    if ( have_rows( 'repeater' ) ) : ?>
                                           <?php
                                           while ( have_rows( 'repeater' ) ) : the_row();
                                               $id_for_tab = get_sub_field( 'id_for_tab' );
                                               $name = get_sub_field( 'name' ); 
                                               $images = get_sub_field('images');
                                               $portfolio_link_in_web_graphics_hub = get_sub_field('portfolio_link_in_web_graphics_hub'); ?>
                                           <?php $class="";if ($c == 1){ 
                                            $active = "show active";
                                           } else {
                                            $active = "";
                                           } ;?>
                                                <div id="<?php echo esc_html( $id_for_tab  ); ?>" class="scroll-box">
                                                    <div class="row">
                                                        <div class="col-lg-12 col-sm-12 col-12">
                                                            <div class="section-title">
                                                                <h2 class="title"><em style="color: #FFC576; font-style: normal;"><?php echo esc_html( $name  ); ?></em> portfolio</h2>
                                                                
                                                                <p>Click on the image to open the full design<?php if($id_for_tab == 'web-design'){?>
                                                                                            or click the button - <strong>VIEW WEBSITE</strong> to go to the website
                                                                                    <?php } ?>.</p>
                                                            </div>
                                                            <div class="row no-gutters" id="container">
                                                                <?php
                                                                if( $images ): ?>
                                                                        <?php foreach( $images as $image ): ?>
                                                                            <div class="col-lg-6 col-sm-6" data-category="post-transition">
                                                                                <div class="h2-single-project">
                                                                                    <div class="img"><img src="<?php echo $image['sizes']['thumbnail']; ?>" loading="lazy" title="<?php echo $image['title']; ?>" alt="<?php echo $image['alt']; ?>">             </div>
                                                                                    <a href="<?php echo $image['url']; ?>" class="link test-popup-link" target="_blank"><span class="button"><i class="fas fa-mouse-pointer"></i></span></a>
                                                                                    <div class="portfolio-details">
									                                                    <h5><?php echo $image['title']; ?></h5>
									                                                    <p><?php echo $image['caption']; ?></p>
									                                                </div>
                                                                                    <?php if($id_for_tab == 'web-design'){?>
                                                                                            <a href="<?php echo $image['description']; ?>" target="_blank" class="website-link">view Website</a>
                                                                                    <?php } ?>
                                                                                </div>
                                                                            </div>
                                                                        <?php endforeach; ?>
                                                                <?php endif; ?>
                                                            </div>
                                                            <div class="h2-about-content">
                                                                    <p class="text"></p>
                                                                </div>
                                                                <?php 
                                                                	if($portfolio_link_in_web_graphics_hub!=""){?>
                                                                		<div class="wgh">
	                                                                		<p>View More in Web Graphics Hub</p>
	                                                                		<a href="<?php echo esc_html( $portfolio_link_in_web_graphics_hub  ); ?>" class="link btn-style-1" target="_blank">Click Here</a>
                                                                		</div>
                                                                <?php 	}
                                                                 ?>
                                                                 
                                                                <div class="h2-about-content">
                                                                    <p class="text"></p>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                           <?php $c++;endwhile; ?> 
                                       <?php endif; ?>
                                <?php endwhile; ?>
                        <?php endif; ?>
                    </div>
                    <div id="stop"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'social.php'; ?>
<?php get_footer(); ?>