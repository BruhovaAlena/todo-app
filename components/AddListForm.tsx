import React from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddNewListValidationSchema } from '../validation';
import { useAddNewListMutation } from '../mutations/useAddNewListMutation';

type AddListFormProps = {
  onSuccess: () => void;
};

type FormValues = {
  title: string;
};

const AddListForm = ({ onSuccess }: AddListFormProps) => {
  const mutation = useAddNewListMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(AddNewListValidationSchema),
    defaultValues: {
      title: '',
    },
  });

  const submitHandler = (formValues: FormValues) => {
    mutation.mutate({
      title: formValues.title,
    });
    reset();
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-row w-full items-center gap-4 bg-slate-100 px-3 py-4 rounded-md justify-center"
    >
      <div className="form-control w-full max-w-sm">
        <label className="label" htmlFor="title">
          <span className="label-text font-semibold">Title</span>
        </label>
        <div className="flex flex-row items-center gap-3">
          <input
            id="title"
            {...register('title')}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <Button
            type="submit"
            title="Create"
            className="btn-sm  bg-emerald-500 text-white"
          />
        </div>
        <p className="label-text font-semibold text-red-500 pt-1">
          {errors.title?.message}
        </p>
      </div>
    </form>
  );
};

export default AddListForm;
