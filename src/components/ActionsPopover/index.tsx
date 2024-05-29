/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import "./styles.scss"
import { AvatarIcon } from "../../icon-components/avatar";
import { LogoutIcon } from "../../icon-components/logout-icon";
import { MenuIcon } from "../../icon-components/three-dots";
import { DeleteIcon } from "../../icon-components/delete-icon";
import { EditIcon } from "../../icon-components/edit-icon";
type Tprops = {
}


const ActionsPopOver: React.FC<Tprops> = () => {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState<boolean>(false)
    const logout = async () => {
        setIsActive(!isActive);
    }


    return (
        <div className="action-popover">
            <button onClick={() => setIsActive(!isActive)} className="menuTrigger" name={"my Account"}>
                <MenuIcon />
            </button>
            {isActive && <div className="overlay" onClick={() => setIsActive(false)}></div>}
            <nav ref={dropdownRef} className={`popupMenu ${isActive ? "active" : ""}`}>
                <ul>
                    <li onClick={() => logout()}>
                        <EditIcon />
                        <h6>Edit</h6>
                    </li>
                    <li>
                        <DeleteIcon />
                        <h6>Delete</h6>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ActionsPopOver;