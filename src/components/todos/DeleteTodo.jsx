import { useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

export default function ToggleStatus({ todo, todos, setTodos }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  function deleteTodo() {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/todos/${todo._id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then(() => {
            Toast.fire({
              icon: "warning",
              title: "Task Deleted",
            });
            setTodos([...todos.filter((td) => td._id !== todo._id)]);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              text: err.response.data.message,
              timer: 2000,
            });
          });
      }
    });
  }

  return (
    <button
      className="btn btn-ghost text-lg text-black p-2"
      onClick={deleteTodo}
    >
      <i className="fa-duotone fa-trash"></i>
    </button>
  );
}
