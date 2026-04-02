import React, {useState, useEffect} from "react";
import Header from "./Header";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";



const testUser = { username: "Duane" };

function Chatterbox() {
  const [toggleMode, setToggleMode] = useState(false)
  const [messages, setMessages] = useState([])
  const [searchText, setSearchText] = useState("")
  const messagesDisplayed = messages.filter(message => message.body.toLowerCase().includes(searchText.toLowerCase())) 


  
  useEffect(() => {
    fetch("http://localhost:7200/messages")
        .then(r => r.json())
        .then(data => setMessages(data))
  }, [])
  function handleNewText(newMessage) {
    setMessages([...messages, newMessage])
  }

  function handleDelete(id) {
       fetch(`http://localhost:7200/messages/${id}`, {
          method: "DELETE"
       })
        .then(r => r.json())
        .then(() => {
          const updatedArr = messages.filter(message => message.id !== id)
          setMessages(updatedArr)
        })
  }
  function handleMesageUpdate(messageObj) {
    const updatedArr = messages.map(message => {
      if (message.id === messageObj.id) return messageObj
      return message
    })
    setMessages(updatedArr)
  }
  
  return (
    <main className={toggleMode ? "dark-mode" : ""}>
      <Header checked={toggleMode} handleMode={setToggleMode}/>
      <Search search={searchText} onSearch={setSearchText} />
      <MessageList messages={messagesDisplayed} currentUser={testUser}  onDelete={handleDelete} onMessageUpdate={handleMesageUpdate}/>
      <NewMessage currentUser={testUser} onNewText={handleNewText}/>
    </main>
  );
}

export default Chatterbox;
