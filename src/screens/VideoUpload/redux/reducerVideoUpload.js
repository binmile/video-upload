import {
  SET_FILE_NAME,
  SET_FILE_SIZE,
  SET_VIDEO_URL,
} from "./actionVideoUpload";

const initialState = {
  videoURL: null,
  fileName: "",
  fileSize: 0,
};

const reducerVideoUpload = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_URL:
      return {
        ...state,
        videoURL: action.payload,
      };
    case SET_FILE_NAME:
      return {
        ...state,
        fileName: action.payload,
      };
    case SET_FILE_SIZE:
      return {
        ...state,
        fileSize: action.payload,
      };

    default:
      return state;
  }
};

export default reducerVideoUpload;
