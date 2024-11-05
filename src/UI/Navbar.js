import { alphabet, numbers } from "../lists";

export const Navbar = ({ list, setList, setAmount }) => {
  const handleList = (value) => {
    switch (value) {
      case "alphabet":
        setList(alphabet);
        break;
      case "numbers":
        setList(numbers);
        break;
    }
  };

  const handleAmount = (value) => {
    switch (value) {
      case "5":
        setAmount(5);
        break;
      case "10":
        setAmount(10);
        break;
      case "full set":
        setAmount(list.size);
        break;
    }
  };

  return (
    <div className="bg-slate-900 w-full text-3xl text-white flex items-center px-4 gap-4">
      <div className="flex-1 p-4 leading-snug">Letter Recognition</div>

      <select
        onChange={(e) => handleList(e.target.value)}
        className={
          "py-2 px-3 rounded-lg border-none bg-slate-700 text-sm text-white"
        }
      >
        <option value="alphabet">Alphabet</option>
        <option value="numbers">Numbers</option>
      </select>

      <select
        onChange={(e) => handleAmount(e.target.value)}
        className={
          "py-2 px-3 rounded-lg border-none bg-slate-700 text-sm text-white"
        }
      >
        <option value="full set">Full Set</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
};
