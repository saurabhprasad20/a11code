import { resources } from '../../data/resources';

export const metadata = {
  title: 'Resources - A11Code',
  description:
    'Accessible study materials for Mathematics and Science. Download screen-reader-friendly guides, cheat sheets, and reference materials.',
};

export default function ResourcesPage() {
  return (
    <>
      <section className="page-hero" aria-label="Resources introduction">
        <div className="container">
          <h1>Resources</h1>
          <p>
            Accessible study materials for Mathematics and Science. We believe
            every student deserves access to high-quality education. Our
            resources include readable text descriptions of key concepts, making
            it easy for visually impaired students to learn and understand.
            Explore our collection and gain the knowledge you need to succeed in
            STEM fields.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Resource list">
        <div className="container">
          <table className="accessible-table" aria-label="Available resources">
            <caption style={{ textAlign: 'left', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem' }}>
              Downloadable Study Materials and Guides
            </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr key={index}>
                  <td>
                    <strong>{resource.name}</strong>
                  </td>
                  <td>{resource.description}</td>
                  <td>
                    <a
                      href={resource.link}
                      className="btn btn-primary"
                      style={{ fontSize: '0.875rem', padding: '0.375rem 0.75rem' }}
                      aria-label={`Download ${resource.name}`}
                    >
                      Download
                    </a>
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
