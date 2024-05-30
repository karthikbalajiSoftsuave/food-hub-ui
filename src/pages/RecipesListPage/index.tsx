import React, { useEffect, useState } from 'react'
import { TRecipe } from '../../interface/recipes.interface';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getRecipes } from '../../service/recipes.service';
import { MOCK_RECIPES_DATA } from '../../utils/constants';
import "./styles.scss";
import { Rating } from '@mui/material';
import ActionsPopOver from '../../components/ActionsPopover';
import { useNavigate } from 'react-router-dom';
import { UI_ENDPOINTS } from '../../utils/endpoints';

const RecipesListPage: React.FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [recipesList, setRecipesList] = useState<TRecipe[]>([]);
    const columns = ["Title", "Category", "Cooking Time", "Serving Size", "Rating", "Action"];
    const [page, setPage] = useState<number>(1)

    const handleOnGetAllRecipes = async () => {
        setIsLoading(true);
        try {
            const getAllRecipes = await getRecipes(page);
            console.log("getAllRecipes", getAllRecipes);
        } catch (error) {
            console.log("error", error);
        }
        finally {
            setRecipesList(MOCK_RECIPES_DATA);
            setIsLoading(() => false);
        }
    }

    const handleOnSearchRecipe = (searchKey: string) => {

    }
    const handleOnCreateRecipe = () => {
        navigate(UI_ENDPOINTS.CREATE_RECIPE)
    }

    const handleOnEditRecipe = (recipe: TRecipe) => {

    }

    useEffect(() => {
        handleOnGetAllRecipes();
    }, [page])

    return (
        <div className='recipes-page'>
            <div className='recipes-list'>
                {isLoading ?
                    <div>Loading...</div> :
                    <>
                        <div>
                            <h4 className="title">Recipes</h4>
                            <div className="menu-bar">
                                <div className="search-container">
                                    <Input className="search-recipe" placeholder="Search Recipe" onChange={(event: any) => handleOnSearchRecipe(event?.target.value)} />
                                </div>
                                <Button onClick={handleOnCreateRecipe}>
                                    Create New Recipe +
                                </Button>
                            </div>
                            {recipesList?.length ? <div className="table-view">
                                <table className="recipe-table">
                                    <thead className="recipe-table__header">
                                        <tr>
                                            {columns?.map((column) => <th>{column}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recipesList?.map((recipe, index) => <tr className={index % 2 === 0 ? "" : "alt-row"}>

                                            <td>
                                                <span className='cell'>{recipe?.title}</span>
                                            </td>
                                            <td>
                                                <span className='cell'>{recipe?.category}</span>
                                            </td>
                                            <td>
                                                <span className='cell'>{recipe?.cookingTime}</span>
                                            </td>
                                            <td>
                                                <span className='cell'>{recipe?.servingSize}</span>
                                            </td>
                                            <td>
                                                <div>
                                                    <Rating
                                                        readOnly
                                                        name="simple-controlled"
                                                        value={Number(recipe?.rating)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <span className='cell'>
                                                    <ActionsPopOver />
                                                </span>
                                                {/* <Button variant='outlined' onClick={() => handleOnEditRecipe(recipe)}>
                                                    View/Edit
                                                </Button> */}
                                            </td>
                                        </tr>)}
                                    </tbody >
                                </table>
                            </div> : <div>
                                No Recepies Found...
                            </div>}
                        </div>
                    </>}
            </div>
        </div>
    );
};


export default RecipesListPage