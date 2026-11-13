import React, { useMemo, useState, useEffect } from 'react';

export type AmbientSeason = 'spring' | 'summer' | 'autumn' | 'winter';
export type AmbientWeather = 'leaves' | 'petals' | 'rain' | 'snow' | 'pollen';
export type AmbientTimeOfDay = 'dawn' | 'day' | 'sunset' | 'night';

interface AmbientEffectsProps {
  leafCount?: number;
  season?: AmbientSeason;
  themeId?: string;
  timeOfDay?: AmbientTimeOfDay;
}

function resolveCurrentSeason(season?: AmbientSeason, themeId?: string): AmbientSeason {
  if (season) return season;
  if (themeId === 'spring_farm') return 'spring';
  if (themeId === 'summer_sunflower') return 'summer';
  if (themeId === 'autumn_amber') return 'autumn';
  if (themeId === 'winter_frost') return 'winter';

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
  leafCount = 14,
  season,
  themeId,
  timeOfDay = 'day',
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
    const triggerSeasonalWeather = () => {
      const roll = Math.random();
      if (activeSeason === 'spring') {
        // Spring: occasional refreshing spring rain or drifting cherry/spring petals
        if (roll < 0.35) {
          setWeather('rain');
          setRainIntensity('light');
        } else {
          setWeather('petals');
        }
      } else if (activeSeason === 'summer') {
        // Summer: occasional summer shower or warm sunlit pollen breeze
        if (roll < 0.32) {
          setWeather('rain');
          setRainIntensity('steady');
        } else {
          setWeather('pollen');
        }
      } else if (activeSeason === 'autumn') {
        // Autumn: swirling fallen leaves or occasional crisp autumn drizzle
        if (roll < 0.28) {
          setWeather('rain');
          setRainIntensity('light');
        } else {
          setWeather('leaves');
        }
      } else {
        // Winter: snow flurries (always snowy ambiance, alternating density)
        setWeather('snow');
        setRainIntensity(roll < 0.4 ? 'steady' : 'light');
      }
    };

    const interval = setInterval(triggerSeasonalWeather, 42 * 1000);
    return () => clearInterval(interval);
  }, [activeSeason]);

  // Randomize night visual atmosphere flavor when entering night
  useEffect(() => {
    if (timeOfDay === 'night') {
      setNightModeFlavor(Math.random() < 0.5 ? 'fireflies_and_aurora' : 'aurora_rich');
    }
  }, [timeOfDay, activeSeason]);

  // Falling autumn leaves (also lightly present during autumn rain gusts)
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }).map((_, i) => ({
      id: i,
      left: `${(i * 9 + 4) % 96}%`,
      delay: `${(i * 1.7) % 10}s`,
      duration: `${11 + (i % 6) * 2}s`,
      size: 10 + (i % 3) * 4,
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

  // Spring petals
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.3 + 3) % 95}%`,
      delay: `${(i * 1.1) % 9}s`,
      duration: `${9 + (i % 5) * 2.1}s`,
      size: 8 + (i % 3) * 3,
      color: i % 3 === 0 ? '#fbcfe8' : i % 3 === 1 ? '#f9a8d4' : '#bbf7d0',
    }));
  }, []);

  // Summer warm sunlit pollen motes
  const pollenMotes = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.1 + 5) % 94}%`,
      top: `${15 + ((i * 13) % 72)}%`,
      delay: `${(i * 0.7) % 5}s`,
      duration: `${6 + (i % 4) * 1.8}s`,
      size: 4 + (i % 3) * 2,
    }));
  }, []);

  // Occasional seasonal raindrops & ground splashes
  const raindrops = useMemo(() => {
    const count = rainIntensity === 'steady' ? 42 : 26;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 2.4 + (i % 5) * 1.7) % 100}%`,
      delay: `${((i * 0.19) % 1.6).toFixed(2)}s`,
      duration: `${(rainIntensity === 'steady' ? 0.75 : 0.95) + (i % 4) * 0.12}s`,
      height: 14 + (i % 3) * 6,
      opacity: 0.35 + (i % 4) * 0.12,
    }));
  }, [rainIntensity]);

  const splashes = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${8 + ((i * 9.5) % 86)}%`,
      bottom: `${3 + (i % 4) * 3}%`,
      delay: `${(i * 0.35) % 1.8}s`,
    }));
  }, []);

  // Winter snow flurries
  const snowflakes = useMemo(() => {
    const count = rainIntensity === 'steady' ? 28 : 18;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 4.9 + 2) % 97}%`,
      delay: `${(i * 0.85) % 8}s`,
      duration: `${8 + (i % 5) * 2}s`,
      size: 4 + (i % 3) * 3,
    }));
  }, [rainIntensity]);

  // Randomly generated twinkling night fireflies (re-randomized each time night begins)
  const nightFireflies = useMemo(() => {
    if (timeOfDay !== 'night') return [];
    const count = 26;
    const glowColors = ['#fde047', '#bef264', '#fef08a', '#86efac', '#fcd34d'];
    return Array.from({ length: count }).map((_, i) => {
      const size = 4 + Math.floor(Math.random() * 4);
      const color = glowColors[Math.floor(Math.random() * glowColors.length)];
      return {
        id: i,
        left: `${4 + Math.random() * 92}%`,
        top: `${16 + Math.random() * 76}%`,
        size,
        color,
        floatDuration: `${(6 + Math.random() * 6).toFixed(1)}s`,
        floatDelay: `${(-Math.random() * 6).toFixed(1)}s`,
        blinkDuration: `${(2.2 + Math.random() * 2.8).toFixed(1)}s`,
        blinkDelay: `${(-Math.random() * 3).toFixed(1)}s`,
      };
    });
  }, [timeOfDay]);

  const isNight = timeOfDay === 'night';
  const showAurora = isNight;
  const showFireflies = isNight;

  return (
    <>
      {/* 1. NIGHT SKY AURORA & BACKDROP VISUAL ATMOSPHERE LAYER (Behind content cards) */}
      {isNight && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none overflow-hidden z-[2] select-none"
        >
          {/* Northern Lights / Aurora Borealis Shimmering Curtains */}
          {showAurora && (
            <div className="absolute top-0 inset-x-0 h-[55vh] pointer-events-none overflow-hidden">
              {/* Primary Emerald-Cyan Aurora Ribbon */}
              <div
                className="absolute -top-12 -left-1/4 w-[150%] h-72 rounded-full blur-3xl animate-aurora-wave"
                style={{
                  background:
                    nightModeFlavor === 'aurora_rich'
                      ? 'linear-gradient(105deg, transparent 10%, rgba(52, 211, 153, 0.28) 28%, rgba(34, 211, 238, 0.30) 48%, rgba(167, 139, 250, 0.26) 68%, transparent 90%)'
                      : 'linear-gradient(105deg, transparent 12%, rgba(52, 211, 153, 0.22) 32%, rgba(56, 189, 248, 0.22) 55%, rgba(192, 132, 252, 0.18) 74%, transparent 92%)',
                }}
              />
              {/* Secondary Violet-Teal Aurora Curtain */}
              <div
                className="absolute top-6 -right-1/4 w-[140%] h-56 rounded-full blur-3xl animate-aurora-wave-alt"
                style={{
                  background:
                    'linear-gradient(255deg, transparent 15%, rgba(168, 85, 247, 0.20) 35%, rgba(45, 212, 191, 0.24) 58%, rgba(163, 230, 53, 0.14) 76%, transparent 92%)',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* 2. FOREGROUND WEATHER & NIGHT FIREFLIES AMBIENT LAYER */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none"
      >
        {/* Subtle Rain Atmospheric Mist */}
        {weather === 'rain' && (
          <div className="absolute inset-0 bg-sky-950/15 transition-opacity duration-1000" />
        )}

        {/* Autumn Falling Leaves (Shown in autumn, or lightly mixed in autumn rain) */}
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
                className="opacity-80"
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
                className="opacity-85"
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
              className="fixed rounded-full bg-amber-200/75 shadow-[0_0_6px_rgba(253,230,138,0.85)] animate-firefly-float"
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
                className="fixed w-3 h-1 rounded-full border border-sky-200/60 animate-rain-splash"
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
              className="fixed rounded-sm bg-white/90 shadow-[0_0_6px_rgba(224,242,254,0.9)] animate-winter-snow"
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

