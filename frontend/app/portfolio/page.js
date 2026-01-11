import getPortfolioPage from '@/lib/queries/getPortfolioPage'
import getWebsiteOptions from '@/lib/queries/getWebsiteOptions'
import Image from 'next/image'
import SocialMedia from '../components/SocialMedia'

export const metadata = {
    title: 'Portfolio | Amarta Dey',
    description: 'Please Check out my Portfolio of Website Design, Flyer Design, Social Media Post Design, Logo Design, Banner Design and Many More...',
}

export default async function Portfolio() {
    const [portfolioPage, options] = await Promise.all([
        getPortfolioPage(),
        getWebsiteOptions()
    ])

    if (!portfolioPage) {
        return <div>Portfolio page not found</div>
    }

    const { featuredImage, worksPage } = portfolioPage
    const { header, allWorks } = worksPage || {}

    return (
        <>
            {/* Hero Section */}
            <section
                className="iha-contact innerpage-hero-area"
                id="_iha"
                style={{
                    background: `url('${featuredImage?.node?.mediaItemUrl}')`,
                    backgroundSize: 'cover'
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="innerpage-hero-content">
                                {header?.pageTitle && (
                                    <h2 className="title">{header.pageTitle}</h2>
                                )}
                                {header?.pageSubtitle && (
                                    <p className="text">{header.pageSubtitle}</p>
                                )}
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

            {/* Portfolio Section */}
            <section className="client-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12" id="sticky">
                            <div className="client-area-left-side">
                                {allWorks?.subtitle && (
                                    <div className="section-title">
                                        <p
                                            className="intro"
                                            dangerouslySetInnerHTML={{ __html: allWorks.subtitle }}
                                        />
                                        {allWorks?.title && (
                                            <h2
                                                className="title"
                                                dangerouslySetInnerHTML={{ __html: allWorks.title }}
                                            />
                                        )}
                                    </div>
                                )}
                                <ul className="nav nav-tabs" id="clientTab" role="tablist">
                                    {allWorks?.repeater?.map((category, index) => (
                                        <li className="nav-item" key={category.idForTab}>
                                            <a
                                                className={`nav-link ${index === 0 ? 'active' : ''}`}
                                                id={`${category.idForTab}-id`}
                                                href={`#${category.idForTab}`}
                                                aria-selected={index === 0}
                                            >
                                                {category.name}
                                                <span className="icon">
                                                    <i className="fas fa-caret-right"></i>
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="client-area-right-side">
                                <div className="tab-content" id="clientTabContent">
                                    {allWorks?.repeater?.map((category) => (
                                        <div
                                            id={category.idForTab}
                                            className="scroll-box"
                                            key={category.idForTab}
                                        >
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12 col-12">
                                                    <div className="section-title">
                                                        <h2 className="title">
                                                            <em style={{ color: '#FFC576', fontStyle: 'normal' }}>
                                                                {category.name}
                                                            </em> portfolio
                                                        </h2>
                                                        <p>Click on the image to open the full design{category.idForTab === 'web-design' ? ' or click the button - ' : '.'}{category.idForTab === 'web-design' && <strong>VIEW WEBSITE</strong>}{category.idForTab === 'web-design' && ' to go to the website.'}</p>
                                                    </div>

                                                    <div className="row no-gutters" id="container">
                                                        {category.images?.nodes?.map((image, imgIndex) => (
                                                            <div
                                                                className="col-lg-6 col-sm-6"
                                                                data-category="post-transition"
                                                                key={imgIndex}
                                                            >
                                                                <div className="h2-single-project">
                                                                    <div className="img">
                                                                        <Image
                                                                            src={image.mediaItemUrl}
                                                                            alt={image.altText || category.name}
                                                                            width={370}
                                                                            height={277}
                                                                            loading="lazy"
                                                                            title={image.title || category.name}
                                                                        />
                                                                    </div>
                                                                    <a
                                                                        href={image.mediaItemUrl}
                                                                        className="link test-popup-link"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <span className="button">
                                                                            <i className="fas fa-mouse-pointer"></i>
                                                                        </span>
                                                                    </a>
                                                                    <div className="portfolio-details">
                                                                        <h5>{image.title || image.altText}</h5>
                                                                        <p>{image.altText}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="h2-about-content">
                                                        <p className="text"></p>
                                                    </div>

                                                    {category.portfolioLinkInWebGraphicsHub && (
                                                        <div className="wgh">
                                                            <p>View More in Web Graphics Hub</p>
                                                            <a
                                                                href={category.portfolioLinkInWebGraphicsHub}
                                                                className="link btn-style-1"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Click Here
                                                            </a>
                                                        </div>
                                                    )}

                                                    <div className="h2-about-content">
                                                        <p className="text"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div id="stop"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            {options?.socialMedia && (
                <SocialMedia socialMedia={options.socialMedia} />
            )}
        </>
    )
}
