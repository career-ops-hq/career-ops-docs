import { twinPost } from '@/app/_blog/twin-post';

// Only posts with a Italian twin exist here; any other /it/blog/* path 404s.
export const dynamicParams = false;

const post = twinPost('it');
export const generateStaticParams = post.generateStaticParams;
export const generateMetadata = post.generateMetadata;
export default post.Page;
