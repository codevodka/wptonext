/**
 * WordPress REST API Helper Functions
 * Handles file uploads and form submission creation
 */

const WP_REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL
const WP_AUTH_USER = process.env.WORDPRESS_AUTH_USER
const WP_AUTH_PASSWORD = process.env.WORDPRESS_AUTH_PASSWORD

// Create Basic Auth header
const getAuthHeader = () => {
    const credentials = Buffer.from(`${WP_AUTH_USER}:${WP_AUTH_PASSWORD}`).toString('base64')
    return `Basic ${credentials}`
}

/**
 * Upload a file to WordPress Media Library
 * @param {File} file - File object from form
 * @returns {Promise<{id: number, url: string, filename: string}>} WordPress media info
 */
export async function uploadFileToWordPress(file) {
    try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`${WP_REST_API_URL}/media`, {
            method: 'POST',
            headers: {
                'Authorization': getAuthHeader(),
            },
            body: formData,
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`WordPress file upload failed: ${error.message || response.statusText}`)
        }

        const media = await response.json()
        return {
            id: media.id,
            url: media.source_url,
            filename: media.title.rendered
        }
    } catch (error) {
        console.error('Error uploading file to WordPress:', error)
        throw error
    }
}

/**
 * Create a form submission post in WordPress
 * @param {Object} formData - Form submission data
 * @param {Array<{id: number, url: string}>} mediaFiles - Array of WordPress media info
 * @returns {Promise<number>} WordPress post ID
 */
export async function createFormSubmission(formData, mediaFiles = []) {
    try {
        // First, create the post with title
        const postResponse = await fetch(`${WP_REST_API_URL}/form_submission`, {
            method: 'POST',
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `Enquiry from ${formData.fullName}`,
                status: 'publish',
            }),
        })

        if (!postResponse.ok) {
            const error = await postResponse.json()
            console.error('Post creation error:', error)
            throw new Error(`WordPress post creation failed: ${error.message || postResponse.statusText}`)
        }

        const post = await postResponse.json()
        console.log('Post created with ID:', post.id)

        // Extract media IDs for ACF gallery field
        const mediaIds = mediaFiles.map(file => file.id)

        // Update ACF fields using the correct endpoint
        const acfFields = {
            full_name: formData.fullName,
            email_address: formData.email,
            companyorganization: formData.organization || '',
            budget: formData.budget || '',
            phone_number: formData.phone || '',
            country: formData.country || '',
            message: formData.message || '',
            attached_files: mediaIds, // ACF Gallery expects array of IDs
            submission_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        }

        console.log('Updating ACF fields:', acfFields)
        await updateACFFields(post.id, acfFields)

        return post.id
    } catch (error) {
        console.error('Error creating form submission in WordPress:', error)
        throw error
    }
}

/**
 * Update ACF fields for a post
 * @param {number} postId - WordPress post ID
 * @param {Object} fields - ACF field values
 */
async function updateACFFields(postId, fields) {
    try {
        // Try updating with ACF in the body
        const response = await fetch(`${WP_REST_API_URL}/form_submission/${postId}`, {
            method: 'POST',
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                acf: fields,
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            console.error('ACF update error response:', error)

            // If ACF endpoint fails, try using meta fields as fallback
            console.log('Trying meta fields as fallback...')
            const metaResponse = await fetch(`${WP_REST_API_URL}/form_submission/${postId}`, {
                method: 'POST',
                headers: {
                    'Authorization': getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meta: fields,
                }),
            })

            if (!metaResponse.ok) {
                const metaError = await metaResponse.json()
                console.error('Meta update error:', metaError)
                throw new Error(`ACF fields update failed: ${error.message || response.statusText}`)
            }

            console.log('Meta fields updated successfully')
            return await metaResponse.json()
        }

        console.log('ACF fields updated successfully')
        return await response.json()
    } catch (error) {
        console.error('Error updating ACF fields:', error)
        throw error
    }
}

/**
 * Test WordPress REST API connection
 * @returns {Promise<boolean>} True if connection successful
 */
export async function testWordPressConnection() {
    try {
        const response = await fetch(`${WP_REST_API_URL}/form_submission`, {
            method: 'GET',
            headers: {
                'Authorization': getAuthHeader(),
            },
        })

        return response.ok
    } catch (error) {
        console.error('WordPress connection test failed:', error)
        return false
    }
}
