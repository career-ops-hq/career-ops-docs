import { WaitlistPage, waitlistMetadata } from '@/app/_waitlist/waitlist-page';

export const metadata = waitlistMetadata('zh');

export default function Page() {
  return <WaitlistPage locale="zh" />;
}
