import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h2 className={styles.footerHeading}>A11Code</h2>
            <p className={styles.footerTagline}>
              Empowering Visually Impaired Minds in STEM
            </p>
          </div>

          <nav className={styles.footerSection} aria-label="Footer navigation">
            <h2 className={styles.footerHeading}>Quick Links</h2>
            <ul className={styles.footerLinks} role="list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/games">Accessible Games</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          <div className={styles.footerSection}>
            <h2 className={styles.footerHeading}>Connect</h2>
            <ul className={styles.footerLinks} role="list">
              <li>
                <a
                  href="https://www.linkedin.com/company/accessible-stem-education/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@codingaccess1673"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe on YouTube (opens in new tab)"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a href="mailto:saurabhiiitd@gmail.com">
                  saurabhiiitd@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} A11Code. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
