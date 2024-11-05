import { useEffect, useState } from "react";
import { alphabet, numbers } from "./lists";
import { Card } from "./UI/Card";
import { Navbar } from "./UI/Navbar";
import { Play, Volume2 } from "lucide-react";

function App() {
  const correctMessages = ["Good job", "Nice!", "Correct!"];

  const [started, setStarted] = useState(false);
  const [list, setList] = useState(alphabet);
  const [amount, setAmount] = useState(alphabet.length);
  const [message, setMessage] = useState("Start");

  const [correct, setCorrect] = useState(
    list[Math.floor(Math.random() * list.length)]
  );

  const [selected, setSelected] = useState();

  useEffect(() => {
    
  }, [amount, list])

  useEffect(() => {
    if (correct && started) {
      const audio = new Audio(correct.sound);
      audio.play();
    }
  }, [correct]);

  const handlePlay = () => {
    if (!started) {
      setStarted(true);
      setMessage("What letter is this?");

    }
    if (selected === correct) {
      setCorrect(list[Math.floor(Math.random() * list.length)]);
      setSelected();
      setMessage("What letter is this?");
    } else {
      setTimeout(() => {
        const audio = new Audio(correct.sound);
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
      <Navbar list={list} setList={setList} setAmount={setAmount}/>
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
        <div className={`flex flex-wrap gap-4 justify-center`}>
          {list.map((symbol) => {
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
