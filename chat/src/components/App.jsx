import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello 👋", sentAt: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <>
      <h1>Chat</h1>
      {messages.map((message) => (
        <p key={message.sentAt.toTimeString()}>{message.text}</p>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessages([...messages, { text: newMessage, sentAt: new Date() }]);
          setNewMessage("");
        }}
      >
        <input
          type="text"
          name="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
