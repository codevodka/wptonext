import Script from 'next/script'
import "./globals.css";
import Header from './components/Header'
import Footer from './components/Footer'
import getMenuByLocation from '@/lib/queries/getMenuByLocation'
import getSiteSettings from '@/lib/queries/getSiteSettings'

const siteSettings = await getSiteSettings()

export const metadata = {
  title: siteSettings?.title || "Portfolio Website",
  description: siteSettings?.description || "Custom Description",
};

export default async function RootLayout({ children }) {
  // Fetch menu data for header and footer
  // Note: We're using 'MAIN_MENU' and 'FOOTER_MENU' which match your WordPress menu locations
  const mainMenu = await getMenuByLocation('main-menu')
  const footerMenu = await getMenuByLocation('footer-menu')

  // For now, we'll use a placeholder logo path
  // We'll configure WordPress to expose the logo via GraphQL in the next step
  const logoUrl = '/img/logo.png'

  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" type="image/png" href="/fav.png" />

        {/* CSS files from HTML template - loaded in order */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/jquery-ui.css" />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/stellarnav.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />

        {/* Google Fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" />
      </head>
      <body>
        {/* Preloader div - matches HTML template */}
        {/* <div id="preloader"></div> */}

        {/* Header Component - appears on all pages */}
        <Header menuData={mainMenu} logoUrl={logoUrl} />

        {/* Page Content */}
        {children}

        {/* Footer Component - appears on all pages */}
        <Footer footerMenuData={footerMenu} logoUrl={logoUrl} />

        {/* JavaScript files - loaded in order from HTML template */}
        <Script src="/js/jquery-3.3.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery-ui.js" strategy="beforeInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.counterup.min.js" strategy="lazyOnload" />
        <Script src="/js/countdown.js" strategy="lazyOnload" />
        <Script src="/js/stellarnav.min.js" strategy="lazyOnload" />
        <Script src="/js/imagesloaded.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/js/isotope.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.scrollUp.js" strategy="lazyOnload" />
        <Script src="/js/jquery.waypoints.min.js" strategy="lazyOnload" />
        <Script src="/js/popper.min.js" strategy="lazyOnload" />
        <Script src="/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="/js/theme.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}


