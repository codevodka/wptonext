'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function BlogLoadMore({ initialPosts, pageInfo }) {
    const [posts, setPosts] = useState(initialPosts)
    const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage)
    const [endCursor, setEndCursor] = useState(pageInfo.endCursor)
    const [loading, setLoading] = useState(false)

    const loadMore = async () => {
        setLoading(true)

        try {
            const response = await fetch(`/api/blog/posts?after=${endCursor}`)
            const data = await response.json()

            if (data.nodes) {
                setPosts([...posts, ...data.nodes])
                setHasNextPage(data.pageInfo.hasNextPage)
                setEndCursor(data.pageInfo.endCursor)
            }
        } catch (error) {
            console.error('Error loading more posts:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Render posts */}
            <div className="row justify-content-center">
                {posts.map((post) => (
                    <div key={post.id} className="col-lg-6 col-sm-6 col-12">
                        <div className="single-related-article">
                            <div className="img">
                                <Link href={`/${post.slug}`}>
                                    {post.blog?.thumbnailImage?.node?.sourceUrl ? (
                                        <Image
                                            src={post.blog.thumbnailImage.node.sourceUrl}
                                            width={post.blog.thumbnailImage.node.mediaDetails.width}
                                            height={post.blog.thumbnailImage.node.mediaDetails.height}
                                            alt={post.blog.thumbnailImage.node.altText || post.title}
                                        />
                                    ) : post.featuredImage?.node?.sourceUrl ? (
                                        <Image
                                            src={post.featuredImage.node.sourceUrl}
                                            width={post.featuredImage.node.mediaDetails.width}
                                            height={post.featuredImage.node.mediaDetails.height}
                                            alt={post.featuredImage.node.altText || post.title}
                                        />
                                    ) : null}
                                </Link>
                            </div>
                            <div className="content">
                                <p className="date">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }).toUpperCase()}
                                </p>
                                <Link href={`/${post.slug}`}>
                                    <h4 className="title">
                                        {post.title}
                                    </h4>
                                </Link>
                                <div
                                    className="text"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
                <div className="row">
                    <div className="col-12 text-center" style={{ marginTop: '40px' }}>
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className="btn-style-1"
                        >
                            {loading ? 'LOADING...' : 'LOAD MORE'}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
