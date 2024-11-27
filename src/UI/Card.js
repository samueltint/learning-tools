export const Card = ({
  correct,
  symbol,
  selected,
  setSelected,
  handleCorrect,
  setAttemptNumber,
  questionAttempted,
  setQuestionAttempted,
}) => {
  const colorVariants = {
    unselected: "bg-slate-800",
    correct: "bg-green-500",
    incorrect: "bg-rose-500",
  };

  const handleClick = () => {
    if (!questionAttempted) {
      setQuestionAttempted(true)
      setAttemptNumber((prev) => prev + 1);
    }
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
      } aspect-square p-4 sm:p-8 text-3xl sm:text-5xl text-white rounded-lg transition-all hover`}
      onClick={handleClick}
    >
      <div className="aspect-square text-center">{symbol.character}</div>
    </div>
  );
};
