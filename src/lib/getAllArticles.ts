import glob from 'fast-glob';
import * as path from 'path';

async function importArticle(articleFilename: string) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  );
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  };
}

export type Article = {
  component: React.ReactNode;
  date: string;
  slug: string;
  title: string;
  description: string;
  meta: Array<{ name: string; content: string }>;
};

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  });

  let articles = (await Promise.all(
    articleFilenames.map(importArticle)
  )) as Article[];

  return articles.sort(
    (a, z) => new Date(z.date).valueOf() - new Date(a.date).valueOf()
  );
}
