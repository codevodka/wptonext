# Amarta Dey Portfolio - Headless WordPress + Next.js Learning Project

## Project Overview
I'm learning to build a portfolio website using **Next.js** as the frontend and **WordPress as a headless CMS** with **GraphQL**. I have an existing HTML template that I'm converting to a dynamic Next.js application.

## Current Setup

### Environment Details
- **Operating System**: Windows PC
- **Local Server**: Laragon (running WordPress)
- **WordPress URL**: http://amartadey.test/
- **WordPress Credentials**: 
  - Username: `admin`
  - Password: `habra@123`
- **Next.js Frontend URL**: http://localhost:3000
- **Project Location**: `f:/laragon/www/amartadey/frontend`

### Project Structure
```
f:/laragon/www/amartadey/frontend/
├── html-18-07-2020/          # Original HTML template (reference design)
│   ├── index.html             # Home page design
│   ├── about.html
│   ├── blog.html
│   ├── single-blog.html
│   ├── pricing.html
│   ├── single-service.html
│   ├── contact.html
│   ├── css/
│   ├── js/
│   ├── img/
│   └── fonts/
├── app/
│   ├── page.js                # Home page (currently implemented)
│   ├── layout.js
│   ├── globals.css
│   └── page.module.css
├── lib/
│   ├── config.js
│   ├── functions.js
│   └── queries/
│       └── getPageBySlug.js   # GraphQL query for fetching page data
├── public/
├── .env.local                 # WordPress GraphQL endpoint configuration
└── [other Next.js files]
```

### What I've Accomplished So Far
✅ **Home Page Data Fetching**: Successfully pulling data from WordPress using GraphQL for the home page
✅ **ACF Fields Setup**: Created Advanced Custom Fields in WordPress for:
- Header section (subtitle, title, text)
- Recent Works section (gallery with images, thumbnails, website names, descriptions, links)
- About Me section (subtitle, title, button, image, YouTube link)
- Services section (repeater with icons, titles, text, links)
- Counter section (4 counters with numbers and text)
- Clients section (repeater with tabs, names, logo images)

✅ **GraphQL Integration**: Working GraphQL query that fetches all home page ACF fields
✅ **Next.js Rendering**: Displaying fetched WordPress data on the home page with inline styles

## What I Need to Learn

### Learning Preferences & Approach
- **One component at a time**: Starting with Header and Footer, then moving to other pages
- **Fully dynamic from the start**: Header/Footer will pull logo, menu items, and footer links from WordPress
- **ACF-based pages**: All pages will use ACF fields (not WordPress default content editor)
- **Step-by-step guidance**: I want to learn by doing - guide me rather than writing all the code
- **Concept understanding**: Help me understand WHY we're doing things a certain way
- **Best practices**: Teach me the right way to structure a headless WordPress + Next.js project

### Current WordPress Setup
✅ **WordPress Menus Created**: Main Menu is set up with the following structure:
- Home (Page)
- About Me (Page)
- Portfolio (Page)
- My Services (Custom Link) - with sub-items:
  - Website Design (Page)
  - WordPress Development (Page)
  - Website Management (Page)
  - Ecommerce (Page)
  - Graphics Design (Page)
  - Brand Strategy and SEO (Page)
- Blog (Page)
- Enquiry (Page)

✅ **Blog Posts**: 2 blog posts already created

✅ **Permalink Structure**: Post name format (`http://amartadey.test/sample-post/`)

### Immediate Learning Goals (In Order)
1. **Header Component**: Create a reusable, fully dynamic header that pulls:
   - Logo from WordPress
   - Menu items from WordPress Main Menu
   - Nested menu items (sub-menus)
   
2. **Footer Component**: Create a reusable, fully dynamic footer that pulls:
   - Footer logo from WordPress
   - Footer menu links from WordPress
   - Copyright text and other footer content

3. **Additional Pages**: How to create and fetch data for other pages using ACF fields

4. **Blog Integration**: How to fetch and display WordPress blog posts

5. **Dynamic Routing**: How to handle single blog posts, single pages, etc.

6. **SEO**: How to handle meta tags, titles, and SEO from WordPress

## Reference HTML Template Structure

The `html-18-07-2020` folder contains the complete HTML design with:
- **Header**: Logo, navigation menu, "Let's Chat" button
- **Hero Section**: Intro text, name, designation
- **About Section**: Text content, image, YouTube video link
- **Projects Section**: Filterable gallery grid
- **Services Section**: Service cards with icons
- **Counter Section**: Statistics display
- **Clients Section**: Tabbed client logos
- **Testimonials Section**: Client testimonials carousel
- **Social Media Section**: Social profile links
- **Footer**: Logo, links, copyright

## Technical Stack
- **Frontend**: Next.js (React framework)
- **CMS**: WordPress (headless)
- **Data Layer**: GraphQL (WPGraphQL plugin)
- **Custom Fields**: Advanced Custom Fields (ACF)
- **Styling**: Currently using inline styles (will need guidance on best practices)

## Questions for AI Assistant
When helping me, please:
1. Explain the WordPress setup needed (what pages, ACF fields, menus to create)
2. Show me how to structure Next.js components
3. Guide me on GraphQL queries for different data types
4. Teach me about Next.js routing and dynamic pages
5. Help me understand component reusability
6. Explain how to handle images from WordPress in Next.js
7. Show me best practices for styling (CSS modules, Tailwind, styled-components, etc.)

## Current Status
I have a working home page that fetches data from WordPress. Now I need guidance on:
- Creating reusable Header and Footer components
- Setting up WordPress menus and integrating them
- Creating other pages (About, Blog, etc.)
- Fetching and displaying blog posts
- Implementing dynamic routing for single posts/pages

---

**Note**: I'm on a Windows PC using Laragon as my local server. WordPress is running at http://amartadey.test/ and Next.js at http://localhost:3000.
