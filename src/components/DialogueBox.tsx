'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from '@/game/SoundFX';

interface DialogueBoxProps {
  speaker: string;
  text: string;
  choices?: { label: string; action: string }[];
  onContinue: () => void;
  onChoice: (action: string) => void;
  onClose: () => void;
}

export default function DialogueBox({
  speaker,
  text,
  choices,
  onContinue,
  onChoice,
  onClose,
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Full clean text
  const fullText = text;

  // Typewriter effect: reveal characters 1 by 1
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    typingTimerRef.current = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        // Play subtle chiptune blip every 2-3 characters
        if (index % 2 === 0 && fullText[index - 1] !== ' ') {
          soundFX.playDialogueBlip();
        }
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsTyping(false);
      }
    }, 24);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [fullText]);

  // Focus container on mount / text update
  useEffect(() => {
    containerRef.current?.focus();
  }, [text]);

  // Handle fast-forward or advance
  const handleAdvance = useCallback(() => {
    if (isTyping) {
      // Immediately reveal full text
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setDisplayedText(fullText);
      setIsTyping(false);
      soundFX.playSelect();
    } else {
      // If choices exist, let user select from choice menu
      if (!choices || choices.length === 0) {
        soundFX.playSelect();
        onContinue();
      }
    }
  }, [isTyping, fullText, choices, onContinue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      soundFX.playCancel();
      onClose();
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleAdvance();
    }
  };

  return (
    <div
      className="pokemon-dialogue-overlay"
      onClick={(e) => {
        e.stopPropagation();
        handleAdvance();
      }}
    >
      {/* Floating Pokemon Choice Menu (Appears above box when typing finishes) */}
      {!isTyping && choices && choices.length > 0 && (
        <div
          className="pokemon-choice-box"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pokemon-choice-header">SELECT OPTION</div>
          <div className="pokemon-choice-list">
            {choices.map((choice, i) => (
              <button
                key={i}
                type="button"
                className="pokemon-choice-btn"
                onClick={() => {
                  soundFX.playSelect();
                  onChoice(choice.action);
                }}
              >
                <span className="choice-pointer">▸</span>
                <span>{choice.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Classic Pokemon GBA Emerald Dialogue Box */}
      <div
        ref={containerRef}
        className="pokemon-dialogue-frame"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label={`${speaker} dialogue`}
      >
        {/* Subtle speaker label indicator */}
        {speaker && (
          <div className="pokemon-speaker-tag">
            <span>{speaker}</span>
          </div>
        )}

        {/* Dialogue Text with Typewriter Effect */}
        <div className="pokemon-dialogue-content">
          <p className="pokemon-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        {/* Pokemon GBA Red Arrow Indicator (Pulsing when waiting for input) */}
        {!isTyping && (!choices || choices.length === 0) && (
          <div className="pokemon-continue-arrow" title="Press SPACE or click to continue">
            ▼
          </div>
        )}
      </div>
    </div>
  );
}
