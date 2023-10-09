const MODULE_KEY = "Video-Upload";

export const SET_VIDEO_URL = `${MODULE_KEY}_SET_VIDEO_URL`;
export const SET_FILE_NAME = `${MODULE_KEY}_SET_FILE_NAME`;
export const SET_FILE_SIZE = `${MODULE_KEY}_SET_FILE_SIZE`;
export const GET_VIDEO_LIST = `${MODULE_KEY}_GET_VIDEO_LIST`;
export const GOT_VIDEO_LIST = `${MODULE_KEY}_GOT_VIDEO_LIST`;
export const ERROR_GETTING_VIDEO_LIST = `${MODULE_KEY}_ERROR_GETTING_VIDEO_LIST`;

export const setVideoUrl = (videoUrl) => ({
  type: SET_VIDEO_URL,
  payload: videoUrl,
});

export const setVideoFileName = (name) => ({
  type: SET_FILE_NAME,
  payload: name,
});

export const setVideoFileSize = (size) => ({
  type: SET_FILE_SIZE,
  payload: size,
});

export const getVideoList = () => ({
  type: GET_VIDEO_LIST,
  payload: {},
});

export const gotVideoList = (data) => ({
  type: GOT_VIDEO_LIST,
  payload: { data },
});
export const errorGettingVideoList = (err) => ({
  type: ERROR_GETTING_VIDEO_LIST,
  payload: { err },
});
