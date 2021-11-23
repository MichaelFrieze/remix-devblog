import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';

export type Post = {
  slug: string;
  title: string;
};

let postsPath = path.join(__dirname, '../posts');

export async function getPosts() {
  let dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      let file = await fs.readFile(path.join(postsPath, filename));
      let { attributes } = parseFrontMatter(file.toString());
      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
      };
    })
  );
}
