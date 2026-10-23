'use client';

import React, { useState } from 'react';
import { User, BookOpen, Heart } from 'lucide-react';
import { profile } from '@/data/profile';

type Tab = 'bio' | 'education' | 'interests';

export default function AboutPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('bio');

  return (
    <div className="about-panel">
      {/* Portrait + Name */}
      <div className="about-header">
        <div className="about-portrait">
          <img
            src="/avatar.png"
            alt="Akbar Wijaya"
            className="portrait-image"
          />
        </div>
        <div className="about-info">
          <h3 className="about-name">{profile.name}</h3>
          <p className="about-school">{profile.school}</p>
          <p className="about-major">{profile.majorFull}</p>
          <div className="about-badges">
            <span className="badge badge-cyan">{profile.currentFocus}</span>
            <span className="badge badge-amber">{profile.goal}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="about-tabs">
        <button
          className={`tab-btn ${activeTab === 'bio' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('bio')}
        >
          <User size={14} /> Biography
        </button>
        <button
          className={`tab-btn ${activeTab === 'education' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <BookOpen size={14} /> Education
        </button>
        <button
          className={`tab-btn ${activeTab === 'interests' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('interests')}
        >
          <Heart size={14} /> Interests
        </button>
      </div>

      {/* Tab content */}
      <div className="about-content">
        {activeTab === 'bio' && (
          <div className="tab-content">
            <p className="bio-text">{profile.bio}</p>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="tab-content">
            {profile.education.map((edu, i) => (
              <div key={i} className="edu-card">
                <div className="edu-header">
                  <h4 className="edu-institution">{edu.institution}</h4>
                  <span className={`status-badge status-${edu.status}`}>
                    {edu.status}
                  </span>
                </div>
                <p className="edu-program">{edu.program}</p>
                <p className="edu-period">{edu.period}</p>
                <p className="edu-desc">{edu.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="tab-content">
            <div className="interests-grid">
              {profile.interests.map((interest, i) => (
                <div key={i} className="interest-card">
                  <span className="interest-icon">
                    {interest === 'Programming' && '💻'}
                    {interest === 'Web Development' && '🌐'}
                    {interest === 'UI/UX Design' && '🎨'}
                    {interest === 'Game Development' && '🎮'}
                  </span>
                  <span className="interest-name">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
