import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className="bg-white min-vh-100">
      <section className="container py-5 mt-5">
        <div className="text-center mb-5 pb-4 border-bottom">
          <h1 className="fw-black text-uppercase display-4 tracking-tighter">ABOUT US</h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-content mb-5">
              <p className="lead text-dark mb-4">
                At <strong>MYLITTLESPORT</strong>, we believe that sport is more than just a physical activity; it's a way of life. Our mission is to provide every athlete—from the weekend runner to the dedicated professional—with high-quality sneakers and premium equipment that not only enhances performance but also reflects their unique style.
              </p>
              <p className="text-muted mb-4">
                Our journey started with a simple vision: to create a curated shopping experience where passion meets quality. We handpick every item in our collection, ensuring that only the best products from the world's leading sports brands make it to our shelves.
              </p>
              <div className="row g-4 mt-2">
                <div className="col-md-4">
                  <h5 className="fw-bold text-uppercase small tracking-widest">Quality Assurance</h5>
                  <p className="small text-muted">We only stock 100% authentic products from official distributors.</p>
                </div>
                <div className="col-md-4">
                  <h5 className="fw-bold text-uppercase small tracking-widest">Expert Curation</h5>
                  <p className="small text-muted">Our team of enthusiasts ensures our catalog is always ahead of the trends.</p>
                </div>
                <div className="col-md-4">
                  <h5 className="fw-bold text-uppercase small tracking-widest">Community Focused</h5>
                  <p className="small text-muted">We support local athletes and sports events to grow the sporting community.</p>
                </div>
              </div>
            </div>

            <div className="mb-5 py-4">
              <h2 className="fw-black text-uppercase mb-4">Why Trust Us?</h2>
              <p className="text-muted">
                Since our inception, we have served thousands of customers who share our passion for sport.
              </p>
              <p className="text-muted">
                We understand the importance of trust when shopping online. That's why we prioritize transparency in our operations, from clear shipping policies to a responsive customer support team ready to assist you at every step of your journey.
              </p>
            </div>

            <div className="mb-5 py-4">
              <h2 className="fw-black text-uppercase mb-5">Shippings, Returns & Exchanges</h2>
              
              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">1. Shipping Policy</h4>
                <p className="text-muted">We strive to deliver your orders as quickly as possible. All orders are processed within 24-48 business hours.</p>
                <ul className="text-muted small">
                  <li>Standard Delivery: 3-5 business days.</li>
                  <li>Express Delivery: 24-48 hours for selected regions.</li>
                  <li>Free Shipping: On all orders over 50€.</li>
                </ul>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">2. Returns & Refunds</h4>
                <p className="text-muted">Not satisfied with your purchase? You have 30 days from the delivery date to return your items.</p>
                <ul className="text-muted small">
                  <li>Items must be unworn, in their original packaging, and with all tags attached.</li>
                  <li>Refunds will be processed to the original payment method within 5-10 business days.</li>
                </ul>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">3. Exchanges</h4>
                <p className="text-muted">Need a different size? We offer free exchanges for size changes within the EU.</p>
                <ul className="text-muted small">
                  <li>Contact our support team to initiate an exchange.</li>
                  <li>Exchanges are subject to stock availability.</li>
                </ul>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">4. Damaged or Faulty Items</h4>
                <p className="text-muted">If you receive a damaged item, please contact us immediately with photos of the product.</p>
                <ul className="text-muted small">
                  <li>We will provide a prepaid return label and offer a full refund or replacement.</li>
                </ul>
              </div>
            </div>

            <div id="privacy-policy" className="mb-5 py-4">
              <h2 className="fw-black text-uppercase mb-5">Privacy Policy</h2>
              <p className="text-muted mb-4">
                Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information when you use our website.
              </p>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">1. Information We Collect</h4>
                <ul className="text-muted small">
                  <li>Personal identifiers (name, email address, phone number).</li>
                  <li>Transaction details (purchase history, shipping address).</li>
                  <li>Usage data (IP address, browser type, pages visited).</li>
                </ul>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">2. How We Use Your Data</h4>
                <ul className="text-muted small">
                  <li>To process and deliver your orders.</li>
                  <li>To communicate with you about your account or purchases.</li>
                  <li>To improve our website and customer experience.</li>
                  <li>To send marketing communications (only if you opt-in).</li>
                </ul>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">3. Cookies & Tracking</h4>
                <p className="text-muted small">
                  We use cookies to enhance your experience, remember your preferences, and analyze our traffic. You can manage your cookie preferences through your browser settings.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">4. Third-Party Services</h4>
                <p className="text-muted small">
                  We may share your data with trusted partners (like shipping companies and payment processors) solely to fulfill our services to you.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">5. Data Security</h4>
                <p className="text-muted small">
                  We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">6. Your Rights</h4>
                <p className="text-muted small">
                  You have the right to access, correct, or delete your personal data. Contact us at privacy@mylittlesport.com for any requests.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h4 className="fw-bold mb-3">7. Contact Us</h4>
                <p className="text-muted small">
                  If you have any questions about these policies, please reach out to our support team at support@mylittlesport.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
