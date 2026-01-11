import Image from 'next/image'
import getServicePage from '@/lib/queries/getServicePage'
import getSinglePost from '@/lib/queries/getSinglePost'
import getWebsiteOptions from '@/lib/queries/getWebsiteOptions'
import Testimonials from '@/app/components/Testimonials'
import SocialMedia from '@/app/components/SocialMedia'

export default async function DynamicPage({ params }) {
    // Next.js 15: params is now a Promise and must be awaited
    const { slug } = await params

    // Try to fetch as service page first
    const [servicePage, options] = await Promise.all([
        getServicePage(`/${slug}/`),
        getWebsiteOptions()
    ])

    // If it's a service page, render service page layout
    if (servicePage && servicePage.contentTypeName === 'page') {
        return (
            <>
                {/* Service Page Hero Section */}
                <section
                    className="iha-contact innerpage-hero-area"
                    id="_iha"
                    style={{
                        background: servicePage.featuredImage?.node?.mediaItemUrl
                            ? `url('${servicePage.featuredImage.node.mediaItemUrl}')`
                            : '#1f2235',
                        backgroundSize: 'cover'
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="innerpage-hero-content">
                                    <h2 className="title">{servicePage.title}</h2>
                                    <p className="text">Take a look at {servicePage.title.toLowerCase()} services that I provide.</p>
                                </div>
                            </div>
                        </div>
                        <div className="scroll-icon">
                            <div className="container">
                                <div className="scroll-icon-box">
                                    <a href="#_iha" className="up smoothscroll">
                                        <img src="/img/contact/scroll-up.png" alt="" />
                                    </a>
                                    <span className="box">
                                        <img src="/img/contact/scroll-box.png" alt="" />
                                    </span>
                                    <span className="inner">
                                        <img src="/img/contact/scroll-inner.png" alt="" />
                                    </span>
                                    <a href="#_cfa" className="down smoothscroll">
                                        <img src="/img/contact/scroll-down.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Page Content */}
                <section className="single-blog-post-area">
                    <div className="container">
                        <div className="row">
                            <div className="sbpa-content">
                                <div dangerouslySetInnerHTML={{ __html: servicePage.content }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                {options?.testimonials && (
                    <Testimonials
                        title={options.testimonials.title}
                        subtitle={options.testimonials.subtitle}
                        testimonials={options.testimonials.testimonials}
                    />
                )}

                {/* Social Media Section */}
                {options?.socialMedia && (
                    <SocialMedia
                        title={options.socialMedia.title}
                        subtitle={options.socialMedia.subtitle}
                        socialLinks={options.socialMedia.socialMedia}
                    />
                )}
            </>
        )
    }

    // Try to fetch as blog post
    const post = await getSinglePost(slug)

    // If it's a blog post, render blog post layout
    if (post && post.contentTypeName === 'post') {
        return (
            <>
                {/* Blog Post Hero Section */}
                <section className="innerpage-hero-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 offset-lg-1 col-12">
                                <div className="innerpage-hero-content">
                                    <h2 className="title">{post.title}</h2>
                                    {post.blog?.bannerSubtitle && (
                                        <p className="text">{post.blog.bannerSubtitle}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Meta Information */}
                    <div className="iha-meta">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 offset-lg-1 col-12">
                                    <div className="iha-all-meta">
                                        <div className="iha-meta-box">
                                            <p className="title">PUBLISH DATE</p>
                                            <p className="info">
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {post.blog?.readTime && (
                                            <div className="iha-meta-box">
                                                <p className="title">READ TIME</p>
                                                <p className="info">{post.blog.readTime}</p>
                                            </div>
                                        )}
                                        <div className="iha-meta-box">
                                            <p className="title">SHARE</p>
                                            <p className="info">Facebook</p>
                                        </div>
                                        <div className="iha-meta-box">
                                            <p className="title"><span className="blank">d</span></p>
                                            <p className="info">Twitter</p>
                                        </div>
                                        <div className="iha-meta-box">
                                            <p className="title"><span className="blank">d</span></p>
                                            <p className="info">Linkedin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Post Content */}
                <section className="single-blog-post-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 col-12">
                                <div className="sbpa-content">
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    // Handle 404 - neither service page nor blog post found
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center" style={{ padding: '100px 0' }}>
                    <h1>Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
            </div>
        </div>
    )
}
