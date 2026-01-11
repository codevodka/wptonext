import { fetchGraphQL } from '../functions'

/**
 * Fetch website options from WordPress ACF Options page
 * 
 * @returns {object} Website options data including testimonials, social media, etc.
 */
export default async function getWebsiteOptions() {
    const query = `
    query GetWebsiteOptions {
      amartaGeneralSettings {
        websiteOption {
          testimonials {
            title
            subtitle
            repeater {
              image {
                node {
                  altText
                  mediaItemUrl
                }
              }
              name
              location
              comment
            }
          }
          socialMedia {
            subtitle
            title
            allSocials {
              link
              name
              subtite
              iconClass
            }
          }
          footerText
          blogHeaderImage {
            node {
              altText
              mediaItemUrl
            }
          }
          blogPageTitle
        }
      }
    }
  `

    const response = await fetchGraphQL(query)

    if (!response?.data?.amartaGeneralSettings?.websiteOption) {
        return null
    }

    return response.data.amartaGeneralSettings.websiteOption
}
