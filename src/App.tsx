import { useState } from "react";
import { StartPage } from "./pages/StartPage"
import { GamePage } from "./pages/GamePage";
import type { Difficulty } from "./types/game.types";
import { difficulties } from "./constants/game.constants";

type PageType = 'start' | 'game' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>(difficulties[1]);

  const handleGameStart = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentPage('game')
  } 

  return (
    <>
      {currentPage === 'start' && (
        <StartPage onGameStart={handleGameStart} />
      )}
      
      {currentPage === 'game' && (
        <GamePage difficulty={difficulty}/>
      )}
    </>
  )
}

export default App
