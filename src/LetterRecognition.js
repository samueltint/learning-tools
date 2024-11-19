import { Play, Volume2 } from "lucide-react";
import { Card } from "./UI/Card";
import { alphabet, numbers } from "./lists";
import { useEffect, useState } from "react";

function LetterRecognition() {
  const correctMessages = ["Good job", "Nice!", "Correct!"];

  const [selectedList, setSelectedList] = useState("alphabet");
  const [amount, setAmount] = useState("full set");

  const [attemptNumber, setAttemptNumber] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [questionAttempted, setQuestionAttempted] = useState(false);

  let audio;
  const [list, setList] = useState(alphabet);
  const [message, setMessage] = useState("Start");

  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState();
  const [correct, setCorrect] = useState(
    list[Math.floor(Math.random() * list.length)]
  );

  useEffect(() => {
    refreshList();
  }, [amount, selectedList]);

  useEffect(() => {
    if (correct && started) {
      playAudio();
    }
  }, [correct]);

  const handlePlay = () => {
    if (!started) {
      setStarted(true);
      setMessage("What letter is this?");
    }
    if (selected === correct) {
      refreshList();
      setSelected();
      setQuestionAttempted(false);
      setMessage("What letter is this?");
    } else {
      setTimeout(() => {
        playAudio();
      }, 100);
    }
  };

  const handleCorrect = () => {
    if (!questionAttempted) {
      setCorrectNumber((prev) => prev + 1);
      setMessage(
        correctMessages[Math.floor(Math.random() * correctMessages.length)]
      );
    }
  };

  const refreshList = () => {
    setSelected();

    let newList = [];
    switch (selectedList) {
      case "alphabet":
        console.log("alphabet");
        newList = [...alphabet];
        break;
      case "numbers":
        console.log("numbers");
        newList = [...numbers];
        break;
      default:
        console.log("list default");
        break;
    }

    switch (amount) {
      case "5":
        console.log("5");
        newList = randomiseList(newList).slice(0, 5);
        break;
      case "10":
        console.log("10");
        newList = randomiseList(newList).slice(0, 10);
        break;
      default:
        console.log("amount default");
        break;
    }

    setList(newList);
    const filteredList = newList.filter((letter) => letter !== correct);
    setCorrect(filteredList[Math.floor(Math.random() * filteredList.length)]);
  };

  const randomiseList = (set) => {
    const setCopy = [...set];
    for (let i = setCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [setCopy[i], setCopy[j]] = [setCopy[j], setCopy[i]];
    }
    return setCopy;
  };

  const playAudio = () => {
    audio = new Audio(correct.sound);
    audio.play();
  };

  return (
    <div>
      <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 pt-0 gap-4">
        <div className="flex gap-4">
          <select
            onChange={(e) => setSelectedList(e.target.value)}
            className={
              "py-2 px-3 rounded-lg border-none bg-slate-700 text-base text-white"
            }
          >
            <option value="alphabet">Alphabet</option>
            <option value="numbers">Numbers</option>
          </select>

          <select
            onChange={(e) => setAmount(e.target.value)}
            className={
              "py-2 px-3 rounded-lg border-none bg-slate-700 text-base text-white"
            }
          >
            <option value="full set">Full Set</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col bg-slate-700 items-stretch gap-4 p-4 overflow-auto">
        <div className="text-center text-white text-4xl p-3">{message}</div>
        <div className="flex w-full items-center gap-4">
          <div className="flex-1" />
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
          {/* <div className=" flex-1 text-left text-white text-4xl">{correctNumber ? correctNumber + "/" + attemptNumber : ""}</div> */}
          <div className=" flex-1 text-left text-white text-4xl">
            {correctNumber + "/" + attemptNumber}
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
                setAttemptNumber={setAttemptNumber}
                questionAttempted={questionAttempted}
                setQuestionAttempted={setQuestionAttempted}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LetterRecognition;
