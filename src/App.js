import { useState } from "react";
import { alphabet } from "./sets";
import { Card } from "./UI/Card";
import { Navbar } from "./UI/Navbar";
import { Play, Volume2 } from "lucide-react";

function App() {
  const correctMessages = ["Good job", "Nice!", "Correct!"];

  const [message, setMessage] = useState("What letter is this?");

  const [correct, setCorrect] = useState(
    alphabet[Math.floor(Math.random() * alphabet.length)]
  );

  const [selected, setSelected] = useState();

  const handlePlay = () => {
    if (selected === correct) {
      setCorrect(alphabet[Math.floor(Math.random() * alphabet.length)]);
      setSelected();
      setMessage("What letter is this?");
    } else {
      setTimeout(() => {
        const audio = new Audio(correct.url);
        audio.play();
      }, 100);
    }
  };

  const handleCorrect = () => {
    setMessage(
      correctMessages[Math.floor(Math.random() * correctMessages.length)]
    );
  };

  return (
    <div className="bg-slate-700 font-comfortaa h-screen">
      <Navbar />
      <div className="flex flex-col items-stretch gap-4 p-4">
        <div className="text-center text-white text-4xl p-3">{message}</div>
        <div className="grid place-items-center w-full">
          <div
            className="bg-slate-800 grid place-items-center aspect-square h-24 rounded-full hover:opacity-80 transition-all"
            onClick={handlePlay}
          >
            {selected === correct ? (
              <Play className="stroke-white w-full h-full p-6" />
            ) : (
              <Volume2 className="stroke-white w-full h-full p-6" />
            )}
          </div>
        </div>
        <div className={`grid grid-cols-12 gap-4`}>
          {alphabet.map((symbol) => {
            return (
              <Card
                key={symbol.character}
                symbol={symbol}
                correct={correct}
                selected={selected}
                setSelected={setSelected}
                handleCorrect={handleCorrect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
