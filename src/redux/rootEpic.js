import { combineEpics } from "redux-observable";
import { epicGetVideoList } from "../screens/VideoUpload/redux/epicVideoUpload";

const rootEpic = combineEpics(epicGetVideoList);

export { rootEpic };
