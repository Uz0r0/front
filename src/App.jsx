import './App.css';
import { Routes, Route } from "react-router-dom";
import MainPage from "../src/pages/MainPage/MainPage";
import StartPage from "../src/pages/StartPage/StartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/works/:bookId/chapters/:chapter" element={<MainPage />} />
    </Routes>
  );
}

export default App;
