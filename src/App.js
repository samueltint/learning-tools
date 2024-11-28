import { Navbar } from "./UI/Navbar";
import LetterRecognition from "./LetterRecognition";
import Timer from "./Timer";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="bg-slate-700 flex flex-col font-comfortaa h-screen overflow-none">
      <Navbar/>
      <Routes>
        <Route path="/letter-recognition" element={<LetterRecognition />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="*" element={<Navigate to="/letter-recognition" replace />} />

      </Routes>

    </div>
  );
}

export default App;
