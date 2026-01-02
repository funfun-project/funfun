'use client';
import { Heart } from 'lucide-react';
import { useOptimistic, useState } from 'react';
import '@/assets/styles/heartButton.css';

export default function HeartButton() {
  const [action, setAction] = useState(false);
  return (
    <>
      <button onClick={() => setAction((prev) => !prev)} className={action ? 'action' : ''}>
        <Heart fill={action ? '#ff5126' : 'none'} color={action ? '#ff5126' : '#888'} size={25} />
      </button>
    </>
  );
}
