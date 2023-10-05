import React from "react";
import "./App.css";
import VideoUpload from "./screens/VideoUpload/VideoUpload";
import { Provider } from "react-redux";
import store from "./redux/store";
// import VideoUploadSecond from "./screens/VideoUpload/VideoUploadSecond";

const App = () => {
  return (
    <Provider store={store}>
      <VideoUpload />
      {/* <VideoUploadSecond /> */}
    </Provider>
  );
};

export default App;
