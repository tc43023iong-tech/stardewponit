import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Student } from '../../types/classroom';
import { AvatarRenderer } from './AvatarRenderer';
import { STARDEW_AVATARS } from '../../data/classroomData';
import { soundManager } from '../../utils/sound';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  X,
  Volume2,
  VolumeX,
  Search,
  Heart,
  Sun,
  Sunset,
  Moon,
  Crosshair,
} from 'lucide-react';

// Authentic 16-bit retro pixel art game landscape maps (handcrafted Stardew Valley style tilesets)
import autumnBg from '../../assets/images/paradise_pixel_autumn_1793879484596.jpg';
import springBg from '../../assets/images/paradise_pixel_spring_1793879486507.jpg';
import summerBg from '../../assets/images/paradise_pixel_summer_1793879488062.jpg';
import winterBg from '../../assets/images/paradise_pixel_winter_1793879487326.jpg';

import { PointsFeedbackModal, PointsFeedbackData } from './PointsFeedbackModal';

import { pokemonSound } from '../../utils/pokemonAudio';

export type ParadiseSeason = 'autumn' | 'spring' | 'summer' | 'winter';
export type ParadiseTimeOfDay = 'day' | 'dawn' | 'sunset' | 'night';

// World expansion multiplier (1.45x width & height = 2.1x total playable area!)
const WORLD_SCALE = 1.45;
const MIN_ZOOM = 0.69; // 1 / 1.45 -> entire giant world fits edge-to-edge cleanly
const MAX_ZOOM = 2.4;

// Auto-determine season according to real-world calendar month
export function getSeasonByMonth(month = new Date().getMonth() + 1): ParadiseSeason {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

// Determine the student's unique Stardew Valley companion avatar strictly from their roster selection
function resolveStardewCompanion(student: Student, index: number): string {
  if (student.stardewAvatar && student.stardewAvatar.trim() !== '') {
    return student.stardewAvatar;
  }
  if (student.avatar && student.avatar.trim() !== '') {
    return student.avatar;
  }
  const defaultItem = STARDEW_AVATARS[index % STARDEW_AVATARS.length]?.id || 'sdv_white_chicken';
  return defaultItem;
}

// Helper: keep land animals out of the deep lake water (x > 64 && y > 73), while allowing pier access!
function sanitizeLandPoint(x: number, y: number): { x: number; y: number } {
  const cx = Math.max(4, Math.min(95, x));
  const cy = Math.max(10, Math.min(91, y));
  // Allow walking onto the wooden lakeside pier (x: 60..73, y: 65..72)
  if (cx >= 60 && cx <= 74 && cy >= 65 && cy <= 73) {
    return { x: cx, y: cy };
  }
  // Gently steer around the southeast deep lake basin (x > 63 && y > 73)
  if (cx > 63 && cy > 73) {
    if (cx - 63 < cy - 73) {
      return { x: 58, y: cy };
    }
    return { x: cx, y: 66 };
  }
  return { x: cx, y: cy };
}

interface CompanionState {
  id: string;
  studentId: string;
  name: string;
  rollNo: number;
  stardewAvatar: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  targetX: number;
  targetY: number;
  facing: 'left' | 'right';
  action: 'idle' | 'walking' | 'swimming' | 'resting' | 'perched' | 'celebrating' | 'running';
  speed: number;
  swayPhase: number;
  swaySpeed: number;
  runUntil?: number;
  wanderTimer?: number;
  isAquatic: boolean;
  speechBubble?: string;
  floatingText?: { text: string; isPositive: boolean; key: number };
  growthBonus: number;
  lastPetTime?: number;
}

interface PixelParadiseViewProps {
  students: Student[];
  className: string;
  onApplyPoints: (
    targets: Student[],
    delta: number,
    reasonZh: string,
    reasonEn?: string,
    icon?: string
  ) => void;
  onChangeAvatar?: (student: Student) => void;
  onClose?: () => void;
  isFullScreenMode?: boolean;
  initialTimeOfDay?: ParadiseTimeOfDay;
}

export const PixelParadiseView: React.FC<PixelParadiseViewProps> = ({
  students,
  className,
  onApplyPoints,
  onChangeAvatar,
  onClose,
  initialTimeOfDay = 'day',
}) => {
  // Season state: automatically initialized and switched according to current calendar month
  const [season, setSeason] = useState<ParadiseSeason>(() => getSeasonByMonth());

  // Fullscreen / Windows PC feedback popup overlay state
  const [paradiseFeedback, setParadiseFeedback] = useState<PointsFeedbackData | null>(null);

  // Time of Day lighting synced with classroom
  const [timeOfDay, setTimeOfDay] = useState<ParadiseTimeOfDay>(initialTimeOfDay);

  useEffect(() => {
    if (initialTimeOfDay) {
      setTimeOfDay(initialTimeOfDay);
    }
  }, [initialTimeOfDay]);

  // Name tags visibility toggle
  const [showNameTags, setShowNameTags] = useState<boolean>(true);

  // Camera Viewport, Zoom, Pan & Drag state
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState<{ w: number; h: number }>({ w: 1200, h: 700 });
  const [zoomLevel, setZoomLevel] = useState<number>(0.76);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: -60, y: -40 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    panX: number;
    panY: number;
    hasMoved: boolean;
  } | null>(null);

  const [focusedCompanionId, setFocusedCompanionId] = useState<string | null>(null);
  const [isFollowingCamera, setIsFollowingCamera] = useState<boolean>(false);

  // Student finder search query
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Fullscreen container state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Point scoring target
  const [scoringStudent, setScoringStudent] = useState<Student | null>(null);

  // Mute audio in paradise
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(soundManager.isMuted);

  // Measure viewport dimensions smoothly
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const updateSize = () => {
      setViewportSize({ w: el.clientWidth || 1200, h: el.clientHeight || 700 });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Clamp pan coordinates so expanded world never leaves empty borders
  const clampPan = useCallback(
    (px: number, py: number, zoom: number, vw = viewportSize.w, vh = viewportSize.h) => {
      const worldW = vw * WORLD_SCALE * zoom;
      const worldH = vh * WORLD_SCALE * zoom;
      const minX = Math.min(0, vw - worldW);
      const minY = Math.min(0, vh - worldH);
      return {
        x: Math.max(minX, Math.min(0, px)),
        y: Math.max(minY, Math.min(0, py)),
      };
    },
    [viewportSize]
  );

  // Smoothly focus camera onto any map coordinate (x%, y%)
  const focusOnCoordinates = useCallback(
    (xPct: number, yPct: number, targetZoom?: number) => {
      const nextZoom = targetZoom ?? zoomLevel;
      const worldW = viewportSize.w * WORLD_SCALE * nextZoom;
      const worldH = viewportSize.h * WORLD_SCALE * nextZoom;
      const rawPanX = viewportSize.w / 2 - (xPct / 100) * worldW;
      const rawPanY = viewportSize.h / 2 - (yPct / 100) * worldH;
      if (targetZoom !== undefined) {
        setZoomLevel(nextZoom);
      }
      setPanOffset(clampPan(rawPanX, rawPanY, nextZoom));
    },
    [viewportSize, zoomLevel, clampPan]
  );

  // Keep pan clamped on resize
  useEffect(() => {
    setPanOffset((prev) => clampPan(prev.x, prev.y, zoomLevel));
  }, [viewportSize, zoomLevel, clampPan]);

  // Determine if a student's companion is aquatic
  const checkIsAquatic = (student: Student, stardewAvatar: string, idx: number): boolean => {
    if (student.rollNo === 21) return true;
    if (stardewAvatar === 'sdv_duck' || stardewAvatar === 'sdv_turtle') return true;
    return idx % 9 === 7;
  };

  // Distribute companions broadly across the entire expanded world
  const getInitialCoordinates = (rollNo: number, idx: number, isAquatic: boolean) => {
    if (rollNo === 21) return { x: 78, y: 82, action: 'swimming' as const };

    if (isAquatic) {
      return {
        x: 65 + ((idx * 17) % 28),
        y: 74 + ((idx * 13) % 17),
        action: 'swimming' as const,
      };
    }

    // Spread students organically across all 6 landmarks + wide open fields (4%..94%)
    const broadSpots = [
      { minX: 6, maxX: 28, minY: 12, maxY: 36 },  // NW Farmhouse meadow
      { minX: 32, maxX: 62, minY: 12, maxY: 34 }, // North Junimo Grove
      { minX: 68, maxX: 93, minY: 12, maxY: 42 }, // NE Campsite & woods
      { minX: 6, maxX: 32, minY: 44, maxY: 88 },  // West/SW Crop Garden & orchard
      { minX: 34, maxX: 64, minY: 38, maxY: 66 }, // Central Fountain Plaza
      { minX: 38, maxX: 62, minY: 66, maxY: 88 }, // South shoreline & beach
      { minX: 70, maxX: 93, minY: 46, maxY: 66 }, // East flower ridge above lake
    ];
    const z = broadSpots[idx % broadSpots.length];
    const pt = sanitizeLandPoint(
      z.minX + Math.random() * (z.maxX - z.minX),
      z.minY + Math.random() * (z.maxY - z.minY)
    );
    return {
      x: pt.x,
      y: pt.y,
      action: 'walking' as const,
    };
  };

  // Pick truly free, wide-ranging irregular destinations across the entire world
  const getRandomDestination = (
    isAquatic: boolean,
    currentX: number,
    currentY: number,
    isSprint = false
  ): { x: number; y: number } => {
    if (isAquatic) {
      // 18% chance for ducks/turtles to briefly waddle up onto the sandy shoreline
      if (!isSprint && Math.random() < 0.18) {
        return {
          x: 48 + Math.random() * 14,
          y: 68 + Math.random() * 10,
        };
      }
      if (isSprint) {
        const destX = currentX > 79 ? 64 + Math.random() * 10 : 83 + Math.random() * 10;
        const destY = currentY > 82 ? 73 + Math.random() * 7 : 83 + Math.random() * 8;
        return { x: destX, y: destY };
      }
      return {
        x: 64 + Math.random() * 29,
        y: 73 + Math.random() * 19,
      };
    }

    if (isSprint) {
      // Sprint dramatically far across the entire world (minimum 38% distance!)
      for (let tries = 0; tries < 8; tries++) {
        const pt = sanitizeLandPoint(5 + Math.random() * 90, 11 + Math.random() * 80);
        if (Math.hypot(pt.x - currentX, pt.y - currentY) > 38) {
          return pt;
        }
      }
      return sanitizeLandPoint(currentX > 50 ? 12 + Math.random() * 20 : 68 + Math.random() * 22, 16 + Math.random() * 64);
    }

    // Irregular free-roam across the entire map:
    // 82% chance to pick a completely unconstrained random spot anywhere on the map (>22% away)
    // 18% chance to meander nearby
    const roll = Math.random();
    if (roll < 0.82) {
      for (let tries = 0; tries < 6; tries++) {
        const pt = sanitizeLandPoint(5 + Math.random() * 90, 11 + Math.random() * 80);
        if (Math.hypot(pt.x - currentX, pt.y - currentY) > 22) {
          return pt;
        }
      }
      return sanitizeLandPoint(5 + Math.random() * 90, 11 + Math.random() * 80);
    }

    return sanitizeLandPoint(
      currentX + (Math.random() * 34 - 17),
      currentY + (Math.random() * 28 - 14)
    );
  };

  // State of all active student companions in the paradise
  const [companions, setCompanions] = useState<CompanionState[]>(() => {
    return students.map((s, idx) => {
      const stardewAvatar = resolveStardewCompanion(s, idx);
      const isAquatic = checkIsAquatic(s, stardewAvatar, idx);
      const init = getInitialCoordinates(s.rollNo, idx, isAquatic);
      const growthBonus = Math.min(0.55, Math.max(0, s.points * 0.005));
      const firstDest = getRandomDestination(isAquatic, init.x, init.y, false);

      return {
        id: s.id,
        studentId: s.id,
        name: s.name,
        rollNo: s.rollNo,
        stardewAvatar,
        x: init.x,
        y: init.y,
        targetX: firstDest.x,
        targetY: firstDest.y,
        facing: firstDest.x < init.x ? 'left' : 'right',
        action: isAquatic ? 'swimming' : 'walking',
        speed: 0.25 + Math.random() * 0.14,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.08 + Math.random() * 0.08,
        wanderTimer: Math.floor(Math.random() * 50) + 25,
        isAquatic,
        growthBonus,
      };
    });
  });

  // Sync companions when students prop changes
  useEffect(() => {
    setCompanions((prev) =>
      students.map((s, idx) => {
        const existing = prev.find((p) => p.studentId === s.id);
        const stardewAvatar = resolveStardewCompanion(s, idx);
        const isAquatic = checkIsAquatic(s, stardewAvatar, idx);
        const growthBonus = Math.min(0.55, Math.max(0, s.points * 0.005));

        if (existing) {
          let nextX = existing.x;
          let nextY = existing.y;
          let nextAction = existing.action;

          if (!isAquatic && existing.action === 'swimming') {
            nextX = 48;
            nextY = 66;
            nextAction = 'walking';
          } else if (isAquatic && existing.action !== 'swimming' && existing.action !== 'running') {
            nextX = 76;
            nextY = 80;
            nextAction = 'swimming';
          }

          return {
            ...existing,
            name: s.name,
            rollNo: s.rollNo,
            stardewAvatar,
            isAquatic,
            x: nextX,
            y: nextY,
            action: nextAction,
            growthBonus,
          };
        }

        const init = getInitialCoordinates(s.rollNo, idx, isAquatic);
        const dest = getRandomDestination(isAquatic, init.x, init.y, false);
        return {
          id: s.id,
          studentId: s.id,
          name: s.name,
          rollNo: s.rollNo,
          stardewAvatar,
          x: init.x,
          y: init.y,
          targetX: dest.x,
          targetY: dest.y,
          facing: dest.x < init.x ? 'left' : 'right',
          action: isAquatic ? 'swimming' : 'walking',
          speed: 0.26 + Math.random() * 0.12,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.08 + Math.random() * 0.08,
          wanderTimer: Math.floor(Math.random() * 45) + 20,
          isAquatic,
          growthBonus,
        };
      })
    );
  }, [students]);

  // Click Companion to Sprint across the expansive paradise + open Spotlight Dock
  const handleCompanionClick = (comp: CompanionState, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();

    const sprintTarget = getRandomDestination(comp.isAquatic, comp.x, comp.y, true);
    const facing = sprintTarget.x < comp.x ? 'left' : 'right';
    const runBubble = [
      '💨 溜了溜了~',
      '🏃 衝啊！',
      '⚡ 好快！',
      '🐾 奔跑中~',
      '😆 哈哈！',
      '✨ 飛奔！',
      '💨 追不到我~',
      '💖 嘻嘻！',
    ][Math.floor(Math.random() * 8)];

    setCompanions((prev) =>
      prev.map((c) => {
        if (c.id === comp.id) {
          return {
            ...c,
            action: 'running',
            targetX: sprintTarget.x,
            targetY: sprintTarget.y,
            facing,
            speed: 0.96,
            runUntil: Date.now() + 4200,
            speechBubble: runBubble,
          };
        }
        return c;
      })
    );

    setFocusedCompanionId(comp.id);
    const currentStudent = students.find((s) => s.id === comp.studentId);
    if (currentStudent) {
      setScoringStudent(currentStudent);
    }
  };

  // Silky-smooth 50ms Autonomous Curved-Path Roaming Engine
  useEffect(() => {
    const moveInterval = setInterval(() => {
      const now = Date.now();

      setCompanions((prev) =>
        prev.map((c) => {
          if (c.action === 'celebrating') return c;

          let action = c.action;
          let speed = c.speed || 0.28;
          let targetX = c.targetX;
          let targetY = c.targetY;
          let wanderTimer = (c.wanderTimer ?? 35) - 1;
          let speechBubble = c.speechBubble;
          const swayPhase = (c.swayPhase || 0) + (c.swaySpeed || 0.1);

          // Check if running sprint finished
          if (action === 'running' && c.runUntil && now > c.runUntil) {
            action = c.isAquatic ? 'swimming' : 'walking';
            speed = 0.28;
            speechBubble = undefined;
          }

          // Pick a new organic destination across the world when timer expires
          if (wanderTimer <= 0 && action !== 'running') {
            // 86% active exploration, 14% brief pause
            if (Math.random() < 0.86) {
              wanderTimer = Math.floor(Math.random() * 90) + 45; // 2.2s - 6.7s travel window
              const nextDest = getRandomDestination(c.isAquatic, c.x, c.y, false);
              targetX = nextDest.x;
              targetY = nextDest.y;
              action = c.isAquatic ? 'swimming' : 'walking';
              speed = 0.24 + Math.random() * 0.18;

              if (Math.random() < 0.12) {
                speechBubble = ['🌾', '✨', '🐾', '🌸', '🎵', '🍀', '🍎', '💖', '🦋'][
                  Math.floor(Math.random() * 9)
                ];
              } else {
                speechBubble = undefined;
              }
            } else {
              wanderTimer = Math.floor(Math.random() * 28) + 18; // Short 0.9s - 2.3s rest
              action = c.isAquatic ? 'swimming' : 'idle';
              speechBubble = Math.random() < 0.25 ? '💤' : undefined;
            }
          }

          const dx = targetX - c.x;
          const dy = targetY - c.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 0.5 && (action === 'walking' || action === 'swimming' || action === 'running')) {
            const step = Math.min(dist, speed);
            const dirX = dx / dist;
            const dirY = dy / dist;

            // Add organic perpendicular curve sway (so walks weave naturally instead of stiff lines)
            const swayAmp = action === 'running' ? 0.04 : 0.14;
            const sway = Math.sin(swayPhase) * swayAmp;
            const perpX = -dirY;
            const perpY = dirX;

            let nextX = c.x + dirX * step + perpX * sway;
            let nextY = c.y + dirY * step + perpY * sway;

            if (c.isAquatic) {
              nextX = Math.max(46, Math.min(95, nextX));
              nextY = Math.max(67, Math.min(93, nextY));
            } else {
              const safe = sanitizeLandPoint(nextX, nextY);
              nextX = safe.x;
              nextY = safe.y;
            }

            const facing: 'left' | 'right' = dx < -0.15 ? 'left' : dx > 0.15 ? 'right' : c.facing;

            return {
              ...c,
              x: nextX,
              y: nextY,
              targetX,
              targetY,
              facing,
              action,
              speed,
              swayPhase,
              wanderTimer,
              speechBubble,
            };
          } else {
            // Arrived smoothly -> trigger next roam quickly so no one gets stuck
            const nextWait = Math.min(wanderTimer, Math.floor(Math.random() * 24) + 12);
            let finalAction = action;
            if (action === 'running') {
              finalAction = c.isAquatic ? 'swimming' : 'idle';
              speed = 0.28;
            } else if (action === 'walking') {
              finalAction = c.isAquatic ? 'swimming' : 'idle';
            }

            return {
              ...c,
              action: finalAction,
              speed,
              swayPhase,
              wanderTimer: nextWait,
              speechBubble,
            };
          }
        })
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  // Optional live camera follow ONLY when teacher explicitly toggles Follow Mode
  useEffect(() => {
    if (focusedCompanionId && isFollowingCamera) {
      const comp = companions.find((c) => c.id === focusedCompanionId);
      if (comp) {
        focusOnCoordinates(comp.x, comp.y);
      }
    }
  }, [focusedCompanionId, isFollowingCamera, companions, focusOnCoordinates]);

  // Interactive Petting ("💖 撫摸夥伴")
  const handlePetCompanion = (companionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPetSound();

    setCompanions((prev) =>
      prev.map((c) => {
        if (c.id === companionId) {
          const cuteQuotes = ['🥰 蹭蹭你！', '💖 主人好棒！', '✨ 元氣滿滿！', '🌾 最喜歡你了！', '⭐ 幸福度滿格！'];
          const randomQuote = cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)];
          return {
            ...c,
            speechBubble: randomQuote,
            lastPetTime: Date.now(),
            floatingText: {
              text: '💖',
              isPositive: true,
              key: Date.now(),
            },
          };
        }
        return c;
      })
    );
  };

  // Handle Awarding Points to Companion ("叮一聲，夥伴就往前長一點")
  const handleAwardPoints = (delta: number, reason: string) => {
    if (!scoringStudent) return;

    onApplyPoints(
      [scoringStudent],
      delta,
      reason,
      delta > 0 ? 'Paradise accomplishment' : 'Gentle reminder',
      delta > 0 ? '✨' : '🩹'
    );

    const nextScore = scoringStudent.points + delta;
    setParadiseFeedback({
      students: [scoringStudent],
      delta,
      reason,
      updatedScores: { [scoringStudent.id]: nextScore },
    });

    setCompanions((prev) =>
      prev.map((c) => {
        if (c.studentId === scoringStudent.id) {
          return {
            ...c,
            action: 'celebrating',
            growthBonus: c.growthBonus + (delta > 0 ? 0.08 : 0),
            floatingText: {
              text: delta > 0 ? `+${delta}` : `${delta}`,
              isPositive: delta > 0,
              key: Date.now(),
            },
          };
        }
        return c;
      })
    );

    setTimeout(() => {
      setCompanions((prev) =>
        prev.map((c) =>
          c.studentId === scoringStudent.id
            ? { ...c, action: c.isAquatic ? 'swimming' : 'walking' }
            : c
        )
      );
    }, 1800);

    setScoringStudent(null);
  };

  // Pointer Drag-to-Pan handlers on the expansive canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: panOffset.x,
      panY: panOffset.y,
      hasMoved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStartRef.current.hasMoved = true;
      setIsFollowingCamera(false);
    }
    if (dragStartRef.current.hasMoved) {
      setPanOffset(clampPan(dragStartRef.current.panX + dx, dragStartRef.current.panY + dy, zoomLevel));
    }
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
    setIsDragging(false);
  };

  // Mouse wheel smooth zoom around viewport center
  const handleWheelZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.14 : 0.14;
    const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number((zoomLevel + delta).toFixed(2))));
    if (nextZoom === zoomLevel) return;

    const ratio = nextZoom / zoomLevel;
    const cx = viewportSize.w / 2;
    const cy = viewportSize.h / 2;
    const nextPanX = cx - (cx - panOffset.x) * ratio;
    const nextPanY = cy - (cy - panOffset.y) * ratio;

    setZoomLevel(nextZoom);
    setPanOffset(clampPan(nextPanX, nextPanY, nextZoom));
  };

  // Toggle Fullscreen on smartboard
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Reset to full-map Overview
  const handleResetOverview = () => {
    setIsFollowingCamera(false);
    setFocusedCompanionId(null);
    setZoomLevel(MIN_ZOOM);
    setPanOffset({ x: 0, y: 0 });
  };

  // Jump camera directly to student companion ("孩子一眼找到自己那隻")
  const handleFindStudent = (studentId: string) => {
    setFocusedCompanionId(studentId);
    setIsFollowingCamera(true);
    const comp = companions.find((c) => c.studentId === studentId);
    if (comp) {
      focusOnCoordinates(comp.x, comp.y, 1.55);
    }
    const targetStudent = students.find((s) => s.id === studentId);
    if (targetStudent) {
      setScoringStudent(targetStudent);
    }
    setIsSearchOpen(false);
  };

  // Select appropriate 16-bit pixel art map image by season
  const currentSeasonBg = useMemo(() => {
    switch (season) {
      case 'spring':
        return springBg;
      case 'summer':
        return summerBg;
      case 'winter':
        return winterBg;
      case 'autumn':
      default:
        return autumnBg;
    }
  }, [season]);

  const seasonEmoji = useMemo(() => {
    switch (season) {
      case 'spring':
        return '🌸';
      case 'summer':
        return '☀️';
      case 'winter':
        return '❄️';
      case 'autumn':
      default:
        return '🍂';
    }
  }, [season]);

  const lightingFilter = useMemo(() => {
    switch (timeOfDay) {
      case 'dawn':
        return 'bg-gradient-to-tr from-amber-500/20 via-rose-400/15 to-transparent pointer-events-none mix-blend-overlay';
      case 'sunset':
        return 'bg-gradient-to-tr from-amber-800/35 via-rose-600/25 to-orange-500/20 pointer-events-none mix-blend-color-burn';
      case 'night':
        return 'bg-[#0a1128]/55 pointer-events-none mix-blend-multiply';
      case 'day':
      default:
        return 'pointer-events-none';
    }
  }, [timeOfDay]);

  const focusedCompanion = companions.find((c) => c.id === focusedCompanionId);
  const focusedStudent = students.find((s) => s.id === focusedCompanionId);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      String(s.rollNo).includes(studentSearch)
  );

  // Minimap viewport indicator box percentage
  const worldRenderedW = viewportSize.w * WORLD_SCALE * zoomLevel;
  const worldRenderedH = viewportSize.h * WORLD_SCALE * zoomLevel;
  const viewBoxLeftPct = Math.max(0, Math.min(100, (-panOffset.x / worldRenderedW) * 100));
  const viewBoxTopPct = Math.max(0, Math.min(100, (-panOffset.y / worldRenderedH) * 100));
  const viewBoxWidthPct = Math.min(100, (viewportSize.w / worldRenderedW) * 100);
  const viewBoxHeightPct = Math.min(100, (viewportSize.h / worldRenderedH) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100vh-112px)] min-h-[680px] bg-[#1a2d12] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#5A3818] select-none flex flex-col font-sans"
    >
      {/* 1. TOP PARADISE CONTROL BAR (Teacher Tools) */}
      <div className="z-30 bg-[#2b1807]/95 backdrop-blur-md px-4 py-2 border-b-2 border-[#160c04] flex flex-wrap items-center justify-between gap-2 text-[#FFEBB3] shadow-md shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-xl animate-bounce">😆</span>
          <div className="flex flex-col">
            <span className="font-pixel text-xs sm:text-sm text-[#FFEBB3] tracking-wide flex items-center gap-2">
              <span>夥伴像素樂園 · {className}</span>
              <span className="text-[10px] bg-[#533010] px-2 py-0.5 rounded text-amber-200 border border-[#7a481c]">
                {students.length} 位星露谷夥伴 · 廣闊探險大地圖
              </span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Quick Companion Finder Dropdown ("孩子一眼找到自己那隻") */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="px-2.5 py-1 text-xs font-bold rounded-xl border border-[#8B5A2B] bg-[#1b0f04] hover:bg-[#3d1f08] text-[#FFEBB3] flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="快速搜尋並放大定位學生夥伴"
            >
              <Search className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">尋找夥伴</span>
            </button>

            {isSearchOpen && (
              <div className="absolute top-full mt-2 left-0 w-64 max-h-72 bg-[#FFFDF9] text-stone-800 rounded-2xl shadow-2xl border-2 border-[#8B5A2B] z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 border-b border-stone-200 bg-amber-50">
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="輸入學生姓名或座號..."
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto flex-1 divide-y divide-stone-100 p-1">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((s) => {
                      const comp = companions.find((c) => c.studentId === s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleFindStudent(s.id)}
                          className="w-full px-2 py-1.5 text-left text-xs hover:bg-amber-100/80 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                              #{s.rollNo}
                            </span>
                            <span className="font-bold">{s.name}</span>
                          </div>
                          <span className="text-[10px] text-stone-500 font-medium">
                            {comp?.action === 'swimming' ? '🏊 水中' : '🐾 陸地'} · 🪙 {s.points}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-3 text-center text-xs text-stone-400">找不到學生</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Season Selector (春夏秋冬) */}
          <div className="flex items-center bg-[#1b0f04] p-1 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('spring');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                season === 'spring' ? 'bg-[#EC4899] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至春天 (🌸 櫻花繽紛 · 像素地圖)"
            >
              🌸 春
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('summer');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                season === 'summer' ? 'bg-[#16A34A] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至夏天 (☀️ 綠意陽光 · 像素地圖)"
            >
              ☀️ 夏
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('autumn');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                season === 'autumn' ? 'bg-[#D97706] text-white shadow-xs ring-1 ring-amber-300' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至秋天 (🍂 金黃楓林 · 像素地圖)"
            >
              🍂 秋
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('winter');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                season === 'winter' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至冬天 (❄️ 銀白雪景 · 像素地圖)"
            >
              ❄️ 冬
            </button>
          </div>

          {/* Time of Day Lighting Toggle */}
          <div className="hidden sm:flex items-center bg-[#1b0f04] p-1 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => setTimeOfDay('day')}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'day' ? 'bg-amber-500 text-stone-900 shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="暖陽白晝"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'sunset' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="夕陽暮色"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'night' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="螢火星夜"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Name Tags */}
          <button
            onClick={() => {
              soundManager.playClick();
              setShowNameTags(!showNameTags);
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              showNameTags
                ? 'bg-[#15803D] border-[#22C55E] text-white shadow-xs'
                : 'bg-[#5A3818] border-[#8B5A2B] text-stone-300'
            }`}
            title="打開/隱藏學生名字標籤"
          >
            {showNameTags ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">名字標籤</span>
          </button>

          {/* Zoom & Overview controls */}
          <div className="flex items-center bg-[#1b0f04] p-0.5 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => {
                soundManager.playClick();
                const nextZoom = Math.min(MAX_ZOOM, zoomLevel + 0.25);
                const ratio = nextZoom / zoomLevel;
                const cx = viewportSize.w / 2;
                const cy = viewportSize.h / 2;
                setZoomLevel(nextZoom);
                setPanOffset(clampPan(cx - (cx - panOffset.x) * ratio, cy - (cy - panOffset.y) * ratio, nextZoom));
              }}
              className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="放大畫面 (Zoom In)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                const nextZoom = Math.max(MIN_ZOOM, zoomLevel - 0.25);
                const ratio = nextZoom / zoomLevel;
                const cx = viewportSize.w / 2;
                const cy = viewportSize.h / 2;
                setZoomLevel(nextZoom);
                setPanOffset(clampPan(cx - (cx - panOffset.x) * ratio, cy - (cy - panOffset.y) * ratio, nextZoom));
              }}
              className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="縮小至更廣視野 (Zoom Out)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                handleResetOverview();
              }}
              className="px-2 py-1 text-[11px] font-bold text-amber-200 hover:text-white flex items-center gap-1 cursor-pointer"
              title="重設全圖全景概覽視角"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden xl:inline">全圖</span>
            </button>
          </div>

          {/* Audio Chime Mute */}
          <button
            onClick={() => {
              const muted = soundManager.toggleMute();
              pokemonSound.setMuted(muted);
              setIsAudioMuted(muted);
            }}
            className={`p-1.5 text-xs rounded-xl border cursor-pointer ${
              !isAudioMuted
                ? 'bg-[#2E5927] border-[#559945] text-[#BBF7D0]'
                : 'bg-[#5A3818] border-[#8B5A2B] text-stone-400'
            }`}
            title={!isAudioMuted ? '叮聲與音效已開啟' : '音效已靜音'}
          >
            {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen for Classroom Projector */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 bg-[#5A3818] hover:bg-[#7A4C22] border border-[#8B5A2B] rounded-xl text-stone-200 hover:text-white cursor-pointer"
            title="課堂大螢幕全螢幕投影"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Close Paradise View */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 bg-rose-900/80 hover:bg-rose-800 border border-rose-700 text-rose-200 hover:text-white rounded-xl cursor-pointer"
              title="返回星露谷一般介面"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. EXPANSIVE PANNABLE LIVING PIXEL PARADISE CANVAS (145% x 145% World Map) */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheelZoom}
        className={`relative flex-1 w-full h-full overflow-hidden bg-[#334e1c] touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onClick={() => {
          if (isSearchOpen) setIsSearchOpen(false);
        }}
      >
        {/* Interactive Corner Minimap (Bottom-Right inside Map) */}
        <div
          className="hidden sm:block absolute bottom-3 right-3 z-30 w-40 h-28 rounded-xl bg-[#2b1807]/88 border-2 border-[#a16207] shadow-2xl overflow-hidden cursor-pointer group"
          onPointerDown={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const xPct = ((e.clientX - rect.left) / rect.width) * 100;
            const yPct = ((e.clientY - rect.top) / rect.height) * 100;
            setIsFollowingCamera(false);
            focusOnCoordinates(xPct, yPct, Math.max(1.0, zoomLevel));
          }}
          title="點擊小地圖快速移動視角（可拖曳地圖自由探索）"
        >
          <img
            src={currentSeasonBg}
            alt="Minimap"
            className="w-full h-full object-cover opacity-80 pointer-events-none"
          />
          {/* Live Companion Dots on Minimap */}
          {companions.map((c) => (
            <div
              key={`dot-${c.id}`}
              className={`absolute w-1.5 h-1.5 rounded-full pointer-events-none ${
                c.id === focusedCompanionId
                  ? 'bg-amber-300 ring-2 ring-white z-20 scale-150'
                  : c.isAquatic
                  ? 'bg-cyan-300'
                  : 'bg-lime-300'
              }`}
              style={{ left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)' }}
            />
          ))}
          {/* Current Viewport Frame */}
          <div
            className="absolute border-2 border-white/90 bg-white/10 pointer-events-none shadow-inner"
            style={{
              left: `${viewBoxLeftPct}%`,
              top: `${viewBoxTopPct}%`,
              width: `${viewBoxWidthPct}%`,
              height: `${viewBoxHeightPct}%`,
            }}
          />
        </div>

        {/* Expanded Pan & Zoom World Layer (145% x 145% playable terrain) */}
        <div
          className={`absolute top-0 left-0 origin-top-left ${
            isDragging ? '' : 'transition-transform duration-300 ease-out'
          }`}
          style={{
            width: `${WORLD_SCALE * 100}%`,
            height: `${WORLD_SCALE * 100}%`,
            transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomLevel})`,
          }}
        >
          {/* A. 100% PURE 16-BIT RETRO PIXEL ART MAP BACKGROUND */}
          <img
            src={currentSeasonBg}
            alt="Pixel Paradise Map"
            className="w-full h-full object-cover select-none pointer-events-none absolute inset-0 image-rendering-pixelated"
            style={{
              imageRendering: 'pixelated',
            }}
          />

          {/* Subtle Pixel Grid Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* B. TIME OF DAY LIGHTING OVERLAY */}
          <div className={`absolute inset-0 ${lightingFilter}`} />

          {/* Night Time Fireflies inside expanded world */}
          {timeOfDay === 'night' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#FDE047] animate-pulse"
                  style={{
                    left: `${(i * 13.7 + 4) % 94}%`,
                    top: `${(i * 19.3 + 7) % 88}%`,
                    animationDuration: `${1.8 + (i % 4) * 0.7}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* D. FLOATING WEATHER PARTICLES */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {Array.from({ length: 22 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-base select-none"
                style={{
                  left: `${(i * 14 + 3) % 96}%`,
                  top: '-30px',
                  animation: `floating-weather 7.5s linear infinite`,
                  animationDelay: `${(i * 0.38) % 6}s`,
                  opacity: 0.88,
                }}
              >
                {seasonEmoji}
              </div>
            ))}
          </div>

          {/* E. STUDENT LIVING COMPANIONS (Silky-smooth unrestricted world roaming) */}
          {companions.map((comp) => {
            const isSelected = comp.id === focusedCompanionId;
            const currentStudent = students.find((s) => s.id === comp.studentId);
            const totalPoints = currentStudent?.points || 0;
            const isSwimming = comp.action === 'swimming';
            const scale = 1 + comp.growthBonus;

            return (
              <div
                key={comp.id}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => handleCompanionClick(comp, e)}
                className={`absolute cursor-pointer z-20 group ${
                  isSelected ? 'z-40 scale-125' : 'hover:scale-115'
                } transition-transform duration-150`}
                style={{
                  left: `${comp.x}%`,
                  top: `${comp.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* A. Name Tag Pill */}
                {showNameTags && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 transition-transform group-hover:scale-110">
                    <div
                      className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-black border tracking-tight shadow-md flex items-center gap-1 ${
                        isSelected
                          ? 'bg-amber-300 text-amber-950 border-amber-500 ring-2 ring-white shadow-lg'
                          : 'bg-white/95 text-[#1E293B] border-stone-800 shadow-stone-900/40'
                      }`}
                    >
                      <span className="opacity-75">{String(comp.rollNo).padStart(2, '0')}</span>
                      <span>{comp.name}</span>
                    </div>
                  </div>
                )}

                {/* B. Floating celebration +N or heart explosion */}
                {comp.floatingText && (
                  <div
                    key={comp.floatingText.key}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 font-black text-xl animate-bounce pointer-events-none z-50 px-2.5 py-0.5 rounded-full shadow-lg border bg-gradient-to-r from-emerald-500 to-green-600 text-white border-white flex items-center gap-1"
                  >
                    <span>{comp.floatingText.text}</span>
                  </div>
                )}

                {/* Cute speech thought */}
                {comp.speechBubble && !comp.floatingText && (
                  <div className="absolute -top-11 left-1/2 -translate-x-1/2 text-xs font-bold text-stone-800 bg-white/95 border border-stone-800 rounded-full px-2 py-0.5 shadow-md animate-pulse z-30 whitespace-nowrap">
                    {comp.speechBubble}
                  </div>
                )}

                {/* C. Pixel Water ripple under swimming companion */}
                {isSwimming && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-9 rounded-full border-2 border-cyan-200/80 bg-cyan-300/35 animate-ping -z-10 pointer-events-none" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-cyan-100/60 blur-[1px] -z-10 pointer-events-none" />
                  </>
                )}

                {/* D. Pure Stardew Valley Creature Sprite */}
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    comp.facing === 'left' ? 'scale-x-[-1]' : 'scale-x-[1]'
                  } ${
                    isSwimming
                      ? 'animate-swim-bob'
                      : comp.action === 'running'
                      ? 'animate-run-dash'
                      : comp.action === 'walking'
                      ? 'animate-walk-wobble'
                      : 'animate-pet-breathe'
                  }`}
                  style={{
                    width: `${48 * scale}px`,
                    height: `${48 * scale}px`,
                  }}
                  title={`點擊使 ${comp.name} 奔跑 · 拖曳地圖可自由探索全圖`}
                >
                  {/* Running dust puff particles 💨 behind feet */}
                  {comp.action === 'running' && (
                    <div className="absolute -bottom-2 -left-3 pointer-events-none z-30 flex items-center gap-0.5 animate-pulse">
                      <span className="text-base select-none">💨</span>
                      <span className="text-[10px] select-none text-stone-300">💨</span>
                    </div>
                  )}

                  <AvatarRenderer
                    avatar={comp.stardewAvatar}
                    name={comp.name}
                    size={48 * scale}
                    bare={true}
                  />

                  {/* Level / Growth star indicator */}
                  {totalPoints >= 10 && (
                    <div
                      className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs"
                      title={`夥伴已累積 ${totalPoints} 分！`}
                    >
                      ★
                    </div>
                  )}

                  {/* Interactive Heart Button on Hover (撫摸夥伴) */}
                  <button
                    onClick={(e) => handlePetCompanion(comp.id, e)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer z-40 text-[10px]"
                    title="💖 撫摸夥伴 (增加好感度)"
                  >
                    <Heart className="w-3 h-3 fill-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM COMPANION SPOTLIGHT & QUICK ACTION DOCK */}
      {focusedCompanion && focusedStudent && (
        <div className="z-30 bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-2.5 border-t-2 border-[#D7CCC8] flex flex-wrap items-center justify-between gap-3 shadow-xl shrink-0 animate-in slide-in-from-bottom-2 duration-200">
          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                if (onChangeAvatar && focusedStudent) {
                  soundManager.playClick();
                  onChangeAvatar(focusedStudent);
                }
              }}
              className="w-12 h-12 bg-[#faeed1] rounded-2xl border-2 border-[#8D6E63] hover:border-amber-500 hover:ring-2 hover:ring-amber-400 p-1 flex items-center justify-center shadow-xs cursor-pointer transition-all group"
              title="點擊更換此學生在星露谷名冊的頭像 🎨"
            >
              <AvatarRenderer
                avatar={focusedCompanion.stardewAvatar}
                name={focusedCompanion.name}
                size={40}
                bare={true}
              />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#E8F8F0] text-[#2E7D32] border border-[#81C784] font-black">
                  #{focusedStudent.rollNo}
                </span>
                <h4 className="text-base font-black text-[#5D4037]">{focusedStudent.name}</h4>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded-full font-bold">
                  🪙 {focusedStudent.points} 分
                </span>
                {/* Follow & Zoom Toggle */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    const nextFollow = !isFollowingCamera;
                    setIsFollowingCamera(nextFollow);
                    if (nextFollow) {
                      focusOnCoordinates(focusedCompanion.x, focusedCompanion.y, 1.6);
                    }
                  }}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer border transition-colors ${
                    isFollowingCamera
                      ? 'bg-sky-600 text-white border-sky-700'
                      : 'bg-sky-100 hover:bg-sky-200 text-sky-800 border-sky-300'
                  }`}
                  title="開啟或關閉鏡頭自動跟隨放大"
                >
                  <Crosshair className="w-3 h-3" />
                  <span>{isFollowingCamera ? '跟隨中' : '放大特寫'}</span>
                </button>
                {/* Pet Button */}
                <button
                  onClick={(e) => handlePetCompanion(focusedCompanion.id, e)}
                  className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="撫摸夥伴"
                >
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span>摸摸</span>
                </button>
                {/* Change Avatar Button */}
                {onChangeAvatar && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick();
                      onChangeAvatar(focusedStudent);
                    }}
                    className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    title="在星露谷頭像庫中為此學生挑選專屬夥伴"
                  >
                    <span>🎨 更換夥伴</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-stone-500 font-bold mt-0.5 flex items-center gap-1.5">
                <span>
                  {focusedCompanion.action === 'swimming'
                    ? '🏊 正在湖裡暢游'
                    : focusedCompanion.action === 'running'
                    ? '💨 正在草地歡樂飛奔！'
                    : focusedCompanion.action === 'resting'
                    ? '🏖️ 在水岸邊曬太陽'
                    : '🐾 正在樂園自由探險'}
                </span>
                <span>·</span>
                <span className="text-[#2E7D32]">體型成長 +{Math.round(focusedCompanion.growthBonus * 100)}%</span>
              </p>
            </div>
          </div>

          {/* Quick Point Award Buttons ("叮一聲，夥伴就往前長一點") */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-xs font-black text-[#8D6E63] mr-1 hidden sm:inline">⚡ 獎勵長大：</span>
            {[
              { delta: 1, label: '+1 小鼓勵', icon: '🌱' },
              { delta: 2, label: '+2 積極參與', icon: '🙋‍♂️' },
              { delta: 3, label: '+3 讚讚讚', icon: '👍' },
              { delta: 5, label: '+5 尊重老師', icon: '❤️' },
              { delta: 10, label: '+10 超棒', icon: '🏆' },
            ].map((btn) => (
              <button
                key={btn.delta}
                onClick={() => handleAwardPoints(btn.delta, btn.label)}
                className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}

            <button
              onClick={() => handleAwardPoints(-1, '溫馨提醒 (-1)')}
              className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 font-black text-xs rounded-xl transition-all cursor-pointer"
              title="扣 1 分提醒"
            >
              -1 提醒
            </button>

            <button
              onClick={() => {
                setIsFollowingCamera(false);
                setFocusedCompanionId(null);
              }}
              className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-black text-xs rounded-xl cursor-pointer"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* 1.3s Full-Screen Feedback Modal */}
      {paradiseFeedback && (
        <PointsFeedbackModal
          data={paradiseFeedback}
          onClose={() => setParadiseFeedback(null)}
        />
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes floating-weather {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.95; }
          90% { opacity: 0.95; }
          100% { transform: translate(160px, 920px) rotate(360deg); opacity: 0; }
        }
        @keyframes pet-breathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2.5px); }
        }
        @keyframes walk-wobble {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3.5px) rotate(-3.5deg); }
          75% { transform: translateY(-3.5px) rotate(3.5deg); }
        }
        @keyframes swim-bob {
          0%, 100% { transform: translateY(0) scaleY(0.94); }
          50% { transform: translateY(-4px) scaleY(1.06); }
        }
        @keyframes run-dash {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-4deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-6px) rotate(4deg); }
        }
        .animate-run-dash {
          animation: run-dash 0.18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
