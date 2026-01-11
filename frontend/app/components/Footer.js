import Link from 'next/link'

/**
 * Footer Component
 * 
 * This is a server component that renders the footer
 * with logo, footer menu, and copyright information
 * 
 * Features:
 * - Dynamic footer logo
 * - Dynamic footer menu from WordPress
 * - Copyright text
 */

/**
 * Normalize menu URL to handle WordPress homepage slug
 * Converts /home/ to / for Next.js root route
 */
const normalizeMenuUrl = (url) => {
    if (!url) return '#'

    // Convert /home/ or /home to root /
    if (url === '/home/' || url === '/home') {
        return '/'
    }

    return url
}

export default async function Footer({ footerMenuData, logoUrl }) {
    const footerMenuItems = footerMenuData?.menuItems?.nodes || []

    return (
        <footer>
            <div className="container">
                {/* Footer Top Area */}
                <div className="footer-top-area">
                    <div className="row">
                        <div className="col-lg-4 col-sm-3 col-12">
                            <div className="f-logo">
                                <Link href="/" className="link">
                                    <img src={logoUrl || '/img/logo.png'} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-5 col-12">
                            <div className="f-title">
                                <h2 className="title">Let's Talk?</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-12">
                            <div className="f-chat">
                                <Link href="/enquiry" className="link btn-style-1">
                                    LET'S CHAT
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Area */}
                <div className="footer-bottom-area">
                    {/* Footer Links */}
                    {footerMenuItems.length > 0 && (
                        <div className="footer-links">
                            <ul className="links">
                                {footerMenuItems.map((item) => (
                                    <li key={item.id}>
                                        <Link href={normalizeMenuUrl(item.path || item.url)}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Copyright */}
                    <div className="footer-copyright">
                        <p className="copyright">
                            © {new Date().getFullYear()} Amarta Dey | All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
