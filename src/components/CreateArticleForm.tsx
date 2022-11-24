/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';

export default function CreateArticleForm() {
  const [articlePrivacy, setArticlePrivacy] = useState(false);
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
          published: articlePrivacy,
        }),
      });

      if (req.status === 200) {
        navigate('/');
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
      <label htmlFor="title" className="new-article-form__label">
        Title
        <input
          id="title"
          {...register('title', { required: 'Title are required' })}
        />
      </label>
      {errors.title && (
        <p className="new-article-form__error-message">{`${errors.title.message}`}</p>
      )}

      <div className="new-article-form__privacy-wrapper">
        <p>Privacy</p>
        <button
          type="button"
          className={`article-content__privacy-edit-button ${
            articlePrivacy
              ? 'article-content__state--published'
              : 'article-content__state--not-published'
          }`}
          onClick={() => {
            setArticlePrivacy((prev) => !prev);
          }}
        >
          {articlePrivacy ? 'Published' : 'Not Published'}
        </button>
      </div>

      <label htmlFor="content" className="new-article-form__label">
        Content
        <textarea
          className="new-article-form__content"
          id="content"
          {...register('content', { required: 'Content are required' })}
        />
      </label>
      {errors.content && (
        <p className="new-article-form__error-message">{`${errors.content.message}`}</p>
      )}

      <button type="submit" className="new-article-form__submit">
        Submit
      </button>
      <div className="new-article-form__post">
        {isLoading && !fetchError ? <LoadingSpinner /> : null}
        {fetchError && !isLoading ? (
          <p className="comment__delete-error-message">{fetchError}</p>
        ) : null}
      </div>
    </form>
  );
}
