'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GameEngine, type Direction } from '@/game/GameEngine';
import type { DialogueLine } from '@/data/mapData';
import DialogueBox from './DialogueBox';
import MobileControls from './MobileControls';
import PortfolioPanel from './PortfolioPanel';
import GameHUD from './GameHUD';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [dialogueState, setDialogueState] = useState<{
    active: boolean;
    line: DialogueLine | null;
    choices?: { label: string; action: string }[];
  }>({ active: false, line: null });
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for mobile
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Game event handler
  const handleGameEvent = useCallback((event: string, data?: unknown) => {
    const d = data as Record<string, unknown> | null;
    switch (event) {
      case 'dialogue:open':
      case 'dialogue:update': {
        const line = d?.line as DialogueLine;
        setDialogueState({
          active: true,
          line,
          choices: line?.choices,
        });
        break;
      }
      case 'dialogue:close':
        setDialogueState({ active: false, line: null });
        break;
      case 'panel:open':
        setActivePanel(d?.panelId as string);
        break;
      case 'panel:close':
        setActivePanel(null);
        break;
    }
  }, []);

  // Initialize game engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new GameEngine(canvas, handleGameEvent);
    engineRef.current = engine;
    engine.start();
    setIsLoaded(true);

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [handleGameEvent]);

  // Touch controls
  const handleTouchDirection = useCallback((dir: Direction | null) => {
    engineRef.current?.setTouchDirection(dir);
  }, []);

  const handleTouchInteract = useCallback(() => {
    engineRef.current?.triggerInteraction();
  }, []);

  // Dialogue handlers
  const handleDialogueContinue = useCallback(() => {
    engineRef.current?.triggerInteraction();
  }, []);

  const handleDialogueChoice = useCallback((action: string) => {
    engineRef.current?.selectChoice(action);
  }, []);

  const handleDialogueClose = useCallback(() => {
    engineRef.current?.triggerEscape();
  }, []);

  // Panel handlers
  const handlePanelClose = useCallback(() => {
    engineRef.current?.closePanel();
    setActivePanel(null);
  }, []);

  const handleNavigate = useCallback((panelId: string) => {
    engineRef.current?.openPanel(panelId);
    setActivePanel(panelId);
  }, []);

  return (
    <div className="game-wrapper">
      {/* Loading screen */}
      {!isLoaded && (
        <div className="loading-screen">
          <div className="loading-content">
            <h1 className="loading-title">AKBAR&apos;S PIXEL WORLD</h1>
            <div className="loading-bar">
              <div className="loading-fill" />
            </div>
            <p className="loading-text">Loading world...</p>
          </div>
        </div>
      )}

      {/* Game canvas */}
      <canvas ref={canvasRef} className="game-canvas" />

      {/* HUD */}
      <GameHUD onNavigate={handleNavigate} />

      {/* Dialogue box */}
      {dialogueState.active && dialogueState.line && (
        <DialogueBox
          speaker={dialogueState.line.speaker}
          text={dialogueState.line.text}
          choices={dialogueState.choices}
          onContinue={handleDialogueContinue}
          onChoice={handleDialogueChoice}
          onClose={handleDialogueClose}
        />
      )}

      {/* Portfolio panels */}
      {activePanel && (
        <PortfolioPanel panelId={activePanel} onClose={handlePanelClose} />
      )}

      {/* Mobile controls */}
      {isMobile && !activePanel && (
        <MobileControls
          onDirection={handleTouchDirection}
          onInteract={handleTouchInteract}
        />
      )}
    </div>
  );
}
