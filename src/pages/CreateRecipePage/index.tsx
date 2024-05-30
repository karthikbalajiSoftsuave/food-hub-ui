import Input from "../../components/Input"
import Button from "../../components/Button"
import { useFormik } from "formik"
import { validationSchema } from "../../container/Modal/CreateRecipeModal/validation"
import { createRecipes, editRecipes } from "../../service/recipes.service"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../../redux/slices/userSlice"
import { IRecipe, TRecipe } from "../../interface/recipes.interface"
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom"
import TextBox from "../../components/TextBox"
import { ClockIcon } from "../../icon-components/clock-icon"
import Ingredients, { IIngredient } from "../../components/Ingredient"
import PreparationSteps, { IPreparationSteps } from "../../components/Preparation Steps"
import { UI_ENDPOINTS } from "../../utils/endpoints"


type Tprops = {

};
const CreateRecipe: React.FC<Tprops> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const recipeInfo = useSelector((state: any) => state.user.recipeDetails);
    const { id } = useParams();

    const handleOnCreateEditRecipe = async (payload: TRecipe) => {
        try {
            if (id) {
                const editRecipe = await editRecipes(id, payload);
            }
            else {
                const createRecipe = await createRecipes(payload);
            }


        }
        catch (err) {
            console.log(err)
        }
    }
    const getrecipeDetails = () => {
        try {

        } catch (error) {

        }
    }

    const handleOnIngredient = (value: IIngredient[]) => {
        formik.setFieldValue("ingredients", JSON.stringify(value));
    }
    const handleOnPreparationSteps = (value: IPreparationSteps[]) => {
        formik.setFieldValue("preparationSteps", JSON.stringify(value));
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: recipeInfo?.title ?? "",
            description: recipeInfo?.description ?? "",
            ingredients: recipeInfo?.ingredients ?? "",
            cooking_time: recipeInfo?.cooking_time ?? "",
            preparationSteps: recipeInfo?.preparationSteps ?? "",
            serving_size: recipeInfo?.serving_size ?? 1,
        },
        validationSchema: validationSchema,
        onSubmit: handleOnCreateEditRecipe
    });

    return (
        <>
            <div className="create-recipe-page">
                <form onSubmit={formik.handleSubmit} className="create-recipe-form">
                    <h2 className="title">Create Recipe</h2>
                    <div>
                        <Input
                            className="form-field"
                            type="text"
                            name="title"
                            label="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.title && formik.errors.title
                                    ? formik.errors.title
                                    : undefined
                            }
                        />
                    </div>

                    <TextBox
                        className="form-field"
                        rows={4}
                        name="description"
                        label="Description"
                        placeholder="Enter Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.description && formik.errors.description
                                ? formik.errors.description
                                : undefined
                        }
                    />
                    <Input
                        className="form-field"
                        type="text"
                        name="cooking_time"
                        placeholder="1hr"
                        label={<>Cooking Time <ClockIcon /> </>}
                        value={formik.values.cooking_time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.cooking_time && formik.errors.cooking_time
                                ? formik.errors.cooking_time
                                : undefined
                        }
                    />
                    <div style={{ marginTop: "25px" }}>
                        <label className="block text-sm font-medium mb-1">Ingredients</label>
                        <Ingredients onChange={(ingredient) => handleOnIngredient(ingredient)} />
                    </div>

                    <div style={{ marginTop: "25px" }}>
                        <label className="block text-sm font-medium mb-1">Preparation Steps</label>
                        <PreparationSteps onChange={(preparationSteps) => handleOnPreparationSteps(preparationSteps)} />
                    </div>

                    <Input
                        className="form-field"
                        type="number"
                        name="serving_size"
                        label="Serving Size"
                        value={formik.values.serving_size}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.serving_size && formik.errors.serving_size
                                ? formik.errors.serving_size
                                : undefined
                        }
                    />

                    <div className="flex flex-col lg:flex-row lg:justify-evenly items-center">
                        <Button
                            style={{ width: "150px" }}
                            variant="outlined"
                            type="button"
                            onClick={() => {
                                formik.resetForm();
                                navigate(UI_ENDPOINTS.RECIPES_LIST)
                            }}
                        >
                            Back
                        </Button>
                        <Button style={{ width: "150px" }} type="submit">{id ? "Update" : "Save"}</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateRecipe;
