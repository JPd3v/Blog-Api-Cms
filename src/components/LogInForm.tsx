/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';

interface IFormValues {
  username?: string;
  password?: string;
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function LogInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const { setUserInfo, setUserToken } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  async function onSubmit(data: IFormValues) {
    try {
      setIsSubmitting(true);
      setFetchError('');

      const req = await fetch(
        'https://blog-api-787a.onrender.com/user/log-in',
        {
          method: 'post',
          mode: 'cors',
          headers: { 'content-type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      );

      const response = await req.json();

      if (req.status === 401) {
        setFetchError('Email or Password incorrect');
        return;
      }
      if (req.status === 409 || req.status === 500) {
        setFetchError('Something went wrong, try again later');
        return;
      }
      setUserToken?.(response.token);
      setUserInfo?.(response.userInfo);
      reset({ username: '', password: '' });
      navigate('/');
    } catch (error) {
      console.log(error);
      setFetchError('Something went wrong, try again later');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="log-in-form">
      <p className="log-in-form__title">Log In</p>
      <label htmlFor="username" className="log-in-form__label">
        Email:
        <input
          type="email"
          id="username"
          {...register('username', {
            pattern: {
              value: emailRegex,
              message: 'Email introduced is not valid',
            },
            required: 'Email is required',
          })}
        />
      </label>

      {errors.username ? (
        <p className="sign-up-form__error">{`${errors.username.message}`}</p>
      ) : null}

      <label htmlFor="Password" className="log-in-form__label">
        Password:
        <input
          type="password"
          id="Password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters long',
            },
            required: 'Password is required',
          })}
        />
      </label>

      {errors.password ? (
        <p className="sign-up-form__error">{`${errors.password.message}`}</p>
      ) : null}

      {isSubmitting ? <LoadingSpinner /> : null}
      {fetchError ? <p className="sign-up-form__error">{fetchError}</p> : null}
      <button
        type="submit"
        className="log-in-form__submit-button"
        disabled={isSubmitting}
      >
        Log in
      </button>
    </form>
  );
}
