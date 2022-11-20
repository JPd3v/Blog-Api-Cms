import type { IComment } from './CommentSection';

interface ComponentProps {
  comment: IComment;
}

export default function Comment({ comment }: ComponentProps) {
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
    </>
  );
}
