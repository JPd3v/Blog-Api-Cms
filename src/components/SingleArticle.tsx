import type { Article } from './UserArticles';

interface ComponentProps {
  article: Article;
}

export default function SingleArticle({ article }: ComponentProps) {
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

      <p
        className={`article-content__state ${
          article.published
            ? 'article-content__state--published'
            : 'article-content__state--not-published'
        }`}
      >
        {article.published ? 'Published' : 'Not Published'}
      </p>
      <p className="article-content__date">{formatedArticleDate}</p>
      <p className="article-content__title">{article.title}</p>
      <p className="article-content__content">{article.content}</p>
    </div>
  );
}
