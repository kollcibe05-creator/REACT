import React, { useState } from "react";
import EditMessage from "./EditMessage";

function Message({ message, currentUser, onDelete, onMessageUpdate }) {
  const {id, username, body, created_at:createdAt} = message 
  const timestamp = new Date(createdAt).toLocaleTimeString();
  const [isEditing, setIsEditing] = useState(false)
  function handleEditUpdate(updatedMessage) {
    setIsEditing(false)
    onMessageUpdate(updatedMessage)
  }
  return (
    <li>
      <span className="user">{username}</span>
      <span className="time">{timestamp}</span>
      {isEditing ? <EditMessage id={id} body={body} onUpdateMessage={handleEditUpdate}/> : <p>{body}</p>}
      { username === currentUser.username  ? 
      <div className="actions">
        <button onClick={() => setIsEditing(isEditing => !isEditing)}>
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </button>
        <button onClick={() => onDelete(id)}>
          <span role="img" aria-label="delete">
            🗑
          </span>
        </button>
      </div>
      :
      null
      }
    </li>
  );
}

export default Message;
