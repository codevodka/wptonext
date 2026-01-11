'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Testimonials({ data }) {
    useEffect(() => {
        // Wait for jQuery and Owl Carousel to be fully loaded
        const initCarousel = () => {
            if (typeof window !== 'undefined' && window.jQuery && window.jQuery.fn.owlCarousel) {
                const $ = window.jQuery;

                // Destroy existing carousel if it exists
                if ($('.testimonial-carousel').hasClass('owl-loaded')) {
                    $('.testimonial-carousel').trigger('destroy.owl.carousel');
                    $('.testimonial-carousel').removeClass('owl-loaded owl-drag');
                }

                // Initialize carousel
                $('.testimonial-carousel').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: true,  // Enable navigation arrows
                    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],  // Custom arrow icons
                    dots: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: 1  // 1 item on mobile
                        },
                        768: {
                            items: 2  // 2 items on tablet and desktop
                        },
                        992: {
                            items: 2  // 2 items on large screens
                        }
                    }
                });
            }
        };

        // Delay initialization to ensure scripts are loaded
        const timer = setTimeout(initCarousel, 100);

        // Cleanup function
        return () => {
            clearTimeout(timer);
            if (typeof window !== 'undefined' && window.jQuery && window.jQuery.fn.owlCarousel) {
                const $ = window.jQuery;
                if ($('.testimonial-carousel').hasClass('owl-loaded')) {
                    $('.testimonial-carousel').trigger('destroy.owl.carousel');
                }
            }
        };
    }, [data]);

    // Don't render if no data
    if (!data || !data.repeater || data.repeater.length === 0) {
        return null;
    }

    return (
        <section className="testimonial-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <p className="intro">{data.title}</p>
                            <h2 className="title">{data.subtitle}</h2>
                        </div>
                    </div>
                </div>
                <div className="testimonial-carousel owl-carousel">
                    {data.repeater.map((testimonial, index) => (
                        <div key={index} className="single-testimonial">
                            <div className="info">
                                <div className="img">
                                    <img
                                        src={testimonial.image?.node?.mediaItemUrl}
                                        alt={testimonial.image?.node?.altText || testimonial.name}
                                    />
                                </div>
                                <div className="info-right">
                                    <h3 className="name">{testimonial.name}</h3>
                                    <p className="desg">{testimonial.location}</p>
                                </div>
                            </div>
                            <p className="text">{testimonial.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
