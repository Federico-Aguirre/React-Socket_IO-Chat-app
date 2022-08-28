import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

//const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://git.heroku.com/react-socket-io-aplication.git");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Unirse a un Chat</h3>
          <input
            type="text"
            placeholder="Nombre"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="ID de sala"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Unirse a una sala</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
