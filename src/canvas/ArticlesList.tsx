import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '../components/Container';
import ArticleListItem from '../components/ArticleListItem';

interface Article {
  slug?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

type ArticlesListProps = ComponentProps<{
  title: string;
  content?: Article[];
  contentFromContentful?: Article[];
  contentFromAlgolia?: Article[];
}>;

const ArticlesList: FC<ArticlesListProps> = ({
  title,
  content = [],
  contentFromContentful = [],
  contentFromAlgolia = [],
}) => (
  <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
    <p className="text-5xl font-bold">{title}</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 pt-12 mt-12 border-t border-gray-50">
      {Array.isArray(content) && content.map(item => <ArticleListItem key={item.slug} {...item} />)}
      {Array.isArray(contentFromContentful) &&
        contentFromContentful.map(item => (
          <ArticleListItem key={item.slug} {...item} title={item.title + ' ' + '(Contentful)'} />
        ))}
      {Array.isArray(contentFromAlgolia) &&
        contentFromAlgolia.map(item => (
          <ArticleListItem key={item.slug} {...item} title={item.title + ' ' + '(Algolia)'} />
        ))}
    </div>
  </Container>
);

registerUniformComponent({
  type: 'articlesList',
  component: ArticlesList,
});

export default ArticlesList;
