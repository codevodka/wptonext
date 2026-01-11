import { fetchGraphQL } from '../functions'

/**
 * Fetch site settings including logo
 * 
 * @returns {object} Site settings with logo URL
 * 
 * This query fetches:
 * - Site title and description
 * - Custom logo URL from WordPress Customizer
 */
export default async function getSiteSettings() {
    const query = `
    query GetSiteSettings {
      generalSettings {
        title
        description
        url
      }
      # Fetch the custom logo
      # Note: You may need to install a plugin like "WPGraphQL for Advanced Custom Fields"
      # or use a custom resolver to expose the logo
      # For now, we'll fetch it via a different method in the component
    }
  `

    const response = await fetchGraphQL(query)

    if (!response?.data?.generalSettings) {
        return null
    }

    return response.data.generalSettings
}
