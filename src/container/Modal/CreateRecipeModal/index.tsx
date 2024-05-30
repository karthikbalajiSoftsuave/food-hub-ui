import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Backdrop from "../BackDrop/insex";
import { useFormik } from "formik";
import "./styles.css";
import { IRecipe, TRecipe } from "../../../interface/recipes.interface";
import { editRecipes } from "../../../service/recipes.service";
import { useDispatch } from 'react-redux';
import { addUser } from "../../../redux/slices/userSlice";
import { createRecipeValidationSchema } from "../../../validators/auth.validator";


type Tprops = {
  open: boolean;
  id?: string;
  rec?: IRecipe;
  close: () => void;
};
const CreateRecipeModal: React.FC<Tprops> = (props) => {
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
      console.error(err)
    }
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: props.rec?.title ?? "",
      description: props.rec?.description ?? "",
      ingredients: props.rec?.ingredients ?? "",
      cooking_time: props.rec?.cooking_time ?? "",
      preparation_steps: props.rec?.preparation_steps ?? "",
      serving_size: props.rec?.serving_size ?? '',
    },
    validationSchema: createRecipeValidationSchema,
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
              type="text"
              name="preparationSteps"
              label="Preparation Steps"
              value={formik.values.preparation_steps}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.preparation_steps && formik.errors.preparation_steps
                  ? formik.errors.preparation_steps
                  : undefined
              }
            />

            <Input
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

export default CreateRecipeModal;
