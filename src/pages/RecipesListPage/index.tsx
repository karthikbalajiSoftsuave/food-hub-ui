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
import { ReviewRecipeModal } from '../../container/Modal/ReviewRecipeModal';

const filterProps = [
  {
    label: "Field",
    value: "field",
    type: "select",
    options: [
      { label: "Title", value: "title" },
      { label: "Cooking Time", value: "cooking_time" },
      { label: "Description", value: "description" },
      { label: "Average Rating", value: "avg_rating" },
      { label: "Preparation Steps", value: "preparation_steps" },
      { label: "Serving Size", value: "serving_size" },
      { label: "Category Id", value: "category_id" }
    ],
  },
  {
    label: "Operator",
    value: "operator",
    type: "select",
    options: [
      { label: "Equals", value: "=" },
      { label: "Not Equals", value: "!=" },
      { label: "In", value: "in" },
      { label: "Not in", value: "not in" },
      { label: "Like", value: "like" },
    ]
  },
  { label: "Value", value: "value", type: "input" },
];

const RecipesListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipesList, setRecipesList] = useState<TRecipe[]>([]);
  const columns = ["Title", "Category", "Cooking Time", "Serving Size", "Rating", "Action"];
  const [page, setPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [openReviewDialog, setOpenReviewDialog] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<TRecipe>()
  const [filterData, setFilterData] = useState<any>()
  const selectFieldTypes = ["in", "not in"];

  const handleOnGetAllRecipes = async (data?:any) => {
    setIsLoading(true);
    try {
      const getAllRecipes = await getRecipes(page, data || filterData);
      setRecipesList(getAllRecipes?.data?.results);
    } catch (error) {
      setRecipesList([]);
      console.log("error", error);
    } finally {
      setIsLoading(() => false);
    }
  };

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

  const filterSubmit = (data: any) => {
    const payload = {
      fields: data.fields
        .filter((field: any) => Object.values(field).every((value) => !!value))
        .map((each: any) =>
          selectFieldTypes.includes(each.operator)
            ? { ...each, value: each.value.split(",") }
            : each
        ),
    };
    setFilterData(payload)
    handleClose()
    handleOnGetAllRecipes(payload);
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
        <div className='recipes-page-wrapper'>
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
                      <ActionsPopOver data={recipe} isDeleted={handleOnGetAllRecipes} setOpenRating={setOpenReviewDialog} setData={(recipe) => setSelectedRecipe(recipe)} />
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
        <FilterPopover filterProps={filterProps} filterData={filterData} onSubmit={filterSubmit} />
      </Popover>
      {openReviewDialog && <ReviewRecipeModal open={openReviewDialog} recipeInfo={selectedRecipe} setOpen={setOpenReviewDialog}  />}
    </>
  );
};

export default RecipesListPage;
