import React, { useState } from 'react'
import { SendIcon, LinkedinIcon, MailIcon, CheckCircleIcon } from 'lucide-react'
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      setIsSubmitting(false)
    }, 1000)
  }
  return (
    <div className="bg-primary w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-slate-light max-w-3xl">
            Interested in learning more about our research or discussing
            potential collaborations? Get in touch with our team.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-primary-light rounded-lg p-8">
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircleIcon className="text-secondary h-16 w-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-light text-center mb-4">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setFormStatus(null)
                    setFormData({
                      name: '',
                      email: '',
                      message: '',
                    })
                  }}
                  className="bg-secondary hover:bg-secondary-light text-white px-6 py-2 rounded-md transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-6">Send a Message</h2>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-light mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-slate-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-light mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-slate-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-light mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-primary border border-slate-dark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center w-full bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-md transition-colors font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      Sending...{' '}
                      <SendIcon size={16} className="ml-2 animate-pulse" />
                    </>
                  ) : (
                    <>
                      Send Message <SendIcon size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-6">Connect With Us</h2>
            <p className="text-slate-light mb-8">
              We're always open to discussing new research opportunities,
              collaborations, or answering questions about our quantitative
              approach.
            </p>
            <div className="space-y-6">
              <a
                href="mailto:DIEGOMTOWERS@GMAIL.COM"
                className="flex items-center p-4 bg-primary-light rounded-lg hover:bg-primary-dark transition-colors"
              >
                <div className="bg-secondary/10 p-3 rounded-full mr-4">
                  <MailIcon className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-slate-light">DIEGOMTOWERS@GMAIL.COM</p>
                </div>
              </a>
              <a
                href="http://www.linkedin.com/in/d-mt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-primary-light rounded-lg hover:bg-primary-dark transition-colors"
              >
                <div className="bg-secondary/10 p-3 rounded-full mr-4">
                  <LinkedinIcon className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <p className="text-slate-light">linkedin.com/in/d-mt</p>
                </div>
              </a>
            </div>
            <div className="mt-12 p-6 bg-primary-light rounded-lg border border-slate-dark/20">
              <h3 className="font-bold mb-2">Office Hours</h3>
              <p className="text-slate-light">
                Monday - Friday: 9:00 AM - 5:00 PM EST
              </p>
              <p className="text-slate-light mt-4">
                We typically respond to all inquiries within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact
