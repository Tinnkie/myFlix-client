import React from "react";
import { useState } from "react";

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
    
        const data = {
          access: username,
          secret: password
        };
    
        fetch("https://movieflix2023.herokuapp.com/login.json", {
          method: "POST",
          body: JSON.stringify(data)
        });
      };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </label>
        <label>
          Password:
          <input type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };