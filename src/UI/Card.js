import { useState } from "react";

export const Card = ({ correct, symbol }) => {
  const [selected, setSelected] = useState(false);
  const colorVariants = {
    unselected: "bg-slate-800",
    correct: "bg-green-500",
    incorrect: "bg-rose-500",
  };

  const handleClick = () => {
    setSelected((clicked) => !clicked);
  };

  return (
    <div
      className={`grid ${
        selected
          ? correct
            ? colorVariants.correct
            : colorVariants.incorrect
          : colorVariants.unselected
      } aspect-square p-8 place-content-center text-5xl text-white rounded-lg transition-all`}
      onClick={handleClick}
    >
      {symbol.character}
    </div>
  );
};
