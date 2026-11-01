import React, { useMemo } from 'react';

interface AmbientEffectsProps {
  leafCount?: number;
}

export const AmbientEffects: React.FC<AmbientEffectsProps> = ({ leafCount = 12 }) => {
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }).map((_, i) => ({
      id: i,
      left: `${(i * 9 + 4) % 96}%`,
      delay: `${(i * 1.7) % 10}s`,
      duration: `${11 + (i % 6) * 2}s`,
      size: 10 + (i % 3) * 4,
      color: i % 3 === 0 ? '#ea580c' : i % 3 === 1 ? '#eab308' : '#ca8a04',
    }));
  }, [leafCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
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
            className="opacity-75"
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
    </div>
  );
};
