import { fetchGraphQL } from '../functions'

export default async function getBlogPosts(first = 10, after = null) {
    const query = `
    query GetBlogPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after, where: {orderby: {field: DATE, order: DESC}}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          databaseId
          title
          slug
          date
          excerpt
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
            thumbnailImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            readTime
          }
        }
      }
    }
  `

    const variables = {
        first,
        after
    }

    const response = await fetchGraphQL(query, variables)
    return response?.data?.posts || null
}
