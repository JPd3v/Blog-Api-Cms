import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';

interface IDeleteArticleModalProps {
  articleId: string;
  articleTitle: string;
  closeModal: () => void;
}

export default function DeleteArticleModal({
  articleId,
  articleTitle,
  closeModal,
}: IDeleteArticleModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const { userToken } = useAuth();

  const navigate = useNavigate();

  async function deleteArticle() {
    setIsLoading(true);
    setFetchError('');
    try {
      const req = await fetch(
        `https://blog-api-787a.onrender.com/articles/${articleId}`,
        {
          method: 'delete',
          headers: {
            Authorization: `bearer ${userToken}`,
          },
        }
      );

      if (req.status === 200) {
        navigate('/log-in');
      }

      if (req.status === 403) {
        setFetchError(
          'Only user creator of the article are allowed to delete it'
        );
      }
    } catch (error) {
      setFetchError(
        'Someting went wrong deleting your article, try again later'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="delete-article-modal">
      <div className="delete-article-modal__content">
        <p className="delete-article-modal__message">
          Are your sure to delete{' '}
          <span className="message__highlighted">{articleTitle}</span>? this
          action is irreversible
        </p>
        <div className="delete-article-modal__modal-buttons modal-buttons">
          <button
            type="button"
            className="modal-buttons modal-buttons--cancel"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="modal-buttons modal-buttons--delete-article"
            onClick={deleteArticle}
          >
            Delete article
          </button>
        </div>
        <div className="delete-article-modal__networ-status">
          {!isLoading && fetchError ? (
            <p className="delete-article-modal__error-message">{fetchError}</p>
          ) : null}

          {isLoading && !fetchError ? <LoadingSpinner /> : null}
        </div>
      </div>
    </div>
  );
}
