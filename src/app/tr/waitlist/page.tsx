import { WaitlistPage, waitlistMetadata } from '@/app/_waitlist/waitlist-page';

export const metadata = waitlistMetadata('tr');

export default function Page() {
  return <WaitlistPage locale="tr" />;
}
