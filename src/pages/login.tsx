import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = localStorage.getItem("users");
    try {
      const users = userData ? JSON.parse(userData) : [];
      const user = users.find(
        (u: { username: string; password: string }) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );
      if (!user) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("token", uuidv4());
      navigate("/binance");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          value={credentials.username}
          placeholder="Enter Username"
          onChange={handleChange}
          name="username"
        />
        <input
          type="password"
          value={credentials.password}
          placeholder="Enter Password"
          onChange={handleChange}
          name="password"
        />
        <input type="Submit" />
      </form>
    </>
  );
};

export default Login;
