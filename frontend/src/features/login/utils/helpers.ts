export const getToken = () => {
  return localStorage.getItem("token");
};

export const validate = (values) => {
  const errors: any = {};
  if (!values.login) {
    errors.login = "Обязательное поле";
  }
  if (!values.password) {
    errors.password = "Обязательное поле";
  }
  return errors;
};
