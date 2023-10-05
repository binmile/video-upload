const MODULE_KEY = "Video-Upload";

export const SET_VIDEO_URL = `${MODULE_KEY}_set_video_url`;
export const SET_FILE_NAME = `${MODULE_KEY}_set_file_name`;
export const SET_FILE_SIZE = `${MODULE_KEY}_set_file_size`;

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

