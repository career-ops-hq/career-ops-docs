import { isValidElement, type ReactNode } from 'react';

// The text a reader sees in a ReactNode: strings joined in order, markup
// dropped, links reduced to their label. Used to derive structured data
// from the same copy the page renders, so the two cannot drift apart.
export function nodeText(node: ReactNode): string {
  return collect(node).replace(/\s+/g, ' ').trim();
}

function collect(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(collect).join('');
  if (isValidElement(node)) {
    if (node.type === 'br') return ' ';
    return collect((node.props as { children?: ReactNode }).children);
  }
  return '';
}
