export const metadata = {
  title: 'Contact Us - A11Code',
  description:
    'Get in touch with A11Code. We are here to help with accessible STEM education.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero" aria-label="Contact introduction">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            We would love to hear from you. Whether you have questions, need
            help, or want to share feedback, please do not hesitate to reach out.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Contact information">
        <div className="container" style={{ maxWidth: '42rem' }}>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2>Get in Touch</h2>
            <p>
              If you need any assistance with our courses, resources, or
              anything related to accessible STEM education, we are here to
              help. Feel free to contact us through any of the following
              channels.
            </p>
            <dl style={{ marginTop: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <dt style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Email</dt>
                <dd>
                  <a href="mailto:saurabhiiitd@gmail.com">
                    saurabhiiitd@gmail.com
                  </a>
                </dd>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <dt style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Phone</dt>
                <dd>
                  <a href="tel:+918979515501">+91 8979515501</a>
                </dd>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <dt style={{ fontWeight: 700, marginBottom: '0.25rem' }}>LinkedIn</dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/company/accessible-stem-education/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Accessible STEM Education on LinkedIn (opens in new tab)"
                  >
                    Accessible STEM Education
                  </a>
                </dd>
              </div>
              <div>
                <dt style={{ fontWeight: 700, marginBottom: '0.25rem' }}>YouTube</dt>
                <dd>
                  <a
                    href="https://www.youtube.com/@codingaccess1673"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Coding Access on YouTube (opens in new tab)"
                  >
                    Coding Access
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="card">
            <h2>About the Founder</h2>
            <p>
              I am Saurabh Prasad, a 2023 IIIT Delhi Computer Science graduate
              and currently working as a software engineer at Microsoft. I am a
              learning enthusiast, passionate about programming and building
              ideas against existing barriers.
            </p>
            <p>
              Through A11Code, my goal is to ensure that no student ever has to
              quit Mathematics or Science due to lack of accessible resources,
              guidance, or support. Everyone willing to master technical skills
              should have the opportunity to do so without barriers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
