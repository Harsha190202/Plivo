import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [messageIds, setMessageIds] = useState("");
  const [senderNumbers, setSenderNumbers] = useState("");
  const [receiverNumbers, setReceiverNumbers] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const messageIdArray = messageIds.split(",").map(id => id.trim());
    const senderNumberArray = senderNumbers.split(",").map(num => num.trim());
    const receiverNumberArray = receiverNumbers.split(",").map(num => num.trim());

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/search`, {
        params: {
          message_id: messageIdArray.length > 0 ? messageIdArray : undefined,
          sender_number: senderNumberArray.length > 0 ? senderNumberArray : undefined,
          receiver_number: receiverNumberArray.length > 0 ? receiverNumberArray : undefined,
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
        <label>Message IDs (comma-separated)</label>
        <input
          type="text"
          value={messageIds}
          onChange={(e) => setMessageIds(e.target.value)}
          placeholder="Enter message IDs separated by commas"
        />
      </div>
      <div>
        <label>Sender Numbers (comma-separated)</label>
        <input
          type="text"
          value={senderNumbers}
          onChange={(e) => setSenderNumbers(e.target.value)}
          placeholder="Enter sender numbers separated by commas"
        />
      </div>
      <div>
        <label>Receiver Numbers (comma-separated)</label>
        <input
          type="text"
          value={receiverNumbers}
          onChange={(e) => setReceiverNumbers(e.target.value)}
          placeholder="Enter receiver numbers separated by commas"
        />
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
