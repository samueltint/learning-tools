export const Navbar = ({ page, setPage }) => {
  const pages = ["Letter Recognition", "Timer"];
  return (
    <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 gap-14">
      {pages.map((p, i) => (
        <button
          className={
            p === page
              ? "text-3xl text-white"
              : `text-3xl text-slate-300 hover:underline`
          }
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};
