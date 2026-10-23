'use client';

import React, { useState } from 'react';
import { achievements, achievementCategories, type AchievementCategory } from '@/data/achievements';

export default function AchievementsPanel() {
  const [filter, setFilter] = useState<AchievementCategory | 'All'>('All');

  const filtered =
    filter === 'All'
      ? achievements
      : achievements.filter((a) => a.category === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return '🏆';
      case 'in-progress':
        return '🔨';
      case 'planned':
        return '📋';
      default:
        return '⚪';
    }
  };

  const categoryCounts = achievementCategories.map((cat) => ({
    category: cat,
    count: achievements.filter((a) => a.category === cat).length,
  }));

  return (
    <div className="achievements-panel">
      <div className="achievements-header">
        <h3>Achievement Collection</h3>
        <p className="achievements-subtitle">
          Badges and milestones earned along the learning journey.
        </p>
      </div>

      {/* Category filter */}
      <div className="achievement-filters">
        <button
          className={`filter-btn ${filter === 'All' ? 'filter-active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All ({achievements.length})
        </button>
        {categoryCounts.map(({ category, count }) => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'filter-active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category} ({count})
          </button>
        ))}
      </div>

      {/* Achievements grid */}
      {filtered.length > 0 ? (
        <div className="achievements-grid">
          {filtered.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card achievement-${achievement.status}`}
            >
              <div className="achievement-icon">
                {getStatusIcon(achievement.status)}
              </div>
              <div className="achievement-info">
                <h4 className="achievement-title">{achievement.title}</h4>
                <p className="achievement-desc">{achievement.description}</p>
                <div className="achievement-meta">
                  <span className={`status-badge status-${achievement.status}`}>
                    {achievement.status === 'verified'
                      ? 'Earned'
                      : achievement.status === 'in-progress'
                        ? 'In Progress'
                        : 'Planned'}
                  </span>
                  {achievement.date && (
                    <span className="achievement-date">{achievement.date}</span>
                  )}
                  {achievement.issuer && (
                    <span className="achievement-issuer">{achievement.issuer}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🏆</div>
          <p className="empty-title">The journey is still going. More milestones will appear here.</p>
          <p className="empty-hint">
            {filter === 'Awards'
              ? 'Verified awards and competition results will appear here as they are earned.'
              : filter === 'Certifications'
                ? 'Certifications will be displayed here as they are obtained.'
                : 'Genuine milestones and achievements will appear here as the learning journey progresses.'}
          </p>
        </div>
      )}

      {/* Note about empty awards/certs */}
      {achievements.filter((a) => a.category === 'Awards').length === 0 &&
        achievements.filter((a) => a.category === 'Certifications').length === 0 &&
        filter === 'All' && (
          <div className="achievements-note">
            <p>
              📝 Awards and certifications will be added here as they are earned.
              Currently showing learning milestones from completed projects.
            </p>
          </div>
        )}
    </div>
  );
}
