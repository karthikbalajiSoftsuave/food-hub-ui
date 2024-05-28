import React from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useFormik } from "formik";
import { validationSchema } from "./validation";
import { Tregister } from "../../../interface/auth.interface";
import { register } from "../../../service/auth.service";
const RegisterPage: React.FC = () => {

  const submitReg = async (payload: Tregister) => {
    delete payload.confirmPassword
    payload.email = payload.email.toLowerCase();
    try {
      const res = await register(payload)
      console.log(res);
    }
    catch (err) {
      console.log(err)
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
    validationSchema: validationSchema,
    onSubmit: submitReg,
  });
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* First Name */}
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your First name"
          id="first_name"
          name="first_name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : undefined}
        />
        {/* Last Name */}
        <Input
          label="Last Name"
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
          label="Phone Number"
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
          label="Email"
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
          label="Password"
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
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
        />
        {/* Register Button */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <Button className="mb-4 lg:mb-0" type="submit">
            Register
          </Button>
          <div className="text-center lg:text-left">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
