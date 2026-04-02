import React, {useState} from "react";

function NewMessage({ currentUser, onNewText }) {
const [text, setText] = useState("")
  function handleSubmit(e) {
    e.preventDefault()
   const data = ({
      body: text,
      username: currentUser.username, 
      created_at: new Date().toUTCString()
    })    
    setText("")
     fetch("http://localhost:7200/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(data => {
        onNewText(data)
        setText("")
      })
  }

  return (
    <form className="new-message" onSubmit={handleSubmit}>
      <input type="text" name="body" autoComplete="off" value={text} onChange={(e) => setText(e.target.value)}/>
      <button type="submit">Send</button>
    </form>
  );
}

export default NewMessage;
