import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
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
  const [message, setMessage] = useState("");
  const [unit, setUnit] = useState("Minutes");

  let alarm = new Audio(timer);

  const handleStart = () => {
    const timerArray = [];
    let i = 0;
    while (i < repetitions) {
      timerArray.push({ time: workingTime, message: "Working Time" });
      if (i < repetitions - 1) {
        timerArray.push({ time: breakTime, message: "Break Time" });
      }
      i++;
    }
    setTimerData(timerArray);
    setStarted(true);

    const time = new Date();
    if (unit === "Seconds") {
      time.setSeconds(time.getSeconds() + timerArray[timerIndex].time);
    } else {
      time.setMinutes(time.getMinutes() + timerArray[timerIndex].time);
    }
    setMessage(timerArray[timerIndex].message);
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
        setMessage("All Done!");
      } else {
        const time = new Date();
        if (unit === "Seconds") {
          time.setSeconds(time.getSeconds() + timerData[timerIndex + 1].time);
        } else {
          time.setMinutes(time.getMinutes() + timerData[timerIndex + 1].time);
        }
        setMessage(timerData[timerIndex + 1].message);
        restart(time);
        setTimerIndex((index) => index + 1);
      }
    }
  };

  const {
    totalSeconds,
    totalMinutes,
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: new Date(), onExpire: handleExpire });

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
              value={
                100 -
                (totalSeconds /
                  (unit === "Seconds"
                    ? timerData[timerIndex].time
                    : timerData[timerIndex].time * 60)) *
                  100
              }
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
          <div className="text-center text-white text-4xl p-3">{message}</div>
        </div>
      ) : (
        <div className="text-right text-white grid grid-cols-2 items-center w-fit gap-4 p-8">
          <select
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
            className={
              "py-2 px-3 w-36 mx-auto rounded-lg border-none bg-slate-800 text-base text-white col-span-2"
            }
          >
            <option value="Seconds">Seconds</option>
            <option value="Minutes">Minutes</option>
          </select>

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
