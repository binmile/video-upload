import {
  ERROR_GETTING_VIDEO_LIST,
  GET_VIDEO_LIST,
  GOT_VIDEO_LIST,
  SET_FILE_NAME,
  SET_FILE_SIZE,
  SET_VIDEO_URL,
} from "./actionVideoUpload";

const initialState = {
  videoURL: null,
  fileName: "",
  fileSize: 0,
  isLoading: false,
  videoListData: [],
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
    case GET_VIDEO_LIST:
      return {
        ...state,
        isLoading: true,
        videoListData: [],
      };
    case GOT_VIDEO_LIST:
      return {
        ...state,
        isLoading: false,
        videoListData: action.payload.data,
      };
    case ERROR_GETTING_VIDEO_LIST:
      return {
        ...state,
        isLoading: false,
        error: action.payload.err, // Include the error information.
      };

    default:
      return state;
  }
};

export default reducerVideoUpload;
