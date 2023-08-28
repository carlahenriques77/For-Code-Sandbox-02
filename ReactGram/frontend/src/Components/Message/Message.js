import React from "react";
import "./Message.scss";

const Message = ({ theMsg, theType }) => {
  return (
    <div className={`message ${theType}`}>
      <p>{theMsg}</p>
    </div>
  );
};

export default Message;
