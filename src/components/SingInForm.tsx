/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormValues {
  username?: string;
  passport?: string;
  confirm_password?: string;
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function SingInForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  function onSubmit(data: IFormValues) {
    console.log(data);
  }

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="sign-in-form">
      <p className="sign-in-form__title">Create Account</p>
      <label htmlFor="username" className="sign-in-form__label">
        Email:
        <input
          type="email"
          id="username"
          {...register('username', {
            pattern: {
              value: emailRegex,
              message: 'Email introduced is not valid',
            },
            required: 'Email field cant be empty',
          })}
        />
      </label>
      {errors.username ? (
        <p className="sign-in-form__error">{`${errors.username.message}`}</p>
      ) : null}
      <label htmlFor="password" className="sign-in-form__label">
        Passport:
        <input
          type="password"
          id="password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters length',
            },
            required: 'Password field cant be empty',
          })}
        />
      </label>
      {errors.password ? (
        <p className="sign-in-form__error">{`${errors.password.message}`}</p>
      ) : null}
      <label htmlFor="confirm_password" className="sign-in-form__label">
        Confirm Password:
        <input
          type="password"
          id="confirm_password"
          {...register('confirm_password', {
            required: 'confirm password field cant be empty',
            validate: (value) => password === value,
          })}
        />
      </label>

      {watch('confirm_password') !== watch('password') &&
      getValues('confirm_password') ? (
        <p className="sign-in-form__error">
          Password and Confirm Password fields should match
        </p>
      ) : null}

      <button type="submit" className="sign-in-form__submit-button">
        Register
      </button>
    </form>
  );
}
