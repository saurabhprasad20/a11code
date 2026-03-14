'use client';

import { useState } from 'react';
import Link from 'next/link';
import { courses } from '../data/courses';
import styles from './CourseDetail.module.css';

export default function CourseDetail({ courseId }) {
  const course = courses.find((c) => c.id === courseId);
  const [activeChapter, setActiveChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!course) {
    return (
      <div className="page-content">
        <div className="container">
          <h1>Course Not Found</h1>
          <p>
            The course you are looking for does not exist.{' '}
            <Link href="/courses">Browse all courses</Link>.
          </p>
        </div>
      </div>
    );
  }

  const chapter = course.chapters[activeChapter];
  const hasPrev = activeChapter > 0;
  const hasNext = activeChapter < course.chapters.length - 1;

  function goToChapter(index) {
    setActiveChapter(index);
    setSidebarOpen(false);
    document.getElementById('chapter-content')?.focus();
  }

  return (
    <>
      <section className="page-hero" aria-label="Course header">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumb}>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li aria-current="page">{course.title}</li>
            </ol>
          </nav>
          <h1>{course.title}</h1>
        </div>
      </section>

      <div className={`container ${styles.courseLayout}`}>
        <button
          className={styles.sidebarToggle}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-expanded={sidebarOpen}
          aria-controls="course-sidebar"
        >
          {sidebarOpen ? 'Hide Chapters' : 'Show Chapters'}
        </button>

        <aside
          id="course-sidebar"
          className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
          aria-label="Course chapters"
        >
          <nav>
            <h2 className={styles.sidebarTitle}>Chapters</h2>
            <ol className={styles.chapterList} role="list">
              {course.chapters.map((ch, index) => (
                <li key={ch.id}>
                  <button
                    className={`${styles.chapterButton} ${
                      index === activeChapter ? styles.chapterActive : ''
                    }`}
                    onClick={() => goToChapter(index)}
                    aria-current={index === activeChapter ? 'true' : undefined}
                  >
                    <span className={styles.chapterNumber}>{index + 1}.</span>
                    {ch.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article
          id="chapter-content"
          className={styles.content}
          tabIndex={-1}
          aria-label={`Chapter ${activeChapter + 1}: ${chapter.title}`}
        >
          <h2 className={styles.chapterTitle}>
            Chapter {activeChapter + 1}: {chapter.title}
          </h2>
          <div className={styles.chapterText}>
            {chapter.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <nav className={styles.chapterNav} aria-label="Chapter navigation">
            {hasPrev ? (
              <button
                className="btn btn-outline"
                onClick={() => goToChapter(activeChapter - 1)}
              >
                &larr; Previous: {course.chapters[activeChapter - 1].title}
              </button>
            ) : (
              <span></span>
            )}
            {hasNext ? (
              <button
                className="btn btn-primary"
                onClick={() => goToChapter(activeChapter + 1)}
              >
                Next: {course.chapters[activeChapter + 1].title} &rarr;
              </button>
            ) : (
              <span className={styles.courseComplete}>
                You have completed this course!
              </span>
            )}
          </nav>
        </article>
      </div>
    </>
  );
}
