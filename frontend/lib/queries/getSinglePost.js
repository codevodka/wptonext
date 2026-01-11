import { fetchGraphQL } from '../functions'

export default async function getSinglePost(slug) {
    const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
        contentTypeName
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        blog {
          bannerSubtitle
          readTime
        }
      }
    }
  `

    const variables = {
        slug
    }

    const response = await fetchGraphQL(query, variables)
    return response?.data?.post || null
}
