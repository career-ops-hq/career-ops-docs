'use client';
import { MessageCircleIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { AISearch, AISearchPanel, AISearchTrigger } from './search';

// The real AI search tree. Only ever imported by lazy.tsx AFTER the
// user shows intent (click or ⌘/), so `defaultOpen` — the panel should
// appear right away, not require a second click.
export default function AISearchLoaded() {
  return (
    <AISearch defaultOpen>
      <AISearchPanel />
      <AISearchTrigger
        position="float"
        className={cn(
          buttonVariants({
            variant: 'secondary',
            className: 'text-fd-muted-foreground rounded-2xl',
          }),
        )}
      >
        <MessageCircleIcon className="size-4.5" />
        Ask AI
      </AISearchTrigger>
    </AISearch>
  );
}
