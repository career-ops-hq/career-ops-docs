'use client';
// Interaction-gated mount for the AI search/chat stack. The chat tree
// (@ai-sdk/react + transport + markdown renderer) is a docs-only client
// chunk north of 100KB; loading it eagerly taxed every docs pageload's
// hydration and INP budget (2026-06-30 audit, perf #10c). This shell
// renders a visually identical floating button and only downloads the
// real tree on first intent — click or the ⌘/ shortcut the loaded
// panel also uses.
import { lazy, Suspense, useEffect, useState } from 'react';
import { MessageCircleIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';

const AISearchLoaded = lazy(() => import('./search-loaded'));

const floatButtonClass = cn(
  buttonVariants({
    variant: 'secondary',
    className: 'text-fd-muted-foreground rounded-2xl',
  }),
  'fixed bottom-4 gap-3 w-24 inset-e-[calc(--spacing(4)+var(--removed-body-scroll-bar-size,0px))] shadow-lg z-20',
);

function ShellButton({ disabled = false }: { disabled?: boolean }) {
  return (
    <button type="button" className={floatButtonClass} disabled={disabled}>
      <MessageCircleIcon className="size-4.5" />
      Ask AI
    </button>
  );
}

export function AISearchLazy() {
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    if (wanted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setWanted(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [wanted]);

  if (!wanted) {
    return (
      <span onClick={() => setWanted(true)}>
        <ShellButton />
      </span>
    );
  }

  return (
    <Suspense fallback={<ShellButton disabled />}>
      <AISearchLoaded />
    </Suspense>
  );
}
