import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Import Components
import { Calendar } from "@natscale/react-calendar";

export default function Home() {
  //Redux
  const { login } = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();

  //States
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      setValue(val);
      navigate(
        `/todos/${val.getFullYear()}/${months[val.getMonth()]}/${val.getDate()}`
      );
    },
    [navigate]
  );

  //Effects
  useEffect(() => {
    if (login !== null && !login) {
      return navigate("/login");
    }
  }, [login, navigate]);

  useEffect(() => {
    document.title = "Diary | Home";
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Calendar value={value} onChange={onChange} />
    </div>
  );
}
