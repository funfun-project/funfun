'use client';

import { useState, useEffect } from 'react';
import Splash from './Splash';
import Home from '../../Home';

export default function SplashClient() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      document.cookie = 'hasSeenSplash=true; path=/;';
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (show) return <Splash />;

  // 스플래시가 끝나면 메인 홈 렌더링
  return <Home />;
}
