import Link from 'next/link'
import Image from 'next/image'

/**
 * Header Component
 * 
 * Server component that renders header with logo and navigation
 * from WordPress GraphQL menu data
 * 
 * Features:
 * - Dynamic logo from WordPress
 * - Dynamic menu items from WordPress Main Menu
 * - Nested dropdown menu support
 * - "Let's Chat" CTA button
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

export default async function Header({ menuData, logoUrl }) {
    // Fallback for missing menu data
    if (!menuData) {
        return (
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-sm-4 col-5">
                            <div className="logo">
                                <Link href="/" className="link">
                                    <img src={logoUrl || '/img/logo.png'} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    // Get menu items from the GraphQL response
    const menuItems = menuData.menuItems?.nodes || []

    // Get all child item IDs to filter them out from top-level
    const childItemIds = new Set()
    menuItems.forEach(item => {
        if (item.childItems?.nodes?.length > 0) {
            item.childItems.nodes.forEach(child => {
                childItemIds.add(child.id)
            })
        }
    })

    // Filter to show only items that are NOT children of other items
    const topLevelItems = menuItems.filter(item => !childItemIds.has(item.id))

    return (
        <header>
            <div className="container">
                <div className="row">
                    {/* Logo Section */}
                    <div className="col-lg-2 col-sm-4 col-5">
                        <div className="logo">
                            <Link href="/" className="link">
                                <img src={logoUrl || '/img/logo.png'} alt="Logo" />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Menu Section */}
                    <div className="col-lg-8 col-sm-4 col-7">
                        <div className="main-menu stellarnav">
                            <ul>
                                {topLevelItems.map((item) => {
                                    // Check if item has children for dropdown
                                    const hasChildren = item.childItems?.nodes?.length > 0

                                    // Check if item is clickable (has a valid path/url)
                                    const isClickable = Boolean(item.path || item.url)

                                    return (
                                        <li key={item.id} className={hasChildren ? 'has-sub' : ''}>
                                            {isClickable ? (
                                                <Link href={normalizeMenuUrl(item.path || item.url)}>
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span>{item.label}</span>
                                            )}

                                            {/* Render dropdown sub-menu */}
                                            {hasChildren && (
                                                <ul className="sub-menu">
                                                    {item.childItems.nodes.map((childItem) => (
                                                        <li key={childItem.id}>
                                                            <Link href={normalizeMenuUrl(childItem.path || childItem.url)}>
                                                                {childItem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Button Section */}
                    <div className="col-lg-2 col-sm-4 col-12 d-none d-sm-block">
                        <div className="lets-chat">
                            <Link href="/enquiry" className="link btn-style-1">
                                LET'S CHAT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}