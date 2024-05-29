import React, { useEffect, useState } from 'react'
import { TRecipe } from '../../interface/recipes.interface';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getRecipes } from '../../service/recipes.service';

const RecipesListPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [recipesList, setRecipesList] = useState<TRecipe[]>([]);
    const columns = ["title", "category", "Rating", "cookingTime", "servingSize"];
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
            setIsLoading(() => false);
        }
    }

    const handleOnSearchRecipe = (searchKey: string) => {

    }
    const handleOnCreateRecipe = () => {

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
                                    <Input className="search-workspace" placeholder="Search Workspaces" onChange={(event: any) => handleOnSearchRecipe(event?.target.value)} />
                                </div>
                                <Button className='className="create-workspace-btn"' onClick={handleOnCreateRecipe}>
                                    Create New Recipe +
                                </Button>
                            </div>
                            {recipesList?.length ? <div className="table-view">
                                <table className="workspace-table">
                                    <thead className="workspace-table__header">
                                        <tr>
                                            {columns?.map((column) => <th>{column}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recipesList?.map((recipe) => <tr>

                                            <td>
                                                <span>{recipe?.title}</span>
                                            </td>
                                            <td>
                                                <span>{recipe?.category}</span>
                                            </td>
                                            <td>
                                                <span>{recipe?.rating}</span>
                                            </td>
                                            <td>
                                                <span>{recipe?.cookingTime}</span>
                                            </td>
                                            <td>
                                                <span>{recipe?.servingSize}</span>
                                            </td>
                                            <td>
                                                <Button variant='outlined' onClick={() => handleOnEditRecipe(recipe)}>
                                                    View/Edit
                                                </Button>
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