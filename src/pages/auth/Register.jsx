import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

//Import Validators
import { registerValidator } from "validators/authValidator";

export default function Register() {
  //Redux
  const user = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();

  //States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ paths: [], messages: {} });

  //Effects
  useEffect(() => {
    if (user.login !== null && user.login) {
      return navigate("/");
    }
  }, [user.login, navigate]);

  useEffect(() => {
    document.title = "Diary | Register";
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
    registerValidator
      .validate(form, { abortEarly: false })
      .then(() => {
        api
          .post("/auth/register", form)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Register successfully | Please Login",
            });
            setLoading(false);
            setForm({
              name: "",
              email: "",
              password: "",
            });
            setErrors({ paths: [], messages: {} });
            navigate("/login");
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
    <>
      <div className="h-screen bg-dark-900 flex justify-center items-center">
        <div className="w-80">
          <h5 className="text-4xl text-zinc-800 text-center mb-11">Sign up.</h5>
          <div className="w-full flex flex-col items-center">
            <button className="btn border-2 border-gray-500 rounded-xl flex items-center text-gray-50 font-medium normal-case w-10/12 mb-2">
              <i className="fa-brands fa-google text-lg mr-3"></i>
              Continue with Google
            </button>
            <button className="btn border-2 border-gray-500 rounded-xl flex items-center text-gray-50 font-medium normal-case w-10/12">
              <i className="fa-brands fa-facebook text-lg mr-3"></i>
              Continue with Facebook
            </button>
            <p className="text-medium text-gray-400 my-2 text-center font-semibold">
              or
            </p>
            <form
              className="w-full flex flex-col items-center mb-5"
              onSubmit={submit}
            >
              <div className="form-control w-10/12 mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered border-2 rounded-xl"
                  name="name"
                  onChange={inputHandler}
                />
                {errors.paths.includes("name") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.name}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control w-10/12 mb-3">
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered border-2 rounded-xl"
                  name="email"
                  onChange={inputHandler}
                />
                {errors.paths.includes("email") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.email}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control w-10/12 mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered border-2 rounded-xl"
                  name="password"
                  onChange={inputHandler}
                />
                {errors.paths.includes("password") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.password}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                className={`btn w-10/12 mt-3 bg-gradient-to-tr from-sky-600 to-sky-300 border-0 rounded-xl normal-case ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
              >
                Sign up
              </button>
            </form>
            <p className="text-gray-500 text-xs font-semibold mb-2">
              Do have an account?
              <Link to="/login" className="text-gray-600 ml-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}