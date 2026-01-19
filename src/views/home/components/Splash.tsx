import Image from 'next/image';
import '@/assets/styles/splash.css';

export default function Splash() {
  return (
    <>
      <main className="bg-bg-main relative flex h-screen w-full items-center justify-center">
        <div className="splash-out relative aspect-90/67 w-45">
          <Image src="/img/logo.png" alt="funfun logo" fill className="object-cover" />
        </div>
      </main>
    </>
  );
}
