import React, { useState } from "react";
import "./VideoUpload.css";
import VideoLogo from "../../Assets/videLogo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideoFileName,
  setVideoFileSize,
  setVideoUrl,
} from "./redux/actionVideoUpload";
import CustomProgressBar from "../Components/CustomProgressBar";

const VideoUploadSecond = () => {
  const [videoFile, setVideoFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Status: Waiting for file selection");
  const [enable, setEnable] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [chunkNum, setChunkNum] = useState(0);

  const userName = "Prakash Gupta";

  const chunkSize = 5 * 1024 * 1024; // 5 MB chunks we can adjust as needed
  let ws;

  const { videoURL, fileSize, fileName } = useSelector(
    (state) => state.reducerVideoUpload
  );
  const dispatch = useDispatch();

  const handleUploadButtonClick = () => {
    document.getElementById("videoFileInput").click();
  };
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];

    setVideoFile(file);
    dispatch(setVideoFileName(file?.name));
    dispatch(setVideoFileSize(file?.size));

    if (file) {
      setEnable(false);
      setStatus("Status: File is ready to upload");
      const videoObjectURL = URL.createObjectURL(file);
      dispatch(setVideoUrl(videoObjectURL));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setVideoFile(file);
    dispatch(setVideoFileName(file?.name));
    dispatch(setVideoFileSize(file?.size));
    if (file && file.type.startsWith("video/")) {
      setEnable(false);
      setStatus("Status: File is ready to upload");
      const videoObjectURL = URL.createObjectURL(file);
      dispatch(setVideoUrl(videoObjectURL));
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const sendChunk = (start) => {
    if (!videoFile) {
      setStatus("Status: No file selected.");
      return;
    }
    const end = Math.min(start + chunkSize, videoFile.size);
   
    if (start >= end) {
      setStatus("Status: Upload complete.");
      ws.close();
      return;
    }
    const chunk = videoFile.slice(start, end);
    const reader = new FileReader();
    
    reader.onload = () => {
      const arrayBuffer = reader.result;
      ws.send(arrayBuffer);
      const percentComplete = (end / videoFile.size) * 100;
      setProgress(`${percentComplete.toFixed(2)}`);
      setStatus(`Status: Uploading... ${percentComplete.toFixed(2)}%`);
      setChunkNum(end);
      sendChunk(end);
    };

    reader.readAsArrayBuffer(chunk);
  };

  const handleUploadClick = () => {
    if (!videoFile) {
      setStatus("Status: No file selected.");
      return;
    }
    setShowProgress(true);
    ws = new WebSocket("ws://10.10.11.11:3001");

    ws.onopen = () => {
      const header = `{"filename":"${videoFile.name}","size":${videoFile.size}, "userName":"${userName}", "totalChunks":${chunkNum}}`;
      ws.send(header);
      sendChunk(0);
    };
    ws.onmessage = (event) => {
      if (event.data === "NEXT") {
        // Server requests the next chunk
        // the sendChunk function is handling the next chunk
      } else {
        setStatus("Status: " + event.data);
      }
    };
    ws.onclose = () => {
      setStatus("Status: Connection closed.");
      setShowProgress(false);
    };
    ws.onerror = () => {
      setStatus("Status: WebSocket error.");
      ws.close();
    };
  };

  return (
    <div>
      <div className="titleText">Upload Your Video Here</div>
      <div className="statusView">{status}</div>
      <div className="center">
        <div className="flexRow">
          {!videoURL ? (
            <div
              onDrop={handleDrop}
              onDragOver={preventDefault}
              className="dragDropContainer"
            >
              <button className="emptyView" onClick={handleUploadButtonClick}>
                <div>
                  <img
                    src={VideoLogo}
                    alt="emptyVideoLogo"
                    className="videoLogoView"
                  />
                  <div className="lightText">Upload</div>
                  <div className="lightText">Or</div>
                  <div className="lightText">Drag and Drop</div>
                </div>
              </button>
            </div>
          ) : (
            <div>
              <video className="emptyView" controls muted={false} autoPlay>
                <source src={videoURL} type="video/mp4" />
              </video>
              <span className="fileText">
                File Name: <i>{fileName} </i>
              </span>
              |
              <span className="fileText">
                File Size: <i>{fileSize}</i> - bytes
              </span>
            </div>
          )}

          <div className="subContainer">
            <div>
              <input
                type="file"
                accept="video/*"
                id="videoFileInput"
                style={{ display: "none" }}
                onChange={handleVideoUpload}
              />
              <button className="buttonView" onClick={handleUploadButtonClick}>
                Choose File
              </button>
            </div>
            {showProgress ? (
              <CustomProgressBar
                bgColor="#8be78b"
                progress={progress}
                height={20}
              />
            ) : null}
            <div>
              <button
                disabled={enable}
                className="buttonView"
                onClick={handleUploadClick}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadSecond;
