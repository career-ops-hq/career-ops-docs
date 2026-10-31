import { WaitlistPage, waitlistMetadata } from '@/app/_waitlist/waitlist-page';

export const metadata = waitlistMetadata('fr');

export default function Page() {
  return <WaitlistPage locale="fr" />;
}
