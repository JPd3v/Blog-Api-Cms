import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import type { Article } from './UserArticles';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';

interface ComponentProps {
  article: Article;
}

export default function SingleArticle({ article }: ComponentProps) {
  const [articleTitle, setArticleTitle] = useState(article.title);
  const [articleContent, setArticleContent] = useState(article.content);
  const [articlePrivacy, setArticlePrivacy] = useState(article.published);
  const [editPrivacy, setEditPrivacy] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { userToken } = useAuth();
  const navigate = useNavigate();

  const articleDate = new Date(article.published_date);
  const formatedArticleDate = articleDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function resetArticle() {
    setArticlePrivacy(article.published);
    setArticleTitle(article.title);
    setArticleContent(article.content);
  }

  async function saveArticle() {
    setIsLoading(true);
    setFetchError('');
    try {
      const req = await fetch(
        `https://blog-api-787a.onrender.com/articles/${article._id}`,
        {
          method: 'put',
          headers: {
            Authorization: `bearer ${userToken}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            title: articleTitle,
            content: articleContent,
            published: articlePrivacy,
          }),
        }
      );
      const res = await req.json();
      if (req.status === 200) {
        navigate('/');
      }
      if (req.status === 403) {
        console.log(res);
        setFetchError(
          'Only user creator of the article are allowed to edit it'
        );
      }
    } catch (error) {
      console.log(error);
      setFetchError('Error saving your article, try again later');
    } finally {
      setIsLoading(false);
    }
  }

  function sameArticleCheck() {
    if (
      (articlePrivacy === article.published &&
        articleTitle === article.title &&
        articleContent === article.content) ||
      isLoading
    ) {
      return true;
    }
    return false;
  }

  const disablebutton = sameArticleCheck();

  return (
    <div className="article-content">
      <p className="article-content__author">
        {article.author.first_name} {article.author.last_name}
      </p>

      <div className="display-flex-wrap-gap10px">
        {!editPrivacy ? (
          <div>
            Privacy state:
            <p
              className={`article-content__state ${
                articlePrivacy
                  ? 'article-content__state--published'
                  : 'article-content__state--not-published'
              }`}
            >
              {articlePrivacy ? 'Published' : 'Not Published'}
            </p>
          </div>
        ) : (
          <div>
            <label htmlFor="title">
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
            </label>

            <button
              type="button"
              className="article-content__checkButton"
              onClick={() => setEditPrivacy((prev) => !prev)}
            >
              <BsCheckLg />
            </button>
          </div>
        )}

        <button
          type="button"
          className="article-content__editButton"
          onClick={() => setEditPrivacy((prev) => !prev)}
        >
          {!editPrivacy ? (
            <FiEdit />
          ) : (
            <button
              type="button"
              onClick={() => {
                setArticlePrivacy(article.published);
              }}
              className="article-content__editButton"
            >
              <ImCancelCircle />
            </button>
          )}
        </button>
      </div>

      <p className="article-content__date">
        Published date:
        {formatedArticleDate === 'Invalid Date'
          ? 'Article never was published'
          : formatedArticleDate}
      </p>

      <div className="display-flex-wrap-gap10px">
        {!editTitle ? (
          <p className="article-content__title">Title: {articleTitle}</p>
        ) : (
          <div>
            <label htmlFor="title">
              <p className="article-content__title">New title</p>
              <input
                type="text"
                id="title"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="article-content__checkButton"
              onClick={() => setEditTitle((prev) => !prev)}
            >
              <BsCheckLg />
            </button>
          </div>
        )}

        <button
          type="button"
          className="article-content__editButton"
          onClick={() => {
            setEditTitle((prev) => !prev);
          }}
        >
          {!editTitle ? (
            <FiEdit />
          ) : (
            <button
              type="button"
              onClick={() => {
                setArticleTitle(article.title);
              }}
              className="article-content__editButton"
            >
              <ImCancelCircle />
            </button>
          )}
        </button>
      </div>

      <div className="display-flex-wrap-gap10px">
        {!editContent ? (
          <div className="article-content__content">
            <p className="article-content__title">Article content:</p>{' '}
            {articleContent}
          </div>
        ) : (
          <div>
            <label htmlFor="content">
              <p className="article-content__title">New article content:</p>
              <textarea
                id="content"
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="article-content__checkButton"
              value={article.content}
              onClick={() => setEditContent((prev) => !prev)}
            >
              <BsCheckLg />
            </button>
          </div>
        )}

        <button
          type="button"
          className="article-content__editButton"
          onClick={() => {
            setEditContent((prev) => !prev);
          }}
        >
          {!editContent ? (
            <FiEdit />
          ) : (
            <button
              type="button"
              onClick={() => {
                setArticleContent(article.content);
              }}
              className="article-content__editButton"
            >
              <ImCancelCircle />
            </button>
          )}
        </button>
      </div>
      <div className="article-content__article-save-controller article-save-controller">
        <button
          type="button"
          onClick={resetArticle}
          className="article-save-controller__button article-save-controller__button--reset"
        >
          Reset article
        </button>
        <button
          type="button"
          onClick={saveArticle}
          className="article-save-controller__button article-save-controller__button--save"
          disabled={disablebutton}
        >
          Save changes
        </button>
      </div>
      <div className="article-content__error">
        {isLoading && !fetchError ? <LoadingSpinner /> : null}
        {!isLoading && fetchError ? <p>{fetchError}</p> : null}
      </div>
    </div>
  );
}
