import React, { useEffect, useState } from 'react'
import { TRecipe } from '../../interface/recipes.interface';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getRecipes } from '../../service/recipes.service';
import "./styles.scss";
import { Popover, Rating } from '@mui/material';
import ActionsPopOver from '../../components/ActionsPopover';
import { useNavigate } from 'react-router-dom';
import { UI_ENDPOINTS } from '../../utils/endpoints';
import { ReactComponent as FilterIcon } from "../../assets/filter-icon.svg";
import FilterPopover from '../../components/FilterPopover';

const filterProps = [
    { label: "Field", value: "field" ,type: "select" , options: [ {label: "Cooking Time", value: "cooking_time"}, {label: "Description", value: "description"}] } ,
    { label: "Operator", value: "operator" ,type: "select" , options: [ {label: "Equals", value: "="}, {label: "Not Equals", value: "!="}] },
    { label: "Value", value: "value" ,type: "input"}
]

const RecipesListPage: React.FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [recipesList, setRecipesList] = useState<TRecipe[]>([]);
    const columns = ["Title", "Category", "Cooking Time", "Serving Size", "Rating", "Action"];
    const [page, setPage] = useState<number>(1);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleOnGetAllRecipes = async () => {
        setIsLoading(true);
        try {
            const getAllRecipes = await getRecipes(page);
            setRecipesList(getAllRecipes?.data?.results)
        } catch (error) {
            setRecipesList([]);
            console.log("error", error);
        }
        finally {
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
    }, [page]);

   

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


    return (
      <div className="recipes-page">
        <div className="recipes-list">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div>
                <h4 className="title">Recipes</h4>
                <div className="menu-bar">
                  <div className="search-container">
                    <Input
                      className="search-recipe"
                      placeholder="Search Recipe"
                      onChange={(event: any) =>
                        handleOnSearchRecipe(event?.target.value)
                      }
                    />
                    <div className={"filterField"} onClick={handleClick}><FilterIcon /></div>
                  </div>
                  <Button onClick={handleOnCreateRecipe}>
                    Create New Recipe +
                  </Button>
                </div>
                {recipesList?.length ? (
                  <div className="table-view">
                    <table className="recipe-table">
                      <thead className="recipe-table__header">
                        <tr>
                          {columns?.map((column) => (
                            <th>{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recipesList?.map((recipe, index) => (
                          <tr className={index % 2 === 0 ? "" : "alt-row"}>
                            <td>
                              <span className="cell">{recipe?.title}</span>
                            </td>
                            <td>
                              <span className="cell">
                                {recipe?.category_id}
                              </span>
                            </td>
                            <td>
                              <span className="cell">
                                {recipe?.cooking_time}
                              </span>
                            </td>
                            <td>
                              <span className="cell">
                                {recipe?.serving_size}
                              </span>
                            </td>
                            <td>
                              <div>
                                <Rating
                                  readOnly
                                  name="simple-controlled"
                                  value={Number(recipe?.avg_rating)}
                                />
                              </div>
                            </td>
                            <td>
                              <span className="cell">
                                <ActionsPopOver />
                              </span>
                              {/* <Button variant='outlined' onClick={() => handleOnEditRecipe(recipe)}>
                                                    View/Edit
                                                </Button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>No Recepies Found...</div>
                )}
              </div>
            </>
          )}
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <FilterPopover filterProps={filterProps}/>
        </Popover>
      </div>
    );
};


export default RecipesListPage