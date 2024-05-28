import * as Yup from 'yup';

export const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients is required'),
    salary: Yup.number().positive('Salary must be a positive number').required('Salary is required'),
    preparationSteps: Yup.string().required('Preparation Steps is required'),
    worklocation: Yup.string().required('Work Location is required'),
  });