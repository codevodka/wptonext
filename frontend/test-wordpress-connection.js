/**
 * Test WordPress REST API Connection
 * Run this to verify WordPress authentication and API access
 * 
 * Usage: node test-wordpress-connection.js
 */

// Load environment variables from .env.local
const fs = require('fs')
const path = require('path')

// Read .env.local file
const envPath = path.join(__dirname, '.env.local')
const envFile = fs.readFileSync(envPath, 'utf8')

// Parse environment variables
const envVars = {}
envFile.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim()
        }
    }
})

const WP_REST_API_URL = envVars.NEXT_PUBLIC_WORDPRESS_REST_API_URL
const WP_AUTH_USER = envVars.WORDPRESS_AUTH_USER
const WP_AUTH_PASSWORD = envVars.WORDPRESS_AUTH_PASSWORD

console.log('Loaded configuration:')
console.log('- API URL:', WP_REST_API_URL)
console.log('- Username:', WP_AUTH_USER)
console.log('- Password:', WP_AUTH_PASSWORD ? `${WP_AUTH_PASSWORD.substring(0, 4)}...${WP_AUTH_PASSWORD.substring(WP_AUTH_PASSWORD.length - 4)}` : 'NOT SET')
console.log('')

const getAuthHeader = () => {
    const credentials = Buffer.from(`${WP_AUTH_USER}:${WP_AUTH_PASSWORD}`).toString('base64')
    return `Basic ${credentials}`
}

async function testConnection() {
    console.log('Testing WordPress REST API connection...\n')

    // Test 1: Check if form_submission post type exists
    console.log('1. Testing form_submission post type access...')
    try {
        const response = await fetch(`${WP_REST_API_URL}/form_submission`, {
            method: 'GET',
            headers: {
                'Authorization': getAuthHeader(),
            },
        })

        if (response.ok) {
            const data = await response.json()
            console.log('✅ SUCCESS: form_submission post type is accessible')
            console.log(`   Found ${data.length} existing submissions\n`)
        } else {
            const error = await response.json()
            console.log('❌ FAILED: Cannot access form_submission post type')
            console.log('   Error:', error.message || response.statusText)
            console.log('   Status:', response.status, '\n')
        }
    } catch (error) {
        console.log('❌ FAILED: Connection error')
        console.log('   Error:', error.message, '\n')
    }

    // Test 2: Check authentication
    console.log('2. Testing WordPress authentication...')
    try {
        const response = await fetch(`${WP_REST_API_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': getAuthHeader(),
            },
        })

        if (response.ok) {
            const user = await response.json()
            console.log('✅ SUCCESS: Authentication working')
            console.log(`   Logged in as: ${user.name} (${user.email})`)
            console.log(`   User ID: ${user.id}\n`)
        } else {
            const error = await response.json()
            console.log('❌ FAILED: Authentication failed')
            console.log('   Error:', error.message || response.statusText)
            console.log('   Hint: Make sure you are using an Application Password, not your regular password\n')
        }
    } catch (error) {
        console.log('❌ FAILED: Connection error')
        console.log('   Error:', error.message, '\n')
    }

    // Test 3: Check media upload capability
    console.log('3. Testing media upload permissions...')
    try {
        const response = await fetch(`${WP_REST_API_URL}/media`, {
            method: 'OPTIONS',
            headers: {
                'Authorization': getAuthHeader(),
            },
        })

        if (response.ok) {
            console.log('✅ SUCCESS: Media upload endpoint is accessible\n')
        } else {
            console.log('❌ FAILED: Cannot access media endpoint')
            console.log('   Status:', response.status, '\n')
        }
    } catch (error) {
        console.log('❌ FAILED: Connection error')
        console.log('   Error:', error.message, '\n')
    }

    console.log('Test complete!')
    console.log('\nNext steps:')
    console.log('1. If authentication failed, create an Application Password in WordPress')
    console.log('2. If form_submission is not accessible, verify the custom post type is registered')
    console.log('3. Update .env.local with the correct credentials')
}

testConnection()
