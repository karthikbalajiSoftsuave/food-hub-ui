import Input from "../../components/Input"
import Button from "../../components/Button"
import Backdrop from "../../container/Modal/BackDrop/insex"
import { useFormik } from "formik"
import { validationSchema } from "../../container/Modal/CreateRecipeModal/validation"
import { editRecipes } from "../../service/recipes.service"
import { useDispatch } from "react-redux"
import { addUser } from "../../redux/slices/userSlice"
import { IRecipe, TRecipe } from "../../interface/recipes.interface"
import "./styles.css";


type Tprops = {
    open: boolean;
    id?: string;
    rec?: IRecipe;
    close: () => void;
};
const CreateRecipe: React.FC<Tprops> = (props) => {
    const dispatch = useDispatch()

    const handleOnCreateEditRecipe = async (payload: TRecipe) => {
        try {
            if (props.rec) {
                payload.id = props.rec._id;
                const res = await editRecipes(props.rec._id, payload)
                if (res) {
                    props.close()
                }
            } else {
                dispatch(addUser(payload))
                props.close()
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: props.rec?.title ?? "",
            description: props.rec?.description ?? "",
            ingredients: props.rec?.ingredients ?? "",
            cookingTime: props.rec?.cookingTime ?? "",
            preparationSteps: props.rec?.preparationSteps ?? "",
            servingSize: props.rec?.servingSize ?? 0,
        },
        validationSchema: validationSchema,
        onSubmit: handleOnCreateEditRecipe
    });

    return (
        <>
            {props.open && <Backdrop onClick={() => props.close()} />}
            {/* Display backdrop when modal is open */}
            <dialog
                open={props.open}
                className="fixed inset-0 flex items-center justify-center z-50"
            >
                <div className="custom-dialog">
                    <form onSubmit={formik.handleSubmit}>
                        <Input
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

                        <Input
                            type="text"
                            name="description"
                            label="Description"
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
                            type="text"
                            name="ingredients"
                            label="Ingredients"
                            value={formik.values.ingredients}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.ingredients && formik.errors.ingredients
                                    ? formik.errors.ingredients
                                    : undefined
                            }
                        />

                        <Input
                            type="text"
                            name="cookingTime"
                            label="Cooking Time"
                            value={formik.values.cookingTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.cookingTime && formik.errors.cookingTime
                                    ? formik.errors.cookingTime
                                    : undefined
                            }
                        />

                        <Input
                            type="text"
                            name="preparationSteps"
                            label="Preparation Steps"
                            value={formik.values.preparationSteps}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.preparationSteps && formik.errors.preparationSteps
                                    ? formik.errors.preparationSteps
                                    : undefined
                            }
                        />

                        <Input
                            type="number"
                            name="servingSize"
                            label="Serving Size"
                            value={formik.values.servingSize}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.servingSize && formik.errors.servingSize
                                    ? formik.errors.servingSize
                                    : undefined
                            }
                        />

                        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                            <Button
                                variant="outlined"
                                type="button"
                                onClick={() => {
                                    formik.resetForm();
                                    props.close();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">{props?.rec ? "Update" : "Save"}</Button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default CreateRecipe;