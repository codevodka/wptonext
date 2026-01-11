import { fetchGraphQL } from '../functions'

export default async function getBlogOptions() {
  const query = `
    query GetBlogOptions {
      websiteOptions {
        websiteOptions {
          blogHeaderImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          blogHeaderTitle
        }
      }
    }
  `

  try {
    const response = await fetchGraphQL(query)

    // If there are GraphQL errors or no data, return empty object
    if (!response || response.errors) {
      console.warn('Blog options not configured in WordPress ACF Options. Using fallback values.')
      return {}
    }

    return response?.data?.websiteOptions?.websiteOptions || {}
  } catch (error) {
    console.warn('Error fetching blog options:', error)
    return {}
  }
}
