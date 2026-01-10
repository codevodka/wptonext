<?php 
/*
*Template Name: Home Page
*/
?>
<?php get_header(); ?>
<section class="hero-area" id="hero-banner">
        <div class="hero-element-1"><img src="https://amartadey.com/wp-content/uploads/2020/10/hero-element-1.png" alt="Background Image" loading="lazy"></div>
        <div class="hero-element-2"><img src="https://amartadey.com/wp-content/uploads/2020/10/hero-element-2.png" alt="Background Image" loading="lazy"></div>
        <div class="hero-element-3"><img src="https://amartadey.com/wp-content/uploads/2020/10/hero-element-3.png" alt="Background Image" loading="lazy"></div>
        <div class="hero-element-4"><img src="https://amartadey.com/wp-content/uploads/2020/10/hero-element-4.png" alt="Background Image" loading="lazy"></div>
        <div class="hero-banner">
            <?php the_post_thumbnail(); ?>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-12">
                    <div class="hero-content">
                        <?php $header = get_field('header'); ?>
                        <h3 class="intro"><?php echo $header['header_subtitle']; ?></h3>
                        <h1 class="title"><?php echo $header['header_title']; ?></h1>
                        <h3 class="desg"><?php echo $header['header_text']; ?></h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script>
        window.addEventListener("load", function(){
          setTimeout(()=>{
             document.getElementById("hero-banner").style.zIndex = 1; 
          }, 1000);
          
        });
    </script> 
   
    <section class="h2-about-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-12 d-flex align-items-center">
                    <div class="h2-about-content">
                        <div class="section-title">
                            <?php $about_me = get_field('about_me'); ?>
                            <p class="intro"><?php echo $about_me['subtitle']; ?></p>
                            <h2 class="title"><?php echo $about_me['title']; ?></h2>
                        </div>
                        <p class="text">
                             <?php 
                                if ( have_posts() ) {
                                    while ( have_posts() ) {
                                        the_post(); 
                                        the_content();
                                    }
                                }
                            ?>
                        </p>
                        <a href="<?php echo $about_me['button_link']; ?>" class="link btn-style-1"><?php echo $about_me['button_text']; ?></a>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="h2-about-banner">
                        <div class="img">
                            
							<img src="<?php echo $about_me['image']['url']; ?>" title="<?php echo $about_me['image']['title']; ?>" alt="<?php echo $about_me['image']['alt']; ?>" loading="lazy">
                            <a class="popup-youtube btn-ripple-out" href="<?php echo $about_me['youtube_link']; ?>"><i class="fas fa-play-circle"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="h2-project-area">
        <div class="container">
            <div class="row">
                <?php $service = get_field('service'); ?>
                <div class="col-lg-5 col-12">
                    <div class="section-title">
                        <p class="intro"><?php echo $service['service_subtitle']; ?></p>
                        <h2 class="title"><?php echo $service['title']; ?></h2>
                        <p class="text"><?php echo $service['text']; ?></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <?php
                if ( have_rows( 'service' ) ) : ?>
                        <?php while ( have_rows( 'service' ) ) : the_row();
                            if ( have_rows( 'repeater' ) ) : ?>
                                <?php
                                   while ( have_rows( 'repeater' ) ) : the_row();
                                       $icon = get_sub_field( 'icon' );
                                       $title = get_sub_field( 'title' );
                                       $text = get_sub_field( 'text' );
                                       $link = get_sub_field( 'link' );


                                   ?>
                                <div class="col-lg-4 col-sm-6 col-12">
                                    <a href="<?php echo esc_html( $link ); ?>" class="h2-single-service">
                                        <div class="icon-box">
                                            <span class="icon">
                                                <img src="<?php echo esc_url( $icon['url'] ); ?>" alt="<?php echo esc_html( $title ); ?> Services icon" loading="lazy">
                                            </span>
                                        </div>
                                        <div class="content">
                                            <h4 class="title"><?php echo esc_html( $title ); ?></h4>
                                            <p class="text"><?php echo esc_html( $text ); ?></p>
                                        </div>
                                    </a>
                                </div>
                                     <?php endwhile; ?>
                               <?php endif; ?>
                        <?php endwhile; ?>
                <?php endif; ?>          
            </div>
        </div>
    </section>
    <section class="h2-counter-area" style="background: #313552">
        <div class="container">
            <div class="row">
                <?php $counter = get_field('counter'); ?>
                <div class="col-lg-3 col-sm-6 col-12">
                    <div class="h2-single-counter">
                        <h2 class="counter counter-up" data-counterup-time="1500" data-counterup-delay="30"><?php echo $counter['counter_number_1'] ?></h2>
                        <p class="text"><?php echo $counter['counter_text_1'] ?></p>
                        <span class="icon"><i class="far fa-code"></i></span>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                    <div class="h2-single-counter">
                        <h2 class="counter counter-up" data-counterup-time="1500" data-counterup-delay="30"><?php echo $counter['counter_number_2'] ?></h2>
                        <p class="text"><?php echo $counter['counter_text_2'] ?></p>
                        <span class="icon"><i class="far fa-check-circle"></i></span>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                    <div class="h2-single-counter">
                        <h2 class="counter counter-up" data-counterup-time="1500" data-counterup-delay="30"><?php echo $counter['counter_number_3'] ?></h2>
                        <p class="text"><?php echo $counter['counter_text_3'] ?></p>
                        <span class="icon"><i class="far fa-coffee"></i></span>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                    <div class="h2-single-counter">
                        <h2 class="counter counter-up" data-counterup-time="1500" data-counterup-delay="30"><?php echo $counter['counter_number_4'] ?></h2>
                        <p class="text"><?php echo $counter['counter_text_4'] ?></p>
                        <span class="icon"><i class="far fa-meh"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="h2-service-area" id="portfolio-galr">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <?php $recent_works = get_field('recent_works'); ?>
                    <div class="section-title">
                        <p class="intro"><?php echo $recent_works['subtitle']; ?></p>
                        <h2 class="title"><?php echo $recent_works['title']; ?></h2>
                    </div>
                </div>
            </div>
            <div class="row no-gutters grid_container" id="container">
                    <?php
                    if ( ! have_rows( 'recent_works' ) ) {
                        return false;
                    }
                    if ( have_rows( 'recent_works' ) ) : ?>
                            <?php while ( have_rows( 'recent_works' ) ) : the_row();
                                // Services Sub Repeater.
                                if ( have_rows( 'gallery' ) ) : ?>
                                       <?php
                                       while ( have_rows( 'gallery' ) ) : the_row();
                                           $main_image = get_sub_field( 'main_image' );
                                           $image_thumbnail = get_sub_field( 'image_thumbnail' );
                                           $website_name = get_sub_field( 'website_name' );
                                           $website_description = get_sub_field( 'website_description' );
                                           $website_link = get_sub_field( 'website_link' );

                                       ?>
                                        <div class="col-lg-6 col-sm-6 gallery-box grid" data-category="post-transition" style="position: absolute; left: 0%; top: 0px;">
                                            <div class="h2-single-project">
                                                <div class="img">
                                                    <img src="<?php echo $image_thumbnail['url']; ?>" title="<?php echo $image_thumbnail['title']; ?>" alt="<?php echo $image_thumbnail['alt']; ?>" loading="lazy">
                                                </div>
                                                <a href="<?php echo $main_image; ?>" class="link test-popup-link" target="_blank"><span class="button"><i class="fas fa-mouse-pointer"></i></span></a>
                                                <div class="portfolio-details">
                                                    <h5><?php echo $website_name; ?></h5>
                                                    <p><?php echo $website_description; ?></p>
                                                </div>
                                                <a href="<?php echo $website_link ; ?>" target="_blank" class="website-link">view Website</a>
                                            </div>
                                        </div>
                                       <?php endwhile; ?> 
                                   <?php endif; ?>
                            <?php endwhile; ?>
                    <?php endif; ?>
            </div>
            <div class="text-center all-projects-button">
                <a href="<?php echo $recent_works['button_link']; ?>" class="link btn-style-1"><?php echo $recent_works['button_text']; ?></a>
            </div>
        </div>
    </section>
    <!-- <script>
        window.addEventListener("load", function(){
          document.getElementById("portfolio-galr").style.display = "block";
        });
    </script>    -->
    
    <section class="client-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-12">
                    <div class="client-area-left-side">
                    	<?php $clients = get_field('clients'); ?>
                        <div class="section-title">
                            <p class="intro"><?php echo $clients['subtitle'] ?></p>
                            <h2 class="title"><?php echo $clients['title'] ?></h2>
                        </div>
                        <ul class="nav nav-tabs" id="clientTab" role="tablist">
                        	<?php
							if ( ! have_rows( 'clients' ) ) {
							    return false;
							}
							if ( have_rows( 'clients' ) ) :$c = 1; ?>
							        <?php  while ( have_rows( 'clients' ) ) : the_row(); 
							            if ( have_rows( 'repeater' ) ) : ?>
							            
							                   <?php
							                   while ( have_rows( 'repeater' ) ) : the_row();
							                       $id_for_tab = get_sub_field( 'id_for_tab' );
							                       $name = get_sub_field( 'name' ); 
							                   ?>
							                   <?php $class="";if ($c == 1){ 
							                   	$class="true";
							                   	$active = "active";
							                   } else {
							                   	$class="false";
							                   	$active = "";
							                   } ;?>
							                <li class="nav-item">
				                                <a class="nav-link <?php echo $active; ?>" id="<?php echo esc_html( $id_for_tab  ); ?>-id" data-toggle="tab" href="#<?php echo esc_html( $id_for_tab  ); ?>" role="tab" aria-controls="<?php echo esc_html( $id_for_tab  ); ?>" aria-selected="<?php echo $class; ?>"><?php echo esc_html( $name  ); ?><span class="icon"><i class="fas fa-caret-right"></i></span></a>
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
							if ( ! have_rows( 'clients' ) ) {
							    return false;
							}
							if ( have_rows( 'clients' ) ) :$c = 1; ?>
							        <?php while ( have_rows( 'clients' ) ) : the_row();
							            if ( have_rows( 'repeater' ) ) : ?>
							                   <?php
							                   while ( have_rows( 'repeater' ) ) : the_row();
							                       $id_for_tab = get_sub_field( 'id_for_tab' );
							                       $name = get_sub_field( 'name' ); 
							                       $images = get_sub_field('images');?>
							                   <?php $class="";if ($c == 1){ 
							                   	$active = "show active";
							                   } else {
							                   	$active = "";
							                   } ;?>
									                <div class="tab-pane fade <?php echo $active; ?>" id="<?php echo esc_html( $id_for_tab  ); ?>" role="tabpanel" aria-labelledby="<?php echo esc_html( $id_for_tab  ); ?>-tab">
						                                <div class="row">
															<?php
															if( $images ): ?>
														            <?php foreach( $images as $image ): ?>
														                <div class="col-lg-4 col-sm-6 col-12">
									                                        <div class="single-client">
									                                            <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" loading="lazy"/>
									                                        </div>
									                                    </div>
														            <?php endforeach; ?>
														    <?php endif; ?>
						                                </div>
						                            </div>
							                   <?php $c++;endwhile; ?> 
							               <?php endif; ?>
							        <?php endwhile; ?>
							<?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    
    <?php include 'testimonials.php'; ?>
    <?php include 'social.php'; ?>
	 
<?php get_footer(); ?>