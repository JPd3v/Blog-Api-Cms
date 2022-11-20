import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import SingleArticle from '../components/SingleArticle';
import LoadingPage from '../utils/LoadingPage';
import type { Article } from '../components/UserArticles';
import PageNotFound from '../utils/PageNotFound';

const initialArticle = {
  author: { first_name: '', last_name: '', _id: '' },
  title: '',
  content: '',
  published: true,
  published_date: '',
  _id: '',
};

export default function BlogArticle() {
  const [article, setArticle] = useState<Article>(initialArticle);
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const controller = new AbortController();
    async function getArticle() {
      try {
        const response = await fetch(
          `https://blog-api-787a.onrender.com/articles/${params.id}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.log(err);
          setLoading(false);
          setFetchError(
            'Failed getting blog article Information from the server.'
          );
        }
      }
    }
    getArticle();
    return () => {
      controller?.abort();
    };
  }, []);
  return (
    <div className="article">
      {!fetchError && !loading && article._id ? (
        <>
          <SingleArticle article={article} />

          <CommentSection articleId={article._id} />
        </>
      ) : (
        <div className="flex-centered-40vh">
          {!fetchError && !loading ? <PageNotFound /> : <div>{fetchError}</div>}
        </div>
      )}
      {!fetchError && loading ? <LoadingPage /> : null}
    </div>
  );
}
