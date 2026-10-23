'use client';

import React, { useState } from 'react';
import { Menu, X, User, Code, FolderOpen, GraduationCap, Trophy, Mail, Gamepad2, Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '@/game/SoundFX';

interface GameHUDProps {
  onNavigate: (panelId: string) => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About Me', icon: User, color: '#4ade80' },
  { id: 'journey', label: 'Developer Journey', icon: GraduationCap, color: '#00d4ff' },
  { id: 'projects', label: 'Project Center', icon: FolderOpen, color: '#ffd700' },
  { id: 'skills', label: 'Technology Lab', icon: Code, color: '#48dbfb' },
  { id: 'experience', label: 'Coding Practice', icon: GraduationCap, color: '#f39c12' },
  { id: 'achievements', label: 'Achievements', icon: Trophy, color: '#a55eea' },
  { id: 'contact', label: 'Contact Center', icon: Mail, color: '#ff4757' },
];

export default function GameHUD({ onNavigate }: GameHUDProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFX.playSelect();
    }
  };

  const handleNav = (id: string) => {
    soundFX.playDoor();
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top HUD bar */}
      <div className="hud-top">
        <div className="hud-title">
          <Gamepad2 size={16} />
          <span>AKBAR&apos;S PIXEL WORLD</span>
        </div>
        <div className="hud-actions">
          <button
            className="hud-action-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            title={isMuted ? 'Sound: Off' : 'Sound: On'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            className="hud-menu-btn"
            onClick={() => {
              soundFX.playSelect();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Quick nav menu */}
      {menuOpen && (
        <div className="nav-menu">
          <div className="nav-menu-title">TOWN MAP</div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className="nav-menu-item"
              onClick={() => handleNav(item.id)}
              style={{ '--accent-color': item.color } as React.CSSProperties}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Controls hint */}
      {showControls && (
        <div className="controls-hint">
          <button
            className="controls-hint-close"
            onClick={() => setShowControls(false)}
            aria-label="Close controls hint"
          >
            ×
          </button>
          <div className="controls-hint-content">
            <span>🎮 Arrow Keys / WASD to move</span>
            <span>⏎ Space / Enter to interact</span>
            <span>☰ Menu for quick navigation</span>
          </div>
        </div>
      )}
    </>
  );
}
