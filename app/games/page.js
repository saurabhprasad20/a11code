import { games } from '../../data/games';

export const metadata = {
  title: 'Accessible Games - A11Code',
  description:
    'Fun and educational games designed to be fully accessible for visually impaired users. Build your skills while having fun.',
};

export default function GamesPage() {
  return (
    <>
      <section className="page-hero" aria-label="Games introduction">
        <div className="container">
          <h1>Accessible Games</h1>
          <p>
            Fun, educational games designed to be fully accessible. Each game
            supports keyboard navigation and screen reader announcements so
            everyone can play and learn.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Game list">
        <div className="container">
          <div className="grid-2">
            {games.map((game) => (
              <article key={game.id} className="card">
                <h2 style={{ fontSize: '1.25rem' }}>{game.title}</h2>
                <p>{game.description}</p>
                <div style={{ marginTop: '1rem' }}>
                  <a
                    href={game.link}
                    className="btn btn-accent"
                    aria-label={`Play ${game.title}`}
                  >
                    {game.type === 'web' ? 'Play Now' : 'Download'}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
