'use client';

import React, { useState } from 'react';
import { ChevronLeft, Terminal, Cpu, CheckCircle, ExternalLink } from 'lucide-react';
import { skills, skillCategories, type Skill, type SkillCategory, type FamiliarityLevel } from '@/data/skills';
import { projects } from '@/data/projects';

export default function SkillsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filtered =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const getFamiliarityBadge = (level: FamiliarityLevel) => {
    switch (level) {
      case 'Familiar':
        return {
          label: 'Familiar',
          color: '#2ed573',
          bg: 'rgba(46, 213, 115, 0.15)',
          desc: 'Practiced & applied in projects',
        };
      case 'Beginner':
        return {
          label: 'Beginner',
          color: '#ffa502',
          bg: 'rgba(255, 165, 2, 0.15)',
          desc: 'Working knowledge & fundamentals',
        };
      case 'Learning':
        return {
          label: 'Learning',
          color: '#70a1ff',
          bg: 'rgba(112, 161, 255, 0.15)',
          desc: 'Active study & coursework',
        };
    }
  };

  if (selectedSkill) {
    const badge = getFamiliarityBadge(selectedSkill.familiarity);
    const related = selectedSkill.relatedProjects
      ? projects.filter((p) => selectedSkill.relatedProjects?.includes(p.id))
      : [];

    return (
      <div className="skill-detail">
        <button
          type="button"
          className="back-btn"
          onClick={() => setSelectedSkill(null)}
        >
          <ChevronLeft size={16} /> Back to Tech Lab
        </button>

        {/* Terminal Header */}
        <div className="terminal-header-box">
          <div className="terminal-topbar">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">TECH_LAB // {selectedSkill.name.toUpperCase()}</span>
          </div>

          <div className="terminal-content">
            <div className="skill-icon-large">{selectedSkill.terminalIcon}</div>
            <div className="terminal-info">
              <h3 className="skill-detail-name">{selectedSkill.name}</h3>
              <span className="skill-detail-category">{selectedSkill.category}</span>
              <div
                className="familiarity-pill"
                style={{ color: badge.color, backgroundColor: badge.bg, borderColor: badge.color }}
              >
                <span>Familiarity: {badge.label}</span>
                <span className="familiarity-sub">({badge.desc})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="skill-section">
          <h4>Overview & Technical Description</h4>
          <p>{selectedSkill.description}</p>
        </div>

        {/* Practical Evidence & Usage */}
        <div className="skill-section evidence-section">
          <div className="evidence-header">
            <CheckCircle size={16} className="text-emerald-400" />
            <h4>Practical Evidence & Application</h4>
          </div>
          <p className="evidence-text">{selectedSkill.evidence}</p>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="skill-section">
            <h4>Projects Utilizing {selectedSkill.name}</h4>
            <ul className="related-projects-list">
              {related.map((p) => (
                <li key={p.id}>
                  <span className="related-project-icon">{p.pixelBadge.icon}</span>
                  <div className="related-project-text">
                    <span className="related-title">{p.title}</span>
                    <span className="related-cat">{p.category}</span>
                  </div>
                  <span className={`status-badge status-${p.status.toLowerCase().replace(' ', '-')}`}>
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="skills-panel">
      {/* Pokédex / Tech Lab Terminal Header */}
      <div className="skills-header">
        <div className="tech-lab-badge">
          <Cpu size={16} />
          <span>POKÉ-TECH LAB // RESEARCH TERMINAL</span>
        </div>
        <p className="tech-lab-subtitle">
          Interactive technology terminals cataloging software tools, languages, and frameworks.
        </p>
      </div>

      {/* 5 Categories Filter */}
      <div className="skill-categories">
        <button
          type="button"
          className={`filter-btn ${selectedCategory === 'All' ? 'filter-active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All Technologies ({skills.length})
        </button>
        {skillCategories.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <button
              type="button"
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'filter-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Interactive Computer Terminal Skill Cards */}
      <div className="skills-grid">
        {filtered.map((skill) => {
          const badge = getFamiliarityBadge(skill.familiarity);
          return (
            <div
              key={skill.id}
              className="skill-card"
              onClick={() => setSelectedSkill(skill)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedSkill(skill);
                }
              }}
            >
              <div className="skill-card-icon">{skill.terminalIcon}</div>
              <div className="skill-card-info">
                <span className="skill-card-name">{skill.name}</span>
                <span className="skill-card-cat-sm">{skill.category}</span>
                <div className="skill-card-level">
                  <span
                    className="skill-card-level-badge"
                    style={{
                      color: badge.color,
                      backgroundColor: badge.bg,
                      borderColor: badge.color,
                    }}
                  >
                    ● {badge.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
