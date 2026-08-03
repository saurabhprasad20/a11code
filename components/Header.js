'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { courses } from '../data/courses';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const coursesRef = useRef(null);
  const coursesButtonRef = useRef(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/resources', label: 'Resources' },
    { href: '/games', label: 'Accessible Games' },
    { href: '/contact', label: 'Contact Us' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (coursesRef.current && !coursesRef.current.contains(event.target)) {
        setCoursesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCoursesOpen(false);
  }, [pathname]);

  function handleCoursesKeyDown(e) {
    if (e.key === 'Escape') {
      setCoursesOpen(false);
      coursesButtonRef.current?.focus();
    }
  }

  function isActive(href) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className={styles.header}>
      {/* Brand bar: title/logo, skip link, then theme toggle */}
      <div className={styles.brandbar}>
        <div className={styles.brandInner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true">
              <svg viewBox="0 0 40 40" focusable="false" aria-hidden="true">
                <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M13 14 L8 20 L13 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M27 14 L32 20 L27 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="15" r="2.3" fill="currentColor" />
                <path d="M15.5 19 H24.5 M20 19 V25 M20 25 L17.5 29 M20 25 L22.5 29" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.logoText}>A11Code</span>
          </Link>
          <p className={styles.tagline}>
            Empowering Visually Impaired Students in STEM
          </p>
        </div>

          <a href="#main-content" className="skip-nav">
            Skip to main content
          </a>

          <div className={styles.tools}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Navbar: its own sticky strip below the brand bar */}
      <div className={styles.navbar}>
        <div className={styles.navInner}>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className={styles.menuBar} aria-hidden="true"></span>
            <span className={styles.menuBar} aria-hidden="true"></span>
            <span className={styles.menuBar} aria-hidden="true"></span>
          </button>

          <nav
            id="main-navigation"
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
            aria-label="Main navigation"
          >
          <ul className={styles.navList} role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Courses dropdown */}
            <li
              ref={coursesRef}
              className={styles.dropdown}
              onKeyDown={handleCoursesKeyDown}
            >
              <button
                ref={coursesButtonRef}
                className={`${styles.navLink} ${styles.dropdownToggle}`}
                onClick={() => setCoursesOpen(!coursesOpen)}
                aria-expanded={coursesOpen}
                aria-controls="courses-dropdown-menu"
                aria-current={pathname.startsWith('/courses') ? 'page' : undefined}
              >
                Courses
                <span className={styles.dropdownArrow} aria-hidden="true">
                  {coursesOpen ? '\u25B2' : '\u25BC'}
                </span>
              </button>
              {coursesOpen && (
                <ul id="courses-dropdown-menu" className={styles.dropdownMenu} role="list">
                  <li>
                    <Link href="/courses" className={styles.dropdownItem}>
                      All Courses
                    </Link>
                  </li>
                  {courses.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={`/courses/${course.id}`}
                        className={styles.dropdownItem}
                      >
                        {course.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </header>
  );
}
