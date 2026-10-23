'use client';

import React, { useCallback, useRef } from 'react';
import type { Direction } from '@/game/GameEngine';

interface MobileControlsProps {
  onDirection: (dir: Direction | null) => void;
  onInteract: () => void;
}

export default function MobileControls({ onDirection, onInteract }: MobileControlsProps) {
  const activeDir = useRef<Direction | null>(null);

  const handlePointerDown = useCallback(
    (dir: Direction) => (e: React.PointerEvent) => {
      e.preventDefault();
      activeDir.current = dir;
      onDirection(dir);
    },
    [onDirection]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      activeDir.current = null;
      onDirection(null);
    },
    [onDirection]
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      activeDir.current = null;
      onDirection(null);
    },
    [onDirection]
  );

  return (
    <div className="mobile-controls" aria-label="Game controls">
      {/* D-Pad */}
      <div className="dpad">
        <button
          className="dpad-btn dpad-up"
          onPointerDown={handlePointerDown('up')}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          aria-label="Move up"
        >
          ▲
        </button>
        <button
          className="dpad-btn dpad-left"
          onPointerDown={handlePointerDown('left')}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          aria-label="Move left"
        >
          ◄
        </button>
        <div className="dpad-center" />
        <button
          className="dpad-btn dpad-right"
          onPointerDown={handlePointerDown('right')}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          aria-label="Move right"
        >
          ►
        </button>
        <button
          className="dpad-btn dpad-down"
          onPointerDown={handlePointerDown('down')}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          aria-label="Move down"
        >
          ▼
        </button>
      </div>

      {/* Action button */}
      <button
        className="action-btn"
        onPointerDown={(e) => {
          e.preventDefault();
          onInteract();
        }}
        aria-label="Interact"
      >
        A
      </button>
    </div>
  );
}
