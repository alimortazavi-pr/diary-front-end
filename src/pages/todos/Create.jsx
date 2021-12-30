import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//Import Tools
import api from "api";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

//Import Validators
import { todoValidator } from "validators/todoValidator";

export default function Create() {
  //Redux
  const { login, user } = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();
  const params = useParams();

  //States
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ paths: [], messages: {} });

  //Effects
  useEffect(() => {
    if (login !== null && !login) {
      return navigate("/login");
    }
  }, [login, navigate]);

  useEffect(() => {
    document.title = "Diary | Create Todo";
  });

  //Functions
  function inputHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    //Validate and Send Request
    todoValidator
      .validate(form, { abortEarly: false })
      .then(() => {
        api
          .post(`/todos/${params.year}/${params.month}/${params.day}`, form, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Task Created",
            });
            setLoading(false);
            setForm({
              title: "",
              content: "",
            });
            setErrors({ paths: [], messages: {} });
            navigate(-1);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              text: err.response.data.message,
              timer: 2000,
            });
            setLoading(false);
          });
      })
      .catch((err) => {
        let errorsArray = { paths: [], messages: {} };
        err.inner.forEach((error) => {
          errorsArray = {
            paths: [...errorsArray.paths, error.path],
            messages: { ...errorsArray.messages, [error.path]: error.message },
          };
        });
        setErrors(errorsArray);
        setLoading(false);
      });
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-72">
        <form className="p-4 bg-gray-200 rounded-lg shadow-md" onSubmit={submit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Title</span>
            </label>
            <input
              type="text"
              placeholder="Taks 1 ..."
              className="input input-bordered bg-white text-black"
              name="title"
              value={form.title}
              onChange={inputHandler}
            />
            {errors.paths.includes("title") ? (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.messages.title}
                </span>
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text text-black">Content</span>
            </label>
            <textarea
              type="text"
              placeholder="To go to work ..."
              className="textarea textarea-bordered h-24 resize-none bg-white text-black"
              name="content"
              value={form.content}
              onChange={inputHandler}
            ></textarea>
            {errors.paths.includes("content") ? (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.messages.content}
                </span>
              </label>
            ) : (
              ""
            )}
          </div>
          <button
            className={`btn w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <p
            className="text-red-500 underline cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}
