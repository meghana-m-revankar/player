import React, { useState, useRef } from "react";
import "./mediapage.css";

import image from "../src/assets/images/img.png";

function MediaPlayer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const mediaRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileUrl(URL.createObjectURL(file));
  };

  const handleMediaLoaded = () => {
    setShowControls(true);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileUrl("");
    setShowControls(false);
    // Reset the file input button to be visible
    fileInputRef.current.value = ""; // Clear the file input
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <h1>Media player app</h1>
      <div className="media-page">
        <div className="left-container">
          <img src={image} alt=" 1" />
        </div>
        <div className="center-container">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {/* Render the button only if a file is not selected */}
          {!selectedFile && (
            <button className="file-input-button" onClick={handleChooseFile}>
              Choose Media
            </button>
          )}
          {selectedFile && (
            <p className="selected-file ptitle">{selectedFile.name}</p>
          )}
          {fileUrl && (
            <div className="media-container">
              {selectedFile.type.startsWith("image/") && (
                <img
                  src={fileUrl}
                  alt="Selected"
                  style={{ maxWidth: "100%", height: "auto" }}
                  onLoad={handleMediaLoaded}
                />
              )}
              {selectedFile.type.startsWith("audio/") && (
                <audio
                  controls
                  ref={mediaRef}
                  src={fileUrl}
                  onLoadedData={handleMediaLoaded}
                />
              )}
              {selectedFile.type.startsWith("video/") && (
                <video
                  controls
                  ref={mediaRef}
                  src={fileUrl}
                  className="video-element"
                  style={{ maxWidth: "100%", height: "auto" }}
                  onLoadedData={handleMediaLoaded}
                />
              )}
            </div>
          )}
          {selectedFile && (
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default MediaPlayer;
