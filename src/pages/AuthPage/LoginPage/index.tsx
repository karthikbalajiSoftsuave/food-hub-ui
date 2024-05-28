import { Link } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useFormik } from "formik";
import { validationSchema } from "./validation";
import { login } from "../../../service/auth.service";
import { Tlogin } from "../../../interface/auth.interface";
import { useNavigate } from "react-router-dom";
import Toaster from "../../../utils/Toaster";
const LoginPage: React.FC = () => {
    const navigate =useNavigate();
  const userLogin = async (payload: Tlogin) => {
    try{
    payload.email=payload.email.toLowerCase()
    // const res = await login(payload);
    // if(res){
        // console.log(res)
        localStorage.setItem("accessToken","res.data.token")
        navigate('/dashboard')
    // }
    }
    catch(err:any){
      Toaster({toast:err.message,toastType:"error"})
    }
    
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: userLogin,
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Email"
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
          label="Password"
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
        {/* Buttons */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <Button className="mb-4 lg:mb-0" type="submit">
            Login
          </Button>
          <div className="text-center lg:text-left">
            Create an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
