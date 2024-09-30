import { useState } from "react";
import { alphabet } from "./sets";
import { Card } from "./UI/Card";
import { Navbar } from "./UI/Navbar";
import { Play } from "lucide-react";

function App() {
  const [selected, setSelected] = useState(
    alphabet[Math.floor(Math.random() * alphabet.length)]
  );

  const handlePlay = () => {
    const audio = new Audio(selected.url);
    audio.play();
  };

  return (
    <div className="bg-slate-700 font-comfortaa h-screen">
      <Navbar />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid place-items-center w-full">
          <div
            className="bg-slate-800 grid place-items-center aspect-square h-24 rounded-full hover:opacity-80 transition-all"
            onClick={handlePlay}
          >
            <Play className="stroke-white w-full h-full p-6" />
          </div>
        </div>
        <div className={`grid grid-cols-12 gap-4`}>
          {alphabet.map((symbol) => {
            return <Card correct={symbol === selected} symbol={symbol} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
