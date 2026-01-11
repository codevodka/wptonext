export default function SocialMedia({ data }) {
    // Don't render if no data
    if (!data || !data.allSocials || data.allSocials.length === 0) {
        return null;
    }

    return (
        <section className="social-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <p className="intro">{data.subtitle}</p>
                            <h2 className="title">{data.title}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {data.allSocials.map((social, index) => (
                        <div key={index} className="col-lg-4 col-sm-6 col-12">
                            <a href={social.link} target="_blank" rel="noopener noreferrer">
                                <div className="single-social">
                                    <h3 className="title">{social.name}</h3>
                                    <p className="info">{social.subtite}</p>
                                    <span className="icon">
                                        <i className={social.iconClass}></i>
                                    </span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
