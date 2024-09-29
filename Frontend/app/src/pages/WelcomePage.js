import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to the Message App</h1>
      <h3>{`${process.env.REACT_APP_BACKEND_URL}`}</h3>
      <nav className="home-nav">
        <ul>
          <li>
            <Link className="Link" to="/messages">
              View Messages
            </Link>
          </li>
          <li>
            <Link className="Link" to="/create-message">
              Create a Message
            </Link>
          </li>
          <li>
            <Link className="Link" to="/search">
              Search a Message
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default WelcomePage;
