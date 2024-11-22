import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

function Timer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    time,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div>
      <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 pt-0 gap-4">
        <div className="flex gap-4"> {/* selects*/}</div>
      </div>
      <div className="text-center flex flex-col w-full gap-4 p-8">
        <div>
          <span>{minutes ?? "00"}</span>:<span>{seconds ?? "00"}</span>
        </div>
        <p>{isRunning ? "Running" : "Not running"}</p>
        <button onClick={start}>Start</button>
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
