import { useState } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import DeleteArticleModal from './DeleteArticleModal';

interface IDeleteArticleButtonProps {
  articleId: string;
  articleTitle: string;
}

export default function DeleteArticleButton({
  articleId,
  articleTitle,
}: IDeleteArticleButtonProps) {
  const [showModal, setShowModal] = useState(false);

  function handleClickCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <button
        type="button"
        className="delete-article-button"
        onClick={() => setShowModal((prev) => !prev)}
      >
        <MdOutlineDeleteForever />
      </button>
      {showModal ? (
        <DeleteArticleModal
          articleId={articleId}
          articleTitle={articleTitle}
          closeModal={() => handleClickCloseModal()}
        />
      ) : null}
    </>
  );
}
