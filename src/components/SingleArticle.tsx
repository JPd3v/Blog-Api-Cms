import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { BsCheckLg } from 'react-icons/bs';
import type { Article } from './UserArticles';

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

  const articleDate = new Date(article.published_date);
  const formatedArticleDate = articleDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
    </div>
  );
}
