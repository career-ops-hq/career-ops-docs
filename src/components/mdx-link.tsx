import type { ComponentProps } from 'react';
import Link from 'fumadocs-core/link';

// Markdown links in /docs and /blog render through Fumadocs' Link, which sets
// rel="noreferrer noopener" on every external link. For the core repo and
// santifer.io we drop `noreferrer`, so GitHub and santifer.io can see
// career-ops.org as the origin of the visit (only the origin: the site sends
// Referrer-Policy strict-origin-when-cross-origin). Every other external link
// keeps Fumadocs' default. Link spreads its props after its own rel, so the
// rel passed here wins.
const SENDS_REFERRER =
  /^https:\/\/(?:github\.com\/career-ops-hq\/career-ops|santifer\.io)(?:[/?#]|$)/;

export function SiteLink(props: ComponentProps<typeof Link>) {
  const href = typeof props.href === 'string' ? props.href : '';
  return SENDS_REFERRER.test(href) ? <Link {...props} rel="noopener" /> : <Link {...props} />;
}
