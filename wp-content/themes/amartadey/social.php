<section class="social-area">
    <div class="container">
        <?php $social_media = get_field('social_media', 'option'); ?>
        <div class="row">
            <div class="col-12">
                <div class="section-title">
                    <p class="intro"><?php $social_media['subtitle'] ?></p>
                    <h2 class="title"><?php $social_media['title'] ?></h2>
                </div>
            </div>
        </div>
        <div class="row">

                <?php
                    if ( ! have_rows( 'social_media', 'option' ) ) {
                        return false;
                    }

                    if ( have_rows( 'social_media', 'option' ) ) : ?>

                            <?php while ( have_rows( 'social_media', 'option' ) ) : the_row();

                                // Services Sub Repeater.
                                if ( have_rows( 'all_socials' ) ) : ?>
                                       <?php
                                       while ( have_rows( 'all_socials' ) ) : the_row();

                                           $link = get_sub_field( 'link' );
                                           $name = get_sub_field( 'name' );
                                           $subtite = get_sub_field( 'subtite' );
                                           $icon_class = get_sub_field( 'icon_class' );
                                       ?>

                                            
                                            <div class="col-lg-4 col-sm-6 col-12">
                                                <a href="<?php echo esc_html( $link ); ?>">
                                                    <div class="single-social">
                                                        <h3 class="title"><?php echo esc_html( $name ); ?></h3>
                                                        <p class="info"><?php echo esc_html( $subtite ); ?></p>
                                                        <span class="icon"><i class="<?php echo esc_html( $icon_class ); ?>"></i></span>
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