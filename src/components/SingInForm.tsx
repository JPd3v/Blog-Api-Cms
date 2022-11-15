/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface IFormValues {
  username?: string;
  password?: string;
  confirm_password?: string;
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function SingInForm() {
  const [fetchError, setFetchError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setUserToken, setUserInfo } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  async function onSubmit(data: IFormValues) {
    try {
      setFetchError('');
      setIsSubmitting(true);
      const req = await fetch(
        'https://blog-api-787a.onrender.com/user/sign-up',
        {
          method: 'post',
          mode: 'cors',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      const response = await req.json();
      reset(response);
      if (req.status === 403) {
        setFetchError('Email already in use');
      } else if (req.status === 409) {
        setFetchError('Something went wrong, try again later');
      } else {
        setUserToken?.(response.token);
        setUserInfo?.(response.userInfo);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setFetchError(
        'Our server have failed processing your request, try again later'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="sign-in-form">
      <p className="sign-in-form__title">Create Account</p>
      <label htmlFor="first_name" className="sign-in-form__label">
        First Name:
        <input
          type="text"
          id="first_name"
          {...register('first_name', {
            required: 'First Name field cant be empty',
          })}
        />
      </label>

      {errors.first_name ? (
        <p className="sign-in-form__error">{`${errors.first_name.message}`}</p>
      ) : null}

      <label htmlFor="last_name" className="sign-in-form__label">
        Last Name:
        <input
          type="text"
          id="last_name"
          {...register('last_name', {
            required: 'Last Name field cant be empty',
          })}
        />
      </label>

      {errors.last_name ? (
        <p className="sign-in-form__error">{`${errors.last_name.message}`}</p>
      ) : null}

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
        Password:
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

      {fetchError && !isSubmitting ? (
        <p className="sign-in-form__error">{fetchError}</p>
      ) : null}

      <button
        type="submit"
        className="sign-in-form__submit-button"
        disabled={isSubmitting}
      >
        Register
      </button>
    </form>
  );
}
