import * as Yup from 'yup';
import { passwordValidation } from '../RegisterPage/validation';
export const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: passwordValidation,
  });