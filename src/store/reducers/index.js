import { combineReducers } from "redux";

//Import Reducers
import auth from "store/reducers/auth";
import layouts from "store/reducers/layouts";

export default combineReducers({
    layouts,
    auth
});