import React, { useState } from "react";
import axios from "axios";

const CreateMessagePage = () => {
  const [description, setDescription] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [userId, setUserId] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/create`, {
        description,
        sender_number: sender,
        receiver_number: receiver,
        userid: userId,
      })
      .then((response) => {
        console.log("Message created:", response.data);
        setFeedbackMessage("Message created successfully!");
        setIsSuccess(true);

        setDescription("");
        setSender("");
        setReceiver("");
        setUserId("");
        setTimeout(() => {
          setFeedbackMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error("Error creating message:", error);

        setFeedbackMessage("Error creating message.");
        setIsSuccess(false);

        setTimeout(() => {
          setFeedbackMessage("");
        }, 5000);
      });
  };

  return (
    <div>
      <h1>Create a New Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Sender Number</label>
          <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} required />
        </div>
        <div>
          <label>Receiver Number</label>
          <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} required />
        </div>
        <div>
          <label>User ID</label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>
        <button type="submit">Create Message</button>
      </form>

      {feedbackMessage && (
        <div
          style={{
            marginTop: "20px",
            color: isSuccess ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default CreateMessagePage;
