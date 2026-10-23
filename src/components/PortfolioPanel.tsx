'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { soundFX } from '@/game/SoundFX';
import AboutPanel from './panels/AboutPanel';
import JourneyPanel from './panels/JourneyPanel';
import ProjectsPanel from './panels/ProjectsPanel';
import SkillsPanel from './panels/SkillsPanel';
import ExperiencePanel from './panels/ExperiencePanel';
import AchievementsPanel from './panels/AchievementsPanel';
import ContactPanel from './panels/ContactPanel';

interface PortfolioPanelProps {
  panelId: string;
  onClose: () => void;
}

const PANEL_TITLES: Record<string, string> = {
  about: "ABOUT ME — Akbar Wijaya",
  journey: 'DEVELOPER JOURNEY — Education Timeline',
  projects: 'PROJECT CENTER — Interactive Projects',
  skills: 'TECH LAB — Technology & Tools',
  experience: 'EXPERIENCE — Coding Practice & Activities',
  achievements: 'ACHIEVEMENT HALL — Awards & Milestones',
  contact: 'CONTACT CENTER — Pokémon Center Desk',
};

export default function PortfolioPanel({ panelId, onClose }: PortfolioPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const baseId = panelId.split(':')[0];
  const stageParam = panelId.includes(':') ? panelId.split(':')[1] : undefined;

  const handleClose = () => {
    soundFX.playCancel();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.focus();
    if (baseId === 'achievements') {
      soundFX.playFanfare();
    } else {
      soundFX.playDoor();
    }
  }, [baseId]);

  const renderPanel = () => {
    switch (baseId) {
      case 'about':
        return <AboutPanel />;
      case 'journey':
        return <JourneyPanel initialStageId={stageParam} />;
      case 'projects':
        return <ProjectsPanel />;
      case 'skills':
        return <SkillsPanel />;
      case 'experience':
        return <ExperiencePanel />;
      case 'achievements':
        return <AchievementsPanel />;
      case 'contact':
        return <ContactPanel />;
      default:
        return <div className="panel-empty">Section not found</div>;
    }
  };

  return (
    <div className="panel-overlay" onClick={handleClose}>
      <div
        ref={panelRef}
        className="panel-container"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-label={PANEL_TITLES[baseId] || 'Portfolio Section'}
      >
        {/* Panel header */}
        <div className="panel-header">
          <h2 className="panel-title">{PANEL_TITLES[baseId] || 'Portfolio Section'}</h2>
          <button
            type="button"
            className="panel-close-btn"
            onClick={handleClose}
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Panel body */}
        <div className="panel-body">{renderPanel()}</div>

        {/* Panel footer */}
        <div className="panel-footer">
          <span className="panel-footer-hint">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
