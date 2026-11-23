import React from 'react';
import type { ParadiseSeason, ParadiseTimeOfDay } from './PixelParadiseView';

interface ParadiseAnimatedBackdropProps {
  season: ParadiseSeason;
  timeOfDay: ParadiseTimeOfDay;
  enabled?: boolean;
}

const PixelCloud: React.FC<{ width?: number; opacity?: number }> = ({
  width = 120,
  opacity = 0.72,
}) => (
  <svg
    width={width}
    height={Math.round(width * 0.42)}
    viewBox="0 0 32 14"
    shapeRendering="crispEdges"
    style={{ opacity }}
    className="drop-shadow-[0_4px_0_rgba(255,255,255,0.2)]"
  >
    <rect x="8" y="2" width="12" height="3" fill="#ffffff" />
    <rect x="4" y="5" width="22" height="4" fill="#ffffff" />
    <rect x="1" y="8" width="30" height="4" fill="#f8fafc" />
    <rect x="2" y="11" width="28" height="2" fill="#e2e8f0" />
  </svg>
);

const PixelButterfly: React.FC<{ colorA: string; colorB: string; size?: number }> = ({
  colorA,
  colorB,
  size = 18,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    shapeRendering="crispEdges"
    className="animate-paradise-wing"
  >
    <rect x="1" y="2" width="4" height="4" fill={colorA} />
    <rect x="7" y="2" width="4" height="4" fill={colorA} />
    <rect x="2" y="6" width="3" height="3" fill={colorB} />
    <rect x="7" y="6" width="3" height="3" fill={colorB} />
    <rect x="5" y="2" width="2" height="7" fill="#3f2e26" />
  </svg>
);

const PixelFish: React.FC<{ bodyColor: string; finColor: string; size?: number }> = ({
  bodyColor,
  finColor,
  size = 24,
}) => (
  <svg
    width={size}
    height={Math.round(size * 0.65)}
    viewBox="0 0 16 10"
    shapeRendering="crispEdges"
  >
    <rect x="0" y="2" width="3" height="6" fill={finColor} />
    <rect x="3" y="3" width="2" height="4" fill={finColor} />
    <rect x="5" y="2" width="7" height="6" fill={bodyColor} />
    <rect x="7" y="0" width="3" height="2" fill={finColor} />
    <rect x="12" y="3" width="3" height="4" fill={bodyColor} />
    <rect x="12" y="4" width="1" height="1" fill="#0f172a" />
  </svg>
);

const PixelBirdSilhouette: React.FC<{ color?: string; size?: number }> = ({
  color = '#1e293b',
  size = 24,
}) => (
  <svg
    width={size}
    height={Math.round(size * 0.5)}
    viewBox="0 0 16 8"
    shapeRendering="crispEdges"
    className="animate-paradise-wing"
  >
    <rect x="0" y="2" width="4" height="2" fill={color} />
    <rect x="4" y="4" width="3" height="2" fill={color} />
    <rect x="7" y="5" width="2" height="2" fill={color} />
    <rect x="9" y="4" width="3" height="2" fill={color} />
    <rect x="12" y="2" width="4" height="2" fill={color} />
  </svg>
);

const PixelPterodactyl: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg
    width={size}
    height={Math.round(size * 0.55)}
    viewBox="0 0 20 11"
    shapeRendering="crispEdges"
    className="animate-paradise-wing"
  >
    <rect x="0" y="1" width="6" height="2" fill="#3f6212" />
    <rect x="4" y="3" width="4" height="2" fill="#4d7c0f" />
    <rect x="8" y="4" width="5" height="3" fill="#65a30d" />
    <rect x="13" y="3" width="4" height="2" fill="#4d7c0f" />
    <rect x="16" y="1" width="4" height="2" fill="#3f6212" />
    <rect x="10" y="7" width="2" height="3" fill="#365314" />
    <rect x="12" y="5" width="5" height="2" fill="#84cc16" />
  </svg>
);

const PixelLeafSvg: React.FC<{ color: string; size?: number }> = ({ color, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
    <rect x="7" y="1" width="2" height="3" fill="#78350f" />
    <rect x="5" y="4" width="6" height="4" fill={color} />
    <rect x="3" y="6" width="10" height="4" fill={color} />
    <rect x="6" y="10" width="4" height="3" fill={color} />
    <rect x="7" y="13" width="2" height="2" fill={color} />
  </svg>
);

const PixelPetalSvg: React.FC<{ color: string; size?: number }> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges">
    <rect x="4" y="1" width="4" height="3" fill={color} />
    <rect x="2" y="3" width="8" height="4" fill={color} />
    <rect x="4" y="7" width="4" height="3" fill={color} />
  </svg>
);

const CLASSIC_LAKE_THEMES = new Set<ParadiseSeason>(['spring', 'summer', 'autumn', 'winter']);
const CLOUD_THEMES = new Set<ParadiseSeason>([
  'spring',
  'summer',
  'autumn',
  'winter',
  'sakura',
  'tropical',
  'skycastle',
  'englishbook',
  'pinyin',
  'polar',
  'candy',
  'junkfood',
  'dino',
]);

export const ParadiseAnimatedBackdrop: React.FC<ParadiseAnimatedBackdropProps> = ({
  season,
  timeOfDay,
  enabled = true,
}) => {
  if (!enabled) return null;

  const isNight = timeOfDay === 'night';
  const isDawn = timeOfDay === 'dawn';
  const isSunset = timeOfDay === 'sunset';
  const isClassicLake = CLASSIC_LAKE_THEMES.has(season);
  const hasClouds = CLOUD_THEMES.has(season) && !isNight;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[8]"
    >
      {/* 1. DRIFTING 16-BIT PIXEL CLOUDS (Multi-layer horizontal sky movement) */}
      {hasClouds && (
        <div className="absolute top-0 inset-x-0 h-[28%] overflow-hidden opacity-60">
          <div
            className="absolute top-[6%] left-[-15%] animate-cloud-slow"
            style={{ animationDuration: '52s' }}
          >
            <PixelCloud width={144} opacity={0.78} />
          </div>
          <div
            className="absolute top-[14%] left-[-20%] animate-cloud-med"
            style={{ animationDuration: '38s', animationDelay: '-18s' }}
          >
            <PixelCloud width={110} opacity={0.62} />
          </div>
          <div
            className="absolute top-[4%] left-[-10%] animate-cloud-slow"
            style={{ animationDuration: '64s', animationDelay: '-34s' }}
          >
            <PixelCloud width={168} opacity={0.55} />
          </div>
        </div>
      )}

      {/* 2. ATMOSPHERIC SUNBEAMS FOR DAY / DAWN / SUNSET */}
      {!isNight && season !== 'blizzard' && season !== 'volcano' && season !== 'starlight' && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-12 left-[14%] w-44 h-[78%] blur-xl animate-sunbeam-sway ${
              isSunset
                ? 'bg-gradient-to-b from-amber-300/25 via-orange-400/12 to-transparent'
                : isDawn
                ? 'bg-gradient-to-b from-rose-200/25 via-amber-200/12 to-transparent'
                : 'bg-gradient-to-b from-yellow-100/20 via-amber-100/8 to-transparent'
            }`}
          />
          <div
            className={`absolute -top-10 right-[22%] w-56 h-[72%] blur-2xl animate-sunbeam-sway ${
              isSunset
                ? 'bg-gradient-to-b from-orange-300/22 via-rose-400/10 to-transparent'
                : 'bg-gradient-to-b from-amber-100/18 via-white/8 to-transparent'
            }`}
            style={{ animationDelay: '-3.4s' }}
          />
        </div>
      )}

      {/* 3. LAKE & SHORELINE SHIMMER RIPPLES (Classic farm pond + water themes) */}
      {isClassicLake && (
        <div className="absolute right-[6%] bottom-[8%] w-[28%] h-[22%] pointer-events-none">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={`lake-gleam-${idx}`}
              className="absolute h-[3px] bg-sky-100/80 rounded-full animate-water-gleam"
              style={{
                left: `${12 + idx * 17}%`,
                top: `${22 + ((idx * 19) % 58)}%`,
                width: `${18 + (idx % 3) * 10}px`,
                animationDelay: `${idx * 0.55}s`,
              }}
            />
          ))}
          <div className="absolute left-[38%] top-[48%] w-12 h-6 rounded-full border border-cyan-100/55 animate-water-ripple" />
          <div
            className="absolute left-[64%] top-[62%] w-10 h-5 rounded-full border border-sky-100/50 animate-water-ripple"
            style={{ animationDelay: '-0.6s' }}
          />
        </div>
      )}

      {/* 4. THEME-SPECIFIC LIVING ANIMATION LAYERS */}

      {/* SPRING: Sakura petals + Fluttering Pixel Butterflies */}
      {season === 'spring' && (
        <>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={`spring-petal-${i}`}
              className="absolute animate-petal-sway"
              style={{
                left: `${(i * 5.7 + 2) % 96}%`,
                top: '-24px',
                animationDuration: `${9 + (i % 4) * 2.2}s`,
                animationDelay: `${(i * 0.65) % 8}s`,
              }}
            >
              <PixelPetalSvg
                color={i % 3 === 0 ? '#f9a8d4' : i % 3 === 1 ? '#fbcfe8' : '#bbf7d0'}
                size={10 + (i % 2) * 3}
              />
            </div>
          ))}
          {[
            { left: '16%', top: '34%', c1: '#fb7185', c2: '#fda4af', delay: '0s' },
            { left: '46%', top: '52%', c1: '#facc15', c2: '#fef08a', delay: '-4s' },
            { left: '72%', top: '28%', c1: '#38bdf8', c2: '#bae6fd', delay: '-7s' },
          ].map((b, i) => (
            <div
              key={`spring-bf-${i}`}
              className="absolute animate-paradise-butterfly"
              style={{ left: b.left, top: b.top, animationDelay: b.delay }}
            >
              <PixelButterfly colorA={b.c1} colorB={b.c2} size={18} />
            </div>
          ))}
        </>
      )}

      {/* SUMMER: Golden sunlit pollen + Butterflies + High soaring birds */}
      {season === 'summer' && (
        <>
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={`summer-pollen-${i}`}
              className="absolute rounded-full bg-amber-200/80 shadow-[0_0_8px_#fde047] animate-firefly-float"
              style={{
                left: `${(i * 4.5 + 3) % 94}%`,
                top: `${14 + ((i * 11) % 74)}%`,
                width: `${4 + (i % 3) * 2}px`,
                height: `${4 + (i % 3) * 2}px`,
                animationDuration: `${6 + (i % 4) * 1.8}s`,
                animationDelay: `${(i * 0.5) % 5}s`,
              }}
            />
          ))}
          {[
            { left: '22%', top: '42%', c1: '#f97316', c2: '#fdba74', delay: '-1s' },
            { left: '62%', top: '36%', c1: '#38bdf8', c2: '#7dd3fc', delay: '-5.5s' },
          ].map((b, i) => (
            <div
              key={`summer-bf-${i}`}
              className="absolute animate-paradise-butterfly"
              style={{ left: b.left, top: b.top, animationDelay: b.delay }}
            >
              <PixelButterfly colorA={b.c1} colorB={b.c2} size={18} />
            </div>
          ))}
          <div
            className="absolute top-[11%] left-0 w-full animate-paradise-soar"
            style={{ animationDuration: '26s' }}
          >
            <PixelBirdSilhouette color="#334155" size={20} />
          </div>
        </>
      )}

      {/* AUTUMN: Swirling pixel maple & golden leaves + drifting harvest mist */}
      {season === 'autumn' && (
        <>
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={`autumn-leaf-${i}`}
              className="absolute animate-petal-sway"
              style={{
                left: `${(i * 4.3 + 2) % 96}%`,
                top: '-24px',
                animationDuration: `${8.5 + (i % 5) * 1.8}s`,
                animationDelay: `${(i * 0.55) % 7}s`,
              }}
            >
              <PixelLeafSvg
                color={
                  i % 4 === 0
                    ? '#ea580c'
                    : i % 4 === 1
                    ? '#eab308'
                    : i % 4 === 2
                    ? '#dc2626'
                    : '#d97706'
                }
                size={12 + (i % 3) * 2}
              />
            </div>
          ))}
          <div
            className="absolute bottom-[14%] inset-x-0 h-28 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent blur-2xl animate-paradise-mist"
            style={{ animationDuration: '16s' }}
          />
        </>
      )}

      {/* WINTER: Crisp 2-depth pixel snow flurries & frost glints */}
      {season === 'winter' && (
        <>
          {Array.from({ length: 34 }).map((_, i) => (
            <div
              key={`winter-snow-${i}`}
              className="absolute bg-white/90 shadow-[0_0_6px_rgba(224,242,254,0.85)] animate-winter-snow"
              style={{
                left: `${(i * 3.1 + 1) % 97}%`,
                top: '-18px',
                width: `${i % 3 === 0 ? 6 : 4}px`,
                height: `${i % 3 === 0 ? 6 : 4}px`,
                animationDuration: `${7.5 + (i % 5) * 1.6}s`,
                animationDelay: `${(i * 0.35) % 6.5}s`,
              }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`winter-glint-${i}`}
              className="absolute text-cyan-100 text-xs animate-twinkle"
              style={{
                left: `${(i * 8.5 + 6) % 92}%`,
                top: `${32 + ((i * 13) % 58)}%`,
                animationDelay: `${(i * 0.45) % 3}s`,
              }}
            >
              ✦
            </div>
          ))}
        </>
      )}

      {/* SAKURA SHRINE: Rich 櫻吹雪 Sakura Storm + Pond Ripples + Glowing Petals */}
      {season === 'sakura' && (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`sakura-storm-${i}`}
              className="absolute animate-petal-sway"
              style={{
                left: `${(i * 3.5 + 1) % 98}%`,
                top: '-20px',
                animationDuration: `${7 + (i % 5) * 1.4}s`,
                animationDelay: `${(i * 0.32) % 6}s`,
              }}
            >
              <PixelPetalSvg
                color={i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#fbcfe8' : '#fda4af'}
                size={10 + (i % 3) * 3}
              />
            </div>
          ))}
          <div
            className="absolute left-[28%] top-[36%] animate-paradise-butterfly"
            style={{ animationDelay: '-2s' }}
          >
            <PixelButterfly colorA="#f472b6" colorB="#fbcfe8" size={18} />
          </div>
          <div className="absolute left-[50%] bottom-[22%] w-14 h-7 rounded-full border border-pink-200/65 animate-water-ripple" />
        </>
      )}

      {/* STARLIGHT VALLEY: Billowing Aurora, Twinkling Starfield & Shooting Stars */}
      {season === 'starlight' && (
        <>
          <div
            className="absolute -top-10 -left-1/4 w-[150%] h-52 rounded-full blur-3xl animate-aurora-wave"
            style={{
              background:
                'linear-gradient(105deg, transparent 10%, rgba(52, 211, 153, 0.28) 30%, rgba(56, 189, 248, 0.28) 52%, rgba(192, 132, 252, 0.26) 74%, transparent 92%)',
            }}
          />
          <div
            className="absolute top-6 -right-1/4 w-[140%] h-40 rounded-full blur-3xl animate-aurora-wave-alt"
            style={{
              background:
                'linear-gradient(250deg, transparent 14%, rgba(168, 85, 247, 0.24) 38%, rgba(45, 212, 191, 0.24) 64%, transparent 90%)',
            }}
          />
          {/* Shooting stars */}
          <div
            className="absolute top-[10%] right-[16%] w-28 h-[3px] rounded-full bg-gradient-to-r from-white via-cyan-200 to-transparent shadow-[0_0_10px_#67e8f9] animate-paradise-shooting-star"
            style={{ animationDelay: '1.2s' }}
          />
          <div
            className="absolute top-[18%] right-[44%] w-24 h-[2px] rounded-full bg-gradient-to-r from-white via-fuchsia-200 to-transparent shadow-[0_0_10px_#f0abfc] animate-paradise-shooting-star"
            style={{ animationDelay: '4.8s' }}
          />
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={`starlight-star-${i}`}
              className="absolute text-cyan-200 animate-twinkle"
              style={{
                left: `${(i * 4.4 + 2) % 95}%`,
                top: `${4 + ((i * 9.3) % 72)}%`,
                fontSize: `${10 + (i % 3) * 3}px`,
                animationDelay: `${(i * 0.35) % 3}s`,
              }}
            >
              {i % 3 === 0 ? '✦' : i % 3 === 1 ? '✧' : '★'}
            </div>
          ))}
        </>
      )}

      {/* TROPICAL ISLAND: Ocean Wave Shimmer, Palm Sunbeams, Gliding Seagulls */}
      {season === 'tropical' && (
        <>
          <div className="absolute bottom-[6%] inset-x-0 h-28 opacity-35 animate-ocean-wave">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path d="M 0 55 Q 250 25 500 55 T 1000 55 L 1000 100 L 0 100 Z" fill="#67e8f9" />
            </svg>
          </div>
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={`trop-gleam-${i}`}
              className="absolute h-[3px] bg-cyan-100/80 rounded-full animate-water-gleam"
              style={{
                left: `${(i * 7.2 + 5) % 90}%`,
                bottom: `${8 + (i % 5) * 4}%`,
                width: `${18 + (i % 3) * 12}px`,
                animationDelay: `${i * 0.45}s`,
              }}
            />
          ))}
          <div
            className="absolute top-[10%] left-0 w-full animate-paradise-soar"
            style={{ animationDuration: '24s' }}
          >
            <PixelBirdSilhouette color="#f8fafc" size={24} />
          </div>
          <div
            className="absolute top-[16%] left-0 w-full animate-paradise-soar"
            style={{ animationDuration: '29s', animationDelay: '-11s' }}
          >
            <PixelBirdSilhouette color="#e2e8f0" size={18} />
          </div>
        </>
      )}

      {/* SKY CASTLE: Layered Parallax Clouds, Sky Birds & Golden Sparkles */}
      {season === 'skycastle' && (
        <>
          <div
            className="absolute bottom-[10%] left-[-15%] animate-cloud-med opacity-45"
            style={{ animationDuration: '34s' }}
          >
            <PixelCloud width={190} opacity={0.85} />
          </div>
          <div
            className="absolute top-[14%] left-0 w-full animate-paradise-soar"
            style={{ animationDuration: '22s' }}
          >
            <PixelBirdSilhouette color="#ffffff" size={22} />
          </div>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={`sky-sparkle-${i}`}
              className="absolute text-amber-200 animate-twinkle"
              style={{
                left: `${(i * 5.8 + 4) % 94}%`,
                top: `${12 + ((i * 11) % 72)}%`,
                fontSize: `${11 + (i % 3) * 3}px`,
                animationDelay: `${(i * 0.4) % 3.2}s`,
              }}
            >
              ✦
            </div>
          ))}
        </>
      )}

      {/* ENGLISH STORYBOOK: Rising Glowing ABC Letters & Magic Book Sparkles */}
      {season === 'englishbook' && (
        <>
          {['A', 'B', 'C', '★', 'E', 'F', '✨', 'G', 'H', 'S', 'T', 'Z'].map((ch, i) => (
            <div
              key={`eng-letter-${i}`}
              className="absolute font-pixel font-black text-amber-200 drop-shadow-[0_2px_6px_rgba(180,83,9,0.75)] animate-paradise-spark-rise"
              style={{
                left: `${(i * 7.8 + 5) % 92}%`,
                top: `${28 + ((i * 13) % 58)}%`,
                fontSize: `${12 + (i % 3) * 3}px`,
                animationDuration: `${6.5 + (i % 4) * 1.4}s`,
                animationDelay: `${(i * 0.6) % 5.5}s`,
              }}
            >
              {ch}
            </div>
          ))}
          <div
            className="absolute left-[34%] top-[36%] animate-paradise-butterfly"
            style={{ animationDelay: '-1.5s' }}
          >
            <PixelButterfly colorA="#fbbf24" colorB="#fde68a" size={18} />
          </div>
          <div
            className="absolute left-[68%] top-[44%] animate-paradise-butterfly"
            style={{ animationDelay: '-6s' }}
          >
            <PixelButterfly colorA="#60a5fa" colorB="#bfdbfe" size={16} />
          </div>
        </>
      )}

      {/* MANDARIN PINYIN WORLD: Rising Pinyin Tones, Lantern Glow Halos & Lotus Ripples */}
      {season === 'pinyin' && (
        <>
          {['ā', 'á', 'ǎ', 'à', 'b', 'p', 'm', 'f', 'ō', 'é', 'ī', 'ū'].map((tone, i) => (
            <div
              key={`pinyin-tone-${i}`}
              className="absolute font-black text-amber-100 drop-shadow-[0_2px_8px_rgba(220,38,38,0.85)] animate-paradise-spark-rise"
              style={{
                left: `${(i * 7.9 + 4) % 92}%`,
                top: `${26 + ((i * 12) % 60)}%`,
                fontSize: `${14 + (i % 3) * 3}px`,
                animationDuration: `${7 + (i % 4) * 1.3}s`,
                animationDelay: `${(i * 0.58) % 5.2}s`,
              }}
            >
              {tone}
            </div>
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`pinyin-ember-${i}`}
              className="absolute w-2 h-2 rounded-full bg-amber-300/80 shadow-[0_0_8px_#f59e0b] animate-firefly-float"
              style={{
                left: `${(i * 8.2 + 5) % 92}%`,
                top: `${16 + ((i * 14) % 68)}%`,
                animationDuration: `${6 + (i % 3) * 2}s`,
                animationDelay: `${(i * 0.45) % 4}s`,
              }}
            />
          ))}
        </>
      )}

      {/* POLAR ARCTIC: Northern Aurora Ribbons, Ice Flurries & Glacial Glints */}
      {season === 'polar' && (
        <>
          <div
            className="absolute -top-8 left-[8%] w-[84%] h-40 rounded-full blur-3xl animate-aurora-wave"
            style={{
              background:
                'linear-gradient(100deg, transparent 8%, rgba(34, 211, 238, 0.3) 32%, rgba(52, 211, 153, 0.28) 55%, rgba(167, 139, 250, 0.25) 78%, transparent 94%)',
            }}
          />
          {Array.from({ length: 26 }).map((_, i) => (
            <div
              key={`polar-snow-${i}`}
              className="absolute bg-cyan-50/90 shadow-[0_0_5px_#a5f3fc] animate-winter-snow"
              style={{
                left: `${(i * 3.9 + 2) % 97}%`,
                top: '-16px',
                width: `${i % 3 === 0 ? 5 : 3}px`,
                height: `${i % 3 === 0 ? 5 : 3}px`,
                animationDuration: `${8 + (i % 4) * 1.6}s`,
                animationDelay: `${(i * 0.4) % 6}s`,
              }}
            />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={`polar-glint-${i}`}
              className="absolute text-cyan-100 text-xs animate-twinkle"
              style={{
                left: `${(i * 7.1 + 3) % 94}%`,
                top: `${34 + ((i * 11) % 58)}%`,
                animationDelay: `${(i * 0.38) % 3}s`,
              }}
            >
              ✦
            </div>
          ))}
        </>
      )}

      {/* VOLCANO LAVA ISLAND: Pulsing Magma Glow, Rising Glowing Embers & Ash Mist */}
      {season === 'volcano' && (
        <>
          <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-orange-600/35 via-red-600/15 to-transparent blur-xl animate-paradise-lava-pulse" />
          <div
            className="absolute top-[22%] inset-x-0 h-32 bg-gradient-to-r from-transparent via-stone-400/20 to-transparent blur-2xl animate-paradise-mist"
            style={{ animationDuration: '14s' }}
          />
          {Array.from({ length: 34 }).map((_, i) => (
            <div
              key={`volcano-ember-${i}`}
              className="absolute rounded-full bg-amber-300 shadow-[0_0_10px_#fb923c] animate-ember-rise"
              style={{
                left: `${(i * 3.1 + 2) % 97}%`,
                bottom: '-12px',
                width: `${3 + (i % 3) * 2}px`,
                height: `${3 + (i % 3) * 2}px`,
                animationDuration: `${3.2 + (i % 5) * 0.85}s`,
                animationDelay: `${(i * 0.28) % 3.5}s`,
              }}
            />
          ))}
        </>
      )}

      {/* BLIZZARD SNOW MOUNTAIN: Intense Diagonal Snow Streaks & Sweeping Gust Mist */}
      {season === 'blizzard' && (
        <>
          <div className="absolute inset-0 bg-slate-900/18" />
          <div
            className="absolute top-[16%] inset-x-0 h-44 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-2xl animate-paradise-mist"
            style={{ animationDuration: '5.5s' }}
          />
          <div
            className="absolute bottom-[18%] inset-x-0 h-40 bg-gradient-to-r from-transparent via-sky-100/25 to-transparent blur-2xl animate-paradise-mist"
            style={{ animationDuration: '4.4s', animationDelay: '-2.2s' }}
          />
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={`blizzard-streak-${i}`}
              className="absolute bg-gradient-to-b from-transparent via-white to-sky-100 rounded-full animate-blizzard-streak"
              style={{
                left: `${(i * 2.5 + 1) % 112}%`,
                top: '-14%',
                width: i % 3 === 0 ? '3px' : '2px',
                height: `${30 + (i % 4) * 18}px`,
                animationDuration: `${0.85 + (i % 5) * 0.2}s`,
                animationDelay: `${(i * 0.09) % 1.2}s`,
              }}
            />
          ))}
        </>
      )}

      {/* CANDY & DRINKS PARADISE: Fizzing Soda Bubbles, Pastel Star Sparkles */}
      {season === 'candy' && (
        <>
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={`candy-bubble-${i}`}
              className="absolute rounded-full border-2 border-pink-100/80 bg-pink-200/35 animate-bubble-rise"
              style={{
                left: `${(i * 4.5 + 3) % 94}%`,
                bottom: '-14px',
                width: `${8 + (i % 4) * 5}px`,
                height: `${8 + (i % 4) * 5}px`,
                animationDuration: `${4.8 + (i % 4) * 1.2}s`,
                animationDelay: `${(i * 0.35) % 4.5}s`,
              }}
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={`candy-sparkle-${i}`}
              className="absolute animate-twinkle"
              style={{
                left: `${(i * 6.3 + 4) % 94}%`,
                top: `${12 + ((i * 13) % 74)}%`,
                color: i % 3 === 0 ? '#fbcfe8' : i % 3 === 1 ? '#fde68a' : '#a5f3fc',
                fontSize: `${11 + (i % 3) * 3}px`,
                animationDelay: `${(i * 0.32) % 3}s`,
              }}
            >
              {i % 2 === 0 ? '✦' : '✧'}
            </div>
          ))}
        </>
      )}

      {/* UNDERWATER OCEAN WORLD: Caustic Waves, Sunbeams, Air Bubbles & Swimming Fish Schools */}
      {season === 'underwater' && (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-tr from-cyan-400/15 via-teal-200/10 to-sky-300/15 animate-paradise-caustic"
          />
          <div className="absolute -top-6 left-1/4 w-56 h-[82%] bg-gradient-to-b from-cyan-200/28 via-teal-200/12 to-transparent blur-xl animate-sunbeam-sway" />
          <div
            className="absolute -top-6 right-1/4 w-48 h-[76%] bg-gradient-to-b from-sky-200/24 via-cyan-300/10 to-transparent blur-xl animate-sunbeam-sway"
            style={{ animationDelay: '-3.2s' }}
          />
          {/* Ambient Pixel Fish Schools */}
          <div
            className="absolute top-[22%] left-0 w-full animate-paradise-fish"
            style={{ animationDuration: '24s' }}
          >
            <div className="flex items-center gap-3">
              <PixelFish bodyColor="#fb923c" finColor="#fed7aa" size={24} />
              <PixelFish bodyColor="#fb923c" finColor="#fdba74" size={18} />
            </div>
          </div>
          <div
            className="absolute top-[56%] left-0 w-full animate-paradise-fish-reverse"
            style={{ animationDuration: '28s', animationDelay: '-9s' }}
          >
            <div className="flex items-center gap-2">
              <PixelFish bodyColor="#f472b6" finColor="#fbcfe8" size={22} />
              <PixelFish bodyColor="#38bdf8" finColor="#bae6fd" size={18} />
            </div>
          </div>
          <div
            className="absolute top-[38%] left-0 w-full animate-paradise-fish"
            style={{ animationDuration: '32s', animationDelay: '-16s' }}
          >
            <PixelFish bodyColor="#facc15" finColor="#fef08a" size={20} />
          </div>
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={`paradise-bubble-${i}`}
              className="absolute rounded-full border-2 border-cyan-100/75 bg-cyan-200/25 animate-bubble-rise"
              style={{
                left: `${(i * 3.7 + 2) % 96}%`,
                bottom: '-14px',
                width: `${7 + (i % 4) * 5}px`,
                height: `${7 + (i % 4) * 5}px`,
                animationDuration: `${4.2 + (i % 4) * 1.2}s`,
                animationDelay: `${(i * 0.35) % 4.5}s`,
              }}
            />
          ))}
        </>
      )}

      {/* JUNK FOOD PARADISE: Cola Soda Fizz Bubbles, Warm Grill Steam & Golden Glints */}
      {season === 'junkfood' && (
        <>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={`jf-bubble-${i}`}
              className="absolute rounded-full border-2 border-amber-100/75 bg-amber-300/25 animate-bubble-rise"
              style={{
                left: `${(i * 5.6 + 3) % 94}%`,
                bottom: '-14px',
                width: `${7 + (i % 3) * 4}px`,
                height: `${7 + (i % 3) * 4}px`,
                animationDuration: `${4.5 + (i % 4) * 1.1}s`,
                animationDelay: `${(i * 0.42) % 4}s`,
              }}
            />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={`jf-twinkle-${i}`}
              className="absolute text-amber-200 animate-twinkle"
              style={{
                left: `${(i * 7.1 + 4) % 94}%`,
                top: `${16 + ((i * 13) % 68)}%`,
                fontSize: `${11 + (i % 3) * 3}px`,
                animationDelay: `${(i * 0.38) % 3}s`,
              }}
            >
              ✦
            </div>
          ))}
        </>
      )}

      {/* DINO JUNGLE WORLD: Canopy Sunbeams, Rising Amber Spores, Waterfall Mist & Gliding Pterodactyls */}
      {season === 'dino' && (
        <>
          <div className="absolute -top-8 left-[22%] w-52 h-[78%] bg-gradient-to-b from-lime-200/24 via-emerald-200/10 to-transparent blur-xl animate-sunbeam-sway" />
          <div
            className="absolute bottom-[12%] inset-x-0 h-32 bg-gradient-to-r from-transparent via-emerald-100/20 to-transparent blur-2xl animate-paradise-mist"
            style={{ animationDuration: '15s' }}
          />
          <div
            className="absolute top-[10%] left-0 w-full animate-paradise-soar"
            style={{ animationDuration: '25s' }}
          >
            <PixelPterodactyl size={34} />
          </div>
          <div
            className="absolute top-[18%] left-0 w-full animate-paradise-soar"
            style={{ animationDuration: '33s', animationDelay: '-14s' }}
          >
            <PixelPterodactyl size={26} />
          </div>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`dino-spore-${i}`}
              className="absolute rounded-full bg-amber-200/85 shadow-[0_0_8px_#fbbf24] animate-paradise-spark-rise"
              style={{
                left: `${(i * 5 + 3) % 94}%`,
                top: `${32 + ((i * 12) % 58)}%`,
                width: `${4 + (i % 3) * 2}px`,
                height: `${4 + (i % 3) * 2}px`,
                animationDuration: `${5.5 + (i % 4) * 1.4}s`,
                animationDelay: `${(i * 0.45) % 5}s`,
              }}
            />
          ))}
        </>
      )}

      {/* PARIS EIFFEL TOWER (Complementary subtle rose petals over the 4s looping video) */}
      {season === 'paris' && (
        <>
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={`paris-petal-${i}`}
              className="absolute animate-petal-sway"
              style={{
                left: `${(i * 7.2 + 3) % 95}%`,
                top: '-20px',
                animationDuration: `${8.5 + (i % 4) * 1.8}s`,
                animationDelay: `${(i * 0.65) % 7}s`,
              }}
            >
              <PixelPetalSvg
                color={i % 2 === 0 ? '#fda4af' : '#fbcfe8'}
                size={9 + (i % 2) * 3}
              />
            </div>
          ))}
        </>
      )}

      {/* 5. UNIVERSAL TIME-OF-DAY LIVING SKY OVERLAYS (Works across ALL maps!) */}
      {isDawn && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[18%] left-[12%] w-72 h-72 rounded-full bg-gradient-to-r from-amber-200/22 via-rose-200/15 to-transparent blur-3xl animate-pulse" />
        </div>
      )}

      {isSunset && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[22%] right-[16%] w-80 h-80 rounded-full bg-gradient-to-br from-amber-400/25 via-orange-500/15 to-rose-600/10 blur-3xl animate-pulse" />
        </div>
      )}

      {isNight && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle night sky aurora & shooting star */}
          {season !== 'starlight' && season !== 'polar' && (
            <div
              className="absolute -top-10 left-[12%] w-[76%] h-40 rounded-full blur-3xl animate-aurora-wave"
              style={{
                background:
                  'linear-gradient(105deg, transparent 10%, rgba(52, 211, 153, 0.2) 32%, rgba(56, 189, 248, 0.2) 55%, rgba(167, 139, 250, 0.16) 76%, transparent 92%)',
              }}
            />
          )}
          {season !== 'starlight' && (
            <div
              className="absolute top-[10%] right-[20%] w-24 h-[2px] rounded-full bg-gradient-to-r from-white via-amber-100 to-transparent shadow-[0_0_8px_#fde68a] animate-paradise-shooting-star"
              style={{ animationDelay: '2.4s' }}
            />
          )}
          {/* Glowing nocturnal fireflies drifting & blinking */}
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={`night-fly-${i}`}
              className="absolute animate-firefly-float"
              style={{
                left: `${(i * 13.7 + 4) % 94}%`,
                top: `${(i * 19.3 + 7) % 88}%`,
                animationDuration: `${6 + (i % 4) * 1.8}s`,
                animationDelay: `${(i * 0.5) % 4}s`,
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#FDE047] animate-firefly-blink"
                style={{
                  animationDuration: `${2.2 + (i % 4) * 0.7}s`,
                  animationDelay: `${(i * 0.4) % 2.5}s`,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
