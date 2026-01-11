import { fetchGraphQL } from '../functions'

export default async function getPageBySlug(slug) {
    const query = `
        query GetPageBySlug($slug: ID!) {
        page(id: $slug, idType: URI) {
            id
            title
            content
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
            homePage {
            test
            header {
                headerSubtitle
                headerText
                headerTitle
            }
            recentWorks {
                subtitle
                title
                gallery {
                mainImage {
                    node {
                    mediaItemUrl
                    mediaDetails {
                        width
                        height
                    }
                    }
                }
                imageThumbnail {
                    node {
                    mediaItemUrl
                    mediaDetails {
                        height
                        width
                    }
                    }
                }
                websiteName
                websiteLink
                websiteDescription
                }
                buttonText
                buttonLink {
                nodes {
                    ... on Page {
                    id
                    title
                    }
                }
                }
            }
            aboutMe {
                subtitle
                title
                buttonText
                buttonLink {
                nodes {
                    uri
                    ... on Page {
                    title
                    }
                }
                }
                image {
                node {
                    altText
                    mediaItemUrl
                    mediaDetails {
                    height
                    width
                    }
                }
                }
                youtubeLink
            }
            service {
                serviceSubtitle
                title
                text
                repeater {
                icon {
                    node {
                    mediaItemUrl
                    }
                }
                title
                text
                link {
                    nodes {
                    link
                    }
                }
                }
            }
            counter {
                counterNumber1
                counterText1
                counterNumber2
                counterText2
                counterNumber3
                counterText3
                counterNumber4
                counterText4
            }
            clients {
                subtitle
                title
                repeater {
                idForTab
                name
                images {
                    nodes {
                    altText
                    mediaItemUrl
                    }
                }
                }
            }
            }
        }
        }
    `

    const response = await fetchGraphQL(query, { slug: `/${slug}/` })

    if (!response?.data?.page) {
        return null
    }

    return response.data.page
}