import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineDeleteForever } from 'react-icons/md';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';
import type { IComment } from './CommentSection';

interface ComponentProps {
  comment: IComment;
  handleCommentDeletion(arg0: IComment): void;
}

export default function Comment({
  comment,
  handleCommentDeletion,
}: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const { userToken } = useAuth();

  const params = useParams();

  async function deleteComment() {
    setIsLoading(true);
    setFetchError('');
    try {
      const req = await fetch(
        `https://blog-api-787a.onrender.com/articles/${params.id}/comments/${comment._id}`,
        {
          method: 'delete',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (req.status === 200) {
        handleCommentDeletion(comment);
        return;
      }

      if (req.status === 403) {
        setFetchError(
          'Only user creator of the article are allowed to delete their comments'
        );
        return;
      }

      setFetchError('Someting went wrong, try again later');
    } catch (error) {
      setFetchError('Someting went wrong, try again later');
    } finally {
      setIsLoading(false);
    }
  }

  const date = new Date(comment.timestamp);

  const formatedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div className="comment__header">
        <p className="comment__name">{comment.name}</p>
        <p className="comment__date">{formatedDate}</p>
      </div>
      <p className="comment__text">{comment.comment}</p>
      <div className="comment__delete-button">
        <button type="button" onClick={() => deleteComment()}>
          <MdOutlineDeleteForever />
        </button>
      </div>
      <div className="comment__fetch-status">
        {isLoading && !fetchError ? <LoadingSpinner /> : null}
        {fetchError && !isLoading ? (
          <p className="comment__delete-error-message">{fetchError}</p>
        ) : null}
      </div>
    </>
  );
}
