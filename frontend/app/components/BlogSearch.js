'use client'

import { useState } from 'react'

export default function BlogSearch({ posts }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPosts, setFilteredPosts] = useState(posts)

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)

        if (term === '') {
            setFilteredPosts(posts)
        } else {
            const filtered = posts.filter((post) => {
                const titleMatch = post.title.toLowerCase().includes(term)
                const excerptMatch = post.excerpt?.toLowerCase().includes(term)
                return titleMatch || excerptMatch
            })
            setFilteredPosts(filtered)
        }
    }

    return (
        <div className="sidebar-widget">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="search-input-box">
                    <input
                        type="text"
                        placeholder="Search here"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button type="submit">
                        <i className="fal fa-search"></i>
                    </button>
                </div>
            </form>

            {/* Display search results if searching */}
            {searchTerm && (
                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found
                    </p>
                    {filteredPosts.length > 0 && (
                        <div className="sw-news-box" style={{ marginTop: '10px' }}>
                            {filteredPosts.slice(0, 5).map((post) => (
                                <div key={post.id} style={{ marginBottom: '15px' }}>
                                    <a href={`/${post.slug}`} className="title" style={{ fontSize: '14px' }}>
                                        {post.title}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
