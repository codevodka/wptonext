import ContactForm from '@/app/components/ContactForm'
import getWebsiteOptions from '@/lib/queries/getWebsiteOptions'
import getContactPage from '@/lib/queries/getContactPage'
import SocialMedia from '@/app/components/SocialMedia'

export default async function EnquiryPage() {
    // Fetch contact page data and website options
    const [contactPage, options] = await Promise.all([
        getContactPage(),
        getWebsiteOptions()
    ])

    const header = contactPage?.contactPage?.header
    const formContent = contactPage?.contactPage?.contactForm
    const contactInfo = contactPage?.contactPage?.contactInformation

    return (
        <>
            {/* Hero Section */}
            <section className="iha-contact innerpage-hero-area" id="_iha">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="innerpage-hero-content">
                                <h2 className="title">
                                    {header?.pageTitle || 'Get an estimate'}
                                </h2>
                                <p className="text">
                                    {header?.pageSubtitle || 'Fill out this simple form. Our team will contact you promptly to discuss next steps.'}
                                </p>
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

            {/* Contact Form Section */}
            <section className="contact-form-area" id="_cfa">
                <div className="container">
                    <ContactForm
                        subtitle={formContent?.subtitle}
                        title={formContent?.title}
                        text={formContent?.text}
                    />
                </div>
            </section>

            {/* Contact Address Section */}
            <section className="contact-address-area">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* Email */}
                        {contactInfo?.allEmail && contactInfo.allEmail.length > 0 && (
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="single-contact-address">
                                    <h6 className="title">
                                        <span className="icon"><i className="fas fa-envelope"></i></span> EMAIL:
                                    </h6>
                                    <ul className="info">
                                        {contactInfo.allEmail.map((item, index) => (
                                            <li key={index}>{item.email}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Phone */}
                        {contactInfo?.allPhoneNumber && contactInfo.allPhoneNumber.length > 0 && (
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="single-contact-address">
                                    <h6 className="title">
                                        <span className="icon"><i className="fas fa-phone"></i></span> PHONE:
                                    </h6>
                                    <ul className="info">
                                        {contactInfo.allPhoneNumber.map((item, index) => (
                                            <li key={index}>{item.phoneNumber}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Address */}
                        {contactInfo?.address && contactInfo.address.length > 0 && (
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="single-contact-address">
                                    <h6 className="title">
                                        <span className="icon"><i className="fas fa-map-marker-alt"></i></span> ADDRESS:
                                    </h6>
                                    <ul className="info">
                                        {contactInfo.address.map((item, index) => (
                                            <li key={index}>{item.addressLine}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

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
