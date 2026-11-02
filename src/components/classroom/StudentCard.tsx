import React from 'react';
import { Student } from '../../types/classroom';
import { getCropGrowth, getFarmTier } from '../../data/classroomData';
import { STUDENT_CARD_BACKGROUND_OPTIONS } from '../../data/classroomThemes';
import { AvatarRenderer } from './AvatarRenderer';
import { PixelSprite } from '../common/PixelSprite';
import { soundManager } from '../../utils/sound';
import { Check, Star, Sparkles, Palette } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  isSelected: boolean;
  onToggleSelect: (studentId: string) => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onOpenPointsModal: (student: Student) => void;
  onChangeAvatar: (student: Student) => void;
  onOpenFarmDetail?: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isSelected,
  onToggleSelect,
  onOpenPointsModal,
  onChangeAvatar,
  onOpenFarmDetail,
}) => {
  const cropInfo = getCropGrowth(student.points);
  const farmTier = getFarmTier(student.points);

  // Determine mini farm animal sprite based on points
  const getCardMiniAnimal = () => {
    if (student.points >= 1000) return 'golden_chicken';
    if (student.points >= 750) return 'blue_chicken';
    if (student.points >= 500) return 'pig';
    if (student.points >= 300) return 'cow';
    if (student.points >= 150) return 'duck';
    if (student.points >= 50) return 'chicken';
    return null;
  };

  // Determine mini farm crop sprite based on points
  const getCardMiniCrop = () => {
    if (student.points >= 1000) return 'trophy';
    if (student.points >= 500) return 'melon';
    if (student.points >= 300) return 'melon';
    if (student.points >= 50) return 'sunflower';
    return null;
  };

  const customBg = STUDENT_CARD_BACKGROUND_OPTIONS.find((o) => o.id === student.cardBackground);
  const isCustomBgActive = Boolean(customBg && customBg.id !== 'auto');

  const miniAnimal = getCardMiniAnimal();
  const miniCrop = getCardMiniCrop();

  const skyGradient = isCustomBgActive && customBg
    ? customBg.skyGradient
    : student.points >= 1000
    ? 'linear-gradient(to bottom, #fde047 0%, #fed7aa 60%, #86efac 100%)'
    : student.points >= 750
    ? 'linear-gradient(to bottom, #fdba74 0%, #fef08a 60%, #86efac 100%)'
    : student.points >= 500
    ? 'linear-gradient(to bottom, #d8b4fe 0%, #fed7aa 60%, #a7f3d0 100%)'
    : student.points >= 300
    ? 'linear-gradient(to bottom, #93c5fd 0%, #bae6fd 60%, #bbf7d0 100%)'
    : student.points >= 150
    ? 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 60%, #bbf7d0 100%)'
    : student.points >= 50
    ? 'linear-gradient(to bottom, #fef9c3 0%, #e2e8f0 60%, #d9f99d 100%)'
    : 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 60%, #bbf7d0 100%)';

  const groundBg = isCustomBgActive && customBg
    ? customBg.groundBg
    : student.points >= 1000
    ? '#15803d'
    : student.points >= 750
    ? '#166534'
    : student.points >= 500
    ? '#15803d'
    : student.points >= 300
    ? '#16a34a'
    : student.points >= 150
    ? '#22c55e'
    : student.points >= 50
    ? '#4ade80'
    : '#15803d';

  const groundPattern = isCustomBgActive && customBg
    ? customBg.groundPattern
    : student.points >= 50
    ? 'radial-gradient(#14532d 15%, transparent 16%), radial-gradient(#166534 15%, transparent 16%)'
    : 'repeating-linear-gradient(0deg, #451a03 0px, #451a03 4px, #78350f 4px, #78350f 12px)';

  return (
    <div
      onClick={() => onOpenPointsModal(student)}
      className={`group relative rounded-xl transition-all cursor-pointer flex flex-col justify-between select-none overflow-hidden hover:-translate-y-1 hover:shadow-2xl border-4 ${
        isSelected
          ? 'border-[#fabc3f] ring-4 ring-[#fabc3f] shadow-lg'
          : isCustomBgActive && customBg
          ? customBg.borderColor
          : student.points >= 1000
          ? 'border-[#eab308] ring-2 ring-amber-300 shadow-md'
          : 'border-[#5a3818] shadow-md'
      }`}
      style={{
        minHeight: '265px',
      }}
    >
      {/* Dynamic Farm Landscape Background (Sky, Mountains, Soil, Farm Elements) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Sky layer (Top 58%) */}
        <div
          className="absolute inset-x-0 top-0 h-[58%] transition-colors duration-500"
          style={{
            background: skyGradient,
          }}
        />

        {/* Distant Mountains & Trees Pixel Silhouette */}
        <svg
          className="absolute top-[22%] inset-x-0 w-full h-12 opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 200 40"
        >
          <polygon points="0,40 30,15 60,40 100,10 140,40 170,18 200,40" fill="#2d6a4f" />
          <polygon points="20,40 45,22 70,40 120,18 160,40 185,25 200,40" fill="#1b4332" />
        </svg>

        {/* Ground Soil & Pasture Layer (Bottom 48%) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[48%] transition-colors duration-500"
          style={{
            backgroundColor: groundBg,
          }}
        >
          <div
            className="w-full h-full opacity-35"
            style={{
              backgroundImage: groundPattern,
              backgroundSize: '16px 16px',
            }}
          />
        </div>

        {/* 1000分 Rainbow Sparkles */}
        {student.points >= 1000 && (
          <div className="absolute top-2 right-10 text-sm animate-bounce">
            ✨
          </div>
        )}
      </div>

      {/* 1. UPPER SCENIC CANVAS (Fully Transparent - exposes sky, mountains, avatar, and roaming stickers) */}
      <div className="relative z-10 p-2.5 flex flex-col justify-between h-[135px]">
        {/* Top Header: Roll No & Custom Theme Badge & Selection Checkbox */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-[11px] bg-[#6a4422]/95 text-[#ffebb3] px-2 py-0.5 rounded-sm border border-[#3b1f0b] shadow-md backdrop-blur-xs">
              #{student.rollNo}
            </span>
            {isCustomBgActive && customBg && (
              <span
                className="text-[10px] font-bold text-amber-900 bg-amber-100/95 px-1.5 py-0.5 rounded border border-amber-400 flex items-center gap-0.5 shadow-xs backdrop-blur-xs"
                title={`自訂卡片背景：${customBg.name}`}
              >
                {customBg.icon} {customBg.name.split(' ')[1] || ''}
              </span>
            )}
          </div>

          {/* Selection Checkbox */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onToggleSelect(student.id);
            }}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer shadow-md ${
              isSelected
                ? 'bg-[#fabc3f] border-[#8b5a2b] text-[#4a2800]'
                : 'bg-[#faeed1]/95 border-[#a3794b] hover:bg-[#ffeec2]'
            }`}
            title={isSelected ? '取消勾選' : '勾選以進行批次評分'}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
        </div>

        {/* Stage Area: Avatar Character standing right on the farm landscape with farm props */}
        <div className="flex items-end justify-between px-1 -mb-1">
          {/* Avatar with click-to-change action */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onChangeAvatar(student);
            }}
            className="relative shrink-0 group/avatar cursor-pointer"
            title="點擊此處立即更換星露谷頭像與卡片背景 🎨"
          >
            <div className="relative p-1 rounded-2xl bg-white/85 border-3 border-[#8b5a2b] shadow-lg hover:border-[#ffd700] hover:ring-2 hover:ring-[#fabc3f] transition-all transform group-hover/avatar:scale-105 backdrop-blur-xs">
              <AvatarRenderer avatar={student.avatar} name={student.name} size={62} />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/25 rounded-xl opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold font-pixel">
                更換
              </div>
            </div>
          </div>

          {/* Mini Farm Scenery Props on the field (Cactus, Volcano, Mushroom, Jellies, Crops, Animals) */}
          <div className="flex items-end gap-1.5 pb-1 opacity-90 group-hover:scale-105 transition-transform">
            {student.cardBackground === 'desert_oasis' ? (
              <span className="text-2xl drop-shadow select-none" title="沙漠仙人掌">🌵</span>
            ) : student.cardBackground === 'volcano_caldera' ? (
              <span className="text-2xl drop-shadow select-none" title="火山溶岩">🌋</span>
            ) : student.cardBackground === 'mushroom_cave' ? (
              <span className="text-2xl drop-shadow select-none animate-pulse" title="發光真菌洞穴">🍄</span>
            ) : student.cardBackground === 'moonlight_jellies' ? (
              <span className="text-2xl drop-shadow select-none animate-pulse" title="月光水母">🪼</span>
            ) : student.cardBackground === 'junimo_orchard' ? (
              <span className="text-2xl drop-shadow select-none" title="祝尼魔果園">🍏</span>
            ) : null}

            {miniCrop && (
              <div className="drop-shadow-md">
                <PixelSprite name={miniCrop} size={28} />
              </div>
            )}
            {miniAnimal && (
              <div className="drop-shadow-md">
                <PixelSprite name={miniAnimal} size={28} animate={student.points >= 150} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. LOWER PARCHMENT DOCK (Stardew Valley Ledger Board - Crisp, Readable & Wooden Framed) */}
      <div className="relative z-10 p-2.5 bg-[#faeed1]/94 backdrop-blur-xs border-t-2 border-[#8b5a2b] shadow-[0_-2px_8px_rgba(0,0,0,0.1)] flex flex-col justify-between gap-1.5">
        {/* Student Name & Crop Badge Row */}
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-extrabold text-sm sm:text-base text-[#3d240d] truncate">
            {student.name}
          </h4>
          {/* Crop Growth Stage Badge */}
          <span
            className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border flex items-center gap-1 whitespace-nowrap shadow-xs ${cropInfo.badgeBg}`}
          >
            <span>{cropInfo.icon}</span>
            <span className="truncate">{cropInfo.label}</span>
          </span>
        </div>

        {/* Score Bar with Gold Coin & 1000分 Farm Progress */}
        <div className="bg-[#ede0c2]/95 border border-[#c4a675] rounded p-1.5 flex flex-col gap-1 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <PixelSprite name="coin_gold" size={15} />
              <span className="font-pixel text-[11px] text-[#5a3818] font-bold">
                {student.points} 分
              </span>
            </div>
            <div className="text-[11px] font-bold flex items-center gap-1">
              <span className="text-[#16a34a]">+{student.posPoints}</span>
              <span className="text-stone-400">/</span>
              <span className="text-[#dc2626]">-{Math.abs(student.negPoints)}</span>
            </div>
          </div>

          {/* Progress bar to 1000分 */}
          <div className="w-full bg-[#d6ba89] h-2 rounded-full overflow-hidden border border-[#b88b4a]">
            <div
              className={`h-full transition-all duration-500 ${
                student.points >= 1000
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 animate-pulse'
                  : 'bg-[#16a34a]'
              }`}
              style={{
                width: `${Math.min(100, Math.max(2, (Math.max(0, student.points) / 1000) * 100))}%`,
              }}
            />
          </div>
        </div>

        {/* Bottom Actions: "⭐ 評分", "🎨 風格", "🏡 農場" */}
        <div className="pt-1.5 border-t border-[#dfcca4]/80 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onOpenPointsModal(student);
            }}
            className="pixel-btn-gold flex-1 py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-md active:scale-95 transition-all"
            title="開啟課堂加扣分評定"
          >
            <Star className="w-3.5 h-3.5 fill-[#633300]" />
            <span>評分</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onChangeAvatar(student);
            }}
            className="p-1.5 bg-[#faeed1] hover:bg-[#ffeec2] border-2 border-[#8b5a2b] text-[#5a3818] rounded-lg flex items-center justify-center cursor-pointer shadow-sm active:scale-95 transition-all shrink-0"
            title="更換頭像與卡片背景風格 🎨"
          >
            <Palette className="w-3.5 h-3.5" />
          </button>

          {onOpenFarmDetail && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playCorrect();
                onOpenFarmDetail(student);
              }}
              className="pixel-btn-green py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-md active:scale-95 transition-all text-white"
              title="走進該同學的專屬農場，觀賞漫步動物與植物"
            >
              <span>🏡</span>
              <span>農場</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
