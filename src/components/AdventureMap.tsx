import React, { useState } from 'react';
import { LEVEL_DEFINITIONS } from '../data/gameData';
import { SectionId, GameMode, UserSavedData } from '../types/game';
import { PixelSprite } from './common/PixelSprite';
import { soundManager } from '../utils/sound';

interface AdventureMapProps {
  userData: UserSavedData;
  onSelectLevel: (sectionId: SectionId, mode: GameMode) => void;
  onOpenFarm: () => void;
  onResetProgress: () => void;
}

// Coordinates for pins on the valley map (percentage-based for responsive placement)
const MAP_PINS: Record<SectionId, { x: number; y: number }> = {
  A: { x: 55, y: 72 }, // Advice Village (central town square)
  B: { x: 80, y: 74 }, // Grammar Workshop (carpenter/blacksmith)
  D: { x: 18, y: 22 }, // Who's Forest (secret woods top-left)
  E: { x: 38, y: 76 }, // Fashion Boutique (shopping district)
  G: { x: 82, y: 44 }, // Verb Transformation Farm (barn & crops right)
  H: { x: 85, y: 16 }, // Vocabulary Treasure Mine (mountain mine top-right)
  I: { x: 25, y: 52 }, // Translation Library (cottage near river)
  K: { x: 56, y: 26 }, // Fox Family Cottage (forest haven top-center)
};

export const AdventureMap: React.FC<AdventureMapProps> = ({
  userData,
  onSelectLevel,
  onOpenFarm,
}) => {
  const [selectedSection, setSelectedSection] = useState<SectionId | null>('A');
  const [modeSelection, setModeSelection] = useState<GameMode>('single');

  const selectedLevel = selectedSection ? LEVEL_DEFINITIONS[selectedSection] : null;
  const levelProgress = selectedSection ? userData.completedLevels[selectedSection] : null;

  const totalStars = Object.values(userData.completedLevels).reduce((acc, curr) => acc + curr.stars, 0);

  const handlePinClick = (id: SectionId) => {
    soundManager.playClick();
    setSelectedSection(id);
  };

  const handleStartGame = (mode: GameMode) => {
    if (!selectedSection) return;
    soundManager.playClick();
    onSelectLevel(selectedSection, mode);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-5">
      {/* Top Banner & Status bar */}
      <div className="pixel-wood-box p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#8b5a2b] border-2 border-[#4a2e13] flex items-center justify-center shrink-0">
            <PixelSprite name="scarecrow" size={32} />
          </div>
          <div>
            <h1 className="font-pixel text-xs sm:text-sm text-[#4a2800] tracking-wide font-bold">
              Stardew Valley English Adventure
            </h1>
            <p className="text-xs sm:text-sm text-[#7c4f24] font-semibold mt-0.5">
              Primary 5 English Grammar & Vocabulary Journey
            </p>
          </div>
        </div>

        {/* Player Stats */}
        <div className="flex items-center gap-5 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-1.5 bg-[#ecd4a4] px-3 py-1.5 border border-[#8b5a2b]">
            <PixelSprite name="star_full" size={18} />
            <span className="font-pixel text-xs text-[#5c3708]">{totalStars} / 24 Stars</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#ecd4a4] px-3 py-1.5 border border-[#8b5a2b]">
            <PixelSprite name="coin_gold" size={18} />
            <span className="font-pixel text-xs text-[#5c3708]">{userData.totalCoins} Gold</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenFarm();
            }}
            className="pixel-btn-green px-3 py-1.5 text-xs font-pixel flex items-center gap-2 cursor-pointer"
          >
            <PixelSprite name="sunflower" size={16} />
            <span>My Cozy Farm</span>
          </button>
        </div>
      </div>

      {/* Main Map + Mission Briefing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Interactive Pixel Map (8 cols on desktop) */}
        <div className="lg:col-span-8 pixel-wood-dark p-2 relative overflow-hidden group">
          <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-[#331c07] bg-[#53733e]">
            {/* Real Pixel Art Valley Map */}
            <img
              src="/src/assets/images/stardew_valley_overworld_1793505142785.jpg"
              alt="Stardew Valley Adventure Map"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />

            {/* Location Hotspot Pins */}
            {(Object.keys(MAP_PINS) as SectionId[]).map((secId) => {
              const def = LEVEL_DEFINITIONS[secId];
              const pin = MAP_PINS[secId];
              const isSelected = selectedSection === secId;
              const completed = userData.completedLevels[secId];
              const stars = completed?.stars || 0;

              return (
                <button
                  key={secId}
                  onClick={() => handlePinClick(secId)}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform duration-150 ${
                    isSelected ? 'scale-115 z-20' : 'hover:scale-105'
                  }`}
                  title={`${def.sectionCode}: ${def.name}`}
                >
                  <div
                    className={`flex flex-col items-center p-1.5 transition-all ${
                      isSelected
                        ? 'bg-[#ffe8a3] border-2 border-[#4a2e13] shadow-[0_4px_0_#2b1807]'
                        : 'bg-[#faeed1] border-2 border-[#5a3818] shadow-[0_2px_0_#331c07]'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-pixel text-[9px] font-bold text-[#4a2800] px-1 bg-[#fff3db] border border-[#a16207]">
                        {secId}
                      </span>
                      <span className="text-[10px] font-bold text-[#3d2105] hidden sm:inline whitespace-nowrap">
                        {def.name}
                      </span>
                    </div>

                    {/* Star status */}
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3].map((starIdx) => (
                        <PixelSprite
                          key={starIdx}
                          name={starIdx <= stars ? 'star_full' : 'star_empty'}
                          size={10}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend Notice */}
          <div className="mt-2 text-center text-[11px] text-[#e8cda5] font-medium flex items-center justify-center gap-2">
            <span>Click any location pin on the map to inspect its mission and start playing!</span>
          </div>
        </div>

        {/* Selected Level Briefing Card (4 cols on desktop) */}
        {selectedLevel && (
          <div className="lg:col-span-4 pixel-wood-box p-5 flex flex-col gap-4">
            {/* Header / Section Badge */}
            <div className="border-b-2 border-[#8b5a2b] pb-3 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#b45309] block">
                  {selectedLevel.sectionCode}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[#4a2800] mt-0.5">
                  {selectedLevel.name}
                </h2>
                <p className="text-xs font-semibold text-[#854d0e] mt-0.5">
                  {selectedLevel.subtitle}
                </p>
              </div>

              {/* Stars badge */}
              <div className="flex items-center gap-1 bg-[#ecd4a4] px-2 py-1 border border-[#8b5a2b]">
                {[1, 2, 3].map((idx) => (
                  <PixelSprite
                    key={idx}
                    name={idx <= (levelProgress?.stars || 0) ? 'star_full' : 'star_empty'}
                    size={16}
                  />
                ))}
              </div>
            </div>

            {/* Character Dialogue Box */}
            <div className="bg-[#fff9ed] border-2 border-[#8b5a2b] p-3 flex items-start gap-3">
              <div className="w-12 h-12 bg-[#faeed1] border-2 border-[#7c4f24] flex items-center justify-center shrink-0">
                <PixelSprite name={selectedLevel.character.avatarType} size={36} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#5c3708]">
                    {selectedLevel.character.name}
                  </span>
                  <span className="text-[11px] text-[#8b5a2b] italic">
                    {selectedLevel.character.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4a2e13] mt-1 leading-snug">
                  "{selectedLevel.character.greeting}"
                </p>
              </div>
            </div>

            {/* Mission Objective */}
            <div className="bg-[#f2e2be] p-3 border border-[#aa7742]">
              <span className="text-[11px] font-bold text-[#78350f] block mb-1">
                Mission Objective:
              </span>
              <p className="text-xs sm:text-sm text-[#381a00] font-medium leading-relaxed">
                {selectedLevel.instruction}
              </p>
              <div className="mt-2 text-[11px] text-[#633300] flex items-center justify-between">
                <span>Total Questions: {selectedLevel.totalQuestions}</span>
                {levelProgress && (
                  <span className="font-bold text-[#15803d]">High Score: {levelProgress.highScore} pts</span>
                )}
              </div>
            </div>

            {/* Grammar tip if available */}
            {selectedLevel.grammarTip && (
              <div className="bg-[#eef8eb] border-2 border-[#82b672] p-2.5 text-xs text-[#1e4612]">
                <span className="font-bold block mb-0.5">{selectedLevel.grammarTip.title}</span>
                <p className="whitespace-pre-line text-[11px] leading-relaxed">
                  {selectedLevel.grammarTip.rule}
                </p>
              </div>
            )}

            {/* Mode Selection & Launch Buttons */}
            <div className="flex flex-col gap-2.5 pt-2">
              <span className="text-xs font-bold text-[#78350f]">
                Choose Adventure Mode:
              </span>

              {/* Mode Toggle Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setModeSelection('single');
                  }}
                  className={`p-2.5 text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    modeSelection === 'single'
                      ? 'bg-[#4ea8de] text-white border-[#003049] shadow-[0_2px_0_#011627]'
                      : 'bg-[#ebd5ab] text-[#4a2e13] border-[#8b5a2b]'
                  }`}
                >
                  <PixelSprite name="player1" size={18} />
                  <span>Single Player</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setModeSelection('twoplayer');
                  }}
                  className={`p-2.5 text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    modeSelection === 'twoplayer'
                      ? 'bg-[#70b05b] text-white border-[#1e4612] shadow-[0_2px_0_#0e2607]'
                      : 'bg-[#ebd5ab] text-[#4a2e13] border-[#8b5a2b]'
                  }`}
                >
                  <div className="flex -space-x-1">
                    <PixelSprite name="player1" size={16} />
                    <PixelSprite name="player2" size={16} />
                  </div>
                  <span>2P Split Screen</span>
                </button>
              </div>

              {/* Launch Mission Button */}
              <button
                onClick={() => handleStartGame(modeSelection)}
                className={`w-full py-3 px-4 text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer mt-1 ${
                  modeSelection === 'single' ? 'pixel-btn-blue' : 'pixel-btn-green'
                }`}
              >
                <span>Start {modeSelection === 'single' ? 'Single Player' : 'Two-Player Split Screen'}</span>
                <PixelSprite name="check" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Level List Drawer (Preserves A, B, D, E, G, H, I, K) */}
      <div className="pixel-wood-dark p-3">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#855328]">
          <span className="font-bold text-xs text-[#fed7aa]">
            All Learning Locations (Primary 5 Curriculum)
          </span>
          <span className="text-xs text-[#fed7aa]">8 Adventure Quests</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {(Object.keys(LEVEL_DEFINITIONS) as SectionId[]).map((id) => {
            const item = LEVEL_DEFINITIONS[id];
            const isCurrent = selectedSection === id;
            const itemStars = userData.completedLevels[id]?.stars || 0;

            return (
              <button
                key={id}
                onClick={() => handlePinClick(id)}
                className={`p-2 border text-left cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-[#ffebb3] border-[#ffe8a3] text-[#4a2800]'
                    : 'bg-[#4d2e13] border-[#78461b] text-[#f7e6c4] hover:bg-[#5e3818]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-pixel text-[10px] font-bold">{item.sectionCode}</span>
                  <div className="flex">
                    {[1, 2, 3].map((s) => (
                      <PixelSprite
                        key={s}
                        name={s <= itemStars ? 'star_full' : 'star_empty'}
                        size={8}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] font-semibold truncate">{item.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
