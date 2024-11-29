import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import timer from "./Sounds/timer.wav";
import { Pause, Play, TimerReset } from "lucide-react";

function Timer() {
  const [workingTime, setWorkingTime] = useState(5);
  const [breakTime, setBreakTime] = useState(3);
  const [repetitions, setRepetitions] = useState(3);
  const [started, setStarted] = useState(false);
  const [timerData, setTimerData] = useState();
  const [timerIndex, setTimerIndex] = useState(0);

  let alarm = new Audio(timer);

  const handleStart = () => {
    const timerArray = [];
    let i = 0;
    while (i < repetitions) {
      timerArray.push(workingTime, breakTime);
      i++;
    }
    setTimerData(timerArray);
    setStarted(true);

    const time = new Date();
    time.setMinutes(time.getMinutes() + timerArray[timerIndex]);
    restart(time);
  };

  const handleReset = () => {
    setStarted(false);
    setTimerData();
    setTimerIndex(0);
  };

  const handleExpire = () => {
    if (started) {
      alarm.play();
      if (timerIndex + 1 >= timerData.length) {
        handleReset();
      } else {
        const time = new Date();
        time.setMinutes(time.getMinutes() + timerData[timerIndex + 1]);
        restart(time);
        setTimerIndex((index) => index + 1);
      }
    }
  };

  const { totalSeconds, seconds, minutes, isRunning, pause, resume, restart } =
    useTimer({ expiryTimestamp: new Date(), onExpire: handleExpire });

  return (
    <div className="flex-1 flex flex-col items-center">
      {started ? (
        <div className="text-center flex-1 flex flex-col w-full gap-4 p-8">
          <div className="relative grid place-items-center">
            <CircularProgress
              className="absolute"
              variant="determinate"
              sx={{
                color: "#94a3b8",
              }}
              size={200}
              value={100}
            />
            <CircularProgress
              variant="determinate"
              size={200}
              value={100 - (totalSeconds / (workingTime * 60)) * 100}
            />
            <div className="absolute text-white text-5xl">
              <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
              <span>{seconds < 10 ? "0" + seconds : seconds}</span>{" "}
            </div>
          </div>
          <div className="flex justify-center gap-12">
            {isRunning ? (
              <div
                className="bg-slate-800 grid place-items-center aspect-square h-16 rounded-full hover:opacity-80 transition-all"
                onClick={pause}
              >
                <Pause className="stroke-white w-full h-full p-4" />
              </div>
            ) : (
              <div
                className="bg-slate-800 grid place-items-center aspect-square h-16 rounded-full hover:opacity-80 transition-all"
                onClick={resume}
              >
                <Play className="stroke-white w-full h-full p-4" />
              </div>
            )}
            <div
              className="bg-slate-800 grid place-items-center aspect-square h-16 rounded-full hover:opacity-80 transition-all"
              onClick={handleReset}
            >
              <TimerReset className="stroke-white w-full h-full p-4" />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-right text-white grid grid-cols-2 items-center w-fit gap-4 p-8">
          <label>Working Time: </label>
          <input
            className="py-2 px-3 rounded-lg border-none bg-slate-800 text-base text-white w-24"
            type="number"
            value={workingTime}
            onChange={(e) => setWorkingTime(Number(e.target.value))}
          />
          <label>Break Time: </label>
          <input
            className="py-2 px-3 rounded-lg border-none bg-slate-800 text-base text-white w-24"
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
          />
          <label>Repetitions: </label>
          <input
            className="py-2 px-3 rounded-lg border-none bg-slate-800 text-base text-white w-24"
            type="number"
            value={repetitions}
            onChange={(e) => setRepetitions(Number(e.target.value))}
          />
          <button className="col-span-2" onClick={handleStart}>
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default Timer;
