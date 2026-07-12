import Link from 'next/link';
import { resources, getResource } from '../../../data/resources';
import styles from './page.module.css';

export function generateStaticParams() {
  return resources.map((resource) => ({ resourceId: resource.id }));
}

export function generateMetadata({ params }) {
  const resource = getResource(params.resourceId);
  if (!resource) return { title: 'Resource Not Found - A11Code' };
  return {
    title: `${resource.name} - A11Code Resources`,
    description: resource.description,
  };
}

export default function ResourcePage({ params }) {
  const resource = getResource(params.resourceId);

  if (!resource) {
    return (
      <div className="page-content">
        <div className="container">
          <h1>Resource Not Found</h1>
          <p>
            The resource you are looking for does not exist.{' '}
            <Link href="/resources">Back to all resources</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero" aria-label={`${resource.name} introduction`}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumb}>
              <li>
                <Link href="/resources">Resources</Link>
              </li>
              <li aria-current="page">{resource.name}</li>
            </ol>
          </nav>
          <p className={styles.category}>{resource.category}</p>
          <h1>{resource.name}</h1>
          <p>{resource.description}</p>
        </div>
      </section>

      <section className="page-content" aria-label={resource.name}>
        <div className="container">
          <article className={styles.article}>
            {resource.sections.map((section) => (
              <section key={section.heading} className={styles.section}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </section>
            ))}

            <p className={styles.backLink}>
              <Link href="/resources">Back to all resources</Link>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
