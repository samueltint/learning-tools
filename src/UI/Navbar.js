import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const pages = [
    { name: "Letter Recognition", link: "/letter-recognition" },
    { name: "Timer", link: "/timer" },
  ];
  return (
    <div className="bg-slate-900 w-full text-white flex flex-col sm:flex-row items-center p-4 gap-14">
      <div className="text-3xl text-white">Learning Tools</div>

      {pages.map((page, i) => (
        <NavLink
          to={page.link}
          className={`text-2xl text-slate-300 hover:underline order-2`}
        >
          {page.name}
        </NavLink>
      ))}
    </div>
  );
};
