<?php

/**

 * The template for displaying 404 pages (Not Found)

 *

 * @package WordPress

 * @subpackage Challenge

 * @since Aquastrike 1.0

 */

 ?>
<?php get_header(); ?>

<style>
    header {display: none;}
    footer { display: none; }
    body { height: 100vh; }
    .page-content { height: 100%; }
    .container{ height: 100%; }
    .row{ height: 100%; }
    .col-lg-12.col-md-12 { height: 100%; }
    .error-content {height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .link.btn-style-1 { margin-top: 40px; }

</style>

<div class="page-content">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                    <div class="error-content">
                        <h1 class="big-text">Error </h1>
                        <img src="<?php echo get_template_directory_uri(); ?>/img/404.gif" alt="">
                        <h3 class="medium-text">Oops! Page Not Found. </h3>
                        <a href="<?php echo get_home_url(); ?>" class="link btn-style-1">Go Home</a>
                    </div>       
            </div>
        </div>
    </div>
</div>



<?php get_footer(); ?>