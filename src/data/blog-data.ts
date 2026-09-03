import { allBlogPosts, type BlogPost } from './blog/index.ts';

export type BlogPostPreview = Pick<BlogPost, 'slug' | 'image' | 'title' | 'date' | 'excerpt'>;
export const posts: BlogPostPreview[] = allBlogPosts.map(({ slug, image, title, date, excerpt }) => ({ slug, image, title, date, excerpt }));
