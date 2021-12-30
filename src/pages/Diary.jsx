import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//Import Tools
import api from "api";
import { CKEditor } from "ckeditor4-react";

//Import Components
import Template from "components/layouts/Template";
import Swal, { Toast } from "assets/js/Swal";

export default function Diary() {
  //Redux
  const { login, user } = useSelector((state) => state.auth);

  //Other Hooks
  const params = useParams();
  const navigate = useNavigate();

  //States
  const [content, setContent] = useState("");
  const [showCK, setShowCK] = useState(false);
  const [loading, setLoading] = useState(false);

  //Effects
  useEffect(() => {
    document.title = "Diary | Diary";
  });

  useEffect(() => {
    api
      .get(`/diaries/${params.year}/${params.month}/${params.day}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setContent(response.data.diary.content);
        setShowCK(true);
      })
      .catch((err) => {
        if (err.response.data.message) {
          if (err.response.data.message === "Diary not found") {
            Swal.fire({
              title: "Do you want to create this diary?",
              text: "The diary has not been created yet. Do you want to create it?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, create it!",
            }).then((result) => {
              if (result.isConfirmed) {
                api
                  .post(
                    `/diaries/${params.year}/${params.month}/${params.day}`,
                    {},
                    {
                      headers: { Authorization: `Bearer ${user.token}` },
                    }
                  )
                  .then(() => {
                    setShowCK(true);
                    Toast.fire({
                      icon: "success",
                      title: "Diary Created",
                    });
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: "error",
                      text: err.response.data.message,
                      timer: 2000,
                    });
                  });
              }
              if (result.isDismissed) {
                navigate(-1);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              text: err.response.data.message,
              timer: 2000,
            });
          }
        }
      });
  }, [login, params, user, navigate]);

  //functions
  function submit(e) {
    e.preventDefault();
    setLoading(true);
    api
      .put(
        `/diaries/${params.year}/${params.month}/${params.day}`,
        { content },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Diary Updated",
        });
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response.data.message,
          timer: 2000,
        });
        setLoading(false);
      });
  }

  return (
    <Template>
      <form className="pt-20 h-full p-2 overflow-auto" onSubmit={submit}>
        <button
          className={`btn btn-error btn-outline w-full mb-2 btn-sm ${
            loading ? "loading" : ""
          }`}
          disabled={loading}
        >
          Save
        </button>
        {showCK ? (
          <CKEditor
            name="content"
            initData={content}
            onChange={(event) => setContent(event.editor.getData())}
          />
        ) : (
          ""
        )}
      </form>
    </Template>
  );
}
