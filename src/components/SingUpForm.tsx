/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';

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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="sign-up-form">
      <h1 className="sign-up-form__title">Create Account</h1>
      <label htmlFor="first_name" className="sign-up-form__label">
        First Name:
        <input
          aria-invalid={errors.first_name ? 'true' : 'false'}
          aria-describedby="first-name-error"
          type="text"
          id="first_name"
          {...register('first_name', {
            required: 'First Name field cant be empty',
          })}
        />
      </label>

      {errors.first_name ? (
        <p
          className="sign-up-form__error"
          id="first-name-error"
        >{`${errors.first_name.message}`}</p>
      ) : null}

      <label htmlFor="last_name" className="sign-up-form__label">
        Last Name:
        <input
          aria-invalid={errors.last_name ? 'true' : 'false'}
          aria-describedby="last-name-error"
          type="text"
          id="last_name"
          {...register('last_name', {
            required: 'Last Name field cant be empty',
          })}
        />
      </label>

      {errors.last_name ? (
        <p
          className="sign-up-form__error"
          id="last-name-error"
        >{`${errors.last_name.message}`}</p>
      ) : null}

      <label htmlFor="username" className="sign-up-form__label">
        Email:
        <input
          aria-invalid={errors.username ? 'true' : 'false'}
          aria-describedby="e-mail-error"
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
        <p
          className="sign-up-form__error"
          id="e-mail-error"
        >{`${errors.username.message}`}</p>
      ) : null}

      <label htmlFor="password" className="sign-up-form__label">
        Password:
        <input
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby="password-error"
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
        <p
          className="sign-up-form__error"
          id="password-error"
        >{`${errors.password.message}`}</p>
      ) : null}

      <label htmlFor="confirm_password" className="sign-up-form__label">
        Confirm Password:
        <input
          aria-invalid={errors.confirm_password ? 'true' : 'false'}
          aria-describedby="confirm-password-error"
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
        <p className="sign-up-form__error" id="confirm-password-error">
          Password and Confirm Password fields should match
        </p>
      ) : null}

      {fetchError && !isSubmitting ? (
        <p className="sign-up-form__error" role="alert">
          {fetchError}
        </p>
      ) : null}

      {isSubmitting && !fetchError ? <LoadingSpinner /> : null}
      <button
        type="submit"
        className="sign-up-form__submit-button"
        disabled={isSubmitting}
      >
        Register
      </button>
    </form>
  );
}
