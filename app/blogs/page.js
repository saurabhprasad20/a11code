'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogs } from '../../data/blogs';

const ITEMS_PER_PAGE = 3;

export default function BlogsPage() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const visibleBlogs = sortedBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < sortedBlogs.length;

  return (
    <>
      <section className="page-hero" aria-label="Blogs introduction">
        <div className="container">
          <h1>STEM Blog</h1>
          <p>
            Explore the world of STEM with our informative articles. From
            insights on accessible education to stories of successful visually
            impaired STEM professionals, our blog provides inspiration for
            students pursuing STEM careers.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Blog articles">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {visibleBlogs.map((blog) => (
              <article key={blog.id} className="card">
                <h2 style={{ fontSize: '1.25rem' }}>
                  <Link
                    href={`/blogs/${blog.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {blog.title}
                  </Link>
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </p>
                <p>{blog.summary}</p>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="btn btn-primary"
                  style={{ marginTop: '0.5rem' }}
                >
                  Read Full Article
                </Link>
              </article>
            ))}
          </div>

          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                className="btn btn-outline"
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                aria-label="View more blog articles"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
