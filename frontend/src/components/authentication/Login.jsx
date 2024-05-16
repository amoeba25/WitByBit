import { useState } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserSquare } from "react-icons/pi";

const Login = () => {
  const [userType, setUserType] = useState("admin");

  const setAdmin = () => {
    setUserType("admin");
  };

  const setUser = () => {
    setUserType("user");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign In</h2>
      <p className="login-info">Sign in as Admin to read/ write data</p>
      <div className="user-buttons">
        <button
          onClick={setAdmin}
          className={userType === "admin" ? "active" : ""}
        >
          <PiUserSquare /> Admin
        </button>
        <span className="divider">/</span>
        <button
          onClick={setUser}
          className={userType === "user" ? "active" : ""}
        >
          <RiShieldUserLine />
          User
        </button>
      </div>
      <form className="login-form" action="">
        <label htmlFor="email" className="login-label">
          EMAIL ID
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="login-input"
          placeholder="yourmail@gmail.com"
          required
        />
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Login;
