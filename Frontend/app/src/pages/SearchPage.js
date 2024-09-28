import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [messageId, setMessageId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/search`, {
        params: {
          message_id: messageId,
          sender_number: senderNumber,
          receiver_number: receiverNumber,
        },
      })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error searching messages:", error);
      });
  };

  return (
    <div className="search">
      <h1>Search Messages</h1>
      <div>
        <label>Message ID</label>
        <input type="text" value={messageId} onChange={(e) => setMessageId(e.target.value)} />
      </div>
      <div>
        <label>Sender Number</label>
        <input type="text" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)} />
      </div>
      <div>
        <label>Receiver Number</label>
        <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((result) => (
          <li key={result.messageid}>
            {result.description} - {result.sender_number} to {result.receiver_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
