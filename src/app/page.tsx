import { cookies } from 'next/headers';
import Home from '@/views/home/Home';
import SplashClient from '@/views/home/components/splash/SplashClient';

export default async function page() {
  const cookieStore = await cookies();
  const hasSeenSplash = cookieStore.get('hasSeenSplash')?.value === 'true';

  if (hasSeenSplash) {
    return <Home />;
  }

  return (
    <>
      <SplashClient />
    </>
  );
}
