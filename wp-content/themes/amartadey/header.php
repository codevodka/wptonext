<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" <?php bloginfo('charset'); ?> />
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<title><?php wp_title('|', true, 'right'); ?></title>
<!-- <link rel="shortcut icon" href="<?php //echo get_option( 'amarta_favicon' ); ?>" /> -->

    <!-- <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/jquery-ui.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/all.min.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/owl.carousel.min.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/animate.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/stellarnav.min.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/magnific-popup.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/fonts/stylesheet.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/style.css"></link>
    <link href="<?php echo get_template_directory_uri(); ?>/css/responsive.css"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet"> -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PFCRGQ');</script>
<!-- End Google Tag Manager -->
<?php wp_head(); ?>
<link type="text/css" rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" />
</head>
<body <?php body_class(); ?>>
	<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PFCRGQ"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
	
    <!-- <div id="preloader"></div> -->
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-sm-5 col-5">
                    <div class="logo">
                        <?php the_custom_logo(); ?>
                    </div>
                </div>
                <div class="col-lg-10 col-sm-7 col-7">
                    <div class="main-menu stellarnav">
                        <?php
                            $defaults = array(
                                'theme_location'  => 'main-menu',
                                'menu'            => '',
                                'container'       => 'ul',
                                'container_class' => '',
                                'container_id'    => '',
                                'menu_class'      => '',
                                'menu_id'         => '',
                                'echo'            => true,
                                'fallback_cb'     => 'wp_page_menu',
                                'before'          => '',
                                'after'           => '',
                                'link_before'     => '',
                                'link_after'      => '',
                                'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                                'depth'           => 0,
                                'walker'          => ''
                            );
                            wp_nav_menu( $defaults );
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </header> 
    
    
    
