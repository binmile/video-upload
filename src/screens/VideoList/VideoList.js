import React, { useState } from "react";
import "./VideoList.css";
import EmptyPlayLogo from "../../Assets/video-play-button.png";
import RightLogo from "../../Assets/chevronRight.png";

const VideoList = ({ id, videoUrl, userName, date }) => {
  const [show, setShow] = useState(false);
  const filterDate = new Date(date);

  // Format the date as a string
  const formattedDate = filterDate.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return (
    <div className="listContainer">
      <div className="listMainContainer">
        <div className="flexRowBetween" onClick={() => setShow(!show)}>
          <div className="flexRow">
            <div className="listId">{id}</div>
            <div className="videoTypeUi">
              {videoUrl ? (
                <video className="videoTypeUi" muted={false}>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={EmptyPlayLogo}
                  alt="emptyVideoList"
                  className="videoPlayLogo"
                />
              )}
            </div>
            <div className="textContainer">
              <div className="userTextTitle">UserName</div>
              <div>{userName}</div>
            </div>
            <div className="textContainer">
              <div className="userTextTitle">Created At</div>
              <div>{formattedDate}</div>
            </div>
          </div>
          <button onClick={() => setShow(!show)} className="rightBtnView">
            <img src={RightLogo} alt="rightLogo" className="rightLogo" />
          </button>
        </div>
        <div>
          {show && videoUrl && (
            <div>
              <hr />
              <video className="videoPreview" controls muted={false} autoPlay>
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoList;
