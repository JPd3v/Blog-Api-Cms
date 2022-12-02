/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';

export default function CreateArticleForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const { userToken } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  async function formsubmit(data: FieldValues) {
    setIsLoading(true);
    setFetchError('');
    try {
      const req = await fetch(`https://blog-api-787a.onrender.com/articles/`, {
        method: 'post',
        headers: {
          Authorization: `bearer ${userToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          published: data.published,
        }),
      });

      if (req.status === 200) {
        navigate('/');
        return;
      }

      if (req.status === 403) {
        setFetchError('New article title or content cant be empty');
        return;
      }

      setFetchError('Something went wrong, try again later');
      return;
    } catch (error) {
      console.log(error);
      setFetchError('Something went wrong, try again later');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(formsubmit)}
      className="new-article-form"
    >
      <h1>New Article</h1>
      <label htmlFor="title" className="new-article-form__label">
        Title
        <input
          aria-labelledby="title-error"
          id="title"
          {...register('title', { required: 'Title are required' })}
        />
      </label>
      {errors.title && (
        <p
          className="new-article-form__error-message"
          id="title-error"
        >{`${errors.title.message}`}</p>
      )}

      <div className="new-article-form__privacy-wrapper">
        <label htmlFor="checkboxprivacity">
          privacy
          <input
            {...register('published')}
            type="checkbox"
            className="checkboxprivacity"
            id="checkboxprivacity"
          />
          <span />
        </label>
      </div>

      <label htmlFor="content" className="new-article-form__label">
        Content
        <textarea
          aria-labelledby="content-error"
          className="new-article-form__content"
          id="content"
          {...register('content', {
            required: 'Content are required',
            validate: {
              empty: (value) =>
                value.trim().length > 0 || 'content cant be empty',
            },
          })}
        />
      </label>
      {errors.content && (
        <p
          className="new-article-form__error-message"
          id="content-error"
        >{`${errors.content.message}`}</p>
      )}

      <button type="submit" className="new-article-form__submit">
        Submit
      </button>
      <div className="new-article-form__post">
        {isLoading && !fetchError ? <LoadingSpinner /> : null}
        {fetchError && !isLoading ? (
          <p className="comment__delete-error-message" role="alert">
            {fetchError}
          </p>
        ) : null}
      </div>
    </form>
  );
}
