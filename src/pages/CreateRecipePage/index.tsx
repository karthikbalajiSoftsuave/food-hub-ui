import Input from "../../components/Input"
import Button from "../../components/Button"
import { useFormik } from "formik"
import { createRecipes, editRecipes, getRecipesById } from "../../service/recipes.service"
import { useSelector } from "react-redux"
import { TRecipe } from "../../interface/recipes.interface"
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom"
import TextBox from "../../components/TextBox"
import { ClockIcon } from "../../icon-components/clock-icon"
import { UI_ENDPOINTS } from "../../utils/endpoints";
import { CKEditor } from "ckeditor4-react";
import { createRecipeValidationSchema } from "../../validators/auth.validator"
import Dropdown from "../../components/Dropdown"
import { CATEGORIES, STATUS } from "../../utils/constants"
import Toaster from "../../utils/Toaster"
import { useEffect } from "react"


type Tprops = {

};
const CreateRecipe: React.FC<Tprops> = () => {
    const navigate = useNavigate()
    const recipeInfo = useSelector((state: any) => state.recipe);
    const { id } = useParams();

    const handleOnCreateEditRecipe = async (payload: TRecipe) => {
        try {
            payload.serving_size = String(payload.serving_size);
            if (id) {
                payload.id = id;
                const editRecipe = await editRecipes(id, payload);
                if (editRecipe?.data.status === STATUS.SUCCESS) {
                    Toaster({ toast: editRecipe?.data?.message, toastType: "success" });
                    navigate(UI_ENDPOINTS.RECIPES_LIST);
                }

            }
            else {
                const createRecipe = await createRecipes(payload);
                if (createRecipe?.data.status === STATUS.SUCCESS) {
                    Toaster({ toast: createRecipe?.data?.message, toastType: "success" });
                    navigate(UI_ENDPOINTS.RECIPES_LIST);
                }
            }


        }
        catch (err) {
            console.log(err)
        }
    }
    const getrecipeDetails = async (id: string) => {
        try {
            const editRecipe = await getRecipesById(id);
            if (editRecipe?.data.status === STATUS.SUCCESS) {
                Toaster({ toast: editRecipe?.data?.message, toastType: "success" });
                navigate(UI_ENDPOINTS.RECIPES_LIST);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (id) {
            getrecipeDetails(id)
        }
    }, [id])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: recipeInfo?.title ?? "",
            description: recipeInfo?.description ?? "",
            ingredients: recipeInfo?.ingredients ?? "",
            cooking_time: recipeInfo?.cooking_time ?? "",
            preparation_steps: recipeInfo?.preparation_steps ?? "",
            serving_size: recipeInfo?.serving_size ?? 1,
            category_id: recipeInfo?.category_id ?? ""
        },
        validationSchema: createRecipeValidationSchema,
        onSubmit: handleOnCreateEditRecipe
    });

    return (
        <>
            <div className="create-recipe-page">
                <form onSubmit={formik.handleSubmit} className="create-recipe-form">
                    <h2 className="title">{id ? "Update" : "Create"} Recipe</h2>
                    <div className="flex gap-10">
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
                        <Dropdown label={"Category"} name="category_id" onBlur={formik.handleBlur} options={CATEGORIES} optionLabel={"name"} optionValue={"name"} placeholder="Select Category" className="form-field" value={formik.values.category_id} onChange={formik.handleChange} error={
                            formik.touched.category_id && formik.errors.category_id
                                ? formik.errors.category_id
                                : undefined
                        } />
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
                    <div className="flex gap-10">
                        <Input
                            className="form-field"
                            type="text"
                            name="cooking_time"
                            placeholder="1hr"
                            label={<>Cooking Time <ClockIcon /> (In mins)</>}
                            value={formik.values.cooking_time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.cooking_time && formik.errors.cooking_time
                                    ? formik.errors.cooking_time
                                    : undefined
                            }
                        />


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
                    </div>
                    <div style={{ marginTop: "25px" }}>
                        <label className="block text-sm font-medium mb-1">Ingredients</label>
                        <CKEditor
                            name="ingredients"
                            data="<p>Hello from the first editor working with the context!</p>"
                            initData={formik?.values?.ingredients}
                            onChange={(e: any) => formik.setFieldValue("ingredients", String(e?.editor?.getData()))}
                        />
                    </div>

                    <div style={{ marginTop: "25px" }}>
                        <label className="block text-sm font-medium mb-1">Preparation Steps</label>
                        <CKEditor
                            name="preparation_steps"
                            data="<p>Hello from the first editor working with the context!</p>"
                            initData={formik?.values?.preparation_steps}
                            onChange={(e: any) => formik.setFieldValue("preparation_steps", String(e?.editor?.getData()))}
                        />
                    </div>


                    <div className="flex flex-col lg:flex-row lg:justify-evenly items-center pt-2.5">
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
