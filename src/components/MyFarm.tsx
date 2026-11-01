import React, { useState } from 'react';
import { UserSavedData, FarmDecoration } from '../types/game';
import { FARM_DECORATIONS, LEVEL_DEFINITIONS } from '../data/gameData';
import { PixelSprite } from './common/PixelSprite';
import { soundManager } from '../utils/sound';

interface MyFarmProps {
  userData: UserSavedData;
  onUpdateUserData: (data: UserSavedData) => void;
  onBackToMap: () => void;
}

export const MyFarm: React.FC<MyFarmProps> = ({
  userData,
  onUpdateUserData,
  onBackToMap,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crop' | 'animal' | 'building' | 'special'>('all');
  const [selectedPlotCell, setSelectedPlotCell] = useState<{ x: number; y: number } | null>(null);

  const totalStars = Object.values(userData.completedLevels).reduce((acc, curr) => acc + curr.stars, 0);

  // 6x4 Farm Grid Plots (24 farm tiles)
  const gridRows = 4;
  const gridCols = 6;

  const handleBuyAndPlace = (decor: FarmDecoration) => {
    if (userData.totalCoins < decor.cost) {
      soundManager.playIncorrect();
      return;
    }
    if (totalStars < decor.starRequirement) {
      soundManager.playIncorrect();
      return;
    }

    soundManager.playCollect();

    // Find next available cell or use selected cell
    let targetX = selectedPlotCell?.x ?? 0;
    let targetY = selectedPlotCell?.y ?? 0;

    const isCellTaken = (x: number, y: number) =>
      userData.placedDecorations.some((p) => p.gridX === x && p.gridY === y);

    if (isCellTaken(targetX, targetY)) {
      // Find first empty cell
      let found = false;
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          if (!isCellTaken(c, r)) {
            targetX = c;
            targetY = r;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (!found) {
        alert('Your farm grid is full! Remove an item first by clicking on it.');
        return;
      }
    }

    const newPlaced = [
      ...userData.placedDecorations.filter((p) => !(p.gridX === targetX && p.gridY === targetY)),
      {
        instanceId: `inst_${Date.now()}`,
        decorId: decor.id,
        gridX: targetX,
        gridY: targetY,
      },
    ];

    onUpdateUserData({
      ...userData,
      totalCoins: userData.totalCoins - decor.cost,
      unlockedDecorations: Array.from(new Set([...userData.unlockedDecorations, decor.id])),
      placedDecorations: newPlaced,
    });
  };

  const handleRemovePlaced = (gridX: number, gridY: number) => {
    soundManager.playClick();
    onUpdateUserData({
      ...userData,
      placedDecorations: userData.placedDecorations.filter(
        (p) => !(p.gridX === gridX && p.gridY === gridY)
      ),
    });
  };

  const filteredDecorations = FARM_DECORATIONS.filter(
    (d) => selectedCategory === 'all' || d.category === selectedCategory
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-5">
      {/* Farm Header */}
      <div className="pixel-wood-box p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#faeed1] border-2 border-[#7c4f24] flex items-center justify-center shrink-0">
            <PixelSprite name="farmer" size={34} />
          </div>
          <div>
            <span className="text-xs font-bold text-[#b45309] block">
              Stardew Homestead
            </span>
            <h1 className="text-sm sm:text-base font-bold text-[#4a2800] mt-0.5">
              My Cozy English Learning Farm
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-[#ecd4a4] px-3 py-1.5 border border-[#8b5a2b]">
            <PixelSprite name="star_full" size={18} />
            <span className="font-bold text-xs text-[#5c3708]">{totalStars} / 24 Stars</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#ecd4a4] px-3 py-1.5 border border-[#8b5a2b]">
            <PixelSprite name="coin_gold" size={18} />
            <span className="font-bold text-xs text-[#5c3708]">{userData.totalCoins} Gold</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onBackToMap();
            }}
            className="pixel-btn-gold px-3.5 py-2 text-xs font-bold cursor-pointer"
          >
            Adventure Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Farm Plot (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Farm Canvas Background with soil grid */}
          <div className="pixel-wood-dark p-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[#f7e6c4] pb-2 border-b border-[#855328] mb-3">
              <span className="font-bold text-xs">Farm Plot (Click tile to place or remove items)</span>
              <span>{userData.placedDecorations.length} / 24 Tiles Occupied</span>
            </div>

            {/* Lush Farm Soil Tiles */}
            <div className="grid grid-cols-6 gap-2 bg-[#425a2b] p-3 border-2 border-[#2b3a1a]">
              {Array.from({ length: gridRows * gridCols }).map((_, index) => {
                const x = index % gridCols;
                const y = Math.floor(index / gridCols);
                const placed = userData.placedDecorations.find(
                  (p) => p.gridX === x && p.gridY === y
                );
                const decorDef = placed
                  ? FARM_DECORATIONS.find((d) => d.id === placed.decorId)
                  : null;
                const isSelected = selectedPlotCell?.x === x && selectedPlotCell?.y === y;

                return (
                  <button
                    key={`${x}-${y}`}
                    type="button"
                    onClick={() => {
                      if (placed) {
                        handleRemovePlaced(x, y);
                      } else {
                        soundManager.playClick();
                        setSelectedPlotCell({ x, y });
                      }
                    }}
                    className={`aspect-square relative p-1 transition-all border-2 flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'border-[#fde047] bg-[#75502c]'
                        : 'border-[#55361b] bg-[#613f20] hover:bg-[#6e4825]'
                    }`}
                    title={
                      decorDef
                        ? `${decorDef.name} (Click to harvest/remove)`
                        : `Empty Farm Soil [${x}, ${y}]`
                    }
                  >
                    {decorDef ? (
                      <div className="flex flex-col items-center animate-in zoom-in-75">
                        <PixelSprite name={decorDef.pixelSvg} size={36} animate={true} />
                      </div>
                    ) : (
                      <div className="w-1.5 h-1.5 bg-[#422b16] rounded-full opacity-60" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-[#e8cda5] text-center mt-2">
              Tip: Complete quiz quests across the 8 sections to earn gold and unlock rare farm animals, crops, and relics!
            </div>
          </div>

          {/* Grammar Milestone Trophy Room */}
          <div className="pixel-wood-box p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b-2 border-[#8b5a2b] pb-2">
              <PixelSprite name="trophy" size={24} />
              <h3 className="font-bold text-xs text-[#4a2800]">
                Grammar Mastery Trophy Cabinet
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(LEVEL_DEFINITIONS) as (keyof typeof LEVEL_DEFINITIONS)[]).map((secId) => {
                const info = LEVEL_DEFINITIONS[secId];
                const completed = userData.completedLevels[secId];
                const stars = completed?.stars || 0;
                const isUnlocked = stars > 0;

                return (
                  <div
                    key={secId}
                    className={`p-2.5 border-2 flex flex-col items-center text-center gap-1 ${
                      isUnlocked
                        ? 'bg-[#fffaf0] border-[#8b5a2b]'
                        : 'bg-[#e5e5e5] border-[#a3a3a3] opacity-60'
                    }`}
                  >
                    <PixelSprite
                      name={isUnlocked ? 'trophy' : 'star_empty'}
                      size={26}
                    />
                    <span className="font-pixel text-[9px] text-[#5c3708] mt-1">
                      {info.sectionCode}
                    </span>
                    <span className="text-[10px] font-bold text-[#3d2105] truncate w-full">
                      {info.name}
                    </span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3].map((s) => (
                        <PixelSprite
                          key={s}
                          name={s <= stars ? 'star_full' : 'star_empty'}
                          size={10}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pierre's Farm Shop Catalog (4 cols on desktop) */}
        <div className="lg:col-span-4 pixel-wood-box p-4 flex flex-col gap-3">
          <div className="border-b-2 border-[#8b5a2b] pb-2 flex items-center justify-between">
            <div>
              <span className="font-pixel text-[10px] text-[#b45309] uppercase block">
                Pierre's Nursery
              </span>
              <h3 className="font-pixel text-xs text-[#4a2800]">Farm Catalog</h3>
            </div>
            <div className="flex items-center gap-1 bg-[#ecd4a4] px-2 py-1 border border-[#8b5a2b]">
              <PixelSprite name="coin_gold" size={14} />
              <span className="font-pixel text-[11px] text-[#4a2800]">{userData.totalCoins}</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
            {(['all', 'crop', 'animal', 'building'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`py-1 capitalize border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4a2e13] text-[#f7e6c4] border-[#331c07]'
                    : 'bg-[#ebd5ab] text-[#5c3708] border-[#a87947]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Item List */}
          <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredDecorations.map((item) => {
              const canAfford = userData.totalCoins >= item.cost;
              const hasStars = totalStars >= item.starRequirement;
              const isLocked = !hasStars;

              return (
                <div
                  key={item.id}
                  className={`p-2.5 border-2 flex items-center justify-between gap-3 ${
                    isLocked
                      ? 'bg-[#ebe5d8] border-[#b0a797] opacity-65'
                      : 'bg-[#fffaf0] border-[#8b5a2b]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-[#faeed1] border border-[#a16207] flex items-center justify-center shrink-0">
                      <PixelSprite name={item.pixelSvg} size={28} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#381a00]">{item.name}</div>
                      <div className="text-[10px] text-[#78350f] leading-tight">
                        {item.description}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px]">
                        <span className="flex items-center gap-1 font-bold text-[#b45309]">
                          <PixelSprite name="coin_gold" size={12} />
                          {item.cost} Gold
                        </span>
                        {item.starRequirement > 0 && (
                          <span
                            className={`flex items-center gap-0.5 font-bold ${
                              hasStars ? 'text-[#15803d]' : 'text-[#dc2626]'
                            }`}
                          >
                            <PixelSprite name="star_full" size={10} />
                            Req: {item.starRequirement} ★
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!canAfford || isLocked}
                    onClick={() => handleBuyAndPlace(item)}
                    className={`px-2.5 py-1.5 font-pixel text-[9px] uppercase tracking-wider shrink-0 cursor-pointer ${
                      canAfford && !isLocked
                        ? 'pixel-btn-green'
                        : 'bg-[#cfc4b0] text-[#786d5c] border border-[#a89d8b] cursor-not-allowed'
                    }`}
                  >
                    {isLocked ? 'Locked' : 'Plant'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
