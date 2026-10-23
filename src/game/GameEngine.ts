import {
  TILE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT,
  TOWN_MAP,
  TILE_COLLISION,
  INTERACTION_ZONES,
  DIALOGUES,
  BUILDING_LABELS,
  PLAYER_SPAWN,
  TileType,
  type InteractionZone,
  type DialogueLine,
} from '@/data/mapData';
import { soundFX } from './SoundFX';

// =============================================
// GAME ENGINE - Canvas-based 2D RPG Engine
// =============================================

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  player: {
    x: number; // tile position
    y: number;
    pixelX: number; // actual pixel position for smooth movement
    pixelY: number;
    direction: Direction;
    isMoving: boolean;
    animFrame: number;
  };
  camera: {
    x: number;
    y: number;
  };
  dialogue: {
    active: boolean;
    lines: DialogueLine[];
    currentLine: number;
    choices?: { label: string; action: string }[];
  };
  activePanel: string | null;
  isPaused: boolean;
}

export type GameEventCallback = (event: string, data?: unknown) => void;

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: GameState;
  private keys: Set<string> = new Set();
  private animTimer = 0;
  private moveTimer = 0;
  private readonly MOVE_SPEED = 3; // pixels per frame
  private readonly ANIM_SPEED = 8; // frames between sprite changes
  private rafId: number | null = null;
  private eventCallback: GameEventCallback;
  private lastTime = 0;
  private tileColors: Record<TileType, string>;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private scale = 1;
  private touchState: { direction: Direction | null; interact: boolean } = {
    direction: null,
    interact: false,
  };
  private lastBumpTime = 0;
  private lastTriggeredDoor: string | null = null;

  constructor(canvas: HTMLCanvasElement, eventCallback: GameEventCallback) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.eventCallback = eventCallback;

    // Disable image smoothing for crisp pixels
    this.ctx.imageSmoothingEnabled = false;

    this.state = {
      player: {
        x: PLAYER_SPAWN.x,
        y: PLAYER_SPAWN.y,
        pixelX: PLAYER_SPAWN.x * TILE_SIZE,
        pixelY: PLAYER_SPAWN.y * TILE_SIZE,
        direction: 'down',
        isMoving: false,
        animFrame: 0,
      },
      camera: {
        x: PLAYER_SPAWN.x * TILE_SIZE,
        y: PLAYER_SPAWN.y * TILE_SIZE,
      },
      dialogue: {
        active: false,
        lines: [],
        currentLine: 0,
      },
      activePanel: null,
      isPaused: false,
    };

    // Tile colors - pixel art palette
    this.tileColors = {
      [TileType.GRASS]: '#7ec850',
      [TileType.PATH]: '#d4b896',
      [TileType.TREE]: '#2d5a1e',
      [TileType.WATER]: '#4488cc',
      [TileType.BUILDING_WALL]: '#c8a87c',
      [TileType.DOOR]: '#8b5e3c',
      [TileType.SIGN]: '#a08060',
      [TileType.FENCE]: '#b89870',
      [TileType.FLOWER]: '#7ec850', // grass base, flowers drawn on top
      [TileType.TALL_GRASS]: '#5aaa38',
      [TileType.ROOF]: '#cc4444',
      [TileType.BUILDING_FRONT]: '#b8986c',
      [TileType.ROOF_BLUE]: '#1e3799',
      [TileType.ROOF_CYAN]: '#00cec9',
      [TileType.ROOF_PURPLE]: '#6c5ce7',
      [TileType.ROOF_GOLD]: '#f39c12',
      [TileType.CONTACT_HUB_ROOF]: '#0891b2',
    };

    this.setupInput();
    this.resize();
  }

  // =============================================
  // INPUT HANDLING
  // =============================================

  private setupInput() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    this.keys.add(key);

    // Handle interaction
    if (key === ' ' || key === 'enter') {
      e.preventDefault();
      this.handleInteraction();
    }

    // Handle escape
    if (key === 'escape') {
      e.preventDefault();
      this.handleEscape();
    }

    // Prevent scrolling with arrow keys
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
      e.preventDefault();
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.key.toLowerCase());
  };

  private handleResize = () => {
    this.resize();
  };

  // Touch controls interface
  public setTouchDirection(direction: Direction | null) {
    this.touchState.direction = direction;
  }

  public triggerInteraction() {
    this.handleInteraction();
  }

  public triggerEscape() {
    this.handleEscape();
  }

  // =============================================
  // MOVEMENT
  // =============================================

  private getInputDirection(): Direction | null {
    // Touch input takes priority
    if (this.touchState.direction) {
      return this.touchState.direction;
    }

    // Keyboard input
    if (this.keys.has('arrowup') || this.keys.has('w')) return 'up';
    if (this.keys.has('arrowdown') || this.keys.has('s')) return 'down';
    if (this.keys.has('arrowleft') || this.keys.has('a')) return 'left';
    if (this.keys.has('arrowright') || this.keys.has('d')) return 'right';
    return null;
  }

  private canMoveTo(x: number, y: number): boolean {
    // Check bounds
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return false;
    
    // Check tile collision
    const tile = TOWN_MAP[y][x];
    if (TILE_COLLISION[tile]) return false;

    // Check NPC collision — NPCs are solid, player cannot walk into them
    const npcBlocking = INTERACTION_ZONES.some(
      (z) => z.type === 'npc' && z.x === x && z.y === y
    );
    if (npcBlocking) return false;

    return true;
  }

  private updateMovement() {
    const { player } = this.state;

    // If player is currently moving between tiles, continue movement
    if (player.isMoving) {
      const targetX = player.x * TILE_SIZE;
      const targetY = player.y * TILE_SIZE;
      const dx = targetX - player.pixelX;
      const dy = targetY - player.pixelY;

      if (Math.abs(dx) <= this.MOVE_SPEED && Math.abs(dy) <= this.MOVE_SPEED) {
        player.pixelX = targetX;
        player.pixelY = targetY;
        player.isMoving = false;
        this.checkDoorProximity();
      } else {
        player.pixelX += Math.sign(dx) * this.MOVE_SPEED;
        player.pixelY += Math.sign(dy) * this.MOVE_SPEED;
      }

      // Update animation
      this.animTimer++;
      if (this.animTimer >= this.ANIM_SPEED) {
        this.animTimer = 0;
        player.animFrame = (player.animFrame + 1) % 4;
      }
      return;
    }

    // Check for new movement input
    const dir = this.getInputDirection();
    if (!dir) {
      player.animFrame = 0;
      return;
    }

    player.direction = dir;

    let newX = player.x;
    let newY = player.y;
    if (dir === 'up') newY--;
    if (dir === 'down') newY++;
    if (dir === 'left') newX--;
    if (dir === 'right') newX++;

    if (this.canMoveTo(newX, newY)) {
      player.x = newX;
      player.y = newY;
      player.isMoving = true;
      this.animTimer = 0;
    } else {
      const now = Date.now();
      if (now - this.lastBumpTime > 300) {
        this.lastBumpTime = now;
        soundFX.playBump();
      }
      // If bumping into or facing a door while moving up
      this.checkDoorProximity();
    }
  }

  // Auto-trigger door interaction when approaching a door from any direction
  private checkDoorProximity() {
    if (this.state.dialogue.active || this.state.activePanel || this.state.isPaused) return;

    const { player } = this.state;

    // Check the tile the player is facing
    let facingX = player.x;
    let facingY = player.y;
    if (player.direction === 'up') facingY--;
    if (player.direction === 'down') facingY++;
    if (player.direction === 'left') facingX--;
    if (player.direction === 'right') facingX++;

    // Check if facing a door tile, or standing on a door tile
    const doorZone = INTERACTION_ZONES.find(
      (z) =>
        z.type === 'door' &&
        ((z.x === facingX && z.y === facingY) ||
          (z.x === player.x && z.y === player.y))
    );

    if (doorZone) {
      if (this.lastTriggeredDoor !== doorZone.dialogueId) {
        this.lastTriggeredDoor = doorZone.dialogueId;
        const dialogue = DIALOGUES[doorZone.dialogueId];
        if (dialogue) {
          soundFX.playDoor();
          this.state.dialogue = {
            active: true,
            lines: dialogue,
            currentLine: 0,
            choices: dialogue[0].choices,
          };
          this.eventCallback('dialogue:open', {
            line: dialogue[0],
            zone: doorZone,
          });
        }
      }
    } else {
      this.lastTriggeredDoor = null;
    }
  }

  // =============================================
  // CAMERA
  // =============================================

  private updateCamera() {
    const { player, camera } = this.state;
    const targetX = player.pixelX - this.canvasWidth / (2 * this.scale) + TILE_SIZE / 2;
    const targetY = player.pixelY - this.canvasHeight / (2 * this.scale) + TILE_SIZE / 2;

    // Smooth camera follow
    camera.x += (targetX - camera.x) * 0.15;
    camera.y += (targetY - camera.y) * 0.15;

    // Clamp camera
    const maxX = MAP_WIDTH * TILE_SIZE - this.canvasWidth / this.scale;
    const maxY = MAP_HEIGHT * TILE_SIZE - this.canvasHeight / this.scale;
    camera.x = Math.max(0, Math.min(camera.x, maxX));
    camera.y = Math.max(0, Math.min(camera.y, maxY));
  }

  // =============================================
  // INTERACTION
  // =============================================

  private handleInteraction() {
    // If dialogue is active, advance it
    if (this.state.dialogue.active) {
      this.advanceDialogue();
      return;
    }

    // If panel is open, ignore
    if (this.state.activePanel) return;

    // If paused, ignore
    if (this.state.isPaused) return;

    // Find what's in front of the player
    const { player } = this.state;
    let checkX = player.x;
    let checkY = player.y;

    if (player.direction === 'up') checkY--;
    if (player.direction === 'down') checkY++;
    if (player.direction === 'left') checkX--;
    if (player.direction === 'right') checkX++;

    // Also check the player's current tile (for standing on doors)
    const zones = INTERACTION_ZONES.filter(
      (z) => (z.x === checkX && z.y === checkY) || (z.x === player.x && z.y === player.y)
    );

    if (zones.length > 0) {
      const zone = zones[0];
      const dialogue = DIALOGUES[zone.dialogueId];
      if (dialogue) {
        soundFX.playSelect();
        this.state.dialogue = {
          active: true,
          lines: dialogue,
          currentLine: 0,
          choices: dialogue[0].choices,
        };
        this.eventCallback('dialogue:open', {
          line: dialogue[0],
          zone,
        });
      }
    }
  }

  private advanceDialogue() {
    const { dialogue } = this.state;
    if (!dialogue.active) return;

    // If there are choices, don't auto-advance
    if (dialogue.choices) return;

    dialogue.currentLine++;
    if (dialogue.currentLine >= dialogue.lines.length) {
      this.closeDialogue();
    } else {
      const line = dialogue.lines[dialogue.currentLine];
      dialogue.choices = line.choices;
      this.eventCallback('dialogue:update', { line });
    }
  }

  public selectChoice(action: string) {
    if (action.startsWith('open:')) {
      const panelId = action.replace('open:', '');
      this.closeDialogue();
      this.state.activePanel = panelId;
      this.eventCallback('panel:open', { panelId });
    } else if (action.startsWith('dialogue:')) {
      const dialogueId = action.replace('dialogue:', '');
      const dialogue = DIALOGUES[dialogueId];
      if (dialogue) {
        soundFX.playSelect();
        this.state.dialogue = {
          active: true,
          lines: dialogue,
          currentLine: 0,
          choices: dialogue[0].choices,
        };
        this.eventCallback('dialogue:update', { line: dialogue[0] });
      }
    } else if (action === 'close') {
      this.closeDialogue();
    }
  }

  private closeDialogue() {
    this.state.dialogue = {
      active: false,
      lines: [],
      currentLine: 0,
    };
    this.eventCallback('dialogue:close', null);
  }

  private handleEscape() {
    if (this.state.dialogue.active) {
      this.closeDialogue();
    } else if (this.state.activePanel) {
      this.closePanel();
    }
  }

  public closePanel() {
    this.state.activePanel = null;
    this.eventCallback('panel:close', null);
  }

  public openPanel(panelId: string) {
    this.state.activePanel = panelId;
    this.eventCallback('panel:open', { panelId });
  }

  // =============================================
  // RENDERING
  // =============================================

  private drawTile(x: number, y: number, tile: TileType) {
    const ctx = this.ctx;
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    // Base color
    ctx.fillStyle = this.tileColors[tile];
    ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);

    // Tile-specific details
    switch (tile) {
      case TileType.GRASS:
        // Subtle grass texture
        ctx.fillStyle = '#72b848';
        for (let i = 0; i < 3; i++) {
          const gx = px + ((x * 7 + i * 11) % 28);
          const gy = py + ((y * 13 + i * 7) % 28);
          ctx.fillRect(gx, gy, 2, 4);
        }
        break;

      case TileType.TALL_GRASS:
        // Darker grass blades
        ctx.fillStyle = '#4a9430';
        for (let i = 0; i < 6; i++) {
          const gx = px + ((x * 5 + i * 5) % 28);
          const gy = py + ((y * 7 + i * 3) % 24);
          ctx.fillRect(gx, gy, 2, 6);
        }
        ctx.fillStyle = '#3d8428';
        for (let i = 0; i < 4; i++) {
          const gx = px + ((x * 3 + i * 7) % 26) + 2;
          const gy = py + ((y * 11 + i * 5) % 22) + 2;
          ctx.fillRect(gx, gy, 2, 5);
        }
        break;

      case TileType.PATH:
        // Sandy path texture
        ctx.fillStyle = '#c8a880';
        ctx.fillRect(px + 2, py + 2, 2, 2);
        ctx.fillRect(px + 14, py + 8, 2, 2);
        ctx.fillRect(px + 24, py + 20, 2, 2);
        ctx.fillRect(px + 8, py + 22, 2, 2);
        break;

      case TileType.TREE:
        // Tree trunk
        ctx.fillStyle = '#6b4226';
        ctx.fillRect(px + 12, py + 20, 8, 12);
        // Tree leaves (round top)
        ctx.fillStyle = '#2d8a1e';
        ctx.fillRect(px + 4, py + 4, 24, 20);
        ctx.fillRect(px + 8, py + 0, 16, 4);
        // Leaf highlights
        ctx.fillStyle = '#3da82e';
        ctx.fillRect(px + 6, py + 6, 8, 8);
        ctx.fillRect(px + 16, py + 10, 6, 6);
        // Dark leaf details
        ctx.fillStyle = '#1e6414';
        ctx.fillRect(px + 18, py + 6, 6, 4);
        ctx.fillRect(px + 8, py + 16, 8, 4);
        break;

      case TileType.WATER:
        // Water with wave animation
        ctx.fillStyle = '#3377bb';
        const waveOffset = (Date.now() / 500) % 2 < 1 ? 0 : 2;
        ctx.fillRect(px + 4 + waveOffset, py + 8, 12, 2);
        ctx.fillRect(px + 12 - waveOffset, py + 18, 12, 2);
        // Lighter water highlight
        ctx.fillStyle = '#5599dd';
        ctx.fillRect(px + 8, py + 4, 8, 2);
        ctx.fillRect(px + 16, py + 14, 8, 2);
        break;

      case TileType.BUILDING_WALL:
        // Wall brick pattern
        ctx.fillStyle = '#b8906c';
        for (let by = 0; by < 4; by++) {
          for (let bx = 0; bx < 4; bx++) {
            const offset = by % 2 === 0 ? 0 : 4;
            ctx.fillRect(px + bx * 8 + offset, py + by * 8, 7, 7);
          }
        }
        break;

      case TileType.BUILDING_FRONT:
        // Front wall with window
        ctx.fillStyle = '#b8906c';
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        // Window
        ctx.fillStyle = '#88ccee';
        ctx.fillRect(px + 8, py + 8, 16, 12);
        // Window frame
        ctx.fillStyle = '#6b4226';
        ctx.fillRect(px + 8, py + 8, 16, 2);
        ctx.fillRect(px + 8, py + 18, 16, 2);
        ctx.fillRect(px + 8, py + 8, 2, 12);
        ctx.fillRect(px + 22, py + 8, 2, 12);
        ctx.fillRect(px + 15, py + 8, 2, 12);
        break;

      case TileType.DOOR:
        // Door frame
        ctx.fillStyle = '#b8906c';
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        // Door
        ctx.fillStyle = '#6b4226';
        ctx.fillRect(px + 6, py + 4, 20, 28);
        // Door detail
        ctx.fillStyle = '#8b5e3c';
        ctx.fillRect(px + 8, py + 6, 16, 24);
        // Door handle
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(px + 20, py + 16, 3, 3);
        // Door mat
        ctx.fillStyle = '#c85050';
        ctx.fillRect(px + 6, py + 28, 20, 4);
        break;

      case TileType.ROOF:
        // Elementary School & Classic Red Roof
        ctx.fillStyle = '#aa3333';
        for (let ry = 0; ry < 4; ry++) {
          for (let rx = 0; rx < 4; rx++) {
            const offset = ry % 2 === 0 ? 0 : 4;
            ctx.fillRect(px + rx * 8 + offset, py + ry * 8, 7, 7);
          }
        }
        ctx.fillStyle = '#dd5555';
        ctx.fillRect(px + 2, py + 2, 4, 4);
        ctx.fillRect(px + 18, py + 10, 4, 4);
        break;

      case TileType.ROOF_BLUE:
        // SMPN 144 Jakarta - Blue Slate Roof
        ctx.fillStyle = '#1e3799';
        for (let ry = 0; ry < 4; ry++) {
          for (let rx = 0; rx < 4; rx++) {
            const offset = ry % 2 === 0 ? 0 : 4;
            ctx.fillRect(px + rx * 8 + offset, py + ry * 8, 7, 7);
          }
        }
        ctx.fillStyle = '#4b7bec';
        ctx.fillRect(px + 2, py + 2, 4, 4);
        ctx.fillRect(px + 18, py + 10, 4, 4);
        break;

      case TileType.ROOF_CYAN:
        // SMKN 71 Jakarta [CURRENT STAGE] - Cyber / High-Tech Cyan Roof
        ctx.fillStyle = '#00838f';
        for (let ry = 0; ry < 4; ry++) {
          for (let rx = 0; rx < 4; rx++) {
            const offset = ry % 2 === 0 ? 0 : 4;
            ctx.fillRect(px + rx * 8 + offset, py + ry * 8, 7, 7);
          }
        }
        ctx.fillStyle = '#00e5ff';
        ctx.fillRect(px + 2, py + 2, 5, 4);
        ctx.fillRect(px + 18, py + 10, 5, 4);
        // Antenna / Satellite receiver on top corner
        if (x % 2 === 0 && y % 2 === 0) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(px + 14, py + 2, 4, 4);
        }
        break;

      case TileType.ROOF_GOLD:
        // Project Center - Arcade Gold Roof
        ctx.fillStyle = '#b7791f';
        for (let ry = 0; ry < 4; ry++) {
          for (let rx = 0; rx < 4; rx++) {
            const offset = ry % 2 === 0 ? 0 : 4;
            ctx.fillRect(px + rx * 8 + offset, py + ry * 8, 7, 7);
          }
        }
        ctx.fillStyle = '#f6e05e';
        ctx.fillRect(px + 2, py + 2, 4, 4);
        ctx.fillRect(px + 18, py + 10, 4, 4);
        break;

      case TileType.ROOF_PURPLE:
        // Achievement Hall - Royal Purple Roof
        ctx.fillStyle = '#553c9a';
        for (let ry = 0; ry < 4; ry++) {
          for (let rx = 0; rx < 4; rx++) {
            const offset = ry % 2 === 0 ? 0 : 4;
            ctx.fillRect(px + rx * 8 + offset, py + ry * 8, 7, 7);
          }
        }
        ctx.fillStyle = '#b794f4';
        ctx.fillRect(px + 2, py + 2, 4, 4);
        ctx.fillRect(px + 18, py + 10, 4, 4);
        break;

      case TileType.CONTACT_HUB_ROOF:
        // Contact Hub - Cyan/Teal Communication Theme Roof
        ctx.fillStyle = '#0891b2';
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        // White band
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px, py + 12, TILE_SIZE, 6);
        // Signal/antenna emblem
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 12, py + 4, 8, 8);
        ctx.fillStyle = '#0891b2';
        ctx.fillRect(px + 14, py + 6, 4, 4);
        // Signal waves
        ctx.fillStyle = '#22d3ee';
        ctx.fillRect(px + 8, py + 2, 2, 3);
        ctx.fillRect(px + 22, py + 2, 2, 3);
        ctx.fillRect(px + 6, py + 6, 2, 2);
        ctx.fillRect(px + 24, py + 6, 2, 2);
        break;

      case TileType.SIGN:
        // Grass under sign
        ctx.fillStyle = '#7ec850';
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        // Sign post
        ctx.fillStyle = '#6b4226';
        ctx.fillRect(px + 14, py + 16, 4, 16);
        // Sign board
        ctx.fillStyle = '#d4a86a';
        ctx.fillRect(px + 4, py + 4, 24, 14);
        // Sign border
        ctx.fillStyle = '#8b5e3c';
        ctx.fillRect(px + 4, py + 4, 24, 2);
        ctx.fillRect(px + 4, py + 16, 24, 2);
        ctx.fillRect(px + 4, py + 4, 2, 14);
        ctx.fillRect(px + 26, py + 4, 2, 14);
        break;

      case TileType.FENCE:
        // Grass under fence
        ctx.fillStyle = '#7ec850';
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        // Fence posts
        ctx.fillStyle = '#c8a070';
        ctx.fillRect(px + 2, py + 8, 4, 20);
        ctx.fillRect(px + 26, py + 8, 4, 20);
        // Fence rails
        ctx.fillRect(px, py + 12, TILE_SIZE, 4);
        ctx.fillRect(px, py + 22, TILE_SIZE, 4);
        // Post tops
        ctx.fillStyle = '#d4b088';
        ctx.fillRect(px + 1, py + 6, 6, 4);
        ctx.fillRect(px + 25, py + 6, 6, 4);
        break;

      case TileType.FLOWER:
        // Grass base
        ctx.fillStyle = '#7ec850';
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        // Flowers
        const flowerColors = ['#ff6b6b', '#ffdd44', '#ff88aa', '#ffffff'];
        const fc = flowerColors[(x + y) % flowerColors.length];
        ctx.fillStyle = fc;
        ctx.fillRect(px + 6, py + 6, 6, 6);
        ctx.fillRect(px + 20, py + 14, 6, 6);
        ctx.fillRect(px + 10, py + 22, 6, 6);
        // Flower centers
        ctx.fillStyle = '#ffee00';
        ctx.fillRect(px + 8, py + 8, 2, 2);
        ctx.fillRect(px + 22, py + 16, 2, 2);
        ctx.fillRect(px + 12, py + 24, 2, 2);
        // Stems
        ctx.fillStyle = '#4a8a30';
        ctx.fillRect(px + 8, py + 12, 2, 4);
        ctx.fillRect(px + 22, py + 20, 2, 4);
        ctx.fillRect(px + 12, py + 28, 2, 4);
        break;
    }
  }

  private drawPlayer() {
    const { player } = this.state;
    const ctx = this.ctx;
    const px = player.pixelX;
    const py = player.pixelY;

    // Player shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(px + 6, py + 28, 20, 4);

    // Draw character based on direction
    const isStep = player.animFrame % 2 === 1;
    const stepOffset = isStep ? 1 : 0;
    const frame2 = player.animFrame >= 2;

    // Body
    ctx.fillStyle = '#3355aa'; // Blue shirt
    ctx.fillRect(px + 8, py + 12, 16, 12);

    // Legs
    ctx.fillStyle = '#334466'; // Dark pants
    if (player.isMoving) {
      if (frame2) {
        ctx.fillRect(px + 8 - stepOffset, py + 24, 8, 8);
        ctx.fillRect(px + 16 + stepOffset, py + 24, 8, 6);
      } else {
        ctx.fillRect(px + 8 + stepOffset, py + 24, 8, 6);
        ctx.fillRect(px + 16 - stepOffset, py + 24, 8, 8);
      }
    } else {
      ctx.fillRect(px + 8, py + 24, 7, 7);
      ctx.fillRect(px + 17, py + 24, 7, 7);
    }

    // Shoes
    ctx.fillStyle = '#8b4513';
    if (player.isMoving) {
      if (frame2) {
        ctx.fillRect(px + 7 - stepOffset, py + 30, 9, 2);
        ctx.fillRect(px + 16 + stepOffset, py + 28, 9, 2);
      } else {
        ctx.fillRect(px + 7 + stepOffset, py + 28, 9, 2);
        ctx.fillRect(px + 16 - stepOffset, py + 30, 9, 2);
      }
    } else {
      ctx.fillRect(px + 7, py + 29, 8, 3);
      ctx.fillRect(px + 17, py + 29, 8, 3);
    }

    // Head
    ctx.fillStyle = '#ffcc88'; // Skin
    ctx.fillRect(px + 8, py + 2, 16, 12);

    // Hair based on direction
    ctx.fillStyle = '#222222'; // Dark hair
    switch (player.direction) {
      case 'down':
        ctx.fillRect(px + 6, py + 0, 20, 6);
        ctx.fillRect(px + 6, py + 6, 4, 4);
        ctx.fillRect(px + 22, py + 6, 4, 4);
        // Eyes
        ctx.fillStyle = '#000000';
        ctx.fillRect(px + 11, py + 7, 3, 3);
        ctx.fillRect(px + 18, py + 7, 3, 3);
        // Eye whites
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 12, py + 7, 2, 2);
        ctx.fillRect(px + 19, py + 7, 2, 2);
        // Mouth
        ctx.fillStyle = '#cc8866';
        ctx.fillRect(px + 14, py + 12, 4, 1);
        break;
      case 'up':
        ctx.fillRect(px + 6, py + 0, 20, 10);
        ctx.fillRect(px + 8, py + 10, 16, 2);
        break;
      case 'left':
        ctx.fillRect(px + 6, py + 0, 20, 6);
        ctx.fillRect(px + 6, py + 6, 6, 6);
        // Eye
        ctx.fillStyle = '#000000';
        ctx.fillRect(px + 10, py + 7, 3, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 10, py + 7, 2, 2);
        break;
      case 'right':
        ctx.fillRect(px + 6, py + 0, 20, 6);
        ctx.fillRect(px + 20, py + 6, 6, 6);
        // Eye
        ctx.fillStyle = '#000000';
        ctx.fillRect(px + 19, py + 7, 3, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 20, py + 7, 2, 2);
        break;
    }

    // Hat/cap (like Pokémon trainer)
    ctx.fillStyle = '#cc2222';
    ctx.fillRect(px + 6, py - 2, 20, 4);
    if (player.direction === 'left') {
      ctx.fillRect(px + 2, py, 8, 3);
    } else if (player.direction === 'right') {
      ctx.fillRect(px + 22, py, 8, 3);
    } else if (player.direction === 'down') {
      ctx.fillRect(px + 6, py, 20, 2);
      // Cap brim
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 12, py - 2, 8, 2);
    }

    // Arms
    ctx.fillStyle = '#3355aa';
    if (player.direction === 'left') {
      ctx.fillRect(px + 4, py + 14, 6, 4);
      ctx.fillStyle = '#ffcc88';
      ctx.fillRect(px + 4, py + 18, 4, 3);
    } else if (player.direction === 'right') {
      ctx.fillRect(px + 22, py + 14, 6, 4);
      ctx.fillStyle = '#ffcc88';
      ctx.fillRect(px + 24, py + 18, 4, 3);
    } else {
      // Front-facing arms
      ctx.fillRect(px + 4, py + 14, 6, 4);
      ctx.fillRect(px + 22, py + 14, 6, 4);
      ctx.fillStyle = '#ffcc88';
      ctx.fillRect(px + 4, py + 18, 4, 3);
      ctx.fillRect(px + 24, py + 18, 4, 3);
    }
  }

  private drawNPCs() {
    const ctx = this.ctx;

    INTERACTION_ZONES.forEach((zone) => {
      if (zone.type !== 'npc') return;

      const px = zone.x * TILE_SIZE;
      const py = zone.y * TILE_SIZE;

      // NPC shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(px + 6, py + 28, 20, 4);

      if (zone.dialogueId === 'school-smkn71-npc') {
        // SMKN 71 RPL Senior Tech Student
        ctx.fillStyle = '#0097e6';
        ctx.fillRect(px + 8, py + 12, 16, 12);
        ctx.fillStyle = '#ffcc88';
        ctx.fillRect(px + 8, py + 2, 16, 12);
        ctx.fillStyle = '#2d3436';
        ctx.fillRect(px + 6, py + 0, 20, 6);
        ctx.fillStyle = '#000000';
        ctx.fillRect(px + 11, py + 7, 3, 3);
        ctx.fillRect(px + 18, py + 7, 3, 3);
        // Tech lanyard / laptop bag
        ctx.fillStyle = '#00cec9';
        ctx.fillRect(px + 10, py + 14, 12, 3);
        ctx.fillStyle = '#636e72';
        ctx.fillRect(px + 8, py + 24, 7, 7);
        ctx.fillRect(px + 17, py + 24, 7, 7);
      } else if (zone.dialogueId === 'school-smpn144-npc') {
        // Junior High Student
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 8, py + 12, 16, 12);
        ctx.fillStyle = '#0984e3'; // Blue junior tie
        ctx.fillRect(px + 14, py + 13, 4, 8);
        ctx.fillStyle = '#ffcc88';
        ctx.fillRect(px + 8, py + 2, 16, 12);
        ctx.fillStyle = '#4b6584';
        ctx.fillRect(px + 6, py + 0, 20, 6);
        ctx.fillStyle = '#0984e3';
        ctx.fillRect(px + 8, py + 24, 7, 7);
        ctx.fillRect(px + 17, py + 24, 7, 7);
      } else if (zone.dialogueId === 'school-sdn02-npc') {
        // Elementary Pupil
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 9, py + 14, 14, 10);
        ctx.fillStyle = '#ff7675'; // Red elementary shorts
        ctx.fillRect(px + 9, py + 24, 6, 6);
        ctx.fillRect(px + 17, py + 24, 6, 6);
        ctx.fillStyle = '#ffcc88';
        ctx.fillRect(px + 9, py + 4, 14, 10);
        ctx.fillStyle = '#d63031'; // Red pupil cap
        ctx.fillRect(px + 8, py + 1, 16, 5);
      } else if (zone.dialogueId === 'welcome-npc') {
        // Guide Professor in white lab coat
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 8, py + 12, 16, 14);
        ctx.fillStyle = '#ffcc88';
        ctx.fillRect(px + 8, py + 2, 16, 12);
        ctx.fillStyle = '#888888';
        ctx.fillRect(px + 6, py + 0, 20, 6);
        ctx.fillStyle = '#333333';
        ctx.fillRect(px + 10, py + 6, 5, 4);
        ctx.fillRect(px + 17, py + 6, 5, 4);
        ctx.fillRect(px + 15, py + 7, 2, 2);
        ctx.fillStyle = '#000000';
        ctx.fillRect(px + 12, py + 8, 2, 2);
        ctx.fillRect(px + 19, py + 8, 2, 2);
        ctx.fillStyle = '#555555';
        ctx.fillRect(px + 8, py + 26, 7, 6);
        ctx.fillRect(px + 17, py + 26, 7, 6);
      } else {
        // Standard friendly townsfolk
        ctx.fillStyle = '#44aa66';
        ctx.fillRect(px + 8, py + 12, 16, 12);
        ctx.fillStyle = '#ffcc88';
        ctx.fillRect(px + 8, py + 2, 16, 12);
        ctx.fillStyle = '#6b3a1e';
        ctx.fillRect(px + 6, py + 0, 20, 6);
        ctx.fillStyle = '#000000';
        ctx.fillRect(px + 11, py + 7, 3, 3);
        ctx.fillRect(px + 18, py + 7, 3, 3);
        ctx.fillStyle = '#445566';
        ctx.fillRect(px + 8, py + 24, 7, 7);
        ctx.fillRect(px + 17, py + 24, 7, 7);
      }

      // Interaction indicator (bouncing exclamation mark)
      const bounce = Math.sin(Date.now() / 300) * 3;
      ctx.fillStyle = '#ffdd00';
      ctx.fillRect(px + 14, py - 10 + bounce, 4, 8);
      ctx.fillRect(px + 14, py - 0 + bounce, 4, 3);
    });
  }

  private drawBuildingLabels() {
    const ctx = this.ctx;

    BUILDING_LABELS.forEach((label) => {
      const px = label.x * TILE_SIZE;
      const py = label.y * TILE_SIZE - 8;

      // Background
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      const textWidth = label.label.length * 6 + 8;
      const labelX = px + (label.width * TILE_SIZE - textWidth) / 2;
      ctx.fillRect(labelX, py - 2, textWidth, 12);

      // Text
      ctx.fillStyle = label.color;
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label.label, px + (label.width * TILE_SIZE) / 2, py + 7);
      ctx.textAlign = 'start';
    });
  }

  private drawInteractionHint() {
    // Check if player is near an interactable
    const { player } = this.state;
    let checkX = player.x;
    let checkY = player.y;

    if (player.direction === 'up') checkY--;
    if (player.direction === 'down') checkY++;
    if (player.direction === 'left') checkX--;
    if (player.direction === 'right') checkX++;

    const zone = INTERACTION_ZONES.find(
      (z) => (z.x === checkX && z.y === checkY) || (z.x === player.x && z.y === player.y)
    );

    if (zone && !this.state.dialogue.active && !this.state.activePanel) {
      const ctx = this.ctx;
      const px = zone.x * TILE_SIZE;
      const py = zone.y * TILE_SIZE - 20;

      // Hint bubble
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      const textWidth = Math.max(zone.label.length * 5.5 + 16, 60);
      ctx.fillRect(px + TILE_SIZE / 2 - textWidth / 2, py - 4, textWidth, 16);

      ctx.fillStyle = '#00ddff';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`[SPACE] ${zone.label}`, px + TILE_SIZE / 2, py + 8);
      ctx.textAlign = 'start';
    }
  }

  private render() {
    const ctx = this.ctx;
    const { camera } = this.state;

    // Clear
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Save and apply camera transform
    ctx.save();
    ctx.scale(this.scale, this.scale);
    ctx.translate(-Math.round(camera.x), -Math.round(camera.y));

    // Disable smoothing after transform
    ctx.imageSmoothingEnabled = false;

    // Calculate visible tile range
    const startTileX = Math.max(0, Math.floor(camera.x / TILE_SIZE) - 1);
    const startTileY = Math.max(0, Math.floor(camera.y / TILE_SIZE) - 1);
    const endTileX = Math.min(MAP_WIDTH, Math.ceil((camera.x + this.canvasWidth / this.scale) / TILE_SIZE) + 1);
    const endTileY = Math.min(MAP_HEIGHT, Math.ceil((camera.y + this.canvasHeight / this.scale) / TILE_SIZE) + 1);

    // Draw visible tiles
    for (let y = startTileY; y < endTileY; y++) {
      for (let x = startTileX; x < endTileX; x++) {
        if (TOWN_MAP[y] && TOWN_MAP[y][x] !== undefined) {
          this.drawTile(x, y, TOWN_MAP[y][x]);
        }
      }
    }

    // Draw building labels
    this.drawBuildingLabels();

    // Draw NPCs
    this.drawNPCs();

    // Draw player
    this.drawPlayer();

    // Draw interaction hints
    this.drawInteractionHint();

    ctx.restore();
  }

  // =============================================
  // RESIZE
  // =============================================

  resize() {
    const container = this.canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvasWidth = rect.width * dpr;
    this.canvasHeight = rect.height * dpr;

    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    // Calculate scale to fit ~15 tiles visible horizontally
    const targetVisibleTiles = 15;
    this.scale = this.canvasWidth / (targetVisibleTiles * TILE_SIZE);
    // Ensure minimum scale
    this.scale = Math.max(this.scale, 1.5);

    // Re-disable smoothing
    this.ctx.imageSmoothingEnabled = false;
  }

  // =============================================
  // GAME LOOP
  // =============================================

  private gameLoop = (time: number) => {
    if (!this.state.isPaused && !this.state.dialogue.active && !this.state.activePanel) {
      this.updateMovement();
    }
    this.updateCamera();
    this.render();
    this.rafId = requestAnimationFrame(this.gameLoop);
  };

  start() {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.gameLoop);
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('resize', this.handleResize);
    this.keys.clear();
  }

  // =============================================
  // PUBLIC GETTERS
  // =============================================

  getState(): GameState {
    return this.state;
  }

  isDialogueActive(): boolean {
    return this.state.dialogue.active;
  }

  isPanelOpen(): boolean {
    return this.state.activePanel !== null;
  }

  getActivePanel(): string | null {
    return this.state.activePanel;
  }

  getDialogue() {
    return this.state.dialogue;
  }
}
