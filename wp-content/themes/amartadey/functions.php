<?php
function amarta_wp_title( $title, $sep ) {
	global $paged, $page;
	if ( is_feed() ) {
		return $title;
	}
	// Add the site name.
	$title .= get_bloginfo( 'name', 'display' );
	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}
	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'amarta' ), max( $paged, $page ) );
	}
	return $title;
}
add_filter( 'wp_title', 'amarta_wp_title', 10, 2 );
// Enable support for Post Thumbnails, and declare two sizes.
add_theme_support( 'post-thumbnails' );
// Active Class
add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);
function special_nav_class($classes, $item){
     if( in_array('current-menu-item', $classes) ){
             $classes[] = 'active ';
     }
     return $classes;
}
if ( function_exists('register_sidebar') )
    register_sidebar();
// This theme uses wp_nav_menu() in two locations.
register_nav_menus( array(
	'main-menu'	=> __( 'Main Menu', 'amarta' ),
    'footer-menu' => __( 'Footer Menu', 'amarta' )
) );
// Function for Wordpress File Upload Thickbox
function amartaFileUpload_admin_scripts() {
	//if (isset($_GET['page'])) {
		wp_enqueue_script('jquery');
		wp_enqueue_script('media-upload');
		wp_enqueue_script('thickbox');
		// wp_register_script('my-upload', get_template_directory_uri() . '/js/amartaFileUpload.js', array('jquery', 'media-upload', 'thickbox'));
		// wp_enqueue_script('my-upload');
	//}
}
 
function amartaFileUpload_admin_styles() {
	//if (isset($_GET['page'])) {
		wp_enqueue_style('thickbox');
	//}
}
add_action('admin_print_scripts', 'amartaFileUpload_admin_scripts');
add_action('admin_print_styles', 'amartaFileUpload_admin_styles');
// Set Website Logo for Admin Login Page
function amarta_wplogo() {
	echo '<style type="text/css">h1 a { background-image:url(' . get_bloginfo( 'template_directory' ) . '/img/amarta-dey-logo-dark.png) !important;background-size:100% auto !important;width:213px !important;height:29px !important; }</style>';
}
add_action('login_head', 'amarta_wplogo');
//Page Slug Body Class
  function add_slug_body_class( $classes ) {
 global $post;
 if ( isset( $post ) ) {
 $classes[] = $post->post_type . '-' . $post->post_name;
 }
return $classes;
 }
add_filter( 'body_class', 'add_slug_body_class' );
add_filter( 'wpcf7_use_really_simple_captcha', '__return_true' );
// Custom Functions
// Remove WP admin dashboard widgets
function isa_disable_dashboard_widgets() {
    
    remove_meta_box('dashboard_primary', 'dashboard', 'core');// Remove WordPress Events and News
}
add_action('admin_menu', 'isa_disable_dashboard_widgets');
// Admin footer modification
  
function remove_footer_admin () 
{
	echo "<style>@keyframes beatHeart{0%{transform:scale(1);}25% {transform:scale(0.9);}40%{transform:scale(1);}60% {transform: scale(0.9);}100%{transform: scale(1);}}</style>";
    echo '<span id="footer-thankyou">Made with <span style=" position: relative; top: 6px;"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MCA1MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiNDMDNBMkI7IiBkPSJNMjQuODUsMTAuMTI2YzIuMDE4LTQuNzgzLDYuNjI4LTguMTI1LDExLjk5LTguMTI1YzcuMjIzLDAsMTIuNDI1LDYuMTc5LDEzLjA3OSwxMy41NDMgIGMwLDAsMC4zNTMsMS44MjgtMC40MjQsNS4xMTljLTEuMDU4LDQuNDgyLTMuNTQ1LDguNDY0LTYuODk4LDExLjUwM0wyNC44NSw0OEw3LjQwMiwzMi4xNjVjLTMuMzUzLTMuMDM4LTUuODQtNy4wMjEtNi44OTgtMTEuNTAzICBjLTAuNzc3LTMuMjkxLTAuNDI0LTUuMTE5LTAuNDI0LTUuMTE5QzAuNzM0LDguMTc5LDUuOTM2LDIsMTMuMTU5LDJDMTguNTIyLDIsMjIuODMyLDUuMzQzLDI0Ljg1LDEwLjEyNnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0VENzE2MTsiIGQ9Ik02LDE4LjA3OGMtMC41NTMsMC0xLTAuNDQ3LTEtMWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwYzAuNTUzLDAsMSwwLjQ0NywxLDFzLTAuNDQ3LDEtMSwxICBjLTQuNDExLDAtOCwzLjU4OS04LDhDNywxNy42MzEsNi41NTMsMTguMDc4LDYsMTguMDc4eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" style="width: 20px; animation: .8s infinite beatHeart;" /></span> by <a href="https://webgraphicshub.com/" target="_blank">Web Graphics Hub</a></span>';
}
add_filter('admin_footer_text', 'remove_footer_admin');
// Hide Category and Tags from POST in admin
// function cattag_remove_metaboxes() {
//     remove_meta_box( 'categorydiv' , 'post' , 'normal' ); 
//     remove_meta_box( 'tagsdiv-post_tag' , 'post' , 'normal' ); 
// }
// add_action( 'admin_menu' , 'cattag_remove_metaboxes' );
// Remove WP logo from Admin Bar
function example_admin_bar_remove_logo() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu( 'wp-logo' );
}
add_action( 'wp_before_admin_bar_render', 'example_admin_bar_remove_logo', 0 );
// Custom CSS and JS 
function amarta_scripts_basic()
{
    // jQuery Min
    wp_register_script( 'jquery-min', get_template_directory_uri() . '/js/jquery-3.3.1.min.js', array(), false, true );
    wp_enqueue_script( 'jquery-min' );
    // Jquery UI
    wp_register_script( 'jquery_ui', get_template_directory_uri() . '/js/jquery-ui.js', array(), false, true );
    wp_enqueue_script( 'jquery_ui' );
    // Owl Carousel Min
    wp_register_script( 'owl_caousel_min', get_template_directory_uri() . '/js/owl.carousel.min.js', array(), false, true );
    wp_enqueue_script( 'owl_caousel_min' );
    // Jquery Counter
    wp_register_script( 'jquery_counterup', get_template_directory_uri() . '/js/jquery.counterup.min.js', array(), false, true );
    wp_enqueue_script( 'jquery_counterup' );
    // countdown
    wp_register_script( 'countdown', get_template_directory_uri() . '/js/countdown.js', array(), false, true );
    wp_enqueue_script( 'countdown' );
    // stellarnav
    wp_register_script( 'stellarnav', get_template_directory_uri() . '/js/stellarnav.min.js' , array(), false, true);
    wp_enqueue_script( 'stellarnav' );
    // image_loaded
    wp_register_script( 'image_loaded', get_template_directory_uri() . '/js/imagesloaded.pkgd.min.js', array(), false, true );
    wp_enqueue_script( 'image_loaded' );
    // isotope
    wp_register_script( 'isotope', get_template_directory_uri() . '/js/isotope.pkgd.min.js', array(), false, true );
    wp_enqueue_script( 'isotope' );
	// magnific_popup
	wp_register_script( 'magnific_popup', get_template_directory_uri() . '/js/jquery.magnific-popup.min.js', array(), false, true );
	wp_enqueue_script( 'magnific_popup' );
    // jquery_scrollup
    wp_register_script( 'jquery_scrollup', get_template_directory_uri() . '/js/jquery.scrollUp.js', array(), false, true );
    wp_enqueue_script( 'jquery_scrollup' );
    // jquery_waypoints
    wp_register_script( 'jquery_waypoints', get_template_directory_uri() . '/js/jquery.waypoints.min.js', array(), false, true );
    wp_enqueue_script( 'jquery_waypoints' );
    // popper
    wp_register_script( 'popper', get_template_directory_uri() . '/js/popper.min.js', array(), false, true );
    wp_enqueue_script( 'popper' );
 	// bootstrap
    wp_register_script( 'bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', array(), false, true );
    wp_enqueue_script( 'bootstrap' );
    // theme
    wp_register_script( 'theme', get_template_directory_uri() . '/js/theme.js', array(), false, true );
    wp_enqueue_script( 'theme' );
    
    /* ------------------ ALL CSS ------------------- */
    // bootstrap CSS
    wp_enqueue_style( 'bootstrap_css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css' );
    
    // jQuery UI  CSS
    wp_enqueue_style( 'jquery_ui_css', get_stylesheet_directory_uri() . '/css/jquery-ui.css' );
    // All CSS
    wp_enqueue_style( 'all_min_css', get_stylesheet_directory_uri() . '/css/all.min.css' );
    // Owl Carousel
    wp_enqueue_style( 'owl_carousel_min_css', get_stylesheet_directory_uri() . '/css/owl.carousel.min.css' );
    // Animate CSS
    wp_enqueue_style( 'animate_css', get_stylesheet_directory_uri() . '/css/animate.css' );
    // Steller Nav CSS
    wp_enqueue_style( 'steller_nav_css', get_stylesheet_directory_uri() . '/css/stellarnav.min.css' );
    // Magnify Popup CSS
    wp_enqueue_style( 'magnify_popup_css', get_stylesheet_directory_uri() . '/css/magnific-popup.css' );
    // Stylesheet-CSS 
    wp_enqueue_style( 'stylesheet_css', get_stylesheet_directory_uri() . '/fonts/stylesheet.css' );
    // Style  CSS
    wp_enqueue_style( 'style_css', get_stylesheet_directory_uri() . '/css/style.css' );
    // REsponsive  CSS
    wp_enqueue_style( 'responsive_css', get_stylesheet_directory_uri() . '/css/responsive.css' );
    wp_enqueue_style( 'google_Playfair_font', 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700' );
}
add_action( 'wp_enqueue_scripts', 'amarta_scripts_basic' );
// Register Logo 
function themename_custom_logo_setup() {
    $defaults = array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    );
    add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'themename_custom_logo_setup' );
if( function_exists('acf_add_options_page') ) {
    
    acf_add_options_page(array(
        'page_title'    => 'Amarta General Settings',
        'menu_title'    => 'Amarta Settings',
        'menu_slug'     => 'theme-general-settings',
        'capability'    => 'edit_posts',
        'icon_url'      => 'dashicons-universal-access-alt',
        'post_id'       => 'options',
        'update_button' => __('Update', 'acf'),
        'updated_message' => __("Options Updated", 'acf'),
        'position'       => '2.5',
        'redirect'      => false
    ));    
}
// Pagination 
function pagination_bar( $custom_query ) {
    $total_pages = $custom_query->max_num_pages;
    $big = 999999999; // need an unlikely integer
    if ($total_pages > 1){
        $current_page = max(1, get_query_var('paged'));
        echo paginate_links(array(
            'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
            'format' => '?paged=%#%',
            'current' => $current_page,
            'total' => $total_pages,
            'prev_text' => '<span class="prev-next"><</span>',
            'next_text' => '<span class="prev-next">></span>'
        ));
    }
}
// Wp Discuz
function my_wpdiscuz_shortcode() {
    $html = "";
    if (file_exists(ABSPATH . "wp-content/plugins/wpdiscuz/themes/default/comment-form.php")) {
        ob_start();
        include_once ABSPATH . "wp-content/plugins/wpdiscuz/themes/default/comment-form.php";
        $html = ob_get_clean();
    }
    return $html;
}
add_shortcode("wpdiscuz_comments", "my_wpdiscuz_shortcode");
/**
 * This shortcode will allow you to create a snapshot of a remote website and post it
 * on your WordPress site.
 *
 * [snapshot url="http://www.wordpress.org" alt="WordPress.org" width="400" height="300"]
 */
add_shortcode( 'snapshot', function ( $atts ) {
    $atts = shortcode_atts( array(
        'alt'    => '',
        'url'    => 'http://www.wordpress.org',
        'width'  => '1366',
        'height' => '729'
    ), $atts );
    $params = array(
        'w' => $atts['width'],
        'h' => $atts['height'],
    );
    $url = urlencode( $atts['url'] );
    $src = 'http://s.wordpress.com/mshots/v1/' . $url . '?' . http_build_query( $params, null, '&' );
    $cache_key = 'snapshot_' . md5( $src );
    $data_uri = get_transient( $cache_key );
    if ( ! $data_uri ) {
        $response = wp_remote_get( $src );
        if ( 200 === wp_remote_retrieve_response_code( $response ) ) {
            $image_data = wp_remote_retrieve_body( $response );
            if ( $image_data && is_string( $image_data ) ) {
                $src = $data_uri = 'data:image/jpeg;base64,' . base64_encode( $image_data );
                set_transient( $cache_key, $data_uri, DAY_IN_SECONDS );
            }
        }
    }
    return '<img src="' . esc_attr( $src ) . '" alt="' . esc_attr( $atts['alt'] ) . '"/>';
} );
/**
 * Remove Rankmath notice
 *
 */
add_filter( 'rank_math/frontend/remove_credit_notice', '__return_true' );



/**
 * Expose Custom Logo via WPGraphQL
 */
add_action( 'graphql_register_types', function() {
    register_graphql_field( 'RootQuery', 'siteLogo', [
        'type' => 'String',
        'description' => __( 'The site logo URL', 'your-textdomain' ),
        'resolve' => function() {
            $custom_logo_id = get_theme_mod( 'custom_logo' );
            if ( $custom_logo_id ) {
                $logo_url = wp_get_attachment_image_url( $custom_logo_id, 'full' );
                return $logo_url;
            }
            return null;
        }
    ] );
} );
