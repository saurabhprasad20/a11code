import Link from 'next/link';
import { courses } from '../../data/courses';

export const metadata = {
  title: 'Courses - A11Code',
  description:
    'Discover accessible programming courses designed for visually impaired students. Learn Python, Java, Web Accessibility, and more.',
};

export default function CoursesPage() {
  return (
    <>
      <section className="page-hero" aria-label="Courses introduction">
        <div className="container">
          <h1>Our Courses</h1>
          <p>
            Discover accessible programming courses designed for visually
            impaired students. Explore programming languages such as Python and
            Java, learn web accessibility principles, and gain hands-on
            experience with accessible practice exercises and examples.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Course catalog">
        <div className="container">
          <div className="grid-3">
            {courses.map((course) => (
              <article key={course.id} className="card">
                <h2 style={{ fontSize: '1.25rem' }}>{course.title}</h2>
                <p>{course.description}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                  {course.chapters.length} chapters
                </p>
                <Link
                  href={`/courses/${course.id}`}
                  className="btn btn-primary"
                >
                  Start Learning
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
