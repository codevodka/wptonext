import { fetchGraphQL } from '../functions'

export default async function getRecentPosts(limit = 4) {
    const query = `
    query GetRecentPosts($limit: Int!) {
      posts(first: $limit, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id
          title
          slug
          date
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
        }
      }
    }
  `

    const variables = {
        limit
    }

    const response = await fetchGraphQL(query, variables)
    return response?.data?.posts?.nodes || []
}
