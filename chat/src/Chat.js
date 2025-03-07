import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", message);
    setMessages((prevMessages) => [...prevMessages, `Me: ${message}`]);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
