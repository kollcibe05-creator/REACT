import React, { useEffect, useState } from "react";
import Message from "./Message";

function MessageList({messages, currentUser, onDelete, onMessageUpdate}) {

  
  return (
    <div className="list">
      <ul>{messages.map(message => (
        <Message key={message.id} message={message} currentUser={currentUser} onDelete={onDelete} onMessageUpdate={onMessageUpdate}/>
      ))}</ul>
    </div>
  );
}

export default MessageList;
