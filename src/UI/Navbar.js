export const Navbar = ({ setSelectedList, setAmount }) => {
  return (
    <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 gap-4">
      <div className="sm:flex-1 text-3xl leading-snug">Letter Recognition</div>
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
    </div></div>
  );
};
