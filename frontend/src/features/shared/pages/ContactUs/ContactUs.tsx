import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const ContactUs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isSuccess = searchParams.get('success') === 'true'

  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (form.message.trim().length < 10) {
      setError('Message must be at least 10 characters long.')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    setError(null)

    if (!validateForm()) {
      e.preventDefault()
      return
    }

    setLoading(true)
  }

  const handleReset = () => {
    setSearchParams({})
    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <main className="container-fluid min-vh-100 bg-white d-flex flex-column align-items-center justify-content-center py-5">
      <div className="row w-100 justify-content-center px-3">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4 text-center">
          <Link to="/" className="d-inline-block mb-4 no-underline text-black hover:opacity-80 transition-opacity">
            <h3 className="fw-black mb-0 tracking-tight-15 text-dark uppercase">
              MYLITTLESPORT
            </h3>
          </Link>

          <h1 className="mb-5 lh-1 tracking-tighter text-uppercase">
            GET IN <br />
            TOUCH WITH <br />
            OUR TEAM
          </h1>

          {error && (
            <div className="alert alert-danger small py-3 mb-4 text-center" role="alert">
              {error}
            </div>
          )}

          {isSuccess ? (
            <div className="py-4 animate__animated animate__fadeIn">
              <div className="alert alert-success small py-3 mb-4 text-center" role="alert">
                Message sent successfully! We'll reply within 24 hours.
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="btn-dark-custom w-100 py-3 fw-black text-uppercase active:scale-95 transition-transform"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form
              action="https://formsubmit.com/mylittlesport.ec.2026@gmail.com"
              method="POST"
              className="d-flex flex-column gap-3 mb-4"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_next" value={window.location.origin + '/contact-us?success=true'} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value={`New message from My Little Sport: ${form.subject}`} />

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="form-control-custom w-100 py-3"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="form-control-custom w-100 py-3"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="form-control-custom w-100 py-3"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="form-control-custom w-100 py-3"
                  style={{ minHeight: '120px', resize: 'vertical' }}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-dark-custom w-100 py-3 fw-black text-uppercase ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    SENDING...
                  </>
                ) : (
                  'SEND MESSAGE'
                )}
              </button>
            </form>
          )}

          <div className="text-center mb-4">
            <p className="text-muted small">
              Need immediate support?{' '}
              <a href="mailto:hugocastillo.deus@gmail.com" className="ms-1 fw-bold text-dark text-decoration-underline">
                Email Us
              </a>
            </p>
          </div>

          <div className="text-center">
            <Link to="/" className="text-dark small fw-bold text-decoration-underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactUs
