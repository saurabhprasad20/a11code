import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const services = [
    {
      title: 'Programming Courses',
      description:
        'Accessible programming courses in Python, Java, and more — designed for screen reader users with hands-on exercises.',
      href: '/courses',
      linkLabel: 'Browse Courses',
    },
    {
      title: 'Study Materials',
      description:
        'Digitized, accessible study materials for Mathematics and Science subjects from class 8 onward.',
      href: '/resources',
      linkLabel: 'View Resources',
    },
    {
      title: 'STEM Blogs',
      description:
        'Informative articles and stories showcasing opportunities in STEM, including interviews with successful professionals.',
      href: '/blogs',
      linkLabel: 'Read Blogs',
    },
    {
      title: 'Accessible Games',
      description:
        'Fun, educational games designed to be fully accessible — build your skills while having fun.',
      href: '/games',
      linkLabel: 'Play Games',
    },
  ];

  return (
    <>
      <section className={styles.hero} aria-label="Welcome to A11Code">
        <div className="container">
          <h1 className={styles.heroTitle}>Welcome to A11Code</h1>
          <p className={styles.heroDescription}>
            A coding platform for visually impaired students. Our mission is to
            break down barriers and provide accessible resources, guidance, and
            support for those interested in pursuing STEM fields. We believe that
            everyone should have the opportunity to master technical skills,
            regardless of any challenges they may face.
          </p>
          <div className={styles.heroCta}>
            <Link href="/courses" className="btn btn-accent">
              Explore Courses
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="page-content" aria-label="Our services">
        <div className="container">
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <div className="grid-2">
            {services.map((service) => (
              <article key={service.title} className="card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={service.href} className="btn btn-primary" style={{ marginTop: '0.75rem' }}>
                  {service.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.about} aria-label="About the founder">
        <div className="container">
          <h2 className={styles.sectionTitle}>About the Founder</h2>
          <p>
            I am Saurabh Prasad, a 2023 Computer Science graduate from IIIT Delhi, now
            working as a software engineer at Microsoft. I started A11Code because far too
            many visually impaired students give up Mathematics and Science not for lack of
            ability, but for lack of accessible material, guidance, and encouragement.
          </p>
          <p>
            Everything here &mdash; the courses, the resources, the blog, and the games &mdash; is
            built and tested with screen readers and the keyboard first. If something is hard to
            use or a topic you need is missing, I want to hear about it, because this platform
            grows from the feedback of the people it is for.
          </p>
        </div>
      </section>
    </>
  );
}
