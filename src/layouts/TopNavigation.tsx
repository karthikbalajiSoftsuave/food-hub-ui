import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./style.scss"
import ProfilePopup from "../components/ProfilePopup";

const TopNavigation = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="top-nav-bar">
      <ProfilePopup />
      </div>
      <Outlet />
    </div>
  );
};

export default TopNavigation;
