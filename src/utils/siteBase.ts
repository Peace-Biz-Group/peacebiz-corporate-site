const REPO_BASE = '/peacebiz-corporate-site';

export const getSiteBasePath = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.pathname.startsWith(REPO_BASE) ? REPO_BASE : '';
};

export const withSiteBase = (assetPath: string): string => {
  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${getSiteBasePath()}${normalizedPath}`;
};
