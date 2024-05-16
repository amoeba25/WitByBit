import AuthSidePanel from "./AuthSidePanel";
import AuthMainPanel from "./AuthMainPanel";

const AuthMainPage = () => {
  return (
    <div className="mainpage">
      <AuthSidePanel />
      <AuthMainPanel />
    </div>
  );
};

export default AuthMainPage;
