import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Import Components
import Nav from "components/layouts/Nav";

export default function Template({ children }) {
  //Redux
  const {login} = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    if (login !== null && !login) {
      return navigate("/login");
    }
  }, [login, navigate]);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full h-full md:w-10/12 md:h-5/6 lg:w-8/12 lg:h-5/6 xl:w-6/12 xl:h-5/6 xl:rounded-xl relative shadow">
          <Nav />
          {children}
        </div>
      </div>
    </>
  );
}
