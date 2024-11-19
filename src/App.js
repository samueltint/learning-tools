import { Navbar } from "./UI/Navbar";
import LetterRecognition from "./LetterRecognition";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("Letter Recognition");
  return (
    <div className="bg-slate-700 font-comfortaa h-screen overflow-none">
      <Navbar page={page} setPage={setPage} />
      {page === "Letter Recognition" ? <LetterRecognition /> : <div />}
    </div>
  );
}

export default App;
