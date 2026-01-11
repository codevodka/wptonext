import Image from 'next/image'
import getBlogOptions from '@/lib/queries/getBlogOptions'
import getBlogPosts from '@/lib/queries/getBlogPosts'
import getRecentPosts from '@/lib/queries/getRecentPosts'
import BlogLoadMore from '@/app/components/BlogLoadMore'
import BlogSearch from '@/app/components/BlogSearch'

export default async function BlogPage() {
    // Fetch blog data
    const [blogOptions, blogPostsData, recentPosts] = await Promise.all([
        getBlogOptions(),
        getBlogPosts(10), // Initial load: 10 posts
        getRecentPosts(4) // Sidebar: 4 recent posts
    ])

    const posts = blogPostsData?.nodes || []
    const pageInfo = blogPostsData?.pageInfo || { hasNextPage: false, endCursor: null }

    return (
        <>
            {/* Hero Section */}
            <section className="innerpage-hero-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 offset-lg-1 col-12">
                            <div className="innerpage-hero-content">
                                <h2 className="title">
                                    {blogOptions?.blogHeaderTitle || 'I write blogs on Website Design, Development, Graphics Design and related topics.'}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="page-blog-area">
                <div className="container">
                    <div className="row">
                        {/* Main Blog Grid */}
                        <div className="col-lg-8 col-12">
                            <div className="page-all-blog">
                                <BlogLoadMore initialPosts={posts} pageInfo={pageInfo} />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4 offset-lg-0 col-sm-8 offset-sm-2 col-12">
                            <div className="sidebar">
                                {/* Search Widget */}
                                <BlogSearch posts={posts} />

                                {/* Recent Posts Widget */}
                                <div className="sw-news sidebar-widget">
                                    <h3 className="widget-title" style={{ marginBottom: '20px', fontSize: '18px' }}>
                                        Recent Posts
                                    </h3>
                                    {recentPosts.map((post) => (
                                        <div key={post.id} className="sw-news-box">
                                            {post.featuredImage?.node?.sourceUrl && (
                                                <div className="img">
                                                    <img
                                                        src={post.featuredImage.node.sourceUrl}
                                                        alt={post.featuredImage.node.altText || post.title}
                                                    />
                                                </div>
                                            )}
                                            <div className="content">
                                                <span className="date">
                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }).toUpperCase()}
                                                </span>
                                                <a href={`/${post.slug}`} className="title">
                                                    {post.title}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
