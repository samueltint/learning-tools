import alphabet from "./sets";
import { Navbar } from "./UI/Navbar";

function App() {
  return (
    <div className="bg-slate-700">
      <Navbar />
      {alphabet.map((symbol) => {
        return <div className="text-3xl text-red-500">{symbol.letter}</div>;
      })}
    </div>
  );
}

export default App;
