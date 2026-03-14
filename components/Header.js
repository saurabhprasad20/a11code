'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { courses } from '../data/courses';
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
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="A11Code - Home">
          <span className={styles.logoIcon} aria-hidden="true">&#9881;</span>
          <span className={styles.logoText}>A11Code</span>
        </Link>

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
                aria-haspopup="true"
                aria-current={pathname.startsWith('/courses') ? 'page' : undefined}
              >
                Courses
                <span className={styles.dropdownArrow} aria-hidden="true">
                  {coursesOpen ? '\u25B2' : '\u25BC'}
                </span>
              </button>
              {coursesOpen && (
                <ul className={styles.dropdownMenu} role="list">
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
    </header>
  );
}
