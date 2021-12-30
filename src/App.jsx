import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

//Import Assets
import "assets/css/globals.css";
import "assets/fonts/fontawesome/css/all.min.css";
import '@natscale/react-calendar/dist/main.css';

//Import Tools
import api from "api";

//Import Router
import routes from "router";

//Import Actions
import { login, notLogin } from "store/actions/auth";

//Import Components

export default function App() {
  //Redux
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Other Hooks

  //Effects
  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if (token) {
        api
          .get("/check-login", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            dispatch(login({ token, user: response.data.user }));
          })
          .catch((err) => {
            console.log(err.response);
            dispatch(notLogin());
          });
      } else {
        dispatch(notLogin());
      }
    },
    // eslint-disable-next-line
    [user.login]
  );

  return (
    <>
      <Routes>
        {routes.map(({ path, Component, exact }) => {
          return (
            <Route
              key={path}
              path={path}
              exact={exact}
              element={
                <>
                  <Component />
                </>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}
