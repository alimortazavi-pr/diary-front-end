function layouts(state = { title: "", loading: false }, action) {
  switch (action.type) {
    case "SET_TITLE":
      return setTitle(state, action);
    case "SET_LOADING":
      return setLoading(state, action);
    default:
      return state;
  }
}

function setTitle(state, action) {
  const { title } = action.payload;

  return {
    ...state,
    title: title,
  };
}

function setLoading(state, action) {
  const { loading } = action.payload;

  return {
    ...state,
    loading: loading,
  };
}

export default layouts;
