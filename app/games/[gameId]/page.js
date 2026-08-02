import Link from 'next/link';
import { games, getGame } from '../../../data/games';
import TypingTest from '../../../components/games/TypingTest';
import HandCricket from '../../../components/games/HandCricket';
import styles from './page.module.css';

const GAME_COMPONENTS = {
  'typing-test': TypingTest,
  'hand-cricket': HandCricket,
};

export function generateStaticParams() {
  return games.map((game) => ({ gameId: game.id }));
}

export function generateMetadata({ params }) {
  const game = getGame(params.gameId);
  if (!game) return { title: 'Game Not Found - A11Code' };
  return {
    title: `${game.title} - A11Code Games`,
    description: game.description,
  };
}

export default function GamePage({ params }) {
  const game = getGame(params.gameId);
  const GameComponent = GAME_COMPONENTS[params.gameId];

  if (!game || !GameComponent) {
    return (
      <div className="page-content">
        <div className="container">
          <h1>Game Not Found</h1>
          <p>
            The game you are looking for does not exist.{' '}
            <Link href="/games">Back to all games</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero" aria-label={`${game.title} introduction`}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumb}>
              <li>
                <Link href="/games">Accessible Games</Link>
              </li>
              <li aria-current="page">{game.title}</li>
            </ol>
          </nav>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
        </div>
      </section>

      <section className="page-content" aria-label={`Play ${game.title}`}>
        <div className="container">
          <GameComponent />
        </div>
      </section>
    </>
  );
}
