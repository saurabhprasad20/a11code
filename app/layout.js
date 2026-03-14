import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'A11Code - Empowering Visually Impaired Minds in STEM',
  description:
    'A coding platform for visually impaired students offering accessible programming courses, digitized study materials, blogs, and resources for STEM education.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
