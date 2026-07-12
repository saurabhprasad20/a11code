import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RouteFocus from '../components/RouteFocus';

export const metadata = {
  title: 'A11Code \u2014 Breaking Barriers in STEM',
  description:
    'A coding platform for visually impaired students offering accessible programming courses, digitized study materials, blogs, and resources for STEM education.',
};

export default function RootLayout({ children }) {
  const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <RouteFocus />
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
