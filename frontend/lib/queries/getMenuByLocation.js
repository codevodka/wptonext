import { fetchGraphQL } from '../functions'

/**
 * Fetch WordPress menu by location
 * 
 * @param {string} location - Menu location (e.g., 'MAIN_MENU', 'FOOTER_MENU')
 * @returns {object} Menu data with items
 * 
 * This query fetches:
 * - Menu items with labels and URLs
 * - Parent-child relationships for nested menus
 * - Child items for dropdown menus
 */
export default async function getMenuByLocation(location) {
  const query = `
    query GetMenu {
      menu(id: "${location}", idType: LOCATION) {
        id
        name
        menuItems(first: 100) {
          nodes {
            id
            label
            url
            path
            parentId
            cssClasses
            childItems {
              nodes {
                id
                label
                url
                path
              }
            }
          }
        }
      }
    }
  `

  const response = await fetchGraphQL(query)

  if (!response?.data?.menu) {
    return null
  }

  return response.data.menu
}
