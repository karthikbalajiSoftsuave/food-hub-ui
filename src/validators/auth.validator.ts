import * as Yup from 'yup';

export const passwordValidation = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required");

export const registerValidationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone_number: Yup.number().required("Phone Number is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: passwordValidation,
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ''], "Passwords must match")
        .required("Confirm Password is required"),
});

export const loginValidationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: passwordValidation,
});

export const createRecipeValidationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients is required'),
    serving_size: Yup.number().positive().required('Serving size is required'),
    preparation_steps: Yup.string().required('Preparation Steps is required'),
    cooking_time: Yup.string().required('Cooking Time is required'),
    category_id: Yup.string().required('Category Id is required'),
});