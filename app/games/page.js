import Link from 'next/link';
import { games } from '../../data/games';

export const metadata = {
  title: 'Accessible Games - A11Code',
  description:
    'Fun and educational games designed to be fully accessible for visually impaired users. Play in your browser with full keyboard and screen reader support.',
};

export default function GamesPage() {
  return (
    <>
      <section className="page-hero" aria-label="Games introduction">
        <div className="container">
          <h1>Accessible Games</h1>
          <p>
            Fun, educational games you can play right in your browser. Every game supports
            full keyboard navigation and screen reader announcements, so everyone can play
            and learn &mdash; no sight required.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Game list">
        <div className="container">
          <ul className="grid-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {games.map((game) => (
              <li key={game.id} className="card">
                <h2 style={{ fontSize: '1.25rem' }}>
                  <Link href={`/games/${game.id}`} style={{ textDecoration: 'none' }}>
                    {game.title}
                  </Link>
                </h2>
                <p>{game.description}</p>
                <div style={{ marginTop: '1rem' }}>
                  <Link
                    href={`/games/${game.id}`}
                    className="btn btn-primary"
                    aria-label={`Play ${game.title}`}
                  >
                    Play Now
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
