import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { ComponentInstance } from '@uniformdev/canvas';
import { useInstantSearch, Hits } from 'react-instantsearch-hooks-web';
import { InformationContent } from '../../components';
import { ArticleListItem } from '../../components';

const ArticleHit = ({ hit }: { hit: Record<string, unknown> }) => <ArticleListItem {...hit} />;

const AlgoliaHits: FC<ComponentProps> = componentProps => {
  const {
    results: { hits, processingTimeMS },
    status,
  } = useInstantSearch();

  const renderContent = (component: ComponentInstance) => {
    if (!hits.length && status === 'idle' && processingTimeMS) {
      return <InformationContent title="Sorry there are no articles for this filter" />;
    }

    const { type } = component?.slots?.hitComponent?.[0] || {};
    switch (type) {
      case 'algolia-hitArticle': {
        return (
          <Hits<Record<string, unknown>>
            hitComponent={ArticleHit}
            classNames={{
              list: 'grid sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 pt-12 mt-12 border-t border-gray-50',
            }}
          />
        );
      }
      default:
        return <Hits />;
    }
  };

  return <div className="min-h-[500px]">{renderContent(componentProps.component)}</div>;
};

registerUniformComponent({
  type: 'algolia-hits',
  component: AlgoliaHits,
});

export default AlgoliaHits;
