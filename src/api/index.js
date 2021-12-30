import axios from "axios";

const api = axios.create({
    baseURL : "https://diary-am.herokuapp.com/api/v1",
});

export default api;