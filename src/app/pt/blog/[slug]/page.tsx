import { twinPost } from '@/app/_blog/twin-post';

// Only posts with a Portuguese twin exist here; any other /pt/blog/* path 404s.
export const dynamicParams = false;

const post = twinPost('pt');
export const generateStaticParams = post.generateStaticParams;
export const generateMetadata = post.generateMetadata;
export default post.Page;
