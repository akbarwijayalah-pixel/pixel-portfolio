'use client';

import React, { useState } from 'react';
import { GraduationCap, MapPin, Sparkles, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { educationJourney, type EducationStage } from '@/data/journey';

interface JourneyPanelProps {
  initialStageId?: string;
}

export default function JourneyPanel({ initialStageId }: JourneyPanelProps) {
  const [selectedStageId, setSelectedStageId] = useState<string>(
    initialStageId || 'smkn-71-jakarta'
  );

  const selectedStage =
    educationJourney.find((s) => s.id === selectedStageId) || educationJourney[2];

  return (
    <div className="journey-panel">
      {/* Header */}
      <div className="journey-header">
        <div className="journey-title-tag">
          <GraduationCap size={18} />
          <span>DEVELOPER & EDUCATIONAL JOURNEY</span>
        </div>
        <h3>The Path of Learning</h3>
        <p className="journey-subtitle">
          From early foundations to specialized software engineering education at SMKN 71 Jakarta.
        </p>
      </div>

      {/* Chronological Stepper */}
      <div className="journey-stepper">
        {educationJourney.map((stage, idx) => {
          const isSelected = stage.id === selectedStageId;
          return (
            <React.Fragment key={stage.id}>
              <button
                type="button"
                className={`step-node ${isSelected ? 'step-selected' : ''} ${
                  stage.isCurrent ? 'step-current' : ''
                }`}
                onClick={() => setSelectedStageId(stage.id)}
                style={{ '--stage-color': stage.themeColor } as React.CSSProperties}
              >
                <div className="step-circle">
                  {stage.isCurrent ? <Sparkles size={16} /> : <span>{stage.stageNumber}</span>}
                </div>
                <div className="step-label">
                  <span className="step-name">{stage.name}</span>
                  <span className="step-badge">
                    {stage.isCurrent ? 'Current Stage' : `Stage ${stage.stageNumber}`}
                  </span>
                </div>
              </button>
              {idx < educationJourney.length - 1 && (
                <div className="step-connector">
                  <ChevronRight size={16} className="connector-icon" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Stage Detail Card */}
      <div
        className="journey-detail-card"
        style={{ '--stage-color': selectedStage.themeColor } as React.CSSProperties}
      >
        <div className="stage-card-header">
          <div className="stage-card-title-group">
            <div className="stage-number-pill">
              Stage {selectedStage.stageNumber} of {educationJourney.length}
            </div>
            <h4 className="stage-name">{selectedStage.name}</h4>
            <div className="stage-level-tag">
              <GraduationCap size={14} />
              <span>{selectedStage.level}</span>
            </div>
          </div>

          {selectedStage.isCurrent && (
            <div className="current-stage-badge">
              <Sparkles size={14} />
              <span>CURRENT / LATEST STAGE</span>
            </div>
          )}
        </div>

        <div className="stage-info-grid">
          <div className="stage-info-item">
            <span className="info-label">
              <MapPin size={13} /> Location
            </span>
            <span className="info-value">{selectedStage.location}</span>
          </div>

          <div className="stage-info-item">
            <span className="info-label">Landmark Representation</span>
            <span className="info-value">{selectedStage.landmarkType}</span>
          </div>

          {/* Optional: Years Attended - Only rendered if provided */}
          {selectedStage.yearsAttended && (
            <div className="stage-info-item">
              <span className="info-label">
                <Clock size={13} /> Years Attended
              </span>
              <span className="info-value">{selectedStage.yearsAttended}</span>
            </div>
          )}
        </div>

        <div className="stage-description-box">
          <h5>Stage Focus & Overview</h5>
          <p>{selectedStage.description}</p>
        </div>

        {/* Optional: Memories or Activities - Only rendered if provided */}
        {selectedStage.memoriesOrActivities && selectedStage.memoriesOrActivities.length > 0 && (
          <div className="stage-activities-box">
            <h5>Activities & Notes</h5>
            <ul>
              {selectedStage.memoriesOrActivities.map((act, i) => (
                <li key={i}>
                  <CheckCircle2 size={13} />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Complete Timeline Summary */}
      <div className="timeline-summary">
        <h5>Full Progression Timeline</h5>
        <div className="timeline-strip">
          {educationJourney.map((item) => (
            <div
              key={item.id}
              className={`timeline-strip-item ${item.id === selectedStageId ? 'active-strip' : ''}`}
              onClick={() => setSelectedStageId(item.id)}
            >
              <span className="strip-dot" style={{ backgroundColor: item.themeColor }} />
              <div className="strip-text">
                <strong className="strip-title">{item.name}</strong>
                <span className="strip-sub">{item.level}</span>
              </div>
              {item.isCurrent && <span className="strip-now">Current</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
