import { useFormik } from "formik";
import { loginValidationSchema } from "../../../validators/auth.validator";
import Input from "../../../components/Input";
import Toaster from "../../../utils/Toaster";
import { login } from "../../../service/auth.service";
import { useNavigate } from "react-router-dom";
import { UI_ENDPOINTS } from "../../../utils/endpoints";
import { Tlogin } from "../../../interface/auth.interface";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/slices/userSlice";
import { STATUS } from "../../../utils/constants";


const SignInForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userLogin = async (payload: Tlogin) => {
        try {
            payload.email = payload.email.toLowerCase()
            const res = await login(payload);
            if (res?.status === STATUS.SUCCESS) {
                dispatch(addUser(res));
                navigate(UI_ENDPOINTS.RECIPES_LIST);
                localStorage.setItem("accessToken", res?.data?.access)
                Toaster({ toast: res?.data?.message, toastType: "success" })
            }
        }
        catch (err: any) {
            Toaster({ toast: err.message, toastType: "error" })
        }

    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: userLogin,
    });

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={formik.handleSubmit}>
                <h1>Sign in</h1>
                <Input
                    type="text"
                    placeholder="Enter email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : undefined
                    }
                />
                <Input
                    type="password"
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : undefined
                    }
                />
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;
