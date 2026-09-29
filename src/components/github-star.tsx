import { formatStarsCompact, getProjectStats } from '@/lib/stats';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { StarLink, type StarPlacement } from './star-link';
import { GitHubIconLink } from './github-icon-link';

// "Star on GitHub · 72.9K" for the home hero and the end of the Quick Start. The count is the live one from getProjectStats (same deduped
// 1-hour fetch every page already makes). When GitHub did not answer, the
// button shows no number rather than the hand-set floor. The label stays in
// English on every locale: it names GitHub's own action, and GitHub's
// interface is not localized.
export async function GitHubStar({
  placement,
  locale = 'en',
  className,
  short,
}: {
  placement: StarPlacement;
  locale?: string;
  className?: string;
  short?: 'mobile';
}) {
  const stats = await getProjectStats();
  const count = stats.live.stars ? formatStarsCompact(stats.stars) : null;
  return (
    <StarLink
      placement={placement}
      locale={locale}
      count={count}
      className={className}
      short={short}
    />
  );
}

// Docs sidebar footer: the row Fumadocs draws (GitHub icon on the left, theme
// switch on the right), rebuilt with our own icon link so it carries no
// rel="noreferrer". The docs layouts turn Fumadocs' own theme switch off so
// the row is not drawn twice.
export function DocsSidebarRow() {
  return (
    <div className="flex items-center rounded-lg border bg-fd-secondary/50 p-0.5 pe-0 text-fd-muted-foreground">
      <GitHubIconLink size="icon-sm" />
      <ThemeSwitch className="ms-auto rounded-none border-y-0 border-e-0 px-1 py-0 *:rounded-md" />
    </div>
  );
}
