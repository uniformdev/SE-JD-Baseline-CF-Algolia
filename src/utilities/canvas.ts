import getConfig from 'next/config';
import {
  CanvasClient,
  CANVAS_PUBLISHED_STATE,
  CANVAS_DRAFT_STATE,
  RootComponentInstance,
  EnhancerBuilder,
} from '@uniformdev/canvas';
import { ProjectMapClient, ProjectMapNodeGetRequest, ProjectMapSubtree } from '@uniformdev/project-map';
import { enhanceComposition } from './enhanceComposition';

interface GetProjectMapOptions extends Omit<ProjectMapNodeGetRequest, 'projectId' | 'projectMapId'> {
  skipPath?: string;
}

const { uniformApiKey, uniformProjectId, uniformCliBaseUrl } = getConfig().serverRuntimeConfig;

const { canvasClient, projectMapClient } = (() => {
  if (!uniformApiKey || !uniformProjectId || !uniformCliBaseUrl) throw Error('Uniform credentials must be specified');
  const clientOptions = {
    apiKey: uniformApiKey,
    apiHost: uniformCliBaseUrl,
    projectId: uniformProjectId,
  };
  return { canvasClient: new CanvasClient(clientOptions), projectMapClient: new ProjectMapClient(clientOptions) };
})();

const getState = (preview: boolean | undefined) => (preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE);

const getCompositionBySlug = (slug: string, preview = false) =>
  canvasClient
    .getCompositionBySlug({
      slug,
      state: getState(preview),
    })
    .catch(e => {
      // TODO get rid of unnecessary forwarding slash logic (constants must be reworked as well)
      if (e.statusCode !== 404) throw e;
      return canvasClient.getCompositionBySlug({
        slug: slug.startsWith('/') ? slug.replace('/', '') : `/${slug}`,
        state: getState(preview),
      });
    });

export const getCompositionProps = async ({
  slug,
  defaultSlug,
  context,
  navigationLinkOptions,
  preEnhancer,
  extendEnhancer,
}: {
  slug: string;
  defaultSlug?: string;
  context: { preview?: boolean };
  navigationLinkOptions?: GetProjectMapOptions;
  preEnhancer?: EnhancerBuilder;
  extendEnhancer?: (enhancer: EnhancerBuilder) => void;
}): Promise<{ composition: RootComponentInstance; navigationLinks: Type.NavigationLink[] }> => {
  if (!slug) throw new Error('Composition slug is not provided');
  if (!canvasClient) throw new Error('Canvas client is not configured');

  const { preview } = context || {};

  // 1. fetch canvas composition by slug
  const { composition } = await getCompositionBySlug(slug, preview).catch(e => {
    if (e.statusCode !== 404 || !defaultSlug) throw e;
    return getCompositionBySlug(defaultSlug, preview); // Requesting a default composition in case the first one is not found
  });

  // 2. enhance composition using bundledEnhancer extended with canvasComponentEnhancer and customEnhancer
  await enhanceComposition({ composition, preEnhancer, extendEnhancer });

  // 3. fetch navigation link using Project Map Client
  const navigationLinks = navigationLinkOptions ? await getLinksFromProjectMap(navigationLinkOptions) : [];

  return { composition, navigationLinks };
};

/* Official documentation https://docs.uniform.app/reference/packages/uniformdev-project-map#projectmapclient */
const getHeadProjectMaps = async (
  option: Omit<ProjectMapNodeGetRequest, 'projectId'>
): Promise<Type.NavigationLink[]> => {
  if (!projectMapClient) throw new Error('ProjectMapClient client is not configured');
  const { projectMaps } = await projectMapClient.getProjectMapDefinitions().catch(() => ({ projectMaps: [] }));
  const { id: projectMapId } = projectMaps[0] || {};
  if (!projectMapId) return [];

  return await projectMapClient
    .getSubtree(option)
    .then((projectMapTree: ProjectMapSubtree | undefined) => {
      if (!projectMapTree) return [];
      const headProjectMaps: Type.NavigationLink[] = [];

      (function pushPath(projectMap: ProjectMapSubtree) {
        if (projectMap.type !== 'placeholder') {
          headProjectMaps.push({ title: projectMap.name, link: projectMap.path });
        }
        const { children = [] } = projectMap || {};
        children.forEach(pushPath);
      })(projectMapTree);

      return headProjectMaps;
    })
    .catch(() => []);
};

export const getPathsFromProjectMap = async (options?: GetProjectMapOptions): Promise<string[]> => {
  const { skipPath, ...restOptions } = options || {};
  const paths = (await getHeadProjectMaps({ ...restOptions })).map(projectMap => projectMap.link);
  return skipPath ? paths.filter(path => !path.includes(skipPath)) : paths;
};

export const getLinksFromProjectMap = async (options?: GetProjectMapOptions): Promise<Type.NavigationLink[]> => {
  const { skipPath, ...restOptions } = options || {};
  const links = await getHeadProjectMaps({ ...restOptions });
  return skipPath ? links.filter(path => !path.link.includes(skipPath)) : links;
};
