import React from 'react';

interface ExtendedSpriteProps {
  name: string;
  pixelSize: string;
  className?: string;
  animate?: boolean;
}

/**
 * Pure 16x16 pixel-art SVG sprite renderer for rich Stardew Valley elements:
 * animals/junimos/critters, plants/trees/mushrooms, furniture, farm buildings/tools,
 * artisan food/drinks, and museum minerals/treasures.
 * Returns null if `name` is not handled here so PixelSprite falls back cleanly.
 */
export const renderExtendedStardewSprite = ({
  name,
  pixelSize,
  className = '',
  animate = false,
}: ExtendedSpriteProps): React.ReactNode | null => {
  const svgProps = {
    width: pixelSize,
    height: pixelSize,
    viewBox: '0 0 16 16',
    className: `shrink-0 image-rendering-pixelated ${animate ? 'animate-bounce' : ''} ${className}`,
    shapeRendering: 'crispEdges' as const,
  };

  switch (name) {
    // =====================================================
    // 1. ANIMALS, CRITTERS, JUNIMOS & SLIMES
    // =====================================================
    case 'junimo_pink':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="3" fill="#be185d" />
          <rect x="9" y="1" width="2" height="1" fill="#f472b6" />
          <rect x="4" y="4" width="8" height="8" fill="#f472b6" />
          <rect x="3" y="5" width="10" height="6" fill="#f9a8d4" />
          <rect x="5" y="6" width="2" height="2" fill="#1e293b" />
          <rect x="9" y="6" width="2" height="2" fill="#1e293b" />
          <rect x="4" y="8" width="2" height="1" fill="#fb7185" />
          <rect x="10" y="8" width="2" height="1" fill="#fb7185" />
          <rect x="5" y="12" width="2" height="2" fill="#db2777" />
          <rect x="9" y="12" width="2" height="2" fill="#db2777" />
        </svg>
      );

    case 'junimo_gold':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="3" fill="#b45309" />
          <rect x="9" y="1" width="2" height="1" fill="#fde047" />
          <rect x="4" y="4" width="8" height="8" fill="#facc15" />
          <rect x="3" y="5" width="10" height="6" fill="#fde047" />
          <rect x="5" y="6" width="2" height="2" fill="#451a03" />
          <rect x="9" y="6" width="2" height="2" fill="#451a03" />
          <rect x="7" y="9" width="2" height="1" fill="#b45309" />
          <rect x="5" y="12" width="2" height="2" fill="#ca8a04" />
          <rect x="9" y="12" width="2" height="2" fill="#ca8a04" />
        </svg>
      );

    case 'junimo_blue':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="3" fill="#0369a1" />
          <rect x="9" y="1" width="2" height="1" fill="#7dd3fc" />
          <rect x="4" y="4" width="8" height="8" fill="#38bdf8" />
          <rect x="3" y="5" width="10" height="6" fill="#7dd3fc" />
          <rect x="5" y="6" width="2" height="2" fill="#0f172a" />
          <rect x="9" y="6" width="2" height="2" fill="#0f172a" />
          <rect x="7" y="9" width="2" height="1" fill="#0284c7" />
          <rect x="5" y="12" width="2" height="2" fill="#0284c7" />
          <rect x="9" y="12" width="2" height="2" fill="#0284c7" />
        </svg>
      );

    case 'junimo_purple':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="3" fill="#6b21a8" />
          <rect x="9" y="1" width="2" height="1" fill="#d8b4fe" />
          <rect x="4" y="4" width="8" height="8" fill="#a855f7" />
          <rect x="3" y="5" width="10" height="6" fill="#c084fc" />
          <rect x="5" y="6" width="2" height="2" fill="#1e1b4b" />
          <rect x="9" y="6" width="2" height="2" fill="#1e1b4b" />
          <rect x="7" y="9" width="2" height="1" fill="#581c87" />
          <rect x="5" y="12" width="2" height="2" fill="#7e22ce" />
          <rect x="9" y="12" width="2" height="2" fill="#7e22ce" />
        </svg>
      );

    case 'hat_mouse':
      return (
        <svg {...svgProps}>
          {/* Cute purple hat + grey mouse */}
          <rect x="5" y="1" width="6" height="3" fill="#7e22ce" />
          <rect x="3" y="3" width="10" height="1" fill="#facc15" />
          <rect x="3" y="4" width="3" height="3" fill="#9ca3af" />
          <rect x="10" y="4" width="3" height="3" fill="#9ca3af" />
          <rect x="4" y="5" width="8" height="6" fill="#d1d5db" />
          <rect x="5" y="7" width="1" height="1" fill="#0f172a" />
          <rect x="10" y="7" width="1" height="1" fill="#0f172a" />
          <rect x="7" y="8" width="2" height="2" fill="#f472b6" />
          <rect x="4" y="11" width="8" height="4" fill="#9ca3af" />
          <rect x="12" y="12" width="3" height="1" fill="#f9a8d4" />
        </svg>
      );

    case 'raccoon':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="2" height="2" fill="#4b5563" />
          <rect x="11" y="2" width="2" height="2" fill="#4b5563" />
          <rect x="4" y="3" width="8" height="6" fill="#9ca3af" />
          <rect x="4" y="5" width="3" height="2" fill="#1f2937" />
          <rect x="9" y="5" width="3" height="2" fill="#1f2937" />
          <rect x="5" y="5" width="1" height="1" fill="#ffffff" />
          <rect x="10" y="5" width="1" height="1" fill="#ffffff" />
          <rect x="7" y="7" width="2" height="1" fill="#111827" />
          <rect x="4" y="9" width="8" height="5" fill="#6b7280" />
          <rect x="12" y="10" width="3" height="2" fill="#374151" />
          <rect x="13" y="11" width="2" height="1" fill="#d1d5db" />
        </svg>
      );

    case 'parrot':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="5" height="4" fill="#ef4444" />
          <rect x="10" y="3" width="2" height="2" fill="#facc15" />
          <rect x="8" y="3" width="1" height="1" fill="#0f172a" />
          <rect x="4" y="6" width="6" height="5" fill="#16a34a" />
          <rect x="3" y="7" width="3" height="4" fill="#2563eb" />
          <rect x="5" y="11" width="2" height="3" fill="#eab308" />
          <rect x="3" y="13" width="8" height="2" fill="#78350f" />
        </svg>
      );

    case 'frog':
      return (
        <svg {...svgProps}>
          <rect x="4" y="3" width="3" height="3" fill="#22c55e" />
          <rect x="9" y="3" width="3" height="3" fill="#22c55e" />
          <rect x="5" y="4" width="1" height="1" fill="#0f172a" />
          <rect x="10" y="4" width="1" height="1" fill="#0f172a" />
          <rect x="3" y="6" width="10" height="6" fill="#16a34a" />
          <rect x="5" y="8" width="6" height="4" fill="#bbf7d0" />
          <rect x="2" y="11" width="3" height="2" fill="#15803d" />
          <rect x="11" y="11" width="3" height="2" fill="#15803d" />
        </svg>
      );

    case 'squirrel':
      return (
        <svg {...svgProps}>
          <rect x="10" y="3" width="4" height="8" fill="#b45309" />
          <rect x="11" y="2" width="3" height="3" fill="#d97706" />
          <rect x="4" y="3" width="2" height="2" fill="#92400e" />
          <rect x="4" y="5" width="6" height="4" fill="#d97706" />
          <rect x="6" y="6" width="1" height="1" fill="#0f172a" />
          <rect x="4" y="9" width="6" height="5" fill="#b45309" />
          <rect x="5" y="10" width="3" height="3" fill="#fde68a" />
          <rect x="2" y="10" width="2" height="2" fill="#78350f" /> {/* Acorn */}
        </svg>
      );

    case 'fox':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="2" height="3" fill="#ea580c" />
          <rect x="10" y="2" width="2" height="3" fill="#ea580c" />
          <rect x="3" y="4" width="9" height="5" fill="#f97316" />
          <rect x="4" y="7" width="7" height="2" fill="#ffffff" />
          <rect x="5" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="9" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="7" y="8" width="1" height="1" fill="#0f172a" />
          <rect x="4" y="9" width="6" height="5" fill="#ea580c" />
          <rect x="10" y="10" width="4" height="3" fill="#f97316" />
          <rect x="13" y="10" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case 'owl':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="2" height="2" fill="#78350f" />
          <rect x="10" y="2" width="2" height="2" fill="#78350f" />
          <rect x="4" y="3" width="8" height="10" fill="#92400e" />
          <rect x="5" y="5" width="2" height="2" fill="#fef08a" />
          <rect x="9" y="5" width="2" height="2" fill="#fef08a" />
          <rect x="6" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="9" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="7" y="7" width="2" height="1" fill="#f59e0b" />
          <rect x="6" y="9" width="4" height="4" fill="#fde68a" />
          <rect x="5" y="13" width="2" height="1" fill="#f59e0b" />
          <rect x="9" y="13" width="2" height="1" fill="#f59e0b" />
        </svg>
      );

    case 'urchin_hat':
      return (
        <svg {...svgProps}>
          {/* Tiny purple top hat on spiky purple sea urchin */}
          <rect x="5" y="1" width="6" height="3" fill="#1e293b" />
          <rect x="4" y="3" width="8" height="1" fill="#facc15" />
          <rect x="3" y="5" width="10" height="8" fill="#7e22ce" />
          <rect x="2" y="7" width="12" height="4" fill="#9333ea" />
          <rect x="4" y="4" width="1" height="1" fill="#a855f7" />
          <rect x="11" y="4" width="1" height="1" fill="#a855f7" />
          <rect x="4" y="13" width="2" height="1" fill="#6b21a8" />
          <rect x="10" y="13" width="2" height="1" fill="#6b21a8" />
          <rect x="6" y="8" width="1" height="1" fill="#ffffff" />
          <rect x="9" y="8" width="1" height="1" fill="#ffffff" />
        </svg>
      );

    case 'slime_blue':
      return (
        <svg {...svgProps}>
          <rect x="7" y="2" width="2" height="2" fill="#38bdf8" />
          <rect x="3" y="5" width="10" height="8" fill="#0284c7" />
          <rect x="4" y="4" width="8" height="8" fill="#38bdf8" />
          <rect x="5" y="5" width="2" height="1" fill="#e0f2fe" />
          <rect x="5" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="9" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="2" y="11" width="12" height="2" fill="#0369a1" />
        </svg>
      );

    case 'slime_pink':
      return (
        <svg {...svgProps}>
          <rect x="7" y="2" width="2" height="2" fill="#f9a8d4" />
          <rect x="3" y="5" width="10" height="8" fill="#db2777" />
          <rect x="4" y="4" width="8" height="8" fill="#f472b6" />
          <rect x="5" y="5" width="2" height="1" fill="#fce7f3" />
          <rect x="5" y="8" width="2" height="2" fill="#1e293b" />
          <rect x="9" y="8" width="2" height="2" fill="#1e293b" />
          <rect x="2" y="11" width="12" height="2" fill="#be185d" />
        </svg>
      );

    case 'slime_tiger':
      return (
        <svg {...svgProps}>
          <rect x="7" y="2" width="2" height="2" fill="#fb923c" />
          <rect x="3" y="5" width="10" height="8" fill="#ea580c" />
          <rect x="4" y="4" width="8" height="8" fill="#f59e0b" />
          <rect x="4" y="6" width="8" height="1" fill="#7c2d12" />
          <rect x="5" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="9" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="2" y="11" width="12" height="2" fill="#9a3412" />
        </svg>
      );

    case 'hedgehog':
      return (
        <svg {...svgProps}>
          <rect x="4" y="4" width="9" height="7" fill="#78350f" />
          <rect x="5" y="3" width="7" height="2" fill="#451a03" />
          <rect x="3" y="7" width="4" height="4" fill="#fde68a" />
          <rect x="4" y="8" width="1" height="1" fill="#0f172a" />
          <rect x="2" y="9" width="1" height="1" fill="#111827" />
          <rect x="5" y="11" width="2" height="2" fill="#92400e" />
          <rect x="9" y="11" width="2" height="2" fill="#92400e" />
        </svg>
      );

    case 'butterfly_pixel':
      return (
        <svg {...svgProps}>
          <rect x="2" y="3" width="5" height="5" fill="#38bdf8" />
          <rect x="9" y="3" width="5" height="5" fill="#38bdf8" />
          <rect x="3" y="4" width="3" height="3" fill="#bae6fd" />
          <rect x="10" y="4" width="3" height="3" fill="#bae6fd" />
          <rect x="3" y="8" width="4" height="4" fill="#0284c7" />
          <rect x="9" y="8" width="4" height="4" fill="#0284c7" />
          <rect x="7" y="4" width="2" height="9" fill="#1e293b" />
          <rect x="6" y="2" width="1" height="2" fill="#1e293b" />
          <rect x="9" y="2" width="1" height="2" fill="#1e293b" />
        </svg>
      );

    case 'firefly_jar':
      return (
        <svg {...svgProps}>
          <rect x="5" y="1" width="6" height="2" fill="#92400e" />
          <rect x="4" y="3" width="8" height="11" fill="#bae6fd" />
          <rect x="5" y="4" width="6" height="9" fill="#0f172a" />
          <rect x="6" y="6" width="2" height="2" fill="#fde047" />
          <rect x="9" y="9" width="2" height="2" fill="#bef264" />
          <rect x="6" y="11" width="1" height="1" fill="#fef08a" />
          <rect x="4" y="13" width="8" height="2" fill="#64748b" />
        </svg>
      );

    // =====================================================
    // 2. PLANTS, FLOWERS, TREES & MUSHROOMS
    // =====================================================
    case 'cherry_tree':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="7" fill="#f9a8d4" />
          <rect x="2" y="4" width="12" height="5" fill="#f472b6" />
          <rect x="5" y="3" width="4" height="2" fill="#fce7f3" />
          <rect x="9" y="6" width="2" height="2" fill="#db2777" />
          <rect x="7" y="9" width="2" height="6" fill="#78350f" />
          <rect x="5" y="14" width="6" height="1" fill="#15803d" />
        </svg>
      );

    case 'peach_tree':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="7" fill="#16a34a" />
          <rect x="2" y="4" width="12" height="5" fill="#22c55e" />
          <rect x="4" y="5" width="2" height="2" fill="#fb923c" />
          <rect x="10" y="4" width="2" height="2" fill="#fb923c" />
          <rect x="7" y="7" width="2" height="2" fill="#f97316" />
          <rect x="7" y="9" width="2" height="6" fill="#78350f" />
        </svg>
      );

    case 'pine_tree':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="2" fill="#15803d" />
          <rect x="5" y="3" width="6" height="3" fill="#166534" />
          <rect x="4" y="6" width="8" height="3" fill="#15803d" />
          <rect x="2" y="9" width="12" height="3" fill="#14532d" />
          <rect x="7" y="12" width="2" height="3" fill="#78350f" />
        </svg>
      );

    case 'mushroom_tree':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="10" height="6" fill="#dc2626" />
          <rect x="2" y="4" width="12" height="4" fill="#ef4444" />
          <rect x="4" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="9" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="8" width="4" height="7" fill="#fef3c7" />
        </svg>
      );

    case 'tulip':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="2" height="5" fill="#f43f5e" />
          <rect x="9" y="2" width="2" height="5" fill="#f43f5e" />
          <rect x="6" y="3" width="4" height="5" fill="#fb7185" />
          <rect x="7" y="8" width="2" height="6" fill="#16a34a" />
          <rect x="5" y="10" width="2" height="2" fill="#22c55e" />
          <rect x="9" y="11" width="2" height="2" fill="#22c55e" />
        </svg>
      );

    case 'poppy':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="6" fill="#ef4444" />
          <rect x="5" y="3" width="6" height="4" fill="#dc2626" />
          <rect x="7" y="4" width="2" height="2" fill="#1e293b" />
          <rect x="7" y="8" width="2" height="6" fill="#15803d" />
          <rect x="5" y="11" width="2" height="1" fill="#22c55e" />
        </svg>
      );

    case 'summer_spangle':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="6" fill="#facc15" />
          <rect x="3" y="4" width="10" height="3" fill="#f97316" />
          <rect x="6" y="3" width="4" height="4" fill="#fde047" />
          <rect x="7" y="4" width="2" height="2" fill="#dc2626" />
          <rect x="7" y="8" width="2" height="6" fill="#16a34a" />
        </svg>
      );

    case 'crocus':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="6" fill="#a855f7" />
          <rect x="4" y="4" width="8" height="3" fill="#c084fc" />
          <rect x="7" y="3" width="2" height="3" fill="#facc15" />
          <rect x="7" y="8" width="2" height="6" fill="#22c55e" />
          <rect x="4" y="13" width="8" height="2" fill="#bae6fd" />
        </svg>
      );

    case 'sweet_pea':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="4" height="4" fill="#ec4899" />
          <rect x="8" y="3" width="4" height="4" fill="#a855f7" />
          <rect x="5" y="6" width="5" height="3" fill="#f472b6" />
          <rect x="7" y="9" width="2" height="5" fill="#16a34a" />
          <rect x="9" y="10" width="2" height="2" fill="#22c55e" />
        </svg>
      );

    case 'tea_sapling':
      return (
        <svg {...svgProps}>
          <rect x="4" y="3" width="8" height="5" fill="#22c55e" />
          <rect x="5" y="2" width="6" height="2" fill="#4ade80" />
          <rect x="7" y="8" width="2" height="2" fill="#78350f" />
          <rect x="4" y="10" width="8" height="5" fill="#b45309" />
          <rect x="3" y="9" width="10" height="2" fill="#d97706" />
        </svg>
      );

    case 'coffee_bean':
      return (
        <svg {...svgProps}>
          <rect x="4" y="3" width="8" height="10" fill="#78350f" />
          <rect x="3" y="5" width="10" height="6" fill="#92400e" />
          <rect x="7" y="4" width="2" height="8" fill="#451a03" />
          <rect x="5" y="5" width="1" height="3" fill="#b45309" />
        </svg>
      );

    case 'red_mushroom':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="10" height="6" fill="#dc2626" />
          <rect x="2" y="4" width="12" height="4" fill="#ef4444" />
          <rect x="4" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="9" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="8" width="4" height="6" fill="#fef3c7" />
        </svg>
      );

    case 'purple_mushroom':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="10" height="6" fill="#7e22ce" />
          <rect x="2" y="4" width="12" height="4" fill="#9333ea" />
          <rect x="5" y="3" width="2" height="2" fill="#e9d5ff" />
          <rect x="10" y="5" width="2" height="1" fill="#e9d5ff" />
          <rect x="6" y="8" width="4" height="6" fill="#f3e8ff" />
        </svg>
      );

    case 'magma_cap':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="10" height="6" fill="#ea580c" />
          <rect x="2" y="4" width="12" height="4" fill="#f97316" />
          <rect x="5" y="3" width="2" height="2" fill="#fde047" />
          <rect x="9" y="4" width="2" height="2" fill="#fef08a" />
          <rect x="6" y="8" width="4" height="6" fill="#fed7aa" />
        </svg>
      );

    case 'cactus_fruit':
      return (
        <svg {...svgProps}>
          <rect x="4" y="3" width="8" height="9" fill="#db2777" />
          <rect x="5" y="4" width="6" height="7" fill="#ec4899" />
          <rect x="6" y="2" width="4" height="2" fill="#facc15" />
          <rect x="6" y="6" width="1" height="1" fill="#fef08a" />
          <rect x="9" y="8" width="1" height="1" fill="#fef08a" />
          <rect x="5" y="12" width="6" height="2" fill="#16a34a" />
        </svg>
      );

    case 'golden_corn':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="9" fill="#facc15" />
          <rect x="5" y="4" width="6" height="6" fill="#eab308" />
          <rect x="7" y="3" width="1" height="6" fill="#fef08a" />
          <rect x="4" y="8" width="2" height="5" fill="#16a34a" />
          <rect x="10" y="8" width="2" height="5" fill="#16a34a" />
          <rect x="6" y="11" width="4" height="3" fill="#15803d" />
        </svg>
      );

    case 'grape_cluster':
      return (
        <svg {...svgProps}>
          <rect x="7" y="2" width="2" height="2" fill="#16a34a" />
          <rect x="4" y="4" width="8" height="4" fill="#7e22ce" />
          <rect x="5" y="8" width="6" height="3" fill="#9333ea" />
          <rect x="6" y="11" width="4" height="3" fill="#6b21a8" />
          <rect x="5" y="5" width="1" height="1" fill="#e9d5ff" />
          <rect x="9" y="6" width="1" height="1" fill="#e9d5ff" />
        </svg>
      );

    case 'lucky_clover':
      return (
        <svg {...svgProps}>
          <rect x="4" y="3" width="3" height="3" fill="#22c55e" />
          <rect x="9" y="3" width="3" height="3" fill="#22c55e" />
          <rect x="4" y="8" width="3" height="3" fill="#16a34a" />
          <rect x="9" y="8" width="3" height="3" fill="#16a34a" />
          <rect x="7" y="6" width="2" height="2" fill="#86efac" />
          <rect x="7" y="8" width="2" height="6" fill="#15803d" />
        </svg>
      );

    case 'qi_fruit':
      return (
        <svg {...svgProps}>
          <rect x="4" y="3" width="8" height="9" fill="#0284c7" />
          <rect x="3" y="5" width="10" height="6" fill="#38bdf8" />
          <rect x="5" y="7" width="2" height="1" fill="#0f172a" />
          <rect x="9" y="7" width="2" height="1" fill="#0f172a" />
          <rect x="7" y="9" width="2" height="1" fill="#e0f2fe" />
          <rect x="7" y="1" width="2" height="2" fill="#22c55e" />
        </svg>
      );

    case 'starfruit_px':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="3" fill="#16a34a" />
          <rect x="6" y="3" width="4" height="10" fill="#facc15" />
          <rect x="3" y="5" width="10" height="4" fill="#fde047" />
          <rect x="4" y="9" width="8" height="3" fill="#eab308" />
          <rect x="7" y="5" width="2" height="5" fill="#fef9c3" />
        </svg>
      );

    // =====================================================
    // 3. FURNITURE & COZY HOME DECOR
    // =====================================================
    case 'brick_fireplace':
      return (
        <svg {...svgProps}>
          <rect x="2" y="2" width="12" height="12" fill="#b91c1c" />
          <rect x="1" y="2" width="14" height="2" fill="#78350f" />
          <rect x="4" y="6" width="8" height="8" fill="#1e293b" />
          <rect x="5" y="9" width="6" height="5" fill="#f97316" />
          <rect x="6" y="8" width="4" height="4" fill="#fde047" />
          <rect x="7" y="10" width="2" height="3" fill="#ffffff" />
        </svg>
      );

    case 'oak_quilt_bed':
      return (
        <svg {...svgProps}>
          <rect x="2" y="2" width="2" height="12" fill="#78350f" />
          <rect x="12" y="4" width="2" height="10" fill="#78350f" />
          <rect x="4" y="4" width="8" height="3" fill="#ffffff" />
          <rect x="4" y="7" width="8" height="5" fill="#dc2626" />
          <rect x="5" y="8" width="2" height="2" fill="#facc15" />
          <rect x="8" y="9" width="3" height="2" fill="#38bdf8" />
          <rect x="4" y="12" width="8" height="2" fill="#92400e" />
        </svg>
      );

    case 'upright_piano':
      return (
        <svg {...svgProps}>
          <rect x="2" y="2" width="12" height="8" fill="#451a03" />
          <rect x="3" y="3" width="10" height="3" fill="#78350f" />
          <rect x="2" y="7" width="12" height="3" fill="#ffffff" />
          <rect x="3" y="7" width="1" height="2" fill="#0f172a" />
          <rect x="5" y="7" width="1" height="2" fill="#0f172a" />
          <rect x="8" y="7" width="1" height="2" fill="#0f172a" />
          <rect x="10" y="7" width="1" height="2" fill="#0f172a" />
          <rect x="3" y="10" width="10" height="4" fill="#78350f" />
          <rect x="3" y="14" width="2" height="1" fill="#451a03" />
          <rect x="11" y="14" width="2" height="1" fill="#451a03" />
        </svg>
      );

    case 'oak_bookcase':
      return (
        <svg {...svgProps}>
          <rect x="2" y="1" width="12" height="14" fill="#78350f" />
          <rect x="3" y="2" width="10" height="3" fill="#451a03" />
          <rect x="4" y="2" width="2" height="3" fill="#ef4444" />
          <rect x="6" y="2" width="2" height="3" fill="#3b82f6" />
          <rect x="9" y="2" width="2" height="3" fill="#22c55e" />
          <rect x="3" y="6" width="10" height="3" fill="#451a03" />
          <rect x="4" y="6" width="2" height="3" fill="#facc15" />
          <rect x="7" y="6" width="2" height="3" fill="#a855f7" />
          <rect x="10" y="6" width="2" height="3" fill="#f97316" />
          <rect x="3" y="10" width="10" height="3" fill="#451a03" />
          <rect x="4" y="10" width="3" height="3" fill="#0284c7" />
          <rect x="8" y="10" width="3" height="3" fill="#dc2626" />
        </svg>
      );

    case 'retro_tv':
      return (
        <svg {...svgProps}>
          <rect x="5" y="1" width="1" height="3" fill="#94a3b8" />
          <rect x="10" y="1" width="1" height="3" fill="#94a3b8" />
          <rect x="2" y="4" width="12" height="9" fill="#92400e" />
          <rect x="3" y="5" width="8" height="7" fill="#38bdf8" />
          <rect x="4" y="6" width="2" height="2" fill="#e0f2fe" />
          <rect x="12" y="6" width="1" height="1" fill="#facc15" />
          <rect x="12" y="9" width="1" height="1" fill="#ef4444" />
          <rect x="4" y="13" width="2" height="2" fill="#451a03" />
          <rect x="10" y="13" width="2" height="2" fill="#451a03" />
        </svg>
      );

    case 'fish_tank':
      return (
        <svg {...svgProps}>
          <rect x="2" y="2" width="12" height="2" fill="#451a03" />
          <rect x="2" y="4" width="12" height="8" fill="#0284c7" />
          <rect x="3" y="5" width="10" height="6" fill="#38bdf8" />
          <rect x="5" y="6" width="2" height="2" fill="#f97316" />
          <rect x="9" y="8" width="2" height="1" fill="#facc15" />
          <rect x="4" y="9" width="1" height="2" fill="#22c55e" />
          <rect x="2" y="12" width="12" height="3" fill="#78350f" />
        </svg>
      );

    case 'grandfather_clock':
      return (
        <svg {...svgProps}>
          <rect x="5" y="1" width="6" height="14" fill="#78350f" />
          <rect x="6" y="2" width="4" height="4" fill="#fef3c7" />
          <rect x="7" y="3" width="1" height="2" fill="#0f172a" />
          <rect x="7" y="4" width="2" height="1" fill="#0f172a" />
          <rect x="6" y="7" width="4" height="6" fill="#451a03" />
          <rect x="7" y="8" width="2" height="4" fill="#facc15" />
        </svg>
      );

    case 'sewing_machine':
      return (
        <svg {...svgProps}>
          <rect x="3" y="3" width="9" height="3" fill="#0284c7" />
          <rect x="9" y="6" width="3" height="4" fill="#0369a1" />
          <rect x="4" y="6" width="1" height="3" fill="#cbd5e1" />
          <rect x="2" y="10" width="12" height="2" fill="#38bdf8" />
          <rect x="2" y="12" width="12" height="3" fill="#78350f" />
          <rect x="5" y="2" width="2" height="1" fill="#ec4899" />
        </svg>
      );

    case 'cozy_sofa':
      return (
        <svg {...svgProps}>
          <rect x="2" y="4" width="12" height="5" fill="#dc2626" />
          <rect x="1" y="7" width="2" height="5" fill="#b91c1c" />
          <rect x="13" y="7" width="2" height="5" fill="#b91c1c" />
          <rect x="3" y="8" width="10" height="4" fill="#ef4444" />
          <rect x="4" y="5" width="3" height="3" fill="#facc15" />
          <rect x="3" y="12" width="2" height="2" fill="#78350f" />
          <rect x="11" y="12" width="2" height="2" fill="#78350f" />
        </svg>
      );

    case 'potted_plant':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="3" height="4" fill="#22c55e" />
          <rect x="9" y="2" width="3" height="4" fill="#16a34a" />
          <rect x="6" y="4" width="4" height="5" fill="#4ade80" />
          <rect x="4" y="9" width="8" height="2" fill="#d97706" />
          <rect x="5" y="11" width="6" height="4" fill="#b45309" />
        </svg>
      );

    case 'stardrop_tea_table':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="3" fill="#a855f7" />
          <rect x="5" y="3" width="6" height="1" fill="#c084fc" />
          <rect x="2" y="6" width="12" height="3" fill="#d97706" />
          <rect x="3" y="9" width="2" height="5" fill="#78350f" />
          <rect x="11" y="9" width="2" height="5" fill="#78350f" />
          <rect x="9" y="4" width="3" height="2" fill="#ffffff" />
        </svg>
      );

    case 'jukebox':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="12" fill="#b45309" />
          <rect x="5" y="3" width="6" height="4" fill="#facc15" />
          <rect x="6" y="4" width="4" height="2" fill="#ef4444" />
          <rect x="5" y="8" width="6" height="4" fill="#38bdf8" />
          <rect x="3" y="12" width="10" height="3" fill="#78350f" />
        </svg>
      );

    case 'floor_lamp':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="4" fill="#fef08a" />
          <rect x="5" y="3" width="6" height="2" fill="#facc15" />
          <rect x="7" y="6" width="2" height="7" fill="#92400e" />
          <rect x="5" y="13" width="6" height="2" fill="#78350f" />
        </svg>
      );

    case 'town_calendar':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="10" height="3" fill="#dc2626" />
          <rect x="3" y="5" width="10" height="9" fill="#fef9c3" />
          <rect x="5" y="7" width="2" height="2" fill="#f59e0b" />
          <rect x="9" y="7" width="2" height="2" fill="#94a3b8" />
          <rect x="5" y="10" width="2" height="2" fill="#94a3b8" />
          <rect x="9" y="10" width="2" height="2" fill="#22c55e" />
        </svg>
      );

    case 'dining_table':
      return (
        <svg {...svgProps}>
          <rect x="6" y="4" width="4" height="3" fill="#f97316" />
          <rect x="1" y="7" width="14" height="3" fill="#b45309" />
          <rect x="2" y="10" width="2" height="4" fill="#78350f" />
          <rect x="12" y="10" width="2" height="4" fill="#78350f" />
          <rect x="3" y="5" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case 'plush_junimo':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="2" fill="#15803d" />
          <rect x="3" y="3" width="10" height="10" fill="#22c55e" />
          <rect x="4" y="4" width="8" height="8" fill="#4ade80" />
          <rect x="5" y="6" width="2" height="2" fill="#0f172a" />
          <rect x="9" y="6" width="2" height="2" fill="#0f172a" />
          <rect x="5" y="12" width="2" height="2" fill="#16a34a" />
          <rect x="9" y="12" width="2" height="2" fill="#16a34a" />
        </svg>
      );

    case 'bear_statue':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="2" height="2" fill="#78350f" />
          <rect x="10" y="2" width="2" height="2" fill="#78350f" />
          <rect x="4" y="4" width="8" height="8" fill="#92400e" />
          <rect x="6" y="6" width="4" height="3" fill="#d97706" />
          <rect x="6" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="9" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="4" y="12" width="8" height="2" fill="#451a03" />
        </svg>
      );

    case 'butterfly_hutch':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="10" height="11" fill="#78350f" />
          <rect x="4" y="3" width="8" height="9" fill="#bae6fd" />
          <rect x="5" y="5" width="2" height="2" fill="#f472b6" />
          <rect x="9" y="7" width="2" height="2" fill="#facc15" />
          <rect x="6" y="10" width="4" height="2" fill="#22c55e" />
          <rect x="2" y="13" width="12" height="2" fill="#451a03" />
        </svg>
      );

    // =====================================================
    // 4. FARM BUILDINGS, MACHINES & TOOLS
    // =====================================================
    case 'junimo_hut':
      return (
        <svg {...svgProps}>
          <rect x="6" y="1" width="4" height="2" fill="#15803d" />
          <rect x="3" y="3" width="10" height="5" fill="#22c55e" />
          <rect x="2" y="6" width="12" height="3" fill="#4ade80" />
          <rect x="3" y="9" width="10" height="5" fill="#b45309" />
          <rect x="6" y="10" width="4" height="4" fill="#451a03" />
        </svg>
      );

    case 'red_barn':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="2" fill="#78350f" />
          <rect x="3" y="4" width="10" height="3" fill="#b91c1c" />
          <rect x="2" y="7" width="12" height="7" fill="#dc2626" />
          <rect x="5" y="9" width="6" height="5" fill="#ffffff" />
          <rect x="6" y="10" width="4" height="4" fill="#78350f" />
        </svg>
      );

    case 'stone_windmill':
      return (
        <svg {...svgProps}>
          <rect x="2" y="2" width="12" height="2" fill="#fef3c7" />
          <rect x="7" y="1" width="2" height="10" fill="#fde68a" />
          <rect x="5" y="4" width="6" height="10" fill="#94a3b8" />
          <rect x="7" y="10" width="2" height="4" fill="#451a03" />
        </svg>
      );

    case 'gold_clock':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="12" fill="#eab308" />
          <rect x="5" y="3" width="6" height="5" fill="#ffffff" />
          <rect x="7" y="4" width="1" height="2" fill="#0f172a" />
          <rect x="7" y="5" width="2" height="1" fill="#0f172a" />
          <rect x="3" y="13" width="10" height="2" fill="#b45309" />
        </svg>
      );

    case 'water_obelisk':
      return (
        <svg {...svgProps}>
          <rect x="6" y="1" width="4" height="3" fill="#38bdf8" />
          <rect x="5" y="4" width="6" height="9" fill="#0284c7" />
          <rect x="6" y="6" width="4" height="4" fill="#7dd3fc" />
          <rect x="4" y="13" width="8" height="2" fill="#475569" />
        </svg>
      );

    case 'iridium_sprinkler':
      return (
        <svg {...svgProps}>
          <rect x="6" y="3" width="4" height="10" fill="#7e22ce" />
          <rect x="3" y="6" width="10" height="4" fill="#9333ea" />
          <rect x="6" y="6" width="4" height="4" fill="#facc15" />
          <rect x="2" y="4" width="2" height="2" fill="#38bdf8" />
          <rect x="12" y="4" width="2" height="2" fill="#38bdf8" />
          <rect x="2" y="10" width="2" height="2" fill="#38bdf8" />
          <rect x="12" y="10" width="2" height="2" fill="#38bdf8" />
        </svg>
      );

    case 'iridium_can':
      return (
        <svg {...svgProps}>
          <rect x="5" y="3" width="5" height="2" fill="#a855f7" />
          <rect x="4" y="5" width="7" height="7" fill="#7e22ce" />
          <rect x="2" y="6" width="2" height="3" fill="#9333ea" />
          <rect x="11" y="7" width="3" height="2" fill="#c084fc" />
          <rect x="13" y="5" width="2" height="3" fill="#38bdf8" />
        </svg>
      );

    case 'golden_scythe':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="8" height="3" fill="#facc15" />
          <rect x="9" y="4" width="3" height="2" fill="#eab308" />
          <rect x="10" y="5" width="2" height="9" fill="#78350f" />
          <rect x="4" y="3" width="4" height="1" fill="#fef08a" />
        </svg>
      );

    case 'crystalarium':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="4" fill="#a855f7" />
          <rect x="6" y="3" width="4" height="2" fill="#e9d5ff" />
          <rect x="3" y="6" width="10" height="8" fill="#475569" />
          <rect x="4" y="8" width="8" height="4" fill="#38bdf8" />
        </svg>
      );

    case 'bee_house':
      return (
        <svg {...svgProps}>
          <rect x="3" y="3" width="10" height="3" fill="#b45309" />
          <rect x="4" y="6" width="8" height="7" fill="#f59e0b" />
          <rect x="6" y="8" width="4" height="2" fill="#451a03" />
          <rect x="3" y="13" width="10" height="2" fill="#78350f" />
        </svg>
      );

    case 'oak_keg':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="12" fill="#b45309" />
          <rect x="4" y="4" width="8" height="8" fill="#d97706" />
          <rect x="4" y="5" width="8" height="1" fill="#64748b" />
          <rect x="4" y="10" width="8" height="1" fill="#64748b" />
          <rect x="7" y="8" width="2" height="1" fill="#451a03" />
        </svg>
      );

    case 'cheese_press':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="2" fill="#78350f" />
          <rect x="7" y="4" width="2" height="4" fill="#94a3b8" />
          <rect x="4" y="8" width="8" height="4" fill="#facc15" />
          <rect x="3" y="12" width="10" height="2" fill="#92400e" />
        </svg>
      );

    case 'crab_pot':
      return (
        <svg {...svgProps}>
          <rect x="3" y="3" width="10" height="10" fill="#92400e" />
          <rect x="4" y="4" width="8" height="8" fill="#d97706" />
          <rect x="6" y="5" width="4" height="4" fill="#ef4444" />
          <rect x="5" y="6" width="6" height="1" fill="#78350f" />
          <rect x="5" y="9" width="6" height="1" fill="#78350f" />
        </svg>
      );

    case 'rarecrow_turnip':
      return (
        <svg {...svgProps}>
          <rect x="6" y="1" width="4" height="3" fill="#22c55e" />
          <rect x="5" y="4" width="6" height="4" fill="#f3e8ff" />
          <rect x="6" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="9" y="5" width="1" height="1" fill="#0f172a" />
          <rect x="2" y="8" width="12" height="3" fill="#ea580c" />
          <rect x="7" y="11" width="2" height="4" fill="#78350f" />
        </svg>
      );

    case 'shipping_bin':
      return (
        <svg {...svgProps}>
          <rect x="2" y="4" width="12" height="2" fill="#b45309" />
          <rect x="3" y="6" width="10" height="8" fill="#d97706" />
          <rect x="2" y="7" width="12" height="1" fill="#64748b" />
          <rect x="7" y="7" width="2" height="2" fill="#facc15" />
          <rect x="3" y="12" width="10" height="2" fill="#78350f" />
        </svg>
      );

    case 'campfire_px':
      return (
        <svg {...svgProps}>
          <rect x="6" y="3" width="4" height="6" fill="#f97316" />
          <rect x="7" y="5" width="2" height="5" fill="#fde047" />
          <rect x="4" y="10" width="8" height="3" fill="#78350f" />
          <rect x="3" y="12" width="10" height="2" fill="#64748b" />
        </svg>
      );

    // =====================================================
    // 5. FOOD & ARTISAN GOODS
    // =====================================================
    case 'honey_jar':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="2" fill="#78350f" />
          <rect x="4" y="4" width="8" height="10" fill="#f59e0b" />
          <rect x="5" y="5" width="6" height="7" fill="#facc15" />
          <rect x="5" y="7" width="6" height="3" fill="#fffbeb" />
          <rect x="7" y="8" width="2" height="1" fill="#ec4899" />
        </svg>
      );

    case 'aged_wine':
      return (
        <svg {...svgProps}>
          <rect x="7" y="1" width="2" height="4" fill="#7e22ce" />
          <rect x="6" y="2" width="4" height="1" fill="#facc15" />
          <rect x="5" y="5" width="6" height="9" fill="#581c87" />
          <rect x="6" y="7" width="4" height="4" fill="#e9d5ff" />
          <rect x="7" y="8" width="2" height="2" fill="#9333ea" />
        </svg>
      );

    case 'espresso_cup':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="1" height="2" fill="#e2e8f0" />
          <rect x="9" y="2" width="1" height="2" fill="#e2e8f0" />
          <rect x="4" y="5" width="8" height="7" fill="#ffffff" />
          <rect x="5" y="6" width="6" height="2" fill="#451a03" />
          <rect x="12" y="7" width="2" height="3" fill="#cbd5e1" />
          <rect x="3" y="12" width="10" height="2" fill="#94a3b8" />
        </svg>
      );

    case 'pumpkin_pie':
      return (
        <svg {...svgProps}>
          <rect x="3" y="6" width="10" height="5" fill="#ea580c" />
          <rect x="4" y="5" width="8" height="2" fill="#f97316" />
          <rect x="7" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="2" y="10" width="12" height="3" fill="#eab308" />
        </svg>
      );

    case 'green_tea_cup':
      return (
        <svg {...svgProps}>
          <rect x="4" y="5" width="8" height="7" fill="#fef3c7" />
          <rect x="5" y="6" width="6" height="2" fill="#22c55e" />
          <rect x="3" y="12" width="10" height="2" fill="#b45309" />
          <rect x="7" y="2" width="2" height="2" fill="#86efac" />
        </svg>
      );

    case 'gold_cheese':
      return (
        <svg {...svgProps}>
          <rect x="3" y="5" width="10" height="7" fill="#facc15" />
          <rect x="5" y="3" width="6" height="3" fill="#fde047" />
          <rect x="5" y="7" width="2" height="2" fill="#d97706" />
          <rect x="9" y="9" width="2" height="2" fill="#d97706" />
        </svg>
      );

    case 'pancake_stack':
      return (
        <svg {...svgProps}>
          <rect x="3" y="9" width="10" height="3" fill="#d97706" />
          <rect x="4" y="6" width="8" height="3" fill="#f59e0b" />
          <rect x="6" y="4" width="4" height="2" fill="#fef08a" />
          <rect x="2" y="12" width="12" height="2" fill="#e2e8f0" />
        </svg>
      );

    case 'blueberry_tart':
      return (
        <svg {...svgProps}>
          <rect x="3" y="6" width="10" height="5" fill="#1d4ed8" />
          <rect x="5" y="5" width="2" height="2" fill="#60a5fa" />
          <rect x="9" y="5" width="2" height="2" fill="#60a5fa" />
          <rect x="2" y="10" width="12" height="3" fill="#f59e0b" />
        </svg>
      );

    case 'strawberry_milk':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="2" fill="#ef4444" />
          <rect x="4" y="4" width="8" height="10" fill="#fbcfe8" />
          <rect x="5" y="6" width="6" height="5" fill="#f472b6" />
          <rect x="9" y="1" width="1" height="3" fill="#ffffff" />
        </svg>
      );

    case 'complete_breakfast':
      return (
        <svg {...svgProps}>
          <rect x="2" y="4" width="12" height="9" fill="#f8fafc" />
          <rect x="4" y="6" width="4" height="4" fill="#ffffff" />
          <rect x="5" y="7" width="2" height="2" fill="#facc15" />
          <rect x="9" y="6" width="3" height="5" fill="#dc2626" />
          <rect x="4" y="10" width="4" height="2" fill="#d97706" />
        </svg>
      );

    case 'miner_treat':
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="8" height="7" fill="#38bdf8" />
          <rect x="5" y="3" width="6" height="5" fill="#f472b6" />
          <rect x="6" y="4" width="4" height="3" fill="#facc15" />
          <rect x="7" y="9" width="2" height="6" fill="#ffffff" />
        </svg>
      );

    case 'seafoam_pudding':
      return (
        <svg {...svgProps}>
          <rect x="5" y="3" width="6" height="2" fill="#bae6fd" />
          <rect x="4" y="5" width="8" height="6" fill="#0ea5e9" />
          <rect x="2" y="11" width="12" height="3" fill="#ffffff" />
          <rect x="7" y="2" width="2" height="2" fill="#38bdf8" />
        </svg>
      );

    // =====================================================
    // 6. MINERALS, ARTIFACTS & SPECIAL RELICS
    // =====================================================
    case 'gem_amethyst':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="12" fill="#9333ea" />
          <rect x="4" y="4" width="8" height="8" fill="#a855f7" />
          <rect x="5" y="5" width="3" height="4" fill="#e9d5ff" />
        </svg>
      );

    case 'gem_emerald':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="12" fill="#16a34a" />
          <rect x="4" y="4" width="8" height="8" fill="#22c55e" />
          <rect x="5" y="5" width="2" height="4" fill="#bbf7d0" />
        </svg>
      );

    case 'gem_ruby':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="12" fill="#dc2626" />
          <rect x="4" y="4" width="8" height="8" fill="#ef4444" />
          <rect x="5" y="5" width="2" height="4" fill="#fecaca" />
        </svg>
      );

    case 'gem_aquamarine':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="12" fill="#0284c7" />
          <rect x="4" y="4" width="8" height="8" fill="#38bdf8" />
          <rect x="5" y="5" width="2" height="4" fill="#e0f2fe" />
        </svg>
      );

    case 'frozen_tear':
      return (
        <svg {...svgProps}>
          <rect x="7" y="2" width="2" height="3" fill="#7dd3fc" />
          <rect x="5" y="5" width="6" height="7" fill="#38bdf8" />
          <rect x="6" y="12" width="4" height="2" fill="#0284c7" />
          <rect x="6" y="6" width="2" height="4" fill="#ffffff" />
        </svg>
      );

    case 'fire_quartz':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="11" fill="#ef4444" />
          <rect x="4" y="6" width="8" height="6" fill="#f97316" />
          <rect x="6" y="4" width="2" height="5" fill="#fde047" />
        </svg>
      );

    case 'earth_crystal':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="11" fill="#d97706" />
          <rect x="4" y="7" width="8" height="6" fill="#f59e0b" />
          <rect x="6" y="4" width="2" height="5" fill="#fef3c7" />
        </svg>
      );

    case 'mermaid_pendant':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="2" fill="#94a3b8" />
          <rect x="5" y="4" width="6" height="2" fill="#38bdf8" />
          <rect x="4" y="6" width="8" height="6" fill="#0284c7" />
          <rect x="6" y="12" width="4" height="2" fill="#0369a1" />
          <rect x="6" y="7" width="2" height="2" fill="#e0f2fe" />
        </svg>
      );

    case 'dwarf_scroll':
      return (
        <svg {...svgProps}>
          <rect x="3" y="2" width="10" height="12" fill="#fde68a" />
          <rect x="2" y="2" width="2" height="12" fill="#b45309" />
          <rect x="12" y="2" width="2" height="12" fill="#b45309" />
          <rect x="6" y="6" width="4" height="4" fill="#ef4444" />
        </svg>
      );

    case 'ancient_doll':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="5" fill="#22c55e" />
          <rect x="6" y="4" width="1" height="1" fill="#0f172a" />
          <rect x="9" y="4" width="1" height="1" fill="#0f172a" />
          <rect x="4" y="7" width="8" height="6" fill="#0284c7" />
          <rect x="6" y="8" width="4" height="3" fill="#facc15" />
        </svg>
      );

    case 'golden_egg_px':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="2" fill="#fde047" />
          <rect x="4" y="4" width="8" height="8" fill="#facc15" />
          <rect x="5" y="12" width="6" height="2" fill="#eab308" />
          <rect x="5" y="5" width="2" height="3" fill="#fef9c3" />
        </svg>
      );

    case 'qi_gem':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="6" height="12" fill="#7e22ce" />
          <rect x="3" y="5" width="10" height="6" fill="#a855f7" />
          <rect x="6" y="6" width="4" height="4" fill="#f472b6" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case 'prismatic_px':
      return (
        <svg {...svgProps}>
          <rect x="6" y="2" width="4" height="2" fill="#ef4444" />
          <rect x="4" y="4" width="8" height="2" fill="#facc15" />
          <rect x="3" y="6" width="10" height="3" fill="#22c55e" />
          <rect x="4" y="9" width="8" height="2" fill="#38bdf8" />
          <rect x="6" y="11" width="4" height="3" fill="#a855f7" />
          <rect x="6" y="6" width="3" height="3" fill="#ffffff" />
        </svg>
      );

    default:
      return null;
  }
};
