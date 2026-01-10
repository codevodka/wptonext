    <footer style="    z-index: 99; position: relative; margin-bottom: -36px;">
        <div class="container">
            <div class="footer-top-area">
                <div class="row">
                    <div class="col-lg-4 col-sm-5">
                        <div class="f-logo">
                            <?php the_custom_logo(); ?>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-7">
                        <div class="f-title text-center">
                            <h2 class="title"><?php the_field('footer_text', 'option'); ?></h2>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-7">
                        <div class="text-right">
                            <!-- <a href="#bsd-home" class="birdseed-link link btn-style-1">LET’S CHAT</a> -->
                            <a href="https://amartadey.com/enquiry/" class="link btn-style-1">ENQUIRY</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom-area">
                <div class="footer-links">
                    <?php
                            $defaults = array(
                                'theme_location'  => 'footer-menu',
                                'menu'            => '',
                                'container'       => 'ul',
                                'container_class' => '',
                                'container_id'    => '',
                                'menu_class'      => 'links',
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
                <div class="footer-copyright">
                    <p class="copyright">© <?php echo date("Y"); ?> Amarta Dey | All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer> 
<?php wp_footer(); ?>
</body>
</html>