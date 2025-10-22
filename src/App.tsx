import { useState } from "react";
import { StartPage } from "./pages/StartPage"
import { GamePage } from "./pages/GamePage";
import type { Difficulty, GameStatistic } from "./types/game.types";
import { difficulties } from "./constants/game.constants";
import { ResultsPage } from "./pages/ResultsPage";

type PageType = 'start' | 'game' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>(difficulties[1]);
  const [gameStats, setGameStats] = useState<GameStatistic | null>(null);

  const handleGameStart = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentPage('game')
  }

  const handleGameComplete = (movesCount: number, timePassed: number, timeRemaining: number | null, isGameWon: boolean) => {
    const minMoves = Math.pow(2, difficulty.disks) - 1;
    const efficiency = Math.round((minMoves / movesCount) * 100);

    setGameStats({
      movesCount,
      timePassed,
      timeRemaining,
      difficulty,
      minMoves,
      efficiency,
      isGameWon
    });
    setCurrentPage('results');
  }

  return (
    <>
      {currentPage === 'start' && (
        <StartPage onGameStart={handleGameStart} />
      )}

      {currentPage === 'game' && (
        <GamePage difficulty={difficulty} onGameComplete={handleGameComplete} onQuit={() => setCurrentPage('start')} />
      )}

      {currentPage === 'results' && (
        <ResultsPage
          gameStatistic={gameStats!}
          onPlayAgain={() => setCurrentPage('game')}
          onMainMenu={() => setCurrentPage('start')}
        />
      )}
    </>
  )
}

export default App
