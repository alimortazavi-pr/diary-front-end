//Import Tools

export default function Aside({ aside, setAside }) {
  //Redux

  //States

  //Effects

  //Functions

  return (
    <aside
      className={`z-10 w-screen h-screen fixed flex ${
        aside ? "left-0 opacity-100" : "-left-full opacity-0"
      } duration-300`}
    >
      <div className="w-10/12 md:w-5/12 lg:w-4/12 xl:w-2/12 h-full bg-white shadow-xl shadow-slate-500">
        <nav className="w-full h-14 shadow bg-white flex items-center justify-between pr-5 pl-4 mb-2">
          <h6 className="text-xl text-black font-semibold">Diary</h6>
          <span
            className="cursor-pointer"
            onClick={() => {
              setAside(false);
            }}
          >
            <i className="fa-solid fa-angle-left text-black text-lg"></i>
          </span>
        </nav>
      </div>
      <div
        className="w-2/12 md:w-7/12 lg:w-8/12 xl:w-10/12 h-full bg-gray-700 bg-opacity-10"
        onClick={() => setAside(false)}
      ></div>
    </aside>
  );
}
