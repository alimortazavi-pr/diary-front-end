import * as yup from "yup";

export const todoValidator = yup.object().shape({
  title: yup.string().required(),
});