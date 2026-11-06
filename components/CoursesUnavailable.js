export const unavailableMetadata = {
  title: 'In progress - A11Code',
  description: 'In progress. Please check back later.',
};

export default function CoursesUnavailable() {
  return (
    <section className="page-hero" aria-labelledby="courses-status-heading">
      <div className="container">
        <h1 id="courses-status-heading">In progress</h1>
        <p>Please check back later.</p>
      </div>
    </section>
  );
}
