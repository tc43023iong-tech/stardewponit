import React from 'react';

interface FarmAnimalSpriteProps {
  animalId: string;
  size?: number | string;
  className?: string;
  animate?: boolean;
}

/**
 * 100% Transparent Pixel-Art SVG Sprites for all 15 Stardew Valley Farm Animals.
 * Zero external network requests, zero broken image boxes, zero white containers.
 */
export const FarmAnimalSprite: React.FC<FarmAnimalSpriteProps> = ({
  animalId,
  size = 48,
  className = '',
  animate = false,
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  switch (animalId) {
    // 1. 純白小母雞 (White Chicken)
    case 'sdv_white_chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 20 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Comb */}
          <rect x="12" y="3" width="3" height="3" fill="#dc2626" />
          <rect x="11" y="2" width="2" height="2" fill="#ef4444" />
          {/* Head & Neck */}
          <rect x="9" y="5" width="6" height="5" fill="#ffffff" />
          {/* Beak & Wattle */}
          <rect x="15" y="7" width="4" height="2" fill="#f59e0b" />
          <rect x="12" y="9" width="2" height="2" fill="#dc2626" />
          {/* Eye */}
          <rect x="12" y="6" width="1.5" height="1.5" fill="#0f172a" />
          {/* Body */}
          <rect x="5" y="8" width="10" height="7" fill="#ffffff" />
          <rect x="4" y="9" width="3" height="4" fill="#e2e8f0" /> {/* Tail feathers */}
          <rect x="7" y="10" width="5" height="4" fill="#f1f5f9" /> {/* Wing */}
          {/* Legs & Feet */}
          <rect x="7" y="15" width="2" height="3" fill="#d97706" />
          <rect x="11" y="15" width="2" height="3" fill="#d97706" />
          <rect x="6" y="17" width="4" height="1" fill="#d97706" />
          <rect x="10" y="17" width="4" height="1" fill="#d97706" />
        </svg>
      );

    // 2. 棕羽母雞 (Brown Chicken)
    case 'sdv_brown_chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 20 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="12" y="3" width="3" height="3" fill="#dc2626" />
          <rect x="11" y="2" width="2" height="2" fill="#ef4444" />
          <rect x="9" y="5" width="6" height="5" fill="#b45309" />
          <rect x="15" y="7" width="4" height="2" fill="#f59e0b" />
          <rect x="12" y="9" width="2" height="2" fill="#dc2626" />
          <rect x="12" y="6" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="5" y="8" width="10" height="7" fill="#92400e" />
          <rect x="3" y="8" width="3" height="4" fill="#78350f" />
          <rect x="7" y="10" width="5" height="4" fill="#d97706" />
          <rect x="7" y="15" width="2" height="3" fill="#ea580c" />
          <rect x="11" y="15" width="2" height="3" fill="#ea580c" />
          <rect x="6" y="17" width="4" height="1" fill="#ea580c" />
          <rect x="10" y="17" width="4" height="1" fill="#ea580c" />
        </svg>
      );

    // 3. 夢幻藍雞 (Blue Chicken)
    case 'sdv_blue_chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 20 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="12" y="3" width="3" height="3" fill="#ef4444" />
          <rect x="9" y="5" width="6" height="5" fill="#60a5fa" />
          <rect x="15" y="7" width="4" height="2" fill="#fbbf24" />
          <rect x="12" y="9" width="2" height="2" fill="#ef4444" />
          <rect x="12" y="6" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="5" y="8" width="10" height="7" fill="#3b82f6" />
          <rect x="3" y="8" width="3" height="4" fill="#1d4ed8" />
          <rect x="7" y="10" width="5" height="4" fill="#2563eb" />
          <rect x="7" y="15" width="2" height="3" fill="#ea580c" />
          <rect x="11" y="15" width="2" height="3" fill="#ea580c" />
        </svg>
      );

    // 4. 虛空幽靈雞 (Void Chicken)
    case 'sdv_void_chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 20 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="12" y="3" width="3" height="3" fill="#991b1b" />
          <rect x="9" y="5" width="6" height="5" fill="#27272a" />
          <rect x="15" y="7" width="4" height="2" fill="#52525b" />
          <rect x="12" y="9" width="2" height="2" fill="#dc2626" />
          <rect x="12" y="6" width="2" height="2" fill="#ef4444" /> {/* Glowing red eye */}
          <rect x="5" y="8" width="10" height="7" fill="#18181b" />
          <rect x="3" y="7" width="3" height="4" fill="#09090b" />
          <rect x="7" y="10" width="5" height="4" fill="#3f3f46" />
          <rect x="7" y="15" width="2" height="3" fill="#71717a" />
          <rect x="11" y="15" width="2" height="3" fill="#71717a" />
        </svg>
      );

    // 5. 極品黃金雞 (Golden Chicken)
    case 'sdv_golden_chicken':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 20 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Golden Crown */}
          <rect x="11" y="2" width="4" height="3" fill="#f59e0b" />
          <rect x="12" y="1" width="2" height="2" fill="#fbbf24" />
          <rect x="9" y="5" width="6" height="5" fill="#fde047" />
          <rect x="15" y="7" width="4" height="2" fill="#ea580c" />
          <rect x="12" y="6" width="1.5" height="1.5" fill="#78350f" />
          <rect x="5" y="8" width="10" height="7" fill="#facc15" />
          <rect x="3" y="8" width="3" height="4" fill="#eab308" />
          <rect x="7" y="10" width="5" height="4" fill="#fef08a" />
          <rect x="7" y="15" width="2" height="3" fill="#ca8a04" />
          <rect x="11" y="15" width="2" height="3" fill="#ca8a04" />
          {/* Sparkles */}
          <rect x="2" y="4" width="1.5" height="1.5" fill="#fef08a" />
          <rect x="16" y="12" width="1.5" height="1.5" fill="#fef08a" />
        </svg>
      );

    // 6. 綠頭野鴨 (Duck)
    case 'sdv_duck':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 20 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Mallard Green Head */}
          <rect x="9" y="4" width="6" height="5" fill="#047857" />
          <rect x="10" y="3" width="4" height="2" fill="#10b981" />
          <rect x="15" y="6" width="4" height="2" fill="#f59e0b" /> {/* Orange Bill */}
          <rect x="12" y="5" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="9" y="9" width="6" height="1" fill="#ffffff" /> {/* White neck collar */}
          {/* Plumage Body */}
          <rect x="4" y="9" width="11" height="6" fill="#78350f" />
          <rect x="6" y="10" width="6" height="4" fill="#92400e" />
          <rect x="3" y="10" width="3" height="3" fill="#451a03" /> {/* Tail */}
          <rect x="7" y="15" width="2" height="3" fill="#ea580c" />
          <rect x="11" y="15" width="2" height="3" fill="#ea580c" />
          <rect x="6" y="17" width="4" height="1" fill="#ea580c" />
          <rect x="10" y="17" width="4" height="1" fill="#ea580c" />
        </svg>
      );

    // 7. 幸運雪兔 (Rabbit)
    case 'sdv_rabbit_farm':
    case 'rabbit':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 20 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Long Ears */}
          <rect x="8" y="1" width="2" height="6" fill="#ffffff" />
          <rect x="12" y="2" width="2" height="5" fill="#ffffff" />
          <rect x="9" y="2" width="1" height="4" fill="#f472b6" /> {/* Pink inner */}
          <rect x="13" y="3" width="1" height="3" fill="#f472b6" />
          {/* Head */}
          <rect x="7" y="6" width="8" height="5" fill="#ffffff" />
          <rect x="11" y="7" width="1.5" height="1.5" fill="#e11d48" /> {/* Ruby Eye */}
          <rect x="14" y="9" width="2" height="1.5" fill="#fda4af" /> {/* Snout */}
          {/* Chubby Body */}
          <rect x="4" y="10" width="11" height="6" fill="#ffffff" />
          <rect x="2" y="12" width="3" height="3" fill="#f1f5f9" /> {/* Fluffy Tail */}
          <rect x="5" y="15" width="3" height="3" fill="#fed7aa" /> {/* Feet */}
          <rect x="11" y="15" width="4" height="3" fill="#fed7aa" />
        </svg>
      );

    // 8. 純潔白牛 (White Cow)
    case 'sdv_white_cow':
    case 'cow':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Horns */}
          <rect x="14" y="2" width="2" height="2" fill="#d6ba89" />
          <rect x="19" y="2" width="2" height="2" fill="#d6ba89" />
          {/* Head */}
          <rect x="13" y="3" width="8" height="7" fill="#ffffff" />
          <rect x="14" y="4" width="2" height="3" fill="#1e293b" /> {/* Spot */}
          <rect x="18" y="5" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="19" y="7" width="4" height="4" fill="#fbcfe8" /> {/* Snout */}
          <rect x="21" y="9" width="1" height="1" fill="#be185d" />
          {/* Body */}
          <rect x="3" y="7" width="13" height="8" fill="#ffffff" />
          <rect x="6" y="8" width="5" height="4" fill="#1e293b" /> {/* Big Spot */}
          <rect x="12" y="10" width="3" height="3" fill="#1e293b" />
          <rect x="1" y="8" width="3" height="2" fill="#ffffff" /> {/* Tail */}
          {/* Udder */}
          <rect x="6" y="14" width="4" height="2" fill="#fbcfe8" />
          {/* Legs */}
          <rect x="4" y="15" width="2" height="4" fill="#ffffff" />
          <rect x="8" y="15" width="2" height="4" fill="#ffffff" />
          <rect x="12" y="15" width="2" height="4" fill="#ffffff" />
          <rect x="15" y="15" width="2" height="4" fill="#ffffff" />
          {/* Hooves */}
          <rect x="4" y="18" width="2" height="1" fill="#475569" />
          <rect x="8" y="18" width="2" height="1" fill="#475569" />
          <rect x="12" y="18" width="2" height="1" fill="#475569" />
          <rect x="15" y="18" width="2" height="1" fill="#475569" />
        </svg>
      );

    // 9. 黃金棕牛 (Brown Cow)
    case 'sdv_brown_cow':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          <rect x="14" y="2" width="2" height="2" fill="#fef08a" />
          <rect x="19" y="2" width="2" height="2" fill="#fef08a" />
          <rect x="13" y="3" width="8" height="7" fill="#b45309" />
          <rect x="14" y="4" width="2" height="3" fill="#78350f" />
          <rect x="18" y="5" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="19" y="7" width="4" height="4" fill="#fbcfe8" />
          <rect x="3" y="7" width="13" height="8" fill="#d97706" />
          <rect x="6" y="8" width="5" height="4" fill="#92400e" />
          <rect x="1" y="8" width="3" height="2" fill="#b45309" />
          <rect x="4" y="15" width="2" height="4" fill="#b45309" />
          <rect x="8" y="15" width="2" height="4" fill="#b45309" />
          <rect x="12" y="15" width="2" height="4" fill="#b45309" />
          <rect x="15" y="15" width="2" height="4" fill="#b45309" />
          <rect x="4" y="18" width="2" height="1" fill="#451a03" />
          <rect x="8" y="18" width="2" height="1" fill="#451a03" />
          <rect x="12" y="18" width="2" height="1" fill="#451a03" />
          <rect x="15" y="18" width="2" height="1" fill="#451a03" />
        </svg>
      );

    // 10. 山羊 (Goat)
    case 'sdv_goat':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 22 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Curved Horns */}
          <rect x="12" y="1" width="2" height="4" fill="#94a3b8" />
          <rect x="10" y="2" width="2" height="2" fill="#64748b" />
          <rect x="15" y="1" width="2" height="4" fill="#94a3b8" />
          {/* Head & Goatee */}
          <rect x="12" y="4" width="7" height="6" fill="#e2e8f0" />
          <rect x="16" y="5" width="1.5" height="1.5" fill="#451a03" />
          <rect x="17" y="8" width="3" height="3" fill="#cbd5e1" />
          <rect x="17" y="11" width="2" height="3" fill="#ffffff" /> {/* Cute Beard */}
          {/* Slender Body */}
          <rect x="3" y="7" width="12" height="7" fill="#cbd5e1" />
          <rect x="5" y="8" width="4" height="4" fill="#94a3b8" />
          <rect x="1" y="8" width="3" height="2" fill="#e2e8f0" />
          {/* Legs */}
          <rect x="4" y="14" width="2" height="5" fill="#cbd5e1" />
          <rect x="7" y="14" width="2" height="5" fill="#cbd5e1" />
          <rect x="10" y="14" width="2" height="5" fill="#cbd5e1" />
          <rect x="13" y="14" width="2" height="5" fill="#cbd5e1" />
          <rect x="4" y="18" width="2" height="1" fill="#334155" />
          <rect x="7" y="18" width="2" height="1" fill="#334155" />
          <rect x="10" y="18" width="2" height="1" fill="#334155" />
          <rect x="13" y="18" width="2" height="1" fill="#334155" />
        </svg>
      );

    // 11. 蓬鬆綿羊 (Sheep)
    case 'sdv_sheep':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Fluffy Cloud Body */}
          <rect x="2" y="6" width="16" height="9" fill="#ffffff" />
          <rect x="1" y="8" width="2" height="5" fill="#f1f5f9" />
          <rect x="4" y="4" width="12" height="3" fill="#ffffff" />
          <rect x="5" y="6" width="4" height="4" fill="#f8fafc" />
          <rect x="11" y="7" width="5" height="5" fill="#f8fafc" />
          {/* Dark Face */}
          <rect x="15" y="5" width="7" height="6" fill="#475569" />
          <rect x="19" y="6" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="16" y="3" width="2" height="3" fill="#334155" /> {/* Droopy Ear */}
          <rect x="19" y="9" width="3" height="3" fill="#64748b" /> {/* Snout */}
          {/* Little Legs */}
          <rect x="4" y="15" width="2" height="4" fill="#334155" />
          <rect x="8" y="15" width="2" height="4" fill="#334155" />
          <rect x="11" y="15" width="2" height="4" fill="#334155" />
          <rect x="14" y="15" width="2" height="4" fill="#334155" />
        </svg>
      );

    // 12. 松露萌豬 (Pig)
    case 'sdv_pig':
    case 'pig':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Ears */}
          <rect x="14" y="3" width="3" height="3" fill="#db2777" />
          <rect x="19" y="3" width="2" height="3" fill="#db2777" />
          {/* Head & Snout */}
          <rect x="13" y="5" width="8" height="7" fill="#f472b6" />
          <rect x="17" y="6" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="19" y="8" width="4" height="4" fill="#f43f5e" /> {/* Big Snout */}
          <rect x="21" y="9" width="1" height="2" fill="#881337" /> {/* Nostrils */}
          {/* Chunky Round Body */}
          <rect x="3" y="6" width="13" height="9" fill="#f472b6" />
          <rect x="5" y="7" width="5" height="5" fill="#ec4899" />
          <rect x="1" y="7" width="3" height="2" fill="#f472b6" /> {/* Curly Tail */}
          <rect x="1" y="6" width="2" height="1" fill="#db2777" />
          {/* Stubby Legs */}
          <rect x="4" y="15" width="2" height="3" fill="#db2777" />
          <rect x="7" y="15" width="2" height="3" fill="#db2777" />
          <rect x="11" y="15" width="2" height="3" fill="#db2777" />
          <rect x="14" y="15" width="2" height="3" fill="#db2777" />
        </svg>
      );

    // 13. 遠古恐龍 (Dinosaur)
    case 'sdv_dinosaur':
    case 'dinosaur':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Dorsal Spikes */}
          <rect x="5" y="3" width="2" height="3" fill="#eab308" />
          <rect x="8" y="2" width="2" height="3" fill="#eab308" />
          <rect x="11" y="3" width="2" height="3" fill="#eab308" />
          {/* Head & Jaw */}
          <rect x="13" y="4" width="8" height="6" fill="#22c55e" />
          <rect x="17" y="5" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="18" y="8" width="4" height="2" fill="#15803d" /> {/* Jaw */}
          <rect x="19" y="8" width="2" height="1" fill="#ffffff" /> {/* Tooth */}
          {/* Dino Body */}
          <rect x="4" y="6" width="12" height="8" fill="#22c55e" />
          <rect x="6" y="8" width="5" height="4" fill="#86efac" /> {/* Pale belly */}
          <rect x="1" y="8" width="4" height="4" fill="#16a34a" /> {/* Tail */}
          {/* Sturdy Legs */}
          <rect x="5" y="14" width="3" height="4" fill="#16a34a" />
          <rect x="11" y="14" width="3" height="4" fill="#16a34a" />
          <rect x="5" y="17" width="4" height="2" fill="#15803d" /> {/* Claws */}
          <rect x="11" y="17" width="4" height="2" fill="#15803d" />
        </svg>
      );

    // 14. 草原鴕鳥 (Ostrich)
    case 'sdv_ostrich':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 22 22"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Ostrich Head & Bill */}
          <rect x="14" y="2" width="5" height="4" fill="#fed7aa" />
          <rect x="18" y="3" width="3" height="2" fill="#ea580c" />
          <rect x="16" y="3" width="1.5" height="1.5" fill="#0f172a" />
          {/* Long Slender Neck */}
          <rect x="14" y="5" width="3" height="6" fill="#fcd34d" />
          {/* Fluffy Plumage Body */}
          <rect x="4" y="10" width="12" height="6" fill="#334155" />
          <rect x="6" y="11" width="6" height="4" fill="#1e293b" />
          <rect x="1" y="9" width="4" height="4" fill="#f8fafc" /> {/* White plume tail */}
          {/* Long Legs */}
          <rect x="6" y="16" width="2" height="5" fill="#fed7aa" />
          <rect x="10" y="16" width="2" height="5" fill="#fed7aa" />
          <rect x="5" y="20" width="3" height="1" fill="#f59e0b" />
          <rect x="9" y="20" width="3" height="1" fill="#f59e0b" />
        </svg>
      );

    // 15. 忠心駿馬 (Horse)
    case 'sdv_horse':
    default:
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 20"
          className={`shrink-0 select-none ${animate ? 'animate-bounce' : ''} ${className}`}
          shapeRendering="crispEdges"
        >
          {/* Ears */}
          <rect x="15" y="1" width="2" height="3" fill="#713f12" />
          {/* Mane */}
          <rect x="12" y="3" width="3" height="6" fill="#3b1f0b" />
          {/* Head */}
          <rect x="14" y="3" width="8" height="6" fill="#854d0e" />
          <rect x="18" y="4" width="1.5" height="1.5" fill="#0f172a" />
          <rect x="20" y="6" width="3" height="4" fill="#451a03" /> {/* Muzzle */}
          {/* Strong Body */}
          <rect x="3" y="7" width="13" height="8" fill="#854d0e" />
          <rect x="7" y="8" width="5" height="4" fill="#451a03" /> {/* Leather Saddle */}
          <rect x="8" y="9" width="3" height="2" fill="#ca8a04" /> {/* Stirrup */}
          <rect x="1" y="8" width="3" height="5" fill="#3b1f0b" /> {/* Flowing Tail */}
          {/* Strong Galloping Legs */}
          <rect x="4" y="15" width="2" height="4" fill="#713f12" />
          <rect x="7" y="15" width="2" height="4" fill="#713f12" />
          <rect x="11" y="15" width="2" height="4" fill="#713f12" />
          <rect x="14" y="15" width="2" height="4" fill="#713f12" />
          {/* Black Hooves */}
          <rect x="4" y="18" width="2" height="1" fill="#18181b" />
          <rect x="7" y="18" width="2" height="1" fill="#18181b" />
          <rect x="11" y="18" width="2" height="1" fill="#18181b" />
          <rect x="14" y="18" width="2" height="1" fill="#18181b" />
        </svg>
      );
  }
};
