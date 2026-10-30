import { WaitlistPage, waitlistMetadata } from '@/app/_waitlist/waitlist-page';

export const metadata = waitlistMetadata('en');

export default function Page() {
  return <WaitlistPage locale="en" />;
}
