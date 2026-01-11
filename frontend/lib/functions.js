/**
 * Fetch data from WordPress GraphQL API
 * @param {string} query - GraphQL query string
 * @param {Object} variables - Query variables
 * @returns {Promise<Object|null>} GraphQL response
 */
export async function fetchGraphQL(query, variables = {}) {
  const url = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL

  if (!url) {
    console.error('GraphQL URL not configured')
    return null
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: 0, // Cache for 1 hour
        // revalidate: 0, // Disable cache for development (set to 3600 for production)
        tags: ['graphql'],
      },
    })

    if (!response.ok) {
      console.error(`GraphQL request failed: ${response.statusText}`)
      return null
    }

    const json = await response.json()

    if (json.errors) {
      console.error('GraphQL errors:', json.errors)
    }

    return json
  } catch (error) {
    console.error('GraphQL fetch error:', error)
    return null
  }
}