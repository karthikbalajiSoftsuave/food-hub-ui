import React from "react";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import { registerValidationSchema } from "../../../validators/auth.validator";
import { Tregister } from "../../../interface/auth.interface";
import { register } from "../../../service/auth.service";
import Toaster from "../../../utils/Toaster";
import { STATUS } from "../../../utils/constants";

type TProps = {
    setType: (type: string) => void
};

const SignUpForm: React.FC<TProps> = ({ setType }) => {

    const submitRegister = async (payload: Tregister) => {
        payload.email = payload.email.toLowerCase();
        try {
            const res = await register(payload);
            if (res?.data?.status === STATUS.SUCCESS) {
                setType("signIn");
                Toaster({ toast: res?.data?.message, toastType: "success" })
            }
        }
        catch (err: any) {
            Toaster({ toast: err?.response?.data?.message, toastType: "error" })
        }
    }

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerValidationSchema,
        onSubmit: submitRegister,
    });

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={formik.handleSubmit}>
                <h1>Create Account</h1>
                <Input
                    type="text"
                    placeholder="Enter your First name"
                    id="first_name"
                    name="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    onBlur={formik.handleBlur}
                    error={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : undefined}
                />
                <Input
                    type="text"
                    placeholder="Enter your Last name"
                    id="last_name"
                    name="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    onBlur={formik.handleBlur}
                    error={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : undefined}
                />
                {/* Phone Number */}
                <Input
                    type="text"
                    placeholder="Enter your Phone number"
                    id="phone_number"
                    name="phone_number"
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : undefined}
                />
                {/* Email */}
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                />

                {/* Password */}
                <Input
                    type="password"
                    placeholder="Choose a password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                />
                {/* Confirm Password */}
                <Input
                    type="password"
                    placeholder="Confirm your password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
