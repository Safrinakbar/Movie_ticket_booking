import React from "react";
import { useNavigate } from "react-router-dom";
import "./Open.css"; 

const TypewriterEffect = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="body">
      <div className="type" onClick={handleClick}>
        <span className="span">BookMyMovie</span>
      </div>
    </div>
  );
};

export default TypewriterEffect;
