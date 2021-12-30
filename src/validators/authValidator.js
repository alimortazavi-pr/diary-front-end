import * as yup from "yup";

export const registerValidator = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().min(8),
});

export const loginValidator = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(8),
});
