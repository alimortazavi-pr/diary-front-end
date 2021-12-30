import { useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

export default function ToggleStatus({ todo, todos, setTodos }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  function toggleStatus() {
    api
      .put(
        `/todos/toggle-status/${todo._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Task Updated",
        });
        setTodos([
          ...todos.map((td) => {
            if (td._id === todo._id) {
              td.status = !td.status;
            }
            return td;
          }),
        ]);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response.data.message,
          timer: 2000,
        });
      });
  }

  return (
    <>
      {todo.status ? (
        <button
          className="btn btn-ghost text-lg text-black p-2"
          onClick={toggleStatus}
        >
          <i className="fa-solid fa-check text-green-600"></i>
        </button>
      ) : (
        <button
          className="btn btn-ghost text-lg text-black p-2"
          onClick={toggleStatus}
        >
          <i className="fa-solid fa-xmark text-red-600"></i>
        </button>
      )}
    </>
  );
}
