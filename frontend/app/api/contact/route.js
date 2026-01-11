import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { uploadFileToWordPress, createFormSubmission } from '@/lib/wordpress-api'

// Configure Nodemailer with Resend SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
    },
})

// Zod validation schema
const contactFormSchema = z.object({
    fullname: z.string()
        .refine(val => val.trim().length >= 1, { message: 'Full name is required' })
        .refine(val => val.trim().length >= 2, { message: 'Full name must be at least 2 characters' })
        .refine(val => val.trim().length <= 100, { message: 'Full name must be less than 100 characters' }),
    email: z.string()
        .refine(val => val.trim().length >= 1, { message: 'Email address is required' })
        .refine(val => {
            const trimmed = val.trim()
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        }, { message: 'Invalid email address' }),
    company: z.string().optional().default(''),
    budget: z.string().optional().default(''),
    phone: z.string().optional().default(''),
    country: z.string().optional().default(''),
    message: z.string().optional().default(''),
    honeypot: z.string().optional().default(''),
})

export async function POST(request) {
    try {
        const formData = await request.formData()

        // Extract form fields - convert null to empty string
        const formFields = {
            fullname: formData.get('fullname') || '',
            email: formData.get('email') || '',
            company: formData.get('company') || '',
            budget: formData.get('budget') || '',
            phone: formData.get('phone') || '',
            country: formData.get('country') || '',
            message: formData.get('message') || '',
            honeypot: formData.get('honeypot') || '',
        }

        // Validate with Zod
        const validationResult = contactFormSchema.safeParse(formFields)

        if (!validationResult.success) {
            const errors = (validationResult.error.issues || validationResult.error.errors || []).map(err => ({
                field: err.path[0] || 'unknown',
                message: err.message
            }))

            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: errors
                },
                { status: 400 }
            )
        }

        // Extract and clean validated data
        let { fullname, email, company, budget, phone, country, message, honeypot } = validationResult.data

        // Trim and normalize
        fullname = fullname.trim()
        email = email.trim().toLowerCase()
        company = company.trim()
        budget = budget.trim()
        phone = phone.trim()
        country = country.trim()
        message = message.trim()

        // Honeypot spam protection
        if (honeypot) {
            return NextResponse.json(
                { error: 'Spam detected' },
                { status: 400 }
            )
        }

        // Get uploaded files
        const uploadedFiles = []
        const fileObjects = []
        for (let i = 0; i < 5; i++) {
            const file = formData.get(`file${i}`)
            if (file && file.size > 0) {
                uploadedFiles.push(file)
                fileObjects.push({
                    name: file.name,
                    size: file.size,
                    type: file.type
                })
            }
        }

        // Step 1: Upload files to WordPress Media Library
        let mediaFiles = []
        let fileUploadError = null

        if (uploadedFiles.length > 0) {
            try {
                console.log(`Uploading ${uploadedFiles.length} files to WordPress...`)
                const uploadPromises = uploadedFiles.map(file => uploadFileToWordPress(file))
                mediaFiles = await Promise.all(uploadPromises)
                console.log('Files uploaded successfully:', mediaFiles)
            } catch (error) {
                console.error('File upload to WordPress failed:', error)
                fileUploadError = error.message
                // Continue without files rather than failing completely
            }
        }

        // Step 2: Create form submission in WordPress
        let wordpressPostId = null
        let wordpressError = null

        try {
            console.log('Creating form submission in WordPress...')
            wordpressPostId = await createFormSubmission({
                fullName: fullname,
                email: email,
                organization: company,
                budget: budget,
                phone: phone,
                country: country,
                message: message,
            }, mediaFiles)
            console.log('Form submission created in WordPress. Post ID:', wordpressPostId)
        } catch (error) {
            console.error('WordPress submission creation failed:', error)
            wordpressError = error.message
            // If WordPress save fails, we should notify the user
            return NextResponse.json(
                {
                    error: 'Failed to save submission to WordPress. Please try again.',
                    details: wordpressError
                },
                { status: 500 }
            )
        }

        // Step 3: Prepare beautiful styled email
        const wpMediaBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL?.replace('/wp-json/wp/v2', '')

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .info-row {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-size: 12px;
            text-transform: uppercase;
            color: #667eea;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .value {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .message-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            margin-top: 10px;
        }
        .files-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .file-item {
            background-color: #ffffff;
            padding: 12px 15px;
            margin-bottom: 10px;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .file-item:last-child {
            margin-bottom: 0;
        }
        .file-info {
            flex: 1;
        }
        .file-name {
            font-weight: 600;
            color: #333333;
            margin-bottom: 3px;
        }
        .file-size {
            font-size: 12px;
            color: #888888;
        }
        .download-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 8px 16px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }
        .footer-link {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
        }
        .admin-link {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #667eea;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>You have received a new enquiry from your website</p>
        </div>
        
        <div class="content">
            <div class="info-row">
                <div class="label">From</div>
                <div class="value">${fullname}</div>
            </div>
            
            <div class="info-row">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></div>
            </div>
            
            ${company ? `
            <div class="info-row">
                <div class="label">Company / Organization</div>
                <div class="value">${company}</div>
            </div>
            ` : ''}
            
            ${budget ? `
            <div class="info-row">
                <div class="label">Budget</div>
                <div class="value">${budget}</div>
            </div>
            ` : ''}
            
            ${phone ? `
            <div class="info-row">
                <div class="label">Phone Number</div>
                <div class="value"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></div>
            </div>
            ` : ''}
            
            ${country ? `
            <div class="info-row">
                <div class="label">Country</div>
                <div class="value">${country}</div>
            </div>
            ` : ''}
            
            ${message ? `
            <div class="info-row">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            
            ${mediaFiles.length > 0 ? `
            <div class="files-section">
                <div class="label" style="margin-bottom: 15px;">📎 Attached Files (${mediaFiles.length})</div>
                ${mediaFiles.map((file, index) => `
                    <div class="file-item">
                        <div class="file-info">
                            <div class="file-name">${fileObjects[index].name}</div>
                            <div class="file-size">${(fileObjects[index].size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                        <a href="${file.url}" class="download-btn" target="_blank">Download</a>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                Submission ID: <strong>#${wordpressPostId}</strong>
            </p>
            <a href="${wpMediaBaseUrl}/wp-admin/post.php?post=${wordpressPostId}&action=edit" class="admin-link">
                View in WordPress Admin
            </a>
            <p style="margin: 20px 0 0 0; color: #888888; font-size: 12px;">
                This email was sent from your website contact form
            </p>
        </div>
    </div>
</body>
</html>
    `

        // Step 4: Send email via Nodemailer (Resend SMTP)
        try {
            const info = await transporter.sendMail({
                from: '"Amarta Dey Portfolio" <test@resend.computercenter.in>',
                to: 'arunchdey@gmail.com',
                subject: `New Contact Form Submission from ${fullname}`,
                html: emailHtml,
                replyTo: email,
            })

            console.log('Email sent successfully:', info.messageId)

            return NextResponse.json(
                {
                    success: true,
                    message: 'Form submitted successfully',
                    wordpressPostId,
                    emailId: info.messageId,
                    filesUploaded: mediaFiles.length
                },
                { status: 200 }
            )
        } catch (emailError) {
            console.error('Email sending error:', emailError)
            // Email failed but WordPress saved - still return success
            return NextResponse.json(
                {
                    success: true,
                    message: 'Submission saved but email notification failed',
                    wordpressPostId,
                    emailError: emailError.message
                },
                { status: 200 }
            )
        }

    } catch (error) {
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        )
    }
}
