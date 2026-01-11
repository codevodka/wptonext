# Amarta Dey Portfolio - Headless WordPress + Next.js Learning Project

## Project Overview
Learning to build a portfolio website using **Next.js** as the frontend and **WordPress as a headless CMS** with **GraphQL**. Converting an existing HTML template to a dynamic Next.js application.

## 🎉 Project Status## Current Status (as of 2026-01-10)

### ✅ Completed Features:

**Phase 1: Core Components**
- ✅ Homepage (`localhost:3000`) - Matches `html-18-07-2020/index.html`
- ✅ About Me Page (`localhost:3000/about-me`) - Matches `html-18-07-2020/about.html`
- ✅ Service Pages (6 pages) - Dynamic route with Block Editor content
  - `/website-design/`, `/wordpress-development/`, `/website-management/`
  - `/ecommerce/`, `/graphics-design/`, `/brand-strategy-and-seo/`
- ✅ Blog Listing Page (`localhost:3000/blog`) - Matches `html-18-07-2020/blog.html`
- ✅ Single Blog Posts (`localhost:3000/[slug]`) - Matches `html-18-07-2020/single-blog.html`
- ✅ Contact/Enquiry Page (`localhost:3000/enquiry`) - Matches `html-18-07-2020/contact.html`
  - ✅ WordPress Form Submission Integration (saves to database with file uploads)
- ✅ Portfolio Page (`localhost:3000/portfolio`) - Matches `html-18-07-2020/portfolio.html`
- ✅ Header Component - Dynamic with WordPress menu integration, nested dropdowns
- ✅ Footer Component - Dynamic with WordPress footer menu
- ✅ Testimonials Widget - Owl Carousel with 2 items, navigation arrows, autoplay
- ✅ Social Media Widget - Responsive grid with Font Awesome icons

**GraphQL Queries:**
- ✅ `getPageBySlug.js` - Home page data
- ✅ `getAboutPage.js` - About page ACF fields
- ✅ `getServicePage.js` - Service pages with Block Editor content
- ✅ `getContactPage.js` - Contact page ACF fields (header, form content, contact info)
- ✅ `getPortfolioPage.js` - Portfolio page ACF fields (header, categories, images)
- ✅ `wordpress-api.js` - WordPress REST API helpers (file upload, form submission)
- ✅ `getBlogOptions.js` - Blog header image & title from ACF Options
- ✅ `getBlogPosts.js` - Paginated blog posts with ACF fields
- ✅ `getSinglePost.js` - Single blog post with Block Editor content
- ✅ `getRecentPosts.js` - Recent posts for sidebar
- ✅ `getMenuByLocation.js` - WordPress menus
- ✅ `getSiteSettings.js` - Site metadata
- ✅ `getWebsiteOptions.js` - ACF Options (testimonials, social media)

**Client Components:**
- ✅ `BlogLoadMore.js` - Load More pagination for blog posts
- ✅ `BlogSearch.js` - Real-time search functionality for blog
- ✅ `ContactForm.js` - Contact form with validation and file upload

**API Routes:**
- ✅ `/api/blog/posts` - Blog pagination endpoint
- ✅ `/api/contact` - Contact form submission with Nodemailer (Resend SMTP) + Zod validation

### 🎉 Website Complete!
All core features have been successfully implemented. The website is fully functional and ready for use.

### 🔧 Future Improvements (Optional):
- Performance optimization
- SEO enhancements
- Additional animations/interactions
- Analytics integration
- Additional portfolio categories

## Current Setup

### Environment
- **OS**: Windows PC
- **Local Server**: Laragon
- **WordPress**: http://amartadey.test/ (admin / habra@123)
- **Next.js**: http://localhost:3000
- **Project Path**: `f:/laragon/www/amartadey/frontend`

### Project Structure
```
f:/laragon/www/amartadey/frontend/
├── html-18-07-2020/          # HTML template reference
├── app/
│   ├── page.js               # Homepage ✅
│   ├── about-me/page.js      # About page ✅
│   ├── blog/page.js          # Blog listing page ✅
│   ├── enquiry/page.js       # Contact/enquiry page ✅
│   ├── portfolio/page.js     # Portfolio page ✅
│   ├── [slug]/page.js        # Dynamic route for service pages & blog posts ✅
│   ├── api/
│   │   ├── blog/posts/route.js  # API endpoint for Load More ✅
│   │   └── contact/route.js     # API endpoint for contact form ✅
│   ├── components/
│   │   ├── Header.js         # ✅
│   │   ├── Footer.js         # ✅
│   │   ├── Testimonials.js   # ✅
│   │   ├── SocialMedia.js    # ✅
│   │   ├── BlogLoadMore.js   # ✅
│   │   ├── BlogSearch.js     # ✅
│   │   └── ContactForm.js    # ✅
│   └── layout.js
├── lib/
│   ├── config.js
│   ├── functions.js          # fetchGraphQL helper
│   └── queries/              # All GraphQL queries
└── public/                   # Static assets (CSS, JS, images, fonts)
```

## Key Implementation Patterns

**Validation:**
- ✅ Zod schemas for type-safe validation
- ✅ Works in JavaScript files (no TypeScript required)
- ✅ Better error messages and field-level validation

### 1. GraphQL Query Pattern
All queries use `fetchGraphQL` from `lib/functions.js`:
```javascript
import { fetchGraphQL } from '../functions'

export default async function getDataName() {
  const query = `query { ... }`
  const response = await fetchGraphQL(query)
  return response?.data?.fieldName || null
}
```

### 2. Page Component Pattern
```javascript
export default async function PageName() {
  // Fetch data server-side
  const [pageData, options] = await Promise.all([
    getPageData(),
    getWebsiteOptions()
  ])
  
  // Render with data
  return <>{/* JSX */}</>
}
```

### 3. Reusable Components
- **Server Components**: Default for pages and static components
- **Client Components**: Use `'use client'` for interactive features (e.g., Testimonials carousel, BlogLoadMore, BlogSearch)

### 4. Smart Dynamic Routing
The `[slug]/page.js` route intelligently handles both service pages AND blog posts:
- Checks `contentTypeName` to determine content type
- If `contentTypeName === 'page'` → Renders service page layout (with testimonials & social media)
- If `contentTypeName === 'post'` → Renders blog post layout (no sidebar, no testimonials)
- Returns 404 if neither found

### 5. ACF Field Structure

**Homepage ACF Fields:**
- Header section (subtitle, title, text)
- About Me section (subtitle, title, content, button, image, YouTube link)
- Recent Works (gallery with images, thumbnails, names, descriptions, links)
- Services (repeater with icons, titles, text, links)
- Counter section (4 counters with numbers and text)
- Clients (repeater with tabs, names, logo images)

**About Me Page ACF Fields:**
- Hero section (title, subtitle, featured image)
- About Me section (image, subtitle, title, text)
- First Block (title, text columns)
- Image & Text section (image, title, text, list items)
- All Images (3 gallery images)
- List Details (3 lists with titles and items)

**Blog Post ACF Fields:**
- Banner Subtitle (text)
- Read Time (text, e.g., "10 Min")
- Thumbnail Image (image object)

**ACF Options Page:**
- Testimonials (title, subtitle, repeater with image, name, location, comment)
- Social Media (subtitle, title, repeater with link, name, subtitle, icon class)
- Footer Text
- Blog Header Image & Title (optional - uses fallback if not set)

**Contact Form:**
- Full Name (required)
- Email Address (required)
- Organization Name, Budget, Phone, Country (optional)
- Message (optional)
- File Upload (optional, max 5 files, 10MB each)
- Honeypot field (spam protection)

**Contact Page ACF Fields:**
- Header (page title, page subtitle)
- Contact Form (subtitle, title, text)
- Contact Information (emails, phone numbers, addresses - repeater fields)

**Form Submission ACF Fields (Read-Only):**
- Full Name (text)
- Email Address (email)
- Company/Organization (text)
- Budget (text)
- Phone Number (text)
- Country (text)
- Message (textarea)
- Attached Files (gallery) - WordPress Media IDs
- Submission Date (date time picker)

**Portfolio Page ACF Fields:**
- Header (page title, page subtitle)
- All Works (subtitle, title, repeater with categories)
  - Each category: ID for tab, name, images (gallery), portfolio link in Web Graphics Hub

## WordPress Configuration

**Menus:**
- Main Menu (location: `main-menu`) - Home, About Me, Portfolio, My Services (with sub-items), Blog, Enquiry
- Footer Menu (location: `footer-menu`)

**ACF Field Groups:**
- Home Page Fields
- About Page Fields
- Blog (for blog posts)
- Website Options (Options Page)

**Content Types:**
- Pages (service pages) - Use `contentTypeName === 'page'`
- Posts (blog posts) - Use `contentTypeName === 'post'`

## URL Structure

### Static Pages
- Homepage: `/`
- About Me: `/about-me`
- Blog Listing: `/blog`
- Portfolio: `/portfolio`

### Dynamic Routes (`[slug]/page.js`)
**Service Pages:**
- `/website-design/`
- `/wordpress-development/`
- `/website-management/`
- `/ecommerce/`
- `/graphics-design/`
- `/brand-strategy-and-seo/`

**Blog Posts:**
- `/40-latest-websites-to-download-free-stunning-stock-images/`
- `/best-css-only-navigation-menu-examples/`
- Any other blog post slug

**How it works:**
1. Try to fetch as service page first (`getServicePage`)
2. If not found or wrong type, try to fetch as blog post (`getSinglePost`)
3. Render appropriate layout based on `contentTypeName`
4. Return 404 if neither found

## Blog Features

### Blog Listing Page (`/blog`)
- Hero section with customizable title (from ACF Options or fallback)
- 2-column grid of blog posts (10 posts initially)
- Sidebar with:
  - Real-time search functionality
  - Recent posts (4 posts)
- "Load More" button for pagination (loads 10 more posts)
- Displays: thumbnail image, date, title, excerpt

### Single Blog Post (`/[slug]`)
- Hero section with post title and banner subtitle (ACF)
- Meta information: publish date, read time, share buttons
- Block Editor content rendered with `dangerouslySetInnerHTML`
- Full-width layout (no sidebar, no testimonials, no social media)
- Supports embedded iframes (CodePen, YouTube, etc.)

### Contact/Enquiry Page (`/enquiry`)
- Hero section with dynamic title and subtitle (from ACF)
- Contact form with validation and file upload
- Form section titles (subtitle, title, text) from ACF
- Email notifications via Resend API
- File uploads to WordPress Media Library via REST API
- Form submissions saved to WordPress custom post type
- Honeypot spam protection
- Success/error message display
- Contact info section (email, phone, address from ACF repeater fields)
- Social media section (from ACF Options)
- **Authentication:** Application Password for WordPress REST API
- **Behavior:** Submission fails if WordPress save fails

## Technical Stack
- **Frontend**: Next.js 15 (App Router)
- **CMS**: WordPress (headless)
- **Data Layer**: GraphQL (WPGraphQL plugin)
- **Custom Fields**: Advanced Custom Fields (ACF)
- **Email Service**: Resend (contact form notifications)
- **Styling**: Existing CSS from HTML template
- **JavaScript Libraries**: jQuery, Owl Carousel, Bootstrap (from template)

## Learning Approach
- Build one component/page at a time
- Fully dynamic from the start (all data from WordPress)
- ACF-based pages (not default WordPress editor for pages)
- Blog posts use WordPress Block Editor for content
- Understand WHY, not just HOW
- Follow best practices for headless WordPress + Next.js

## Helper Functions

**sanitizeHtml** - Clean WordPress HTML content:
```javascript
const sanitizeHtml = (html) => {
  if (!html) return ''
  return html.trim()
    .replace(/\r\n/g, '\n')
    .replace(/\n+/g, '\n')
}
```

## Important Notes

1. **GraphQL Pattern**: Use `fetchGraphQL` function, NOT Apollo Client
2. **Image Optimization**: Always use Next.js `Image` component with width/height from `mediaDetails`
3. **Conditional Rendering**: Use `&&` operator to prevent errors with optional fields
4. **Repeater Fields**: Map over arrays with `.map()` and provide unique `key` prop
5. **Client Components**: Add `'use client'` directive for components using browser APIs or interactivity
6. **Owl Carousel**: Add 100ms setTimeout to ensure jQuery loads before initialization
7. **Next.js 15 Params**: Dynamic route params are Promises and must be awaited: `const { slug } = await params`
8. **Content Type Detection**: Use `contentTypeName` field to distinguish between pages and posts
9. **Iframe Support**: CSP headers configured in `next.config.mjs` to allow iframes from HTTP/HTTPS sources
10. **Blog Pagination**: Uses cursor-based pagination with GraphQL (`endCursor` and `hasNextPage`)
11. **Error Handling**: Queries return empty objects/arrays instead of null to prevent errors
12. **Form Validation**: Client-side validation for required fields, email format, file size/count
13. **Spam Protection**: Honeypot field for contact form (hidden field that bots typically fill)
14. **Email Service**: Resend API for sending contact form notifications

## Configuration Files

**next.config.mjs:**
- Image optimization settings
- Remote patterns for WordPress images
- CSP headers for iframe support

**API Routes:**
- `/api/blog/posts` - Endpoint for Load More functionality
- `/api/contact` - Endpoint for contact form submission and email sending

**Environment Variables:**
- `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` - WordPress GraphQL endpoint
- `NEXT_PUBLIC_WORDPRESS_REST_API_URL` - WordPress REST API endpoint
- `RESEND_API_KEY` - Resend API key for email service
- `WORDPRESS_AUTH_USER` - WordPress username for REST API (admin)
- `WORDPRESS_AUTH_PASSWORD` - WordPress Application Password for REST API

**WordPress Custom Post Type:**
- `form_submission` - Stores contact form submissions ✅ Created
- Created via ACF Pro
- Fields: full_name, email, company, budget, phone, country, message, attached_files, submission_date
- All fields are read-only to prevent editing of user-submitted data

**WordPress Integration Status:**
- ✅ Custom post type `form_submission` created
- ✅ ACF field group created with 9 read-only fields
- ✅ Environment variables configured (.env.local)
- ✅ API route implemented to upload files and save submissions
- ✅ Email template updated with WordPress file URLs
- ✅ Zod validation error messages fixed to display properly in frontend

---

**Last Updated**: 2026-01-10
**Current Focus**: ✅ Website Complete! All features implemented including file uploads, form submissions, email notifications with Zod validation, and proper error handling.
