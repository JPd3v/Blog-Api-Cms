import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import LoadingPage from '../utils/LoadingPage';
import ArticlePreview from './ArticlePreview';

interface Article {
  author: Author;
  title: string;
  content: string;
  published: boolean;
  published_date: string;
  _id: string;
}

export type { Article };

interface Author {
  first_name: string;
  last_name: string;
  _id: string;
}

export default function UserArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState('');
  const { userToken } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    async function getArticles() {
      try {
        const req = await fetch(
          'https://blog-api-787a.onrender.com/user/articles',
          {
            method: 'GET',
            credentials: 'include',
            headers: { Authorization: `Bearer ${userToken}` },
            signal: controller.signal,
          }
        );

        const response = await req.json();
        setArticles(response);
        setIsLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          console.log(error);
          setFetchError('Error geting articles form the server');
        }
      }
    }
    getArticles();

    return () => controller.abort();
  }, []);

  return (
    <div className="articles-container">
      {isLoading && !fetchError ? (
        <LoadingPage />
      ) : (
        articles.map((article) => (
          <div
            key={article._id}
            className="articles-container__article-preview article-preview"
          >
            <ArticlePreview article={article} />
          </div>
        ))
      )}
      {!isLoading && fetchError ? <p>{fetchError}</p> : null}

      {!isLoading && !fetchError && articles.length < 1 ? (
        <p>You don&apos;t have articles created</p>
      ) : null}
    </div>
  );
}
