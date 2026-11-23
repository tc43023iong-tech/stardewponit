import React, { useMemo, useState, useEffect } from 'react';

export type AmbientSeason = 'spring' | 'summer' | 'autumn' | 'winter';
export type AmbientWeather = 'leaves' | 'petals' | 'rain' | 'snow' | 'pollen';
export type AmbientTimeOfDay = 'dawn' | 'day' | 'sunset' | 'night';

interface AmbientEffectsProps {
  leafCount?: number;
  season?: AmbientSeason;
  themeId?: string;
  timeOfDay?: AmbientTimeOfDay;
  enabled?: boolean;
}

function resolveCurrentSeason(season?: AmbientSeason, themeId?: string): AmbientSeason {
  if (season) return season;
  if (themeId === 'spring_farm' || themeId === 'candy_drink_paradise') return 'spring';
  if (
    themeId === 'summer_sunflower' ||
    themeId === 'underwater_ocean_world' ||
    themeId === 'junk_food_paradise' ||
    themeId === 'dino_jungle_world'
  ) {
    return 'summer';
  }
  if (themeId === 'autumn_amber' || themeId === 'volcano_lava_island') return 'autumn';
  if (
    themeId === 'winter_frost' ||
    themeId === 'polar_penguins_bears' ||
    themeId === 'blizzard_snow_mountain'
  ) {
    return 'winter';
  }

  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function getDefaultWeatherForSeason(s: AmbientSeason): AmbientWeather {
  switch (s) {
    case 'spring':
      return 'petals';
    case 'summer':
      return 'pollen';
    case 'winter':
      return 'snow';
    case 'autumn':
    default:
      return 'leaves';
  }
}

export const AmbientEffects: React.FC<AmbientEffectsProps> = ({
  leafCount = 5,
  season,
  themeId,
  timeOfDay = 'day',
  enabled = true,
}) => {
  const activeSeason = useMemo(() => resolveCurrentSeason(season, themeId), [season, themeId]);

  const [weather, setWeather] = useState<AmbientWeather>(() =>
    getDefaultWeatherForSeason(activeSeason)
  );
  const [rainIntensity, setRainIntensity] = useState<'light' | 'steady'>('light');
  const [nightModeFlavor, setNightModeFlavor] = useState<'fireflies_and_aurora' | 'aurora_rich'>(
    'fireflies_and_aurora'
  );

  // Sync default seasonal weather when season/theme changes
  useEffect(() => {
    setWeather(getDefaultWeatherForSeason(activeSeason));
  }, [activeSeason]);

  // Dynamic seasonal weather system: occasionally triggers rain, gusts, or seasonal shifts
  useEffect(() => {
    if (!enabled) return;
    const triggerSeasonalWeather = () => {
      const roll = Math.random();
      if (activeSeason === 'spring') {
        if (roll < 0.35) {
          setWeather('rain');
          setRainIntensity('light');
        } else {
          setWeather('petals');
        }
      } else if (activeSeason === 'summer') {
        if (roll < 0.32) {
          setWeather('rain');
          setRainIntensity('steady');
        } else {
          setWeather('pollen');
        }
      } else if (activeSeason === 'autumn') {
        if (roll < 0.28) {
          setWeather('rain');
          setRainIntensity('light');
        } else {
          setWeather('leaves');
        }
      } else {
        setWeather('snow');
        setRainIntensity(roll < 0.4 ? 'steady' : 'light');
      }
    };

    const interval = setInterval(triggerSeasonalWeather, 42 * 1000);
    return () => clearInterval(interval);
  }, [activeSeason, enabled]);

  // Randomize night visual atmosphere flavor when entering night
  useEffect(() => {
    if (timeOfDay === 'night') {
      setNightModeFlavor(Math.random() < 0.5 ? 'fireflies_and_aurora' : 'aurora_rich');
    }
  }, [timeOfDay, activeSeason]);

  // Sparse, gentle autumn leaves along screen edges so they never clutter content
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }).map((_, i) => ({
      id: i,
      left: i % 2 === 0 ? `${2 + (i * 3) % 10}%` : `${86 + (i * 3) % 10}%`,
      delay: `${(i * 2.4) % 10}s`,
      duration: `${15 + (i % 4) * 3}s`,
      size: 10 + (i % 2) * 2,
      color:
        i % 4 === 0
          ? '#ea580c'
          : i % 4 === 1
          ? '#eab308'
          : i % 4 === 2
          ? '#dc2626'
          : '#ca8a04',
    }));
  }, [leafCount]);

  // Subtle spring petals
  const petals = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: i % 2 === 0 ? `${3 + (i * 4) % 12}%` : `${84 + (i * 4) % 12}%`,
      delay: `${(i * 1.9) % 9}s`,
      duration: `${13 + (i % 4) * 2.5}s`,
      size: 8 + (i % 2) * 2,
      color: i % 3 === 0 ? '#fbcfe8' : i % 3 === 1 ? '#f9a8d4' : '#bbf7d0',
    }));
  }, []);

  // Subtle summer sunlit pollen motes
  const pollenMotes = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${(i * 15 + 6) % 92}%`,
      top: `${16 + ((i * 17) % 68)}%`,
      delay: `${(i * 0.9) % 5}s`,
      duration: `${8 + (i % 3) * 2}s`,
      size: 4 + (i % 2) * 2,
    }));
  }, []);

  // Gentle seasonal raindrops & ground splashes
  const raindrops = useMemo(() => {
    const count = rainIntensity === 'steady' ? 16 : 10;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 6.2 + (i % 3) * 2.5) % 98}%`,
      delay: `${((i * 0.27) % 1.6).toFixed(2)}s`,
      duration: `${(rainIntensity === 'steady' ? 0.9 : 1.15) + (i % 4) * 0.14}s`,
      height: 12 + (i % 3) * 4,
      opacity: 0.2 + (i % 3) * 0.08,
    }));
  }, [rainIntensity]);

  const splashes = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      left: `${12 + ((i * 22) % 78)}%`,
      bottom: `${4 + (i % 3) * 3}%`,
      delay: `${(i * 0.45) % 1.8}s`,
    }));
  }, []);

  // Gentle winter snow flurries
  const snowflakes = useMemo(() => {
    const count = rainIntensity === 'steady' ? 10 : 7;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 11 + 4) % 95}%`,
      delay: `${(i * 1.3) % 8}s`,
      duration: `${12 + (i % 4) * 2.5}s`,
      size: 4 + (i % 2) * 2,
    }));
  }, [rainIntensity]);

  // Subtle twinkling night fireflies
  const nightFireflies = useMemo(() => {
    if (timeOfDay !== 'night') return [];
    const count = 10;
    const glowColors = ['#fde047', '#bef264', '#fef08a', '#86efac', '#fcd34d'];
    return Array.from({ length: count }).map((_, i) => {
      const size = 4 + Math.floor(Math.random() * 3);
      const color = glowColors[Math.floor(Math.random() * glowColors.length)];
      return {
        id: i,
        left: `${6 + Math.random() * 88}%`,
        top: `${16 + Math.random() * 72}%`,
        size,
        color,
        floatDuration: `${(7 + Math.random() * 6).toFixed(1)}s`,
        floatDelay: `${(-Math.random() * 6).toFixed(1)}s`,
        blinkDuration: `${(2.6 + Math.random() * 2.8).toFixed(1)}s`,
        blinkDelay: `${(-Math.random() * 3).toFixed(1)}s`,
      };
    });
  }, [timeOfDay]);

  if (!enabled) return null;

  const isNight = timeOfDay === 'night';
  const showAurora = isNight;
  const showFireflies = isNight;

  return (
    <>
      {/* 1. NIGHT SKY AURORA & BACKDROP VISUAL ATMOSPHERE LAYER (Behind content cards) */}
      {isNight && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none"
        >
          {showAurora && (
            <div className="absolute top-0 inset-x-0 h-[55vh] pointer-events-none overflow-hidden">
              <div
                className="absolute -top-12 -left-1/4 w-[150%] h-72 rounded-full blur-3xl animate-aurora-wave"
                style={{
                  background:
                    nightModeFlavor === 'aurora_rich'
                      ? 'linear-gradient(105deg, transparent 10%, rgba(52, 211, 153, 0.24) 28%, rgba(34, 211, 238, 0.26) 48%, rgba(167, 139, 250, 0.22) 68%, transparent 90%)'
                      : 'linear-gradient(105deg, transparent 12%, rgba(52, 211, 153, 0.18) 32%, rgba(56, 189, 248, 0.18) 55%, rgba(192, 132, 252, 0.15) 74%, transparent 92%)',
                }}
              />
              <div
                className="absolute top-6 -right-1/4 w-[140%] h-56 rounded-full blur-3xl animate-aurora-wave-alt"
                style={{
                  background:
                    'linear-gradient(255deg, transparent 15%, rgba(168, 85, 247, 0.16) 35%, rgba(45, 212, 191, 0.20) 58%, rgba(163, 230, 53, 0.12) 76%, transparent 92%)',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* 2. BACKGROUND WEATHER & NIGHT FIREFLIES LAYER (Strictly behind main UI cards z-10) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none overflow-hidden z-[2] select-none"
      >
        {/* Subtle Rain Atmospheric Mist */}
        {weather === 'rain' && (
          <div className="absolute inset-0 bg-sky-950/10 transition-opacity duration-1000" />
        )}

        {/* Autumn Falling Leaves (Sparse & gentle along edges) */}
        {(weather === 'leaves' || (activeSeason === 'autumn' && weather === 'rain')) &&
          leaves.slice(0, weather === 'rain' ? Math.ceil(leaves.length / 2) : leaves.length).map((leaf) => (
            <div
              key={`leaf-${leaf.id}`}
              className="falling-leaf"
              style={{
                left: leaf.left,
                top: '-20px',
                animationDelay: leaf.delay,
                animationDuration: leaf.duration,
              }}
            >
              <svg
                width={leaf.size}
                height={leaf.size}
                viewBox="0 0 16 16"
                className="opacity-45"
                shapeRendering="crispEdges"
              >
                <rect x="7" y="1" width="2" height="3" fill="#78350f" />
                <rect x="5" y="4" width="6" height="4" fill={leaf.color} />
                <rect x="3" y="6" width="10" height="4" fill={leaf.color} />
                <rect x="6" y="10" width="4" height="3" fill={leaf.color} />
                <rect x="7" y="13" width="2" height="2" fill={leaf.color} />
              </svg>
            </div>
          ))}

        {/* Spring Blossoms & Petals */}
        {weather === 'petals' &&
          petals.map((petal) => (
            <div
              key={`petal-${petal.id}`}
              className="fixed pointer-events-none animate-petal-sway"
              style={{
                left: petal.left,
                top: '-18px',
                animationDelay: petal.delay,
                animationDuration: petal.duration,
              }}
            >
              <svg
                width={petal.size}
                height={petal.size}
                viewBox="0 0 12 12"
                className="opacity-45"
                shapeRendering="crispEdges"
              >
                <rect x="4" y="2" width="4" height="3" fill={petal.color} />
                <rect x="2" y="4" width="8" height="4" fill={petal.color} />
                <rect x="4" y="8" width="4" height="2" fill={petal.color} />
              </svg>
            </div>
          ))}

        {/* Summer Warm Golden Pollen Motes */}
        {weather === 'pollen' &&
          !isNight &&
          pollenMotes.map((mote) => (
            <div
              key={`pollen-${mote.id}`}
              className="fixed rounded-full bg-amber-200/45 shadow-[0_0_5px_rgba(253,230,138,0.6)] animate-firefly-float"
              style={{
                left: mote.left,
                top: mote.top,
                width: `${mote.size}px`,
                height: `${mote.size}px`,
                animationDelay: mote.delay,
                animationDuration: mote.duration,
              }}
            />
          ))}

        {/* Seasonal Rain Streaks & Puddle Ripples */}
        {weather === 'rain' && (
          <>
            {raindrops.map((drop) => (
              <div
                key={`rain-${drop.id}`}
                className="fixed w-[2px] rounded-full bg-gradient-to-b from-transparent via-sky-200 to-cyan-100 animate-pixel-rain"
                style={{
                  left: drop.left,
                  top: '-24px',
                  height: `${drop.height}px`,
                  opacity: drop.opacity,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                }}
              />
            ))}
            {splashes.map((sp) => (
              <div
                key={`splash-${sp.id}`}
                className="fixed w-3 h-1 rounded-full border border-sky-200/45 animate-rain-splash"
                style={{
                  left: sp.left,
                  bottom: sp.bottom,
                  animationDelay: sp.delay,
                }}
              />
            ))}
          </>
        )}

        {/* Winter Pixel Snow Flurries */}
        {weather === 'snow' &&
          snowflakes.map((flake) => (
            <div
              key={`snow-${flake.id}`}
              className="fixed rounded-sm bg-white/55 shadow-[0_0_4px_rgba(224,242,254,0.6)] animate-winter-snow"
              style={{
                left: flake.left,
                top: '-14px',
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                animationDelay: flake.delay,
                animationDuration: flake.duration,
              }}
            />
          ))}

        {/* Night Twinkling Fireflies (隨機生成閃爍螢火蟲) */}
        {showFireflies &&
          nightFireflies.map((fly) => (
            <div
              key={`firefly-${fly.id}`}
              className="fixed pointer-events-none animate-firefly-float"
              style={{
                left: fly.left,
                top: fly.top,
                animationDuration: fly.floatDuration,
                animationDelay: fly.floatDelay,
              }}
            >
              <div
                className="rounded-sm animate-firefly-blink"
                style={{
                  width: `${fly.size}px`,
                  height: `${fly.size}px`,
                  backgroundColor: fly.color,
                  boxShadow: `0 0 ${fly.size * 2.5}px ${fly.size * 0.9}px ${fly.color}`,
                  animationDuration: fly.blinkDuration,
                  animationDelay: fly.blinkDelay,
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

