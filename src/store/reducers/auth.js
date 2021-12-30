function auth(state = { login: null }, action) {
  switch (action.type) {
    case "LOGIN":
      return login(action);
    case "NOT_LOGIN":
      return notLogin();
    case "LOGOUT":
      return logOut();
    default:
      return state;
  }
}

function login(action) {
  const { user, token } = action.payload;
  return {
    login: true,
    user: {
      ...user,
      token,
    },
  };
}

function notLogin() {
  return {
    login: false,
  };
}

function logOut() {
  localStorage.removeItem("token");
  return {
    login: null,
  };
}

export default auth;
