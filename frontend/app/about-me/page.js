import getAboutPage from '@/lib/queries/getAboutPage'
import getWebsiteOptions from '@/lib/queries/getWebsiteOptions'
import Link from 'next/link'
import Image from 'next/image'
import Testimonials from '../components/Testimonials'
import SocialMedia from '../components/SocialMedia'

// Helper function to sanitize WordPress HTML content
const sanitizeHtml = (html) => {
    if (!html) return ''
    return html
        .trim()
        .replace(/\r\n/g, '\n')
        .replace(/\n+/g, '\n')
}

export default async function AboutMePage() {
    // Fetch page data and website options from WordPress
    const [page, websiteOptions] = await Promise.all([
        getAboutPage(),
        getWebsiteOptions()
    ])

    if (!page) {
        return <div>Page not found</div>
    }

    // Extract ACF fields
    const aboutPage = page.aboutPage || {}

    return (
        <>
            {/* Hero Section */}
            <section
                className="iha-contact innerpage-hero-area"
                id="_iha"
                style={{
                    background: page.featuredImage?.node?.mediaItemUrl
                        ? `url('${page.featuredImage.node.mediaItemUrl}')`
                        : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="innerpage-hero-content">
                                <h2 className="title">{aboutPage.pageTitle}</h2>
                                <p className="text">{aboutPage.pageSubtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-icon">
                        <div className="container">
                            <div className="scroll-icon-box">
                                <a href="#_iha" className="up smoothscroll"><img src="/img/contact/scroll-up.png" alt="" /></a>
                                <span className="box"><img src="/img/contact/scroll-box.png" alt="" /></span>
                                <span className="inner"><img src="/img/contact/scroll-inner.png" alt="" /></span>
                                <a href="#about-section" className="down smoothscroll"><img src="/img/contact/scroll-down.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="info-tab-area" id="about-section">
                <div className="tab-bg-element"><img src="/img/home1/tab-bg-elements.png" alt="" /></div>
                <div className="container">
                    <div className="info-tab">
                        <div className="tab-content">
                            <div className="tab-pane fade active show">
                                <div className="content-about">
                                    <div className="row">
                                        <div className="col-lg-6 col-12">
                                            {aboutPage.aboutMe?.image?.node && (
                                                <div className="banner">
                                                    <Image
                                                        src={aboutPage.aboutMe.image.node.mediaItemUrl}
                                                        alt={aboutPage.aboutMe.image.node.altText || 'About Me'}
                                                        width={aboutPage.aboutMe.image.node.mediaDetails?.width || 600}
                                                        height={aboutPage.aboutMe.image.node.mediaDetails?.height || 600}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div className="content">
                                                <p className="intro">{aboutPage.aboutMe?.subtitle}</p>
                                                <h2 className="title">{aboutPage.aboutMe?.title}</h2>
                                                {aboutPage.aboutMe?.text && (
                                                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(aboutPage.aboutMe.text) }}></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* First Block - Outstanding Quality */}
            <section className="page-single-service-area">
                <div className="container">
                    <div className="page-single-service">
                        <h2 className="title">{aboutPage.firstBlock?.title}</h2>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <p className="text">{aboutPage.firstBlock?.text1}</p>
                            </div>
                            <div className="col-lg-6 col-12">
                                <p className="text">{aboutPage.firstBlock?.text2}</p>
                            </div>
                        </div>

                        {/* Image and Text Section */}
                        <div className="row mb-5">
                            <div className="col-lg-6 col-md-12 col-12">
                                {aboutPage.imageText?.image?.node && (
                                    <div className="img">
                                        <Image
                                            src={aboutPage.imageText.image.node.mediaItemUrl}
                                            alt={aboutPage.imageText.image.node.altText || 'Creative Process'}
                                            width={aboutPage.imageText.image.node.mediaDetails?.width || 600}
                                            height={aboutPage.imageText.image.node.mediaDetails?.height || 600}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-12 col-12">
                                <h3 className="title-2">{aboutPage.imageText?.title}</h3>
                                {aboutPage.imageText?.text && (
                                    <p className="text" dangerouslySetInnerHTML={{ __html: sanitizeHtml(aboutPage.imageText.text) }}></p>
                                )}
                                <h4 className="title-3">{aboutPage.imageText?.listTitle}</h4>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                        <ul className="list">
                                            {aboutPage.imageText?.listItemsLeft?.map((item, index) => (
                                                <li key={index}>{item.item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                        <ul className="list">
                                            {aboutPage.imageText?.listItemsRight?.map((item, index) => (
                                                <li key={index}>{item.item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Three Images Row */}
                        <div className="row mb-5">
                            <div className="col-lg-6 col-md-6 col-12">
                                {aboutPage.allImages?.image1?.node && (
                                    <div className="img mb-5">
                                        <Image
                                            src={aboutPage.allImages.image1.node.mediaItemUrl}
                                            alt={aboutPage.allImages.image1.node.altText || 'Image 1'}
                                            width={aboutPage.allImages.image1.node.mediaDetails?.width || 400}
                                            height={aboutPage.allImages.image1.node.mediaDetails?.height || 400}
                                        />
                                    </div>
                                )}
                                {aboutPage.allImages?.image2?.node && (
                                    <div className="img mb-5">
                                        <Image
                                            src={aboutPage.allImages.image2.node.mediaItemUrl}
                                            alt={aboutPage.allImages.image2.node.altText || 'Image 2'}
                                            width={aboutPage.allImages.image2.node.mediaDetails?.width || 400}
                                            height={aboutPage.allImages.image2.node.mediaDetails?.height || 400}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-lg-6 col-md-6 col-12">
                                {aboutPage.allImages?.image3?.node && (
                                    <div className="img">
                                        <Image
                                            src={aboutPage.allImages.image3.node.mediaItemUrl}
                                            alt={aboutPage.allImages.image3.node.altText || 'Image 3'}
                                            width={aboutPage.allImages.image3.node.mediaDetails?.width || 400}
                                            height={aboutPage.allImages.image3.node.mediaDetails?.height || 400}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Three Lists Row */}
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <h4 className="title-3">{aboutPage.listDetails1?.title}</h4>
                                <ul className="list">
                                    {aboutPage.listDetails1?.list?.map((item, index) => (
                                        <li key={index}>{item.item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <h4 className="title-3">{aboutPage.listDetails2?.title}</h4>
                                <ul className="list">
                                    {aboutPage.listDetails2?.list?.map((item, index) => (
                                        <li key={index}>{item.item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <h4 className="title-3">{aboutPage.listDetails3?.title}</h4>
                                <ul className="list">
                                    {aboutPage.listDetails3?.list?.map((item, index) => (
                                        <li key={index}>{item.item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            {websiteOptions?.testimonials && (
                <Testimonials data={websiteOptions.testimonials} />
            )}

            {/* Social Media Section */}
            {websiteOptions?.socialMedia && (
                <SocialMedia data={websiteOptions.socialMedia} />
            )}
        </>
    )
}
