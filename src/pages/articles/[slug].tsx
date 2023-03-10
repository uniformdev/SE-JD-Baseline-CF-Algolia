import { GetStaticProps, GetStaticPaths } from 'next';
import { CommonContainer } from '@/components';
import { getCompositionProps } from '@/utilities/canvas';
import { AppPages, DepthOfNavigationLinks, InternalCompositionSlugs } from '@/constants';
import { Article, enhancerCustomExtenderFactory, getArticles } from '@/enhancers/article';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const slug = params?.slug as string | undefined;
  const articles = await getMemorizedData({ preview });
  if (!articles || !slug) return { notFound: true };

  return getCompositionProps({
    slug, // Request for custom page
    defaultSlug: InternalCompositionSlugs.ArticleListing, // Request a default template page for articles in case there is no custom page
    context,
    navigationLinkOptions: { depth: DepthOfNavigationLinks },
    extendEnhancer: enhancerCustomExtenderFactory(articles[slug]),
  })
    .then(compositionProps => ({
      props: {
        ...compositionProps,
        preview: Boolean(preview),
      },
    }))
    .catch(() => ({ notFound: true }));
};

const getMemorizedData = (() => {
  let memo: { [name: string]: Article } | null = null;
  return async ({ preview = false }) => {
    if (memo && !preview) return memo;
    memo = await getArticles(preview);
    return memo;
  };
})();

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getMemorizedData({ preview: false });
  const paths = Object.keys(articles || {}).map(articleSlug => `${AppPages.Articles}/${articleSlug}`);
  return { paths, fallback: false };
};

export default CommonContainer;
