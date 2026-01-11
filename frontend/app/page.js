import getPageBySlug from '@/lib/queries/getPageBySlug'
import getWebsiteOptions from '@/lib/queries/getWebsiteOptions'
import Image from 'next/image'
import Link from 'next/link'
import Testimonials from './components/Testimonials'
import SocialMedia from './components/SocialMedia'

// Helper function to sanitize WordPress HTML content and prevent hydration errors
const sanitizeHtml = (html) => {
  if (!html) return ''
  return html
    .trim()
    .replace(/\r\n/g, '\n')  // Normalize line endings
    .replace(/\n+/g, '\n')   // Remove multiple newlines
}

export default async function HomePage() {
  // Fetch page data and website options from WordPress
  const [page, websiteOptions] = await Promise.all([
    getPageBySlug('home'),
    getWebsiteOptions()
  ])

  if (!page) {
    return <div>Page not found</div>
  }

  const homePage = page.homePage || {}

  return (
    <>
      {/* Banner Section */}
      <section className="hero-area">
        <div className="hero-element-1"><img src="img/home1/hero-element-1.png" alt="" /></div>
        <div className="hero-element-2"><img src="img/home1/hero-element-2.png" alt="" /></div>
        <div className="hero-element-3"><img src="img/home1/hero-element-3.png" alt="" /></div>
        <div className="hero-element-4"><img src="img/home1/hero-element-4.png" alt="" /></div>
        <div className="hero-banner">
          {page.featuredImage?.node && (

            <Image
              src={page.featuredImage.node.mediaItemUrl}
              alt={page.featuredImage.node.altText || 'Featured Image'}
              width={page.featuredImage.node.mediaDetails?.width || 800}
              height={page.featuredImage.node.mediaDetails?.height || 600}
            />

          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12">
              <div className="hero-content">
                <h3 className="intro">{homePage.header.headerSubtitle}</h3>
                <h2 className="title">{homePage.header.headerTitle}</h2>
                <h3 className="desg" dangerouslySetInnerHTML={{ __html: sanitizeHtml(homePage.header.headerText) }}></h3>
              </div>
            </div>
          </div>
        </div>
      </section>





      <section className="h2-about-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div className="h2-about-content">
                <div className="section-title">
                  <p className="intro">{homePage.aboutMe.subtitle}</p>
                  <h2 className="title">{homePage.aboutMe.title}</h2>
                </div>
                {page.content && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content) }}></div>}
                <Link href={homePage.aboutMe.buttonLink.nodes[0].uri} className="link btn-style-1">
                  {homePage.aboutMe.buttonText}
                </Link>

              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="h2-about-banner">
                <div className="img">
                  <img src={homePage.aboutMe.image.node.mediaItemUrl} alt="" />
                  <a className="popup-youtube btn-ripple-out" href={homePage.aboutMe.youtubeLink} target="_blank" rel="noopener noreferrer"><i className="fas fa-play-circle"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>






      <section className="h2-project-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                {homePage.recentWorks.subtitle && (
                  <p className="intro">{homePage.recentWorks.subtitle}</p>
                )}
                {homePage.recentWorks.title && (
                  <h2 className="title">{homePage.recentWorks.title}</h2>
                )}
              </div>
            </div>
          </div>




          <div className="row no-gutters grid_container" id="container">

            {homePage.recentWorks.gallery.map((item, index) => (
              <div key={index} className="col-lg-4 col-sm-6 gallery-box grid branding">
                {item.mainImage?.node && (
                  <div className="h2-single-project"> <div className="img">
                    <Image
                      src={item.imageThumbnail.node.mediaItemUrl}
                      alt={item.websiteName || `Work ${index + 1}`}
                      width={item.mainImage.node.mediaDetails?.width || 800}
                      height={item.mainImage.node.mediaDetails?.height || 600}
                      style={styles.image}
                    />
                    <Link href={item.websiteLink} className="link" target="_blank"><i className="fal fa-link"></i></Link>
                  </div> </div>
                )}

                {item.websiteName && (
                  <h3>{item.websiteName}</h3>
                )}

                {item.websiteDescription && (
                  <p>{item.websiteDescription}</p>
                )}


              </div>
            ))}


          </div>
          <div className="text-center all-projects-button" style={{ paddingTop: 0, margin: 0 }}>
            {homePage.recentWorks.buttonText && homePage.recentWorks.buttonLink?.nodes?.[0] && (
              <div>
                <Link className="link btn-style-1"
                  href={`/${homePage.recentWorks.buttonLink.nodes[0].title?.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {homePage.recentWorks.buttonText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* {Clients Section } */}
      <section className="client-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <div className="client-area-left-side">
                <div className="section-title">
                  <p className="intro">{homePage.clients.subtitle}</p>
                  <h2 className="title">{homePage.clients.title}</h2>
                </div>
                <ul className="nav nav-tabs" id="clientTab" role="tablist">
                  {homePage.clients.repeater.map((client, index) => (
                    <li key={client.idForTab} className="nav-item">
                      <a className={index === 0 ? "nav-link active" : "nav-link"} id={`${client.idForTab}-tab`} data-toggle="tab" href={`#${client.idForTab}`} role="tab" aria-controls={client.idForTab} aria-selected={index === 0}>{client.name} <span className="icon"><i className="fas fa-caret-right"></i></span></a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className="client-area-right-side">
                <div className="tab-content" id="clientTabContent">

                  {homePage.clients.repeater.map((client, index) => (


                    <div className={`tab-pane fade ${index == 0 ? "show active" : ""}`} id={client.idForTab} role="tabpanel" aria-labelledby={client.idForTab + "-tab"} key={client.idForTab}>
                      <div className="row">
                        {client.images.nodes.map((image, imgIndex) => (
                          <div className="col-lg-4 col-sm-6 col-12" key={imgIndex}>
                            <div className="single-client">
                              <Image
                                key={imgIndex}
                                src={image.mediaItemUrl}
                                alt={image.altText || `${client.name} logo`}
                                width={150}
                                height={80}
                              />
                            </div>
                          </div>
                        ))}


                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="h2-service-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12">
              <div className="section-title">
                {homePage.service.serviceSubtitle && (
                  <p className="intro">{homePage.service.serviceSubtitle}</p>
                )}
                {homePage.service.title && (
                  <h2 className="title">{homePage.service.title}</h2>
                )}
                {homePage.service.text && (
                  <p className="text">{homePage.service.text}</p>
                )}

              </div>
            </div>
          </div>
          <div className="row">

            {homePage.service.repeater.map((service, index) => (
              <div key={index} className="col-lg-4 col-sm-6 col-12">

                <div className="h2-single-service">
                  <div className="icon-box">
                    <span className="icon">
                      <Image
                        src={service.icon.node.mediaItemUrl}
                        alt={service.title || 'Service Icon'}
                        width={60}
                        height={60}
                      />
                    </span>
                  </div>
                  <div className="content">

                    {service.title && (
                      <h4 className="title">{service.title}</h4>
                    )}
                    {service.text && (
                      <p className="text">{service.text}</p>
                    )}
                    {service.link?.nodes?.[0]?.link && (
                      <a
                        href={service.link.nodes[0].link}
                        style={styles.serviceLink}
                      >
                        Learn More
                      </a>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Section */}
      {/* Counter Section */}
      {homePage.counter && (
        <section className="h2-counter-area">
          <div className="container">
            <div className="row">
              {homePage.counter.counterNumber1 && (
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="h2-single-counter">
                    <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">
                      {homePage.counter.counterNumber1}
                    </h2>
                    <p className="text">{homePage.counter.counterText1}</p>
                    <span className="icon"><i className="far fa-code"></i></span>
                  </div>
                </div>
              )}
              {homePage.counter.counterNumber2 && (
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="h2-single-counter">
                    <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">
                      {homePage.counter.counterNumber2}
                    </h2>
                    <p className="text">{homePage.counter.counterText2}</p>
                    <span className="icon"><i className="far fa-check-circle"></i></span>
                  </div>
                </div>
              )}
              {homePage.counter.counterNumber3 && (
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="h2-single-counter">
                    <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">
                      {homePage.counter.counterNumber3}
                    </h2>
                    <p className="text">{homePage.counter.counterText3}</p>
                    <span className="icon"><i className="far fa-coffee"></i></span>
                  </div>
                </div>
              )}
              {homePage.counter.counterNumber4 && (
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="h2-single-counter">
                    <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">
                      {homePage.counter.counterNumber4}
                    </h2>
                    <p className="text">{homePage.counter.counterText4}</p>
                    <span className="icon"><i className="far fa-meh"></i></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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




const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  headerSection: {
    padding: '80px 0',
    textAlign: 'center',
  },
  section: {
    padding: '60px 0',
  },
  mainTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  headerText: {
    fontSize: '1.125rem',
    lineHeight: '1.8',
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionText: {
    fontSize: '1.125rem',
    lineHeight: '1.8',
    marginBottom: '30px',
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '40px',
  },
  galleryItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  thumbnail: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '3px solid white',
  },
  thumbnailImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
  workTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0',
  },
  workDescription: {
    color: '#666',
    lineHeight: '1.6',
  },
  workLink: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: '500',
  },
  buttonWrapper: {
    textAlign: 'center',
    marginTop: '40px',
  },
  button: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#000',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    alignItems: 'center',
  },
  aboutContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  aboutImage: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  youtubeLink: {
    color: '#ff0000',
    textDecoration: 'none',
    fontWeight: '500',
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '40px',
  },
  serviceCard: {
    padding: '30px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    textAlign: 'center',
  },
  serviceIcon: {
    marginBottom: '20px',
  },
  serviceTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '15px',
  },
  serviceText: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  serviceLink: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: '500',
  },
  counterSection: {
    padding: '60px 0',
    backgroundColor: '#f5f5f5',
  },
  counterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    textAlign: 'center',
  },
  counterItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  counterNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#000',
    margin: '0',
  },
  counterText: {
    fontSize: '1rem',
    color: '#666',
    margin: '0',
  },
  clientsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    marginTop: '40px',
  },
  clientTab: {
    padding: '30px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
  },
  clientName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '20px',
  },
  clientImages: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'center',
  },
  clientLogo: {
    maxWidth: '150px',
    height: 'auto',
    objectFit: 'contain',
  },
}