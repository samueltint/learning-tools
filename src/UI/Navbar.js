import { NavLink } from "react-router-dom";

export const Navbar = ({ page, setPage }) => {
  const pages = [{name: "Letter Recognition", link: "/letter-recognition"}, {name: "Timer", link: "/timer"}];
  return (
    <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 gap-14">
      {pages.map((p, i) => (
        <NavLink to={p.link} className={
            p === page
              ? "text-3xl text-white"
              : `text-3xl text-slate-300 hover:underline`
          }           onClick={() => setPage(p)}
          >
          {p.name}</NavLink>

      ))}
    </div>
  );
};
