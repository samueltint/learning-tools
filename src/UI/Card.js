export const Card = ({
  correct,
  symbol,
  selected,
  setSelected,
  handleCorrect,
}) => {
  const colorVariants = {
    unselected: "bg-slate-800",
    correct: "bg-green-500",
    incorrect: "bg-rose-500",
  };

  const handleClick = () => {
    if (selected === symbol) {
      setSelected(null);
    } else {
      setSelected(symbol);
    }
    if (correct === symbol) {
      handleCorrect();
    }
  };

  return (
    <div
      className={`grid ${
        selected === symbol
          ? correct === symbol
            ? colorVariants.correct
            : colorVariants.incorrect
          : colorVariants.unselected
      } aspect-square p-8 place-content-center text-5xl text-white rounded-lg transition-all hover`}
      onClick={handleClick}
    >
      {symbol.character}
    </div>
  );
};
