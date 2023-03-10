import { FC } from 'react';
import Image from 'next/image';
import Button from './Button';
import { ArticlePagesPrefixes } from '../constants';

type ArticleListItemProps = {
  slug?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
};

const ArticleListItem: FC<ArticleListItemProps> = ({ slug, title, description, thumbnail = '' }) => (
  <div className="border border-gray-50 p-2 flex w-md h-md flex-col min-w-full h-full min-h-full max-w-full">
    {Boolean(thumbnail) && (
      <span className="shrink-0">
        <Image className="w-full h-full" width={300} height={150} src={thumbnail} alt="" />
      </span>
    )}
    <div className="p-3 inline-flex flex-col h-full">
      <p className="font-bold text-2xl">{title}</p>
      <p className="pt-2 pb-4">{description}</p>
      {Boolean(slug) && (
        <Button.Link
          href={`${ArticlePagesPrefixes.ArticlesPage}/${slug}`}
          styleType="primary"
          className="block mt-auto text-sm w-max"
        >
          <span>READ ARTICLE</span>
        </Button.Link>
      )}
    </div>
  </div>
);

export default ArticleListItem;
