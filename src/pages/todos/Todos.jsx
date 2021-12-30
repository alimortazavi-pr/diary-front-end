import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Import Tools
import api from "api";

//Import Components
import Template from "components/layouts/Template";

//Import Components
import ToggleStatus from "components/todos/ToggleStatus";
import DeleteTodo from "components/todos/DeleteTodo";
import Swal from "assets/js/Swal";

export default function Todos() {
  //Redux
  const { login, user } = useSelector((state) => state.auth);

  //Other Hooks
  const params = useParams();

  //States
  const [todos, setTodos] = useState([]);

  //Effects
  useEffect(() => {
    document.title = "Diary | Todos";
  });

  useEffect(() => {
    api
      .get(`/todos/${params.year}/${params.month}/${params.day}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Swal.fire({
            icon: "error",
            text: err.response.data.message,
            timer: 2000,
          });
        }
      });
  }, [login, params, user]);

  return (
    <Template>
      <ul className="p-2 h-full overflow-auto pt-20">
        {todos.map((todo) => (
          <li
            className="flex items-center p-3 justify-between bg-gray-500 bg-opacity-10 rounded-lg mb-2"
            key={todo._id}
          >
            <Link
              to={`/todos/${todo._id}`}
              className={`text-lg text-black font-semibold ${
                todo.status ? "line-through" : ""
              }`}
            >
              {todo.title}
            </Link>
            <div className="flex items-center">
              <DeleteTodo todos={todos} setTodos={setTodos} todo={todo} />
              <Link
                to={`/todos/${todo._id}`}
                className="btn btn-ghost text-lg text-black p-2"
              >
                <i className="fa-duotone fa-eye"></i>
              </Link>
              <ToggleStatus todos={todos} setTodos={setTodos} todo={todo} />
            </div>
          </li>
        ))}
      </ul>
    </Template>
  );
}
