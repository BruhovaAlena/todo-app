import * as yup from 'yup';

export const AddNewListValidationSchema = yup.object({
  title: yup.string().required('Add title of ToDo'),
});

export const AddNewToDoItemValidationSchema = yup.object({
  title: yup.string().required('Add title of ToDo'),
  description: yup.string().required('Add short description'),
  date: yup.date().required(),
  priority: yup.string().required('Add priority'),
});
