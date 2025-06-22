import React from "react";
import "./MovieModal.css";

export default function MovieModal({ movie, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{movie.name}</h2>
        <video controls autoPlay width="100%" style={{borderRadius: "10px"}}>
          <source src={movie.link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}