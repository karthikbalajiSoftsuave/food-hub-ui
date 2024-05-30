import { useEffect, useState } from "react";
import Button from "../../components/Button";
import CreateRecipeModal from "../Modal/CreateRecipeModal";
import { FaPlus } from "react-icons/fa";
import { getRecipes } from "../../service/recipes.service";
import { IRecipe } from "../../interface/recipes.interface";
import Recipes from "../Recipe";
import { deleteRecipes } from "../../service/recipes.service";
import { useSelector } from 'react-redux';
const Recipe: React.FC = () => {

  const user = useSelector((state: any) => state.user.userList);
  const [recipes, setrecipes] = useState<IRecipe[]>(user);
  const [recipe, setrecipe] = useState<IRecipe | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const setEditData = (id?: number | string | null) => {
    if (id) {
      // eslint-disable-next-line array-callback-return
      recipes.filter((emp: IRecipe): void => {
        if (emp._id === id) {
          setrecipe(emp);
        }
      });
      setOpen(true);
    }
  };
  const deleteEmp = async (id: string) => {
    if (id) {
      try {
        await deleteRecipes(id);
      } catch (err) { }
    }
  };
  const onclose = () => {
    setOpen(false);
    if (recipe) setrecipe(undefined);
  };
  const getrecipeDetails = async () => {
    try {
      const { data } = await getRecipes(1);
      setrecipes(data);
    } catch (err) {
      console.error("error");
    }
  };
  useEffect(() => {
    if (!open) {
      getrecipeDetails();
    }
  }, [open]);

  useEffect(() => {
    setrecipes(user)
  }, [user])

  return (
    <>
      <div>
        <div>
          <Button className="flex items-center" onClick={() => setOpen(true)}>
            <FaPlus /> <span>Create Recipes</span>
          </Button>
        </div>
        {recipes?.length > 0 && (
          <Recipes
            data={recipes}
            setEditData={setEditData}
            onDelete={deleteEmp}
          />
        )}
      </div>
      {open && <CreateRecipeModal open={open} close={onclose} rec={recipe} />}
    </>
  );
};
export default Recipe;
