import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import { Toast } from "assets/js/Swal";

//Import Actions
import { logOut } from "store/actions/auth";

export default function LogOut() {
  //Redux
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Other Hooks
  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    if (user.login !== null && !user.login) {
      return navigate("/login");
    } else {
      dispatch(logOut());
      Toast.fire({
        icon: "warning",
        title: "LogOut successfully",
      });
      return navigate("/login");
    }
  }, [user.login, navigate, dispatch]);

  return <></>;
}
