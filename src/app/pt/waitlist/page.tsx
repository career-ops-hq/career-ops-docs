import { WaitlistPage, waitlistMetadata } from '@/app/_waitlist/waitlist-page';

export const metadata = waitlistMetadata('pt');

export default function Page() {
  return <WaitlistPage locale="pt" />;
}
