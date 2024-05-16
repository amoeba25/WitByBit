import Logo from "./Logo";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import { userTypeState } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";

const NavSidePanel = ({ user }) => {
  const navigate = useNavigate();
  const userType = useRecoilValue(userTypeState);

  const handleLogout = async () => {
    try {
      const response = await Axios.get("/users/logout/");

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
        <p className="info-email">({user.email})</p>
      </div>

      <div className="nav-links">
        <Link to="/main" className="nav-tab">
          <IoDocumentTextOutline className="contact-logo" />
          <p className="contact-text">Contacts</p>
        </Link>
        <Link to="/main/profile" className="nav-tab">
          <IoDocumentTextOutline className="contact-logo" />
          <p className="contact-text">Profile</p>
        </Link>
        <Link to="/main/permission" className="nav-tab">
          <IoDocumentTextOutline className="contact-logo" />
          <p className="contact-text">Permission</p>
        </Link>
        <Link to="/main/settings" className="nav-tab">
          <IoDocumentTextOutline className="contact-logo" />
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
