'use client'

import { useState } from 'react'

export default function ContactForm({ subtitle, title, text }) {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        company: '',
        budget: '',
        phone: '',
        country: '',
        message: '',
        honeypot: '' // Hidden field for spam protection
    })

    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({ type: '', message: '' })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)

        // Validate file count
        if (selectedFiles.length > 5) {
            setStatus({ type: 'error', message: 'Maximum 5 files allowed' })
            return
        }

        // Validate file size (10MB each)
        const invalidFiles = selectedFiles.filter(file => file.size > 10 * 1024 * 1024)
        if (invalidFiles.length > 0) {
            setStatus({ type: 'error', message: 'Each file must be less than 10MB' })
            return
        }

        setFiles(selectedFiles)
        setStatus({ type: '', message: '' })
    }

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    const validateForm = () => {
        if (!formData.fullname.trim()) {
            setStatus({ type: 'error', message: 'Full name is required' })
            return false
        }

        if (!formData.email.trim()) {
            setStatus({ type: 'error', message: 'Email address is required' })
            return false
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email address' })
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setStatus({ type: '', message: '' })

        try {
            const formDataToSend = new FormData()

            // Append form fields
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key])
            })

            // Append files
            files.forEach((file, index) => {
                formDataToSend.append(`file${index}`, file)
            })

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formDataToSend
            })

            const data = await response.json()

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We will get back to you soon.' })

                // Reset form
                setFormData({
                    fullname: '',
                    email: '',
                    company: '',
                    budget: '',
                    phone: '',
                    country: '',
                    message: '',
                    honeypot: ''
                })
                setFiles([])

                // Clear file input
                const fileInput = document.querySelector('input[type="file"]')
                if (fileInput) fileInput.value = ''
            } else {
                // Handle Zod validation errors
                if (data.details && Array.isArray(data.details)) {
                    const errorMessages = data.details.map(err => {
                        // Capitalize field name for better readability
                        const fieldName = err.field.charAt(0).toUpperCase() + err.field.slice(1)
                        return `${fieldName}: ${err.message}`
                    }).join('\n')
                    setStatus({ type: 'error', message: errorMessages })
                } else {
                    setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
                }
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="contact-form">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1">
                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="section-title">
                                    <p className="intro">{subtitle || 'CONTACT ME'}</p>
                                    <h2 className="title">{title || 'Project Enquiry Form'}</h2>
                                    <p className="text">
                                        {text || 'If you are in need of a website developer for your next website, we\'d love to learn more about your project and see if we can work together. Fill this out so we can learn more about you and your needs.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status Message */}
                        {status.message && (
                            <div className="row">
                                <div className="col-12">
                                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{
                                        padding: '15px',
                                        marginBottom: '20px',
                                        borderRadius: '4px',
                                        backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                                        color: status.type === 'success' ? '#155724' : '#721c24',
                                        border: `1px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                                        whiteSpace: 'pre-line'
                                    }}>
                                        {status.message}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="row">
                            {/* Left Column */}
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="contact-input-box">
                                    <label>Your Name</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder="Full name"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-input-box">
                                    <label>Organization Name <span>(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Organization Name (Optional)"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="contact-input-box">
                                    <label>Budget <span>(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="budget"
                                        placeholder="Budget (Optional)"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="contact-input-box">
                                    <label>Phone Number <span>(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="contact-input-box">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-input-box">
                                    <label>Country <span>(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="contact-input-box">
                                    <label>Message <span>(optional)</span></label>
                                    <textarea
                                        name="message"
                                        placeholder="Message (optional)"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                    />
                                </div>
                            </div>

                            {/* File Upload */}
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="contact-input-box">
                                    <label>Upload Files <span>(Optional) Maximum File Size - 10MB</span></label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                        accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx,.txt"
                                        style={{ marginTop: '10px' }}
                                    />
                                    {files.length > 0 && (
                                        <div style={{ marginTop: '10px' }}>
                                            {files.map((file, index) => (
                                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <span style={{ marginRight: '10px' }}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        style={{
                                                            background: '#dc3545',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '2px 8px',
                                                            borderRadius: '3px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Honeypot Field (Hidden) */}
                                <input
                                    type="text"
                                    name="honeypot"
                                    value={formData.honeypot}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                    tabIndex="-1"
                                    autoComplete="off"
                                />

                                <div className="contact-input-box last-box">
                                    <input
                                        className="btn-style-1"
                                        type="submit"
                                        value={loading ? 'SENDING...' : 'SEND MESSAGE'}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
