import React, { useEffect, useState } from 'react'
import { TRecipe } from '../../interface/recipes.interface';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getRecipes, searchRecipes } from '../../service/recipes.service';
import "./styles.scss";
import { Popover, Rating } from '@mui/material';
import ActionsPopOver from '../../components/ActionsPopover';
import { useNavigate } from 'react-router-dom';
import { UI_ENDPOINTS } from '../../utils/endpoints';
import { ReactComponent as FilterIcon } from "../../assets/filter-icon.svg";
import FilterPopover from '../../components/FilterPopover';
import { recipeDetails } from '../../redux/slices/recipeSlice';
import { useDispatch } from 'react-redux';
import { STATUS } from '../../utils/constants';

const filterProps = [
  {
    label: "Field",
    value: "field",
    type: "select",
    options: [
      { label: "Cooking Time", value: "cooking_time" },
      { label: "Description", value: "description" },
      { label: "Ingrediants", value: "ingrediants" },
    ],
  },
  {
    label: "Operator",
    value: "operator",
    selectvalue: "in",
    type: "select",
    options: [
      { label: "Equals", value: "=" },
      { label: "Not Equals", value: "!=" },
    ],
    selectoptions: [
      { label: "In", value: "=" },
      { label: "Not In", value: "!=" },
    ],
  },
  { label: "Value", value: "value", type: "input" },
];

const fieldTypes = {
  input: ["cooking_time", "description"],
  select: ["ingrediants"],
};



const RecipesListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleOnSearchRecipe = async (searchKey: string) => {
    try {
      if (searchKey) {
        const searchRecipe = await searchRecipes(searchKey);
        console.log("searchRecipe", searchRecipe?.data)
        if (searchRecipe?.data?.status === STATUS.SUCCESS) {
          setRecipesList(searchRecipe?.data?.data?.search_results);
          return;
        }
      }
      else {
        handleOnGetAllRecipes();
      }
    } catch (error) {
      setRecipesList([]);
    }
  }
  const handleOnCreateRecipe = () => {
    console.log('handleOnCreateRecipe')
    dispatch(recipeDetails(null));
    navigate(UI_ENDPOINTS.CREATE_RECIPE);
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    dispatch(recipeDetails(null));
    handleOnGetAllRecipes();
  }, [page])

  return (
    <>
      <div className='recipes-page'>
        <div className='recipes-list'>
          <div>
            <h4 className="title">Recipes</h4>
            <div className="menu-bar">
              <div className="search-container">
                <Input className="search-recipe" placeholder="Search Recipe" onChange={(event: any) => handleOnSearchRecipe(event?.target.value)} />
                <div className={"filterField"} onClick={handleClick}><FilterIcon /></div>
              </div>
              <Button onClick={handleOnCreateRecipe}>
                Create New Recipe +
              </Button>
            </div>
            <div className="table-view">
              <table className="recipe-table">
                <thead className="recipe-table__header">
                  <tr>
                    {columns?.map((column) => <th>{column}</th>)}
                  </tr>
                </thead>
                {recipesList?.length ? <tbody>
                  {recipesList?.map((recipe, index) => <tr className={index % 2 === 0 ? "" : "alt-row"}>
                    <td>
                      <span className='cell'>{recipe?.title}</span>
                    </td>
                    <td>
                      <span className='cell'>{recipe?.category_id}</span>
                    </td>
                    <td>
                      <span className='cell'>{recipe?.cooking_time}</span>
                    </td>
                    <td>
                      <span className='cell'>{recipe?.serving_size}</span>
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
                      <span className='cell'>
                        <ActionsPopOver data={recipe} isDeleted={handleOnGetAllRecipes} />
                      </span>
                    </td>
                  </tr>)}
                </tbody > : <></>}
              </table>
            </div>
          </div>
          {!isLoading && recipesList?.length === 0 && <div> No recipes found...</div>}
          {isLoading && <div> Loading...</div>}
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <FilterPopover filterProps={filterProps} fieldTypes={fieldTypes} />
      </Popover>
    </>
  );
};


export default RecipesListPage