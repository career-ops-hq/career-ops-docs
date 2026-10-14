import { twinPost } from '@/app/_blog/twin-post';

// Only posts with a Spanish twin exist here; any other /es/blog/* path 404s.
export const dynamicParams = false;

const post = twinPost('es');
export const generateStaticParams = post.generateStaticParams;
export const generateMetadata = post.generateMetadata;
export default post.Page;
