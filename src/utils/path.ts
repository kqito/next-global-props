import { findPagesDir } from 'next/dist/lib/find-pages-dir';

const pagesDir = findPagesDir(process.cwd());
const APP_FILE_NAME = '_app' as const;
const TARGET_EXTENSIONS = ['jsx', 'tsx'] as const;

export const isAppPath = (path: string | null | undefined) => {
  if (!path) {
    return false;
  }

  const expectedAppPaths = TARGET_EXTENSIONS.map(
    (targetExtension) => `${pagesDir}/${APP_FILE_NAME}.${targetExtension}`
  );

  return expectedAppPaths.includes(path);
};

export const isPagePath = (path: string | null | undefined) => {
  if (!path) {
    return false;
  }
  const ignorePagesReg = /^\/(_app|_error|_document|api(\/|$))/;

  return path.includes(pagesDir) && !ignorePagesReg.test(pagesDir);
};

const dynamicReg = /\/\[[^/]+?\](?=\/|.|$)/;
export const isDynamicPath = (path: string) => dynamicReg.test(path);
