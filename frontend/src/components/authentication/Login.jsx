import { useState } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserSquare } from "react-icons/pi";
import Axios from "../../Axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userTypeState, currentUserEmailState } from "../../atoms/atoms";

const Login = () => {
  const [userType, setUserType] = useRecoilState(userTypeState);
  const [userEmail, setUserEmail] = useRecoilState(currentUserEmailState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setAdmin = () => {
    setUserType("admin");
  };

  const setUser = () => {
    setUserType("user");
  };

  // handles email/pass submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("/users/login/", {
        email,
        password,
        type: userType,
      });
      if (response.status === 200) {
        // succesful authentication

        // succesful authorization
        if (response.data.role == userType) {
          toast.success("Login success");
          // Store isAuthenticated in local storage
          localStorage.setItem("isAuthenticated", "true");
          setUserEmail(response.data.email);
          navigate("/main");
        } else {
          toast.error(`Login for ${userType} failed`);
        }
      }
    } catch (error) {
      toast.error(
        "Login failed. Incorrect email, password or user type selected"
      );
      setError("An error occured. Please try again");
    }
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
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <label htmlFor="email" className="login-label">
          EMAIL ID
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="login-input"
          placeholder="yourmail@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          id="password"
          className="login-input"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Confirm
        </button>
      </form>
      {/* {error && <p>{error}</p>} */}
      <Toaster />
    </div>
  );
};

export default Login;
