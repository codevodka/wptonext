<section class="testimonial-area">
    <?php $testimonials = get_field('testimonials', 'option'); ?>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <p class="intro"><?php echo $testimonials['title'] ?></p>
                        <h2 class="title"><?php echo $testimonials['subtitle'] ?></h2>
                    </div>
                </div>
            </div>
            <div class="testimonial-carousel owl-carousel">
                <?php
                    if ( ! have_rows( 'testimonials', 'option' ) ) {
                        return false;
                    }
                    if ( have_rows( 'testimonials', 'option' ) ) : ?>
                            <?php while ( have_rows( 'testimonials', 'option' ) ) : the_row();
                                // Services Sub Repeater.
                                if ( have_rows( 'repeater' ) ) : ?>
                                        <?php
                                           while ( have_rows( 'repeater' ) ) : the_row();
                                           $image = get_sub_field( 'image' );
                                           $name = get_sub_field( 'name' );
                                           $location = get_sub_field( 'location' );
                                           $comment = get_sub_field( 'comment' );
                                        ?>
                                            <div class="single-testimonial">
                                                <div class="info">
                                                    <div class="img">
                                                        <img src="<?php echo esc_url( $image['url'] ); ?>" alt="<?php echo esc_html( $image['alt'] ); ?>">
                                                    </div>
                                                    <div class="info-right">
                                                        <h3 class="name"><?php echo esc_html( $name ); ?></h3>
                                                        <p class="desg"> <?php echo esc_html( $location ); ?></p>
                                                    </div>
                                                </div>
                                                <p class="text"><?php echo esc_html( $comment ); ?></p>
                                            </div>
                                       <?php endwhile; ?> 
                                   <?php endif; ?>
                            <?php endwhile; ?>
                    <?php endif; ?>
            </div>
        </div>
    </section>