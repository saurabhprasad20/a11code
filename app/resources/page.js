import Link from 'next/link';
import { resources } from '../../data/resources';

export const metadata = {
  title: 'Resources - A11Code',
  description:
    'Accessible study materials and references for programming, mathematics, and science. Read screen-reader-friendly guides and cheat sheets right in your browser.',
};

export default function ResourcesPage() {
  return (
    <>
      <section className="page-hero" aria-label="Resources introduction">
        <div className="container">
          <h1>Resources</h1>
          <p>
            Accessible study materials and references for programming, mathematics, and
            science. Every guide is written in plain, screen-reader-friendly text that you can
            read right here in your browser &mdash; no downloads and no inaccessible PDFs.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Resource list">
        <div className="container">
          <table className="accessible-table" aria-label="Available resources">
            <caption style={{ textAlign: 'left', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem' }}>
              Study Materials and Reference Guides
            </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Topic</th>
                <th scope="col">Description</th>
                <th scope="col">Read</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td>
                    <strong>{resource.name}</strong>
                  </td>
                  <td>{resource.category}</td>
                  <td>{resource.description}</td>
                  <td>
                    <Link
                      href={`/resources/${resource.id}`}
                      className="btn btn-primary"
                      style={{ fontSize: '0.875rem', padding: '0.375rem 0.75rem', whiteSpace: 'nowrap' }}
                      aria-label={`Read ${resource.name}`}
                    >
                      Read
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
