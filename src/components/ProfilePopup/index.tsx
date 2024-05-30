/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import "./styles.scss"
import { AvatarIcon } from "../../icon-components/avatar";
import { LogoutIcon } from "../../icon-components/logout-icon";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
type Tprops = {
}


const ProfilePopup: React.FC<Tprops> = () => {
    const userData = useSelector((state: any) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState<boolean>(false)
    const logout = async () => {
        setIsActive(!isActive);
        dispatch(addUser(null));
        localStorage.clear();
        navigate("/");
    }


    return (
        <div className="menuContainer">
            <button onClick={() => setIsActive(!isActive)} className="menuTrigger" name={"my Account"}>
                <AvatarIcon />
            </button>
            {isActive && <div className="overlay" onClick={() => setIsActive(false)}></div>}
            <nav ref={dropdownRef} className={`popupMenu ${isActive ? "active" : ""}`}>
                <ul>
                    <li className="userInfo">
                        <AvatarIcon />
                        <p className="userName">{userData?.user_info?.first_name} {userData?.user_info?.last_name}</p>
                    </li>
                    <li onClick={() => logout()}>
                        <LogoutIcon />
                        <h6>Sign out</h6>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProfilePopup;