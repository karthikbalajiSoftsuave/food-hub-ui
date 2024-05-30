import { Outlet } from "react-router-dom";
import "./style.scss"
import ProfilePopup from "../components/ProfilePopup";

const TopNavigation = () => {
  return (
    <>
      <div className="top-nav-bar">
        <ProfilePopup />
      </div>
      <Outlet />
    </>
  );
};

export default TopNavigation;
