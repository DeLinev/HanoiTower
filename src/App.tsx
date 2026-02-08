import CookiePopup from "./components/common/CookiePopup";
import { GamePage } from "./pages/GamePage";
import NotFoundPage from "./pages/NotFoundPage";
import ScoreboardPage from "./pages/ScoreboardPage";
import ScorePage from "./pages/ScorePage";
import { StartPage } from "./pages/StartPage"
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <CookiePopup />

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/score/:nickname" element={<ScorePage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
