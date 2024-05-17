import Logo from "./Logo";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import {
  userTypeState,
  currentUserEmailState,
  timeoutToastState,
} from "../../atoms/atoms";
import { useRecoilValue, useRecoilState } from "recoil";

const NavSidePanel = () => {
  const navigate = useNavigate();
  const userType = useRecoilValue(userTypeState);
  const userEmail = useRecoilValue(currentUserEmailState);
  const [toastTriggered, setToastTriggered] = useRecoilState(timeoutToastState);

  const handleLogout = async () => {
    try {
      const response = await Axios.get("/users/logout/");

      // Remove isAuthenticated from local storage
      localStorage.removeItem("isAuthenticated");
      window.location.reload();
      // redirects
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sidepanel nav-sidepanel">
      <Logo />
      <div className="info">
        <p className="info-text">Logged in as {userType}</p>
        <p className="info-email">{userEmail}</p>
      </div>

      <div className="nav-links">
        <Link to="/main" className="nav-tab">
          <IoDocumentTextOutline className="contact-logo" />
          <p className="contact-text">Contacts</p>
        </Link>
        <Link to="/main/profile" className="nav-tab">
          <FaUser className="contact-logo" />
          <p className="contact-text">Profile</p>
        </Link>
        <Link to="/main/permission" className="nav-tab">
          <IoCheckboxOutline className="contact-logo" />
          <p className="contact-text">Permission</p>
        </Link>
        <Link to="/main/settings" className="nav-tab">
          <IoSettingsOutline className="contact-logo" />
          <p className="contact-text">Settings</p>
        </Link>
      </div>

      <div className="logout">
        <LuLogOut className="logout-logo" />
        <button href="" className="logout-text" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavSidePanel;
