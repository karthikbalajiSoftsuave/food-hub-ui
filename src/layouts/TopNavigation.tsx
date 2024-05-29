import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { Outlet } from "react-router-dom";
import "./style.scss"

const TopNavigation = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="top-nav-bar">
        <div className="logout" onClick={() => dispatch(clearUser())}>Logout</div>
      </div>
      <Outlet />
    </div>
  );
};

export default TopNavigation;
