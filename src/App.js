import { Navbar } from "./UI/Navbar";
import LetterRecognition from "./LetterRecognition";
import Timer from "./Timer";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [page, setPage] = useState({name: "Letter Recognition", link: "/letter-recognition"});
  return (
    <div className="bg-slate-700 font-comfortaa h-screen overflow-none">
      <Navbar page={page} setPage={setPage}/>
      <Routes>
        <Route path="/letter-recognition" element={<LetterRecognition />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="*" element={<Navigate to="/letter-recognition" replace />} />

      </Routes>

    </div>
  );
}

export default App;
