import React from 'react';

export type PixelSpriteType = 
  | 'mayor'
  | 'craftsman'
  | 'forest_nymph'
  | 'fashion_rabbit'
  | 'farmer'
  | 'miner'
  | 'librarian'
  | 'foxes'
  | 'player1'
  | 'player2'
  | 'star_full'
  | 'star_empty'
  | 'coin_gold'
  | 'gem_diamond'
  | 'chest_closed'
  | 'chest_open'
  | 'sunflower'
  | 'melon'
  | 'chicken'
  | 'rabbit'
  | 'cow'
  | 'scarecrow'
  | 'well'
  | 'junimo'
  | 'trophy'
  | 'scroll'
  | 'heart'
  | 'clock'
  | 'check'
  | 'cross'
  | 'speech';

interface PixelSpriteProps {
  name: PixelSpriteType | string;
  size?: number | string;
  className?: string;
  animate?: boolean;
}

export const PixelSprite: React.FC<PixelSpriteProps> = ({
  name,
  size = 48,
  className = '',
  animate = false,
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  switch (name) {
    case 'player1':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Blue Cap Farmer */}
          <rect x="7" y="2" width="10" height="4" fill="#2563eb" />
          <rect x="5" y="4" width="14" height="2" fill="#1d4ed8" />
          <rect x="7" y="6" width="10" height="6" fill="#fde047" /> {/* Hair */}
          <rect x="8" y="7" width="8" height="5" fill="#fbcfe8" /> {/* Skin */}
          <rect x="9" y="8" width="2" height="2" fill="#1e293b" /> {/* Eye */}
          <rect x="13" y="8" width="2" height="2" fill="#1e293b" /> {/* Eye */}
          <rect x="10" y="11" width="4" height="1" fill="#e11d48" /> {/* Smile */}
          <rect x="6" y="12" width="12" height="5" fill="#dc2626" /> {/* Plaid shirt */}
          <rect x="8" y="13" width="8" height="4" fill="#1e40af" /> {/* Overalls */}
          <rect x="7" y="17" width="4" height="5" fill="#1e3a8a" /> {/* Left leg */}
          <rect x="13" y="17" width="4" height="5" fill="#1e3a8a" /> {/* Right leg */}
          <rect x="6" y="21" width="5" height="2" fill="#78350f" /> {/* Boot L */}
          <rect x="13" y="21" width="5" height="2" fill="#78350f" /> {/* Boot R */}
        </svg>
      );

    case 'player2':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Green Bandana Farmer */}
          <rect x="7" y="2" width="10" height="3" fill="#15803d" />
          <rect x="5" y="4" width="14" height="2" fill="#166534" />
          <rect x="6" y="5" width="12" height="6" fill="#b45309" /> {/* Brown hair */}
          <rect x="8" y="7" width="8" height="5" fill="#fed7aa" /> {/* Skin */}
          <rect x="9" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="13" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="10" y="11" width="4" height="1" fill="#ea580c" />
          <rect x="6" y="12" width="12" height="5" fill="#f59e0b" /> {/* Gold flannel */}
          <rect x="8" y="13" width="8" height="4" fill="#166534" /> {/* Green dungarees */}
          <rect x="7" y="17" width="4" height="5" fill="#14532d" />
          <rect x="13" y="17" width="4" height="5" fill="#14532d" />
          <rect x="6" y="21" width="5" height="2" fill="#543310" />
          <rect x="13" y="21" width="5" height="2" fill="#543310" />
        </svg>
      );

    case 'mayor':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Brown Fedora Hat */}
          <rect x="6" y="1" width="12" height="3" fill="#854d0e" />
          <rect x="4" y="3" width="16" height="2" fill="#a16207" />
          <rect x="7" y="5" width="10" height="6" fill="#fde047" />
          <rect x="8" y="6" width="8" height="6" fill="#fed7aa" />
          <rect x="9" y="8" width="2" height="2" fill="#1e293b" />
          <rect x="13" y="8" width="2" height="2" fill="#1e293b" />
          {/* Grey mustache */}
          <rect x="8" y="10" width="8" height="2" fill="#94a3b8" />
          <rect x="6" y="12" width="12" height="7" fill="#15803d" /> {/* Green Mayor Coat */}
          <rect x="10" y="12" width="4" height="4" fill="#fbbf24" /> {/* Gold ribbon tie */}
          <rect x="7" y="19" width="4" height="4" fill="#334155" />
          <rect x="13" y="19" width="4" height="4" fill="#334155" />
        </svg>
      );

    case 'craftsman':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Red/Orange Hair */}
          <rect x="6" y="2" width="12" height="7" fill="#ea580c" />
          <rect x="5" y="4" width="3" height="6" fill="#c2410c" />
          <rect x="16" y="4" width="3" height="6" fill="#c2410c" />
          <rect x="8" y="5" width="8" height="6" fill="#ffedd5" />
          <rect x="9" y="7" width="2" height="2" fill="#0f766e" />
          <rect x="13" y="7" width="2" height="2" fill="#0f766e" />
          <rect x="10" y="10" width="4" height="1" fill="#e11d48" />
          {/* Yellow workshirt + carpenter pencil */}
          <rect x="6" y="12" width="12" height="7" fill="#f59e0b" />
          <rect x="8" y="13" width="2" height="6" fill="#0284c7" /> {/* Suspenders */}
          <rect x="14" y="13" width="2" height="6" fill="#0284c7" />
          <rect x="18" y="8" width="2" height="4" fill="#ef4444" /> {/* Pencil on ear */}
        </svg>
      );

    case 'forest_nymph':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Forest Nymph with leafy wreath */}
          <circle cx="12" cy="12" r="10" fill="#ecfdf5" fillOpacity="0.4" />
          <rect x="6" y="2" width="12" height="4" fill="#10b981" />
          <rect x="5" y="4" width="14" height="2" fill="#059669" />
          <rect x="7" y="6" width="10" height="7" fill="#d1fae5" />
          <rect x="8" y="7" width="8" height="5" fill="#fce7f3" />
          <rect x="9" y="8" width="2" height="2" fill="#0284c7" />
          <rect x="13" y="8" width="2" height="2" fill="#0284c7" />
          <rect x="10" y="11" width="4" height="1" fill="#f43f5e" />
          <rect x="6" y="13" width="12" height="8" fill="#34d399" />
          <rect x="8" y="14" width="8" height="4" fill="#a7f3d0" />
        </svg>
      );

    case 'fashion_rabbit':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Chic Blue Haired Tailor */}
          <rect x="6" y="2" width="12" height="6" fill="#0284c7" />
          <rect x="4" y="4" width="3" height="8" fill="#0369a1" />
          <rect x="17" y="4" width="3" height="8" fill="#0369a1" />
          <rect x="8" y="6" width="8" height="5" fill="#ffedd5" />
          <rect x="9" y="7" width="2" height="2" fill="#4338ca" />
          <rect x="13" y="7" width="2" height="2" fill="#4338ca" />
          <rect x="10" y="10" width="4" height="1" fill="#f43f5e" />
          {/* Tailor tape & red chic tunic */}
          <rect x="6" y="12" width="12" height="7" fill="#e11d48" />
          <rect x="7" y="12" width="2" height="7" fill="#fde047" /> {/* Measuring tape */}
          <rect x="15" y="12" width="2" height="7" fill="#fde047" />
        </svg>
      );

    case 'farmer':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Straw Hat + Brown Ponytail */}
          <rect x="5" y="2" width="14" height="3" fill="#f59e0b" />
          <rect x="3" y="4" width="18" height="2" fill="#d97706" />
          <rect x="7" y="6" width="10" height="5" fill="#fed7aa" />
          <rect x="8" y="7" width="2" height="2" fill="#0f172a" />
          <rect x="14" y="7" width="2" height="2" fill="#0f172a" />
          <rect x="10" y="10" width="4" height="1" fill="#dc2626" />
          <rect x="6" y="12" width="12" height="8" fill="#ea580c" />
          <rect x="8" y="14" width="8" height="6" fill="#fff" /> {/* Apron */}
        </svg>
      );

    case 'miner':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Mining Helmet with Light */}
          <rect x="6" y="1" width="12" height="4" fill="#0284c7" />
          <rect x="10" y="0" width="4" height="3" fill="#fbbf24" /> {/* Lamp light */}
          <rect x="4" y="4" width="16" height="2" fill="#0369a1" />
          <rect x="8" y="6" width="8" height="5" fill="#fed7aa" />
          <rect x="9" y="7" width="2" height="2" fill="#0f172a" />
          <rect x="13" y="7" width="2" height="2" fill="#0f172a" />
          {/* Gray Beard + Coat */}
          <rect x="8" y="10" width="8" height="3" fill="#64748b" />
          <rect x="6" y="12" width="12" height="8" fill="#475569" />
          <rect x="18" y="10" width="3" height="9" fill="#a16207" /> {/* Pickaxe handle */}
          <rect x="17" y="8" width="5" height="2" fill="#cbd5e1" /> {/* Pickaxe head */}
        </svg>
      );

    case 'librarian':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Penny with red hair buns + glasses */}
          <rect x="4" y="3" width="4" height="4" fill="#ea580c" />
          <rect x="16" y="3" width="4" height="4" fill="#ea580c" />
          <rect x="6" y="5" width="12" height="4" fill="#ea580c" />
          <rect x="8" y="7" width="8" height="5" fill="#fed7aa" />
          {/* Glasses */}
          <rect x="8" y="8" width="3" height="2" fill="#0284c7" />
          <rect x="13" y="8" width="3" height="2" fill="#0284c7" />
          <rect x="11" y="8" width="2" height="1" fill="#0284c7" />
          <rect x="10" y="11" width="4" height="1" fill="#e11d48" />
          <rect x="6" y="13" width="12" height="7" fill="#fbbf24" /> {/* Yellow sweater */}
        </svg>
      );

    case 'foxes':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 32 24"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Fox A (Left) */}
          <rect x="2" y="4" width="3" height="4" fill="#c2410c" /> {/* Ear L */}
          <rect x="8" y="4" width="3" height="4" fill="#c2410c" /> {/* Ear R */}
          <rect x="3" y="7" width="8" height="7" fill="#ea580c" /> {/* Face */}
          <rect x="4" y="11" width="6" height="3" fill="#fff" /> {/* Snout */}
          <rect x="6" y="11" width="2" height="1" fill="#0f172a" /> {/* Nose */}
          <rect x="4" y="9" width="2" height="2" fill="#0f172a" />
          <rect x="8" y="9" width="2" height="2" fill="#0f172a" />
          <rect x="1" y="14" width="10" height="7" fill="#ea580c" />
          <rect x="0" y="15" width="3" height="4" fill="#ea580c" /> {/* Tail */}

          {/* Fox B (Right, slightly smaller cute pup) */}
          <rect x="18" y="6" width="3" height="4" fill="#c2410c" />
          <rect x="24" y="6" width="3" height="4" fill="#c2410c" />
          <rect x="19" y="9" width="8" height="6" fill="#ea580c" />
          <rect x="20" y="12" width="6" height="3" fill="#fff" />
          <rect x="22" y="12" width="2" height="1" fill="#0f172a" />
          <rect x="20" y="10" width="2" height="2" fill="#0f172a" />
          <rect x="24" y="10" width="2" height="2" fill="#0f172a" />
          <rect x="17" y="15" width="10" height="6" fill="#ea580c" />
          <rect x="26" y="16" width="4" height="4" fill="#fff" /> {/* Bushy tip */}
        </svg>
      );

    case 'star_full':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="7" y="1" width="2" height="2" fill="#78350f" />
          <rect x="6" y="3" width="4" height="2" fill="#eab308" />
          <rect x="1" y="5" width="14" height="3" fill="#facc15" />
          <rect x="3" y="8" width="10" height="3" fill="#eab308" />
          <rect x="2" y="11" width="4" height="3" fill="#ca8a04" />
          <rect x="10" y="11" width="4" height="3" fill="#ca8a04" />
          <rect x="7" y="6" width="2" height="2" fill="#fef08a" />
        </svg>
      );

    case 'star_empty':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated opacity-40 ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="7" y="1" width="2" height="2" fill="#475569" />
          <rect x="6" y="3" width="4" height="2" fill="#64748b" />
          <rect x="1" y="5" width="14" height="3" fill="#94a3b8" />
          <rect x="3" y="8" width="10" height="3" fill="#64748b" />
          <rect x="2" y="11" width="4" height="3" fill="#475569" />
          <rect x="10" y="11" width="4" height="3" fill="#475569" />
        </svg>
      );

    case 'coin_gold':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="5" y="2" width="6" height="2" fill="#854d0e" />
          <rect x="3" y="4" width="10" height="8" fill="#facc15" />
          <rect x="5" y="5" width="6" height="6" fill="#eab308" />
          <rect x="7" y="6" width="2" height="4" fill="#fef08a" />
          <rect x="5" y="12" width="6" height="2" fill="#854d0e" />
        </svg>
      );

    case 'gem_diamond':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="5" y="2" width="6" height="2" fill="#0284c7" />
          <rect x="3" y="4" width="10" height="3" fill="#38bdf8" />
          <rect x="5" y="7" width="6" height="4" fill="#0ea5e9" />
          <rect x="7" y="11" width="2" height="2" fill="#0369a1" />
          <rect x="5" y="4" width="2" height="2" fill="#e0f2fe" /> {/* Sparkle */}
        </svg>
      );

    case 'chest_closed':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="2" y="3" width="12" height="4" fill="#a16207" />
          <rect x="1" y="4" width="14" height="2" fill="#ca8a04" />
          <rect x="2" y="7" width="12" height="7" fill="#854d0e" />
          <rect x="7" y="7" width="2" height="3" fill="#facc15" /> {/* Keyhole */}
          <rect x="2" y="13" width="12" height="2" fill="#583101" />
        </svg>
      );

    case 'chest_open':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="2" y="1" width="12" height="3" fill="#a16207" />
          <rect x="4" y="4" width="8" height="3" fill="#fde047" /> {/* Gold glow inside */}
          <rect x="2" y="7" width="12" height="7" fill="#854d0e" />
          <rect x="7" y="8" width="2" height="2" fill="#facc15" />
          <rect x="2" y="13" width="12" height="2" fill="#583101" />
        </svg>
      );

    case 'sunflower':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="7" y="9" width="2" height="6" fill="#15803d" />
          <rect x="5" y="12" width="2" height="2" fill="#16a34a" />
          <rect x="9" y="11" width="2" height="2" fill="#16a34a" />
          <rect x="4" y="3" width="8" height="8" fill="#facc15" />
          <rect x="6" y="5" width="4" height="4" fill="#78350f" />
        </svg>
      );

    case 'melon':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="4" y="4" width="8" height="8" fill="#ec4899" />
          <rect x="3" y="6" width="10" height="4" fill="#db2777" />
          <rect x="7" y="2" width="2" height="2" fill="#15803d" />
          <rect x="5" y="5" width="2" height="2" fill="#fbcfe8" />
        </svg>
      );

    case 'chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="9" y="3" width="2" height="2" fill="#dc2626" /> {/* Comb */}
          <rect x="7" y="4" width="5" height="5" fill="#f8fafc" />
          <rect x="12" y="6" width="3" height="2" fill="#f59e0b" /> {/* Beak */}
          <rect x="9" y="5" width="1" height="1" fill="#0f172a" /> {/* Eye */}
          <rect x="4" y="8" width="8" height="5" fill="#f1f5f9" />
          <rect x="5" y="13" width="2" height="2" fill="#d97706" /> {/* Leg L */}
          <rect x="9" y="13" width="2" height="2" fill="#d97706" /> {/* Leg R */}
        </svg>
      );

    case 'rabbit':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="5" y="2" width="2" height="4" fill="#fce7f3" />
          <rect x="9" y="2" width="2" height="4" fill="#fce7f3" />
          <rect x="6" y="5" width="5" height="4" fill="#ffffff" />
          <rect x="7" y="6" width="1" height="1" fill="#f43f5e" />
          <rect x="4" y="8" width="9" height="5" fill="#ffffff" />
          <rect x="2" y="10" width="2" height="2" fill="#ffffff" /> {/* Tail */}
          <rect x="5" y="13" width="2" height="2" fill="#fed7aa" />
          <rect x="10" y="13" width="2" height="2" fill="#fed7aa" />
        </svg>
      );

    case 'cow':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 18 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="10" y="3" width="6" height="5" fill="#ffffff" />
          <rect x="10" y="4" width="2" height="2" fill="#1e293b" />
          <rect x="14" y="6" width="3" height="3" fill="#fbcfe8" /> {/* Snout */}
          <rect x="2" y="6" width="10" height="7" fill="#ffffff" />
          <rect x="4" y="7" width="4" height="4" fill="#1e293b" /> {/* Spot */}
          <rect x="3" y="13" width="2" height="3" fill="#334155" />
          <rect x="8" y="13" width="2" height="3" fill="#334155" />
        </svg>
      );

    case 'scarecrow':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="5" y="1" width="6" height="2" fill="#d97706" /> {/* Straw Hat */}
          <rect x="4" y="3" width="8" height="1" fill="#b45309" />
          <rect x="6" y="4" width="4" height="3" fill="#fef08a" />
          <rect x="1" y="7" width="14" height="3" fill="#3b82f6" /> {/* Blue shirt arms */}
          <rect x="7" y="10" width="2" height="6" fill="#78350f" /> {/* Wood pole */}
        </svg>
      );

    case 'well':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="4" y="1" width="8" height="3" fill="#854d0e" />
          <rect x="4" y="4" width="2" height="5" fill="#a16207" />
          <rect x="10" y="4" width="2" height="5" fill="#a16207" />
          <rect x="3" y="9" width="10" height="6" fill="#64748b" />
          <rect x="5" y="10" width="6" height="4" fill="#0284c7" /> {/* Water */}
        </svg>
      );

    case 'junimo':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="7" y="1" width="2" height="3" fill="#15803d" /> {/* Leaf stem */}
          <rect x="9" y="1" width="2" height="1" fill="#22c55e" />
          <rect x="4" y="4" width="8" height="8" fill="#4ade80" />
          <rect x="5" y="6" width="2" height="2" fill="#0f172a" />
          <rect x="9" y="6" width="2" height="2" fill="#0f172a" />
          <rect x="7" y="9" width="2" height="1" fill="#14532d" />
          <rect x="5" y="12" width="2" height="2" fill="#15803d" />
          <rect x="9" y="12" width="2" height="2" fill="#15803d" />
        </svg>
      );

    case 'trophy':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="4" y="2" width="8" height="6" fill="#eab308" />
          <rect x="2" y="3" width="2" height="3" fill="#ca8a04" />
          <rect x="12" y="3" width="2" height="3" fill="#ca8a04" />
          <rect x="7" y="8" width="2" height="3" fill="#ca8a04" />
          <rect x="5" y="11" width="6" height="3" fill="#854d0e" />
          <rect x="6" y="4" width="2" height="2" fill="#fef08a" />
        </svg>
      );

    case 'scroll':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="3" y="2" width="10" height="12" fill="#faeed1" />
          <rect x="2" y="2" width="2" height="12" fill="#b45309" />
          <rect x="12" y="2" width="2" height="12" fill="#b45309" />
          <rect x="5" y="5" width="6" height="1" fill="#78350f" />
          <rect x="5" y="7" width="6" height="1" fill="#78350f" />
          <rect x="5" y="9" width="4" height="1" fill="#78350f" />
        </svg>
      );

    case 'check':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="2" y="8" width="2" height="3" fill="#16a34a" />
          <rect x="4" y="10" width="3" height="3" fill="#16a34a" />
          <rect x="7" y="8" width="3" height="3" fill="#16a34a" />
          <rect x="10" y="5" width="3" height="3" fill="#16a34a" />
          <rect x="13" y="2" width="2" height="3" fill="#16a34a" />
        </svg>
      );

    case 'cross':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="3" y="3" width="3" height="3" fill="#dc2626" />
          <rect x="10" y="3" width="3" height="3" fill="#dc2626" />
          <rect x="6" y="6" width="4" height="4" fill="#dc2626" />
          <rect x="3" y="10" width="3" height="3" fill="#dc2626" />
          <rect x="10" y="10" width="3" height="3" fill="#dc2626" />
        </svg>
      );

    case 'duck':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Mallard Duck */}
          <rect x="4" y="2" width="6" height="5" fill="#15803d" /> {/* Green Head */}
          <rect x="1" y="4" width="4" height="2" fill="#eab308" /> {/* Yellow Beak */}
          <rect x="7" y="3" width="1" height="1" fill="#0f172a" /> {/* Eye */}
          <rect x="5" y="7" width="4" height="1" fill="#ffffff" /> {/* White neck collar */}
          <rect x="3" y="8" width="10" height="5" fill="#78350f" /> {/* Brown Body */}
          <rect x="5" y="9" width="6" height="3" fill="#1e3a8a" /> {/* Blue Wing Speculum */}
          <rect x="5" y="13" width="2" height="2" fill="#ea580c" /> {/* Feet */}
          <rect x="9" y="13" width="2" height="2" fill="#ea580c" />
        </svg>
      );

    case 'pig':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Truffle Pig */}
          <rect x="2" y="4" width="12" height="8" fill="#f472b6" /> {/* Pink Body */}
          <rect x="1" y="6" width="3" height="3" fill="#ec4899" /> {/* Snout */}
          <rect x="2" y="7" width="1" height="1" fill="#831843" /> {/* Nostril */}
          <rect x="4" y="2" width="2" height="2" fill="#db2777" /> {/* Ears */}
          <rect x="10" y="2" width="2" height="2" fill="#db2777" />
          <rect x="5" y="5" width="1" height="1" fill="#1e293b" /> {/* Eye */}
          <rect x="3" y="12" width="2" height="2" fill="#9d174d" /> {/* Trotters */}
          <rect x="10" y="12" width="2" height="2" fill="#9d174d" />
        </svg>
      );

    case 'cat':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Calico Cat */}
          <rect x="3" y="1" width="2" height="2" fill="#ea580c" /> {/* Pointy Ears */}
          <rect x="9" y="1" width="2" height="2" fill="#451a03" />
          <rect x="3" y="3" width="8" height="5" fill="#f97316" /> {/* Orange Head */}
          <rect x="4" y="5" width="1" height="1" fill="#0f172a" /> {/* Eyes */}
          <rect x="9" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="6" y="6" width="2" height="1" fill="#fbcfe8" /> {/* Pink Nose */}
          <rect x="4" y="8" width="7" height="6" fill="#f97316" /> {/* Body */}
          <rect x="6" y="9" width="3" height="4" fill="#ffffff" /> {/* White Chest */}
          <rect x="11" y="9" width="2" height="4" fill="#ea580c" /> {/* Tail */}
          <rect x="12" y="7" width="2" height="2" fill="#ea580c" />
        </svg>
      );

    case 'dog':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Golden Dog */}
          <rect x="2" y="3" width="2" height="4" fill="#78350f" /> {/* Floppy Ear */}
          <rect x="9" y="3" width="2" height="4" fill="#78350f" />
          <rect x="3" y="3" width="7" height="6" fill="#f59e0b" /> {/* Head */}
          <rect x="5" y="4" width="1" height="1" fill="#0f172a" /> {/* Eyes */}
          <rect x="8" y="4" width="1" height="1" fill="#0f172a" />
          <rect x="6" y="6" width="2" height="2" fill="#1e293b" /> {/* Muzzle */}
          <rect x="4" y="9" width="8" height="5" fill="#f59e0b" /> {/* Body */}
          <rect x="4" y="14" width="2" height="2" fill="#b45309" /> {/* Paws */}
          <rect x="9" y="14" width="2" height="2" fill="#b45309" />
          <rect x="12" y="8" width="2" height="3" fill="#d97706" /> {/* Wagging Tail */}
        </svg>
      );

    case 'dinosaur':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Little Green Dinosaur */}
          <rect x="5" y="2" width="6" height="5" fill="#22c55e" /> {/* Head */}
          <rect x="9" y="4" width="1" height="1" fill="#0f172a" /> {/* Eye */}
          <rect x="8" y="2" width="1" height="1" fill="#eab308" /> {/* Spines */}
          <rect x="4" y="7" width="7" height="6" fill="#16a34a" /> {/* Body */}
          <rect x="3" y="7" width="1" height="1" fill="#eab308" />
          <rect x="2" y="9" width="2" height="2" fill="#16a34a" /> {/* Tail */}
          <rect x="1" y="8" width="1" height="1" fill="#16a34a" />
          <rect x="5" y="13" width="2" height="2" fill="#15803d" /> {/* Feet */}
          <rect x="9" y="13" width="2" height="2" fill="#15803d" />
        </svg>
      );

    case 'blue_chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Shane's Blue Chicken */}
          <rect x="4" y="3" width="2" height="2" fill="#dc2626" /> {/* Red Comb */}
          <rect x="4" y="5" width="8" height="7" fill="#3b82f6" /> {/* Blue Body */}
          <rect x="9" y="6" width="3" height="2" fill="#f59e0b" /> {/* Beak */}
          <rect x="7" y="6" width="1" height="1" fill="#0f172a" /> {/* Eye */}
          <rect x="3" y="7" width="3" height="3" fill="#1d4ed8" /> {/* Wing */}
          <rect x="5" y="12" width="2" height="3" fill="#ea580c" /> {/* Legs */}
          <rect x="8" y="12" width="2" height="3" fill="#ea580c" />
        </svg>
      );

    case 'golden_chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* 1000分 Golden Chicken */}
          <rect x="4" y="2" width="3" height="3" fill="#f59e0b" /> {/* Golden Crown */}
          <rect x="4" y="5" width="8" height="7" fill="#facc15" /> {/* Gold Body */}
          <rect x="9" y="6" width="3" height="2" fill="#ea580c" /> {/* Orange Beak */}
          <rect x="7" y="6" width="1" height="1" fill="#0f172a" />
          <rect x="3" y="7" width="3" height="3" fill="#eab308" /> {/* Wing */}
          <rect x="5" y="12" width="2" height="3" fill="#b45309" />
          <rect x="8" y="12" width="2" height="3" fill="#b45309" />
        </svg>
      );

    default:
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 16 16"
          className={`shrink-0 image-rendering-pixelated ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="3" y="3" width="10" height="10" fill="#f59e0b" />
          <rect x="5" y="5" width="6" height="6" fill="#fbbf24" />
        </svg>
      );
  }
};
