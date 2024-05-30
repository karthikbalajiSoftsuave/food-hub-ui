/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import "./styles.scss"
import { MenuIcon } from "../../icon-components/three-dots";
import { DeleteIcon } from "../../icon-components/delete-icon";
import { EditIcon } from "../../icon-components/edit-icon";
import { useDispatch } from "react-redux";
import { recipeDetails } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import { UI_ENDPOINTS } from "../../utils/endpoints";
import { deleteRecipes } from "../../service/recipes.service";
import Toaster from "../../utils/Toaster";

type Tprops = {
    data?: any
    isDeleted: () => void
}


const ActionsPopOver: React.FC<Tprops> = ({ data, isDeleted }) => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState<boolean>(false)

    const handleOnEditRecipe = () => {
        setIsActive(!isActive);
        dispatch(recipeDetails(data));
        navigate(UI_ENDPOINTS.NAVIGATE_EDIT_RECIPE(data?.id));
    }

    const handleOnDeleteRecipe = async () => {
        try {
            setIsActive(!isActive);
            dispatch(recipeDetails(null));
            await deleteRecipes(data?.id);
            Toaster({ toast: "Recipe deleted successfully.", toastType: "success" });
            isDeleted();
        } catch (error: any) {
            Toaster({ toast: error?.response.data.message, toastType: "error" });
        }
    }


    return (
        <div className="action-popover">
            <button onClick={() => setIsActive(!isActive)} className="menuTrigger" name={"my Account"}>
                <MenuIcon />
            </button>
            {isActive && <div className="overlay" onClick={() => setIsActive(false)}></div>}
            <nav ref={dropdownRef} className={`popupMenu ${isActive ? "active" : ""}`}>
                <ul>
                    <li onClick={() => handleOnEditRecipe()}>
                        <EditIcon />
                        <h6>Edit</h6>
                    </li>
                    <li onClick={() => handleOnDeleteRecipe()}>
                        <DeleteIcon />
                        <h6>Delete</h6>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ActionsPopOver;