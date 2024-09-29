import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MessagesPage from "./pages/MessagesPage";
import CreateMessagePage from "./pages/CreateMessagePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router basename="/plivo-frontend">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/create-message" element={<CreateMessagePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
