import React from 'react';
import Button from './Button';
import DatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AddNewToDoItemValidationSchema } from '../validation';
import { useAddNewToDoItemMutation } from '../mutations/useAddNewToDoItemMutation';

export enum Priority {
  ALL = 'ALL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
type FormProps = {
  idList: number;
  onSuccess: () => void;
};

type FormValues = {
  title: string;
  description: string;
  date: Date;
  priority: string;
};

const AddToDoItemForm = ({ idList, onSuccess }: FormProps) => {
  const mutation = useAddNewToDoItemMutation();
  const currentDate = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(AddNewToDoItemValidationSchema),
    defaultValues: {
      title: '',
      description: '',
      date: currentDate,
      priority: '',
    },
  });

  const submitHandler = ({
    description,
    priority,
    date,
    title,
  }: FormValues) => {
    mutation.mutate({
      title,
      connect: [idList],
      description,
      priority,
      date,
    });
    reset();
    onSuccess();
  };

  return (
    <div className="flex flex-col  max-w-[450px] w-full items-center bg-slate-100 px-3 py-4 rounded-md">
      <div className="text-xl font-semibold w-full text-center">Add ToDo</div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full"
      >
        <div className=" flex flex-col gap-6">
          <div className="form-control w-full">
            <label className="label font-semibold" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <input
              id="title"
              {...register('title')}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <p className="label-text font-semibold text-red-500 pt-1">
              {errors.title?.message}
            </p>
          </div>
          <div className="form-control">
            <label className="label font-semibold" htmlFor="description">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              {...register('description')}
              className="textarea textarea-bordered h-24"
              placeholder="Add description"
            ></textarea>
            <p className="label-text font-semibold text-red-500 pt-1">
              {errors.description?.message}
            </p>
          </div>

          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="form-control w-full">
                <label className="label font-semibold" htmlFor="date">
                  <span className="label-text">Date</span>
                </label>
                <DatePicker
                  id="date"
                  className="border border-slate-100 h-12 px-4 rounded-lg"
                  minDate={currentDate}
                  selected={new Date(value)}
                  onChange={(date) => {
                    if (date) {
                      onChange(date);
                    }
                  }}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            )}
          />

          <div className="form-control w-full">
            <label className="label font-semibold" htmlFor="priority">
              <span className="label-text">Priority</span>
            </label>
            <select
              id="priority"
              className="select select-bordered"
              {...register('priority')}
            >
              <option value="priority3">{Priority.HIGH}</option>
              <option value="priority2">{Priority.MEDIUM}</option>
              <option value="priority1">{Priority.LOW}</option>
            </select>
            <p className="label-text font-semibold text-red-500 pt-1">
              {errors.priority?.message}
            </p>
          </div>
          <Button
            title="Add"
            className="bg-emerald-50 text-emerald-500 border border-emerald-500"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddToDoItemForm;
