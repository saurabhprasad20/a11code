import Link from 'next/link';
import { blogs } from '../../../data/blogs';

export function generateStaticParams() {
  return blogs.map((blog) => ({ blogId: blog.id }));
}

export function generateMetadata({ params }) {
  const blog = blogs.find((b) => b.id === params.blogId);
  if (!blog) return { title: 'Blog Not Found - A11Code' };
  return {
    title: `${blog.title} - A11Code Blog`,
    description: blog.summary,
  };
}

export default function BlogDetailPage({ params }) {
  const blog = blogs.find((b) => b.id === params.blogId);

  if (!blog) {
    return (
      <div className="page-content">
        <div className="container">
          <h1>Blog Post Not Found</h1>
          <p>
            The article you are looking for does not exist.{' '}
            <Link href="/blogs">Browse all articles</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero" aria-label="Article header">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol
              style={{
                display: 'flex',
                listStyle: 'none',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                fontSize: '0.95rem',
              }}
            >
              <li>
                <Link href="/blogs" style={{ color: '#e2e8f0' }}>
                  Blog
                </Link>
                <span style={{ marginLeft: '0.5rem', color: '#a0aec0' }}>/</span>
              </li>
              <li aria-current="page" style={{ color: '#e2e8f0' }}>
                {blog.title}
              </li>
            </ol>
          </nav>
          <h1>{blog.title}</h1>
          <p style={{ marginTop: '0.5rem' }}>
            <time dateTime={blog.date}>
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </div>
      </section>

      <article className="page-content" aria-label="Article content">
        <div className="container" style={{ maxWidth: '48rem' }}>
          {blog.content.split('\n\n').map((paragraph, i) => (
            <p key={i} style={{ marginBottom: '1.25rem', lineHeight: '1.8' }}>
              {paragraph}
            </p>
          ))}
          <nav aria-label="Blog navigation" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <Link href="/blogs" className="btn btn-outline">
              &larr; Back to All Articles
            </Link>
          </nav>
        </div>
      </article>
    </>
  );
}
