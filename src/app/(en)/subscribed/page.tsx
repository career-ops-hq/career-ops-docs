import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Subscription · career-ops',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ status?: string }>;
};

export default async function Subscribed({ searchParams }: Props) {
  const { status } = await searchParams;

  const content =
    status === 'ok'
      ? {
          title: "You're confirmed.",
          body: "We'll only email when there's something worth sharing — release announcements and occasional updates.",
        }
      : status === 'invalid'
        ? {
            title: 'Link invalid or expired.',
            body: 'This confirmation link no longer works. Subscribe again from the home page and check your inbox for a fresh link.',
          }
        : {
            title: 'Something went wrong.',
            body: "We couldn't confirm your subscription. Try again, or email privacy@career-ops.org if it keeps failing.",
          };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-6 py-24">
      <h1 className="text-fd-foreground text-2xl font-medium tracking-tight">
        {content.title}
      </h1>
      <p className="text-fd-muted-foreground text-base leading-relaxed">{content.body}</p>
      <div className="mt-2">
        <Link href="/" className="text-fd-foreground text-sm hover:underline">
          ← Back to career-ops.org
        </Link>
      </div>
    </div>
  );
}
