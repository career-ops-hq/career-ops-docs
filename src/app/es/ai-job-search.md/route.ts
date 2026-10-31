import { aiJobSearchMarkdown } from '@/lib/ai-job-search-md';

export async function GET() {
  return aiJobSearchMarkdown('es');
}
