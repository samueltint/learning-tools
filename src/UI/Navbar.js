import { NavLink } from "react-router-dom";

export const Navbar = ({ page, setPage }) => {
  console.log(page);
  const pages = [
    { name: "Letter Recognition", link: "/letter-recognition" },
    { name: "Timer", link: "/timer" },
  ];
  return (
    <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 gap-14">
      {pages.map((p, i) =>
        p.name === page.name ? (
          <div className="text-3xl text-white order-1">{p.name}</div>
        ) : (
          <NavLink
            to={p.link}
            className={`text-3xl text-slate-300 hover:underline order-2`}
            onClick={() => setPage(p)}
          >
            {p.name}
          </NavLink>
        )
      )}
    </div>
  );
};
