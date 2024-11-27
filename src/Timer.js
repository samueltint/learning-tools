import { PieChart } from "@mui/x-charts";
import { useState } from "react";
import { useTimer } from "react-timer-hook";

function Timer() {
  const [workingTime, setWorkingTime] = useState(10);
  const [breakTime, setBreakTime] = useState(5);
  const [repetitions, setRepetitions] = useState(3);
  const [timerData, setTimerData] = useState([
    { id: 0, value: 1, color: "teal" },
  ]);

  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => console.warn("onExpire called"),
  });

  const handleStart = () => {
    const time = new Date();
    time.setMinutes(time.getMinutes() + workingTime);
    restart(time);
    const timerArray = [{ id: 0, value: 14, color: "black" }];
    let i = 0;
    while (i < repetitions) {
      timerArray.push(
        { id: 2 * i + 1, value: workingTime, color: "blue" },
        { id: 2 * i + 2, value: breakTime, color: "navy" }
      );
      i++;
    }
    setTimerData(timerArray);
  };

  return (
    <div>
      <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 pt-0 gap-4">
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 items-center">
          <label>Working Time: </label>
          <input
            className="py-2 px-3 rounded-lg border-none bg-slate-700 text-base text-white w-32"
            type="number"
            value={workingTime}
            onChange={(e) => setWorkingTime(Number(e.target.value))}
          />
          <label>Break Time: </label>
          <input
            className="py-2 px-3 rounded-lg border-none bg-slate-700 text-base text-white w-32"
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
          />
          <label>Repetitions: </label>
          <input
            className="py-2 px-3 rounded-lg border-none bg-slate-700 text-base text-white w-32"
            type="number"
            value={repetitions}
            onChange={(e) => setRepetitions(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="text-center flex flex-col w-full gap-4 p-8">
        <PieChart series={[{ data: timerData }]} width={400} height={200} />
        <div>
          <span>{minutes ?? "00"}</span>:<span>{seconds ?? "00"}</span>
        </div>
        <p>{isRunning ? "Running" : "Not running"}</p>
        <button onClick={handleStart}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <button
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            restart(time);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default Timer;
