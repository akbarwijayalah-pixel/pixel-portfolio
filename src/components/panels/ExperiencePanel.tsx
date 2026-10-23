'use client';

import React from 'react';
import { experiences } from '@/data/experience';

export default function ExperiencePanel() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return '🔵';
      case 'completed':
        return '✅';
      case 'ongoing':
        return '🟡';
      case 'upcoming':
        return '⭐';
      default:
        return '⚪';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'education':
        return 'Education';
      case 'learning':
        return 'Learning';
      case 'practice':
        return 'Practice';
      default:
        return type;
    }
  };

  return (
    <div className="experience-panel">
      <div className="experience-header">
        <h3>Development Journey</h3>
        <p className="experience-subtitle">
          The path of learning and growth in software engineering.
        </p>
      </div>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-line">
              <div className="timeline-dot">
                {getStatusIcon(exp.status)}
              </div>
              {i < experiences.length - 1 && <div className="timeline-connector" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h4 className="timeline-title">{exp.title}</h4>
                <div className="timeline-meta">
                  <span className="timeline-period">{exp.period}</span>
                  <span className={`type-badge type-${exp.type}`}>
                    {getTypeLabel(exp.type)}
                  </span>
                </div>
              </div>
              <p className="timeline-desc">{exp.description}</p>
              {exp.relatedProject && (
                <span className="related-tag">
                  📁 Related project available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
