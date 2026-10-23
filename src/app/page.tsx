'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with canvas/game engine
const GameCanvas = dynamic(() => import('@/components/GameCanvas'), {
  ssr: false,
  loading: () => (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-title">AKBAR&apos;S PIXEL WORLD</h1>
        <div className="loading-bar">
          <div className="loading-fill" />
        </div>
        <p className="loading-text">Loading world...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <GameCanvas />
    </main>
  );
}
