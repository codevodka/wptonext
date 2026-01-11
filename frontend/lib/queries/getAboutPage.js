import { fetchGraphQL } from '../functions'

/**
 * Fetch About Me page data from WordPress
 * 
 * @returns {object} About page data with ACF fields
 */
export default async function getAboutPage() {
    const query = `
    query GetAboutPage {
      page(id: "/about-me/", idType: URI) {
        id
        title
        featuredImage {
          node {
            mediaItemUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        aboutPage {
          pageTitle
          pageSubtitle
          aboutMe {
            image {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            subtitle
            title
            text
          }
          firstBlock {
            title
            text1
            text2
          }
          imageText {
            image {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            title
            text
            listTitle
            listItemsLeft {
              item
            }
            listItemsRight {
              item
            }
          }
          allImages {
            image1 {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            image2 {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            image3 {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
          listDetails1 {
            title
            list {
              item
            }
          }
          listDetails2 {
            title
            list {
              item
            }
          }
          listDetails3 {
            title
            list {
              item
            }
          }
        }
      }
    }
  `

    const response = await fetchGraphQL(query)

    if (!response?.data?.page) {
        return null
    }

    return response.data.page
}