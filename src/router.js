//Home
import Home from "pages/Home";
//Auth
import Register from "pages/auth/Register";
import Login from "pages/auth/Login";
import LogOut from "pages/auth/LogOut";
//Todos
import Todos from "pages/todos/Todos";
import CreateTodo from "pages/todos/Create";
import EditTodo from "pages/todos/Edit";
//Diary
import Diary from "pages/Diary";

const routes = [
  //Home
  {
    path: "/",
    Component: Home,
    exact: true
  },
  //Auth
  {
    path: "/register",
    Component: Register,
    exact: true
  },
  {
    path: "/login",
    Component: Login,
    exact: true
  },
  {
    path: "/logout",
    Component: LogOut,
    exact: true
  },
  //Todos
  {
    path: "/todos/:year/:month/:day",
    Component: Todos,
    exact: true
  },
  {
    path: "/todos/create/:year/:month/:day",
    Component: CreateTodo,
    exact: true
  },
  {
    path: "/todos/:id",
    Component: EditTodo,
    exact: true
  },
  //Diary
  {
    path: "/diary/:year/:month/:day",
    Component: Diary,
    exact: true
  },

];

export default routes;