import { GamePage } from "./pages/GamePage";
import { StartPage } from "./pages/StartPage"
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  )
}

export default App
