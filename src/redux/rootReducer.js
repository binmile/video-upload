import { combineReducers } from "redux";
import reducerVideoUpload from "../screens/VideoUpload/redux/reducerVideoUpload";

const rootReducer = combineReducers({
  reducerVideoUpload,
});

export { rootReducer };
