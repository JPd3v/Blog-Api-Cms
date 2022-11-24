import { useEffect, useState } from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import Comment from './Comment';

interface ComponentProps {
  articleId: string;
}

interface IComment {
  _id: string;
  article_id: string;
  name: string;
  comment: string;
  timestamp: Date;
}

export type { IComment };

export default function CommentSection({ articleId }: ComponentProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function getComments() {
      try {
        const response = await fetch(
          `https://blog-api-787a.onrender.com/articles/${articleId}/comments`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log(error);
          setFetchError('Failed getting comments from the server');
        }
      } finally {
        setLoading(false);
      }
    }
    getComments();
    return () => {
      controller?.abort();
    };
  }, []);

  function deleteComment(deletedComment: IComment) {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== deletedComment._id)
    );
  }

  return (
    <div className="article__comments-container">
      {!fetchError && !loading ? (
        comments.map((comment) => (
          <div
            className="comments-container__comment comment"
            key={comment._id}
          >
            <Comment
              comment={comment}
              handleCommentDeletion={(deletedComment) =>
                deleteComment(deletedComment)
              }
            />
          </div>
        ))
      ) : (
        <div>{fetchError}</div>
      )}
      {!fetchError && !loading && comments.length < 1 ? (
        <p className="comments-container__not-comments">
          The article has no comments
        </p>
      ) : null}
      {!fetchError && loading ? <LoadingSpinner /> : null}
    </div>
  );
}
