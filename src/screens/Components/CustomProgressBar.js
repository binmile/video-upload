import React from "react";

const CustomProgressBar = ({ bgColor, progress, height }) => {
  const ParentDiv = {
    height: height,
    width: "100%",
    backgroundColor: "#dbdbdb",
    borderRadius: 40,
    margin: 10,
  };

  const ChildDiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgColor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progressText = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  return (
    <div style={ParentDiv}>
      <div style={ChildDiv}>
        <span style={progressText}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default CustomProgressBar;
