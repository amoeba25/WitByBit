import Logo from "./Logo";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";

const NavSidePanel = ({ user }) => {
  return (
    <div className="sidepanel nav-sidepanel">
      <Logo />
      <div className="info">
        <p className="info-text">Logged in as {user.type}</p>
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
        <a href="" className="logout-text">
          Logout
        </a>
      </div>
    </div>
  );
};

export default NavSidePanel;
