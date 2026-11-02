import { WaitlistPage, waitlistMetadata } from '@/app/_waitlist/waitlist-page';

export const metadata = waitlistMetadata('de');

export default function Page() {
  return <WaitlistPage locale="de" />;
}
