'use client';

import React, { useState } from 'react';
import { ExternalLink, GitFork, ChevronLeft, Folder, Code2, Sparkles } from 'lucide-react';
import { projects, projectCategories, type Project, type ProjectCategory } from '@/data/projects';

export default function ProjectsPanel() {
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  if (selectedProject) {
    return (
      <div className="project-detail">
        <button
          type="button"
          className="back-btn"
          onClick={() => setSelectedProject(null)}
        >
          <ChevronLeft size={16} /> Back to Project Center
        </button>

        <div className="project-detail-header">
          <div>
            <span className="project-cat-pill">{selectedProject.category}</span>
            <h3 className="project-detail-title">{selectedProject.title}</h3>
          </div>
          <span
            className={`status-badge status-${selectedProject.status.toLowerCase().replace(' ', '-')}`}
          >
            {selectedProject.status}
          </span>
        </div>

        {/* Designed Pixel-Art Project Card / Header */}
        <div className="project-screenshot">
          {selectedProject.screenshot ? (
            <img
              src={selectedProject.screenshot}
              alt={selectedProject.title}
              className="project-screenshot-img"
            />
          ) : (
            <div
              className="project-pixel-badge-hero"
              style={{
                background: `linear-gradient(135deg, ${selectedProject.pixelBadge.bgColor} 0%, #0d1b2a 100%)`,
                borderColor: selectedProject.pixelBadge.borderColor,
              }}
            >
              <div className="pixel-cartridge-notch">POKÉ-DEV CARTRIDGE</div>
              <div className="badge-hero-content">
                <span className="badge-large-emoji">{selectedProject.pixelBadge.icon}</span>
                <div className="badge-hero-info">
                  <h4 className="badge-hero-title">{selectedProject.title}</h4>
                  <p className="badge-hero-category">{selectedProject.category} Application</p>
                  <div className="badge-hero-tech">
                    {selectedProject.technologies.map((t, idx) => (
                      <span key={idx} className="badge-tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overview */}
        <div className="project-section">
          <h4>Overview</h4>
          <p>{selectedProject.description}</p>
        </div>

        {/* Problem/Goal */}
        <div className="project-section">
          <h4>Problem & Purpose</h4>
          <p>{selectedProject.problemOrGoal}</p>
        </div>

        {/* Features */}
        <div className="project-section">
          <h4>Key Features</h4>
          <ul className="feature-list">
            {selectedProject.features.map((f, i) => (
              <li key={i}>
                <span className="feature-bullet">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="project-section">
          <h4>Technologies Used</h4>
          <div className="tech-tags">
            {selectedProject.technologies.map((t, i) => (
              <span key={i} className="tech-tag">
                <Code2 size={12} className="inline-icon" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dev notes */}
        <div className="project-section">
          <h4>Development Notes</h4>
          <p className="dev-notes">{selectedProject.developmentNotes}</p>
        </div>

        {/* Project Links (Strictly verified) */}
        <div className="project-links">
          {selectedProject.demoUrl && (
            <a
              href={selectedProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn demo-btn"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {selectedProject.repoUrl && (
            <a
              href={selectedProject.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn repo-btn"
            >
              <GitFork size={14} /> GitHub Repository
            </a>
          )}
          {!selectedProject.demoUrl && !selectedProject.repoUrl && (
            <div className="no-links-note">
              <span>🔒 Repository and live links will appear here once officially published.</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="projects-panel">
      {/* Header Info */}
      <div className="projects-header-info">
        <div className="header-badge">
          <Folder size={15} />
          <span>PROJECT ARCHIVES</span>
        </div>
        <p className="projects-subtitle">
          Interactive catalog of software, frontend clones, and web applications developed by Akbar.
        </p>
      </div>

      {/* Category Filters */}
      <div className="project-filters">
        {projectCategories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`filter-btn ${filter === cat ? 'filter-active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
          >
            {/* Retro Pixel-Art Badge Icon */}
            <div
              className="project-thumb-badge"
              style={{
                backgroundColor: project.pixelBadge.bgColor,
                borderColor: project.pixelBadge.borderColor,
              }}
            >
              <span className="badge-icon-emoji">{project.pixelBadge.icon}</span>
            </div>

            <div className="project-card-info">
              <div className="project-card-top-row">
                <h4 className="project-card-title">{project.title}</h4>
                <span
                  className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}
                >
                  {project.status}
                </span>
              </div>
              <p className="project-card-desc">{project.description}</p>
              <div className="project-card-meta">
                <span className="project-card-category">{project.category}</span>
              </div>
              <div className="project-card-tech">
                {project.technologies.slice(0, 4).map((t, i) => (
                  <span key={i} className="tech-tag-sm">
                    {t}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="tech-tag-sm">+{project.technologies.length - 4}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No projects in this category yet.</p>
          <p className="empty-hint">More applications are currently in development.</p>
        </div>
      )}
    </div>
  );
}
