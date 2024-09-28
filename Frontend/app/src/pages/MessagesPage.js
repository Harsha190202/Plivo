import React, { useState } from "react";
import axios from "axios";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setError("");
    setMessages([]);

    if (userId) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get/messages/${userId}`);
        if (response.data.length > 0) {
          setMessages(response.data);
        } else if (response.status === 404) {
          setError("No messages found for the provided User ID.");
        } else {
          setError("Unknown Error");
        }
      } catch (error) {
        setError("No messages found for the provided User ID.");
      }
    } else {
      setError("Please enter a valid User ID.");
    }
  };

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input type="number" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User ID" />
        <button onClick={fetchMessages}>Get Messages</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {messages.length > 0
          ? messages.map((message) => (
              <li key={message.messageid}>
                {message.description} - {message.sender_number} to {message.receiver_number}
              </li>
            ))
          : !error && <li className="no-messages">No messages available. Please enter a valid User ID.</li>}
      </ul>
    </div>
  );
};

export default MessagesPage;
