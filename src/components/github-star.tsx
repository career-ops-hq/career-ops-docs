import { formatStarsCompact, getProjectStats } from '@/lib/stats';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { StarLink, type StarPlacement } from './star-link';

// "Star on GitHub · 72.9K" for the home hero, the header and the end of the
// Quick Start. The count is the live one from getProjectStats (same deduped
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
  short?: 'mobile' | 'always';
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

// Shared look for the header (home layout) and the docs sidebar footer.
export const starHeaderClass =
  'inline-flex items-center gap-1.5 rounded-full border bg-fd-secondary px-3 py-1.5 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent';

// Docs sidebar footer: the row Fumadocs used to draw (GitHub icon on the left,
// theme switch on the right), rebuilt with the star button in the icon's
// place. The docs layouts turn Fumadocs' own theme switch off so the row is
// not drawn twice.
export function DocsSidebarStarRow({ locale }: { locale: string }) {
  return (
    <div className="flex items-center rounded-lg border bg-fd-secondary/50 p-0.5 pe-0 text-fd-muted-foreground">
      <GitHubStar
        placement="header"
        locale={locale}
        short="always"
        className="flex flex-1 items-center whitespace-nowrap gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      />
      <ThemeSwitch className="ms-auto rounded-none border-y-0 border-e-0 px-1 py-0 *:rounded-md" />
    </div>
  );
}
