import { fetchGraphQL } from '../functions'

export default async function getPortfolioPage() {
    const query = `
    query GetPortfolioPage {
      page(id: "/portfolio/", idType: URI) {
        title
        featuredImage {
          node {
            altText
            mediaItemUrl
            mediaDetails {
              width
              height
            }
          }
        }
        worksPage {
          header {
            pageTitle
            pageSubtitle
          }
          allWorks {
            subtitle
            title
            repeater {
              idForTab
              name
              images {
                nodes {
                  altText
                  mediaItemUrl
                  title
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              portfolioLinkInWebGraphicsHub
            }
          }
        }
      }
    }
  `

    const response = await fetchGraphQL(query)
    return response?.data?.page || null
}
