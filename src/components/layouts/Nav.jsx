import { Link, useLocation, useParams } from "react-router-dom";

export default function Nav() {
  //Other Hooks
  const location = useLocation();
  const params = useParams();

  return (
    <nav className="absolute top-0 h-16 w-full flex items-center justify-between pl-4 pr-2 bg-white z-50 md:rounded-t-xl shadow">
      {/* <p className="text-black text-xl font-semibold">
        {location.pathname.includes("todos") ? "Tasks" : "Diary"}
      </p> */}
      <div className="flex">
        <Link
          to={`/todos/${params.year}/${params.month}/${params.day}`}
          className={` ${
            location.pathname.includes("todos") ? "text-black" : "text-gray-400"
          } text-xl font-semibold cursor-pointer`}
        >
          Tasks
        </Link>
        <p className="mx-2 text-black">|</p>
        <Link
          to={`/diary/${params.year}/${params.month}/${params.day}`}
          className={`${
            location.pathname.includes("diary") ? "text-black" : "text-gray-400"
          } text-xl font-semibold cursor-pointer`}
        >
          Diary
        </Link>
      </div>
      <div>
        <Link to="/" className="text-black text-lg btn btn-ghost btn-circle">
          <i className="fa-duotone fa-calendar"></i>
        </Link>
        <Link
          to={`/todos/create/${params.year}/${params.month}/${params.day}`}
          className="text-black text-lg btn btn-ghost btn-circle"
        >
          <i className="fa-solid fa-plus"></i>
        </Link>
        <Link
          to="/logout"
          className="text-black text-lg btn btn-ghost btn-circle"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </Link>
      </div>
    </nav>
  );
}
