import React from 'react';
import { Student } from '../../types/classroom';
import { STUDENT_CARD_BACKGROUND_OPTIONS } from '../../data/classroomThemes';
import { CARD_PIXEL_BG_IMAGES } from '../../data/scenicBackgrounds';
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
  onOpenRoomDetail?: (student: Student) => void;
  onOpenKitchenDetail?: (student: Student) => void;
  onOpenBathroomDetail?: (student: Student) => void;
  onOpenLivingRoomDetail?: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isSelected,
  onToggleSelect,
  onOpenPointsModal,
  onChangeAvatar,
  onOpenFarmDetail,
  onOpenRoomDetail,
  onOpenKitchenDetail,
  onOpenBathroomDetail,
  onOpenLivingRoomDetail,
}) => {

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

  // Pixel Background Image for Card Canvas: Dedicated custom theme or auto-progression by points
  const getAutoThemeByPoints = () => {
    if (student.points >= 1000) return CARD_PIXEL_BG_IMAGES.golden;
    if (student.points >= 750) return CARD_PIXEL_BG_IMAGES.iridium;
    if (student.points >= 500) return CARD_PIXEL_BG_IMAGES.summer;
    if (student.points >= 300) return CARD_PIXEL_BG_IMAGES.spring;
    if (student.points >= 150) return CARD_PIXEL_BG_IMAGES.autumn;
    return CARD_PIXEL_BG_IMAGES.auto;
  };

  const cardBgImage =
    isCustomBgActive && customBg && CARD_PIXEL_BG_IMAGES[customBg.id]
      ? CARD_PIXEL_BG_IMAGES[customBg.id]
      : getAutoThemeByPoints();

  return (
    <div
      onClick={() => onOpenPointsModal(student)}
      className={`group relative rounded-xl transition-all cursor-pointer flex flex-col justify-between select-none overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl border-4 ${
        isSelected
          ? 'border-[#fabc3f] ring-4 ring-[#fabc3f] shadow-xl'
          : isCustomBgActive && customBg
          ? customBg.borderColor
          : student.points >= 1000
          ? 'border-[#eab308] ring-2 ring-amber-300 shadow-lg'
          : 'border-[#5a3818] shadow-lg'
      }`}
      style={{
        minHeight: '275px',
      }}
    >
      {/* Dynamic Stardew Valley Pixel Art Landscape Window (Top 58%) */}
      <div className="absolute inset-x-0 top-0 h-[60%] z-0 pointer-events-none overflow-hidden bg-[#2a1708]">
        {/* Real Pixel Art Wallpaper */}
        <img
          src={cardBgImage}
          alt={customBg?.name || 'Student Card Backdrop'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 select-none filter brightness-95"
        />

        {/* Soft Vignette & Depth Shadow on Card Artwork */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Dynamic In-Card Special Effects for Galaxy, Ocean, Iridium, and Golden */}
        {student.cardBackground === 'galaxy' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-full bg-gradient-to-b from-cyan-400/25 via-fuchsia-500/15 to-transparent blur-xs animate-pulse" />
            <div className="absolute top-2 left-3 text-cyan-200 text-xs animate-twinkle">✦</div>
            <div className="absolute top-5 right-5 text-amber-200 text-sm animate-twinkle-delayed">★</div>
            <div className="absolute top-10 left-1/3 text-pink-200 text-xs animate-twinkle">✧</div>
          </div>
        )}

        {student.cardBackground === 'ocean' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-2 inset-x-0 h-10 opacity-35 animate-ocean-wave">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 50">
                <path d="M 0 25 Q 125 10 250 25 T 500 25 L 500 50 L 0 50 Z" fill="#38bdf8" />
              </svg>
            </div>
            <div className="absolute bottom-6 left-1/3 text-amber-300 text-xs animate-water-gleam">✧</div>
            <div className="absolute bottom-4 right-1/4 text-orange-200 text-xs animate-water-gleam" style={{ animationDelay: '-1s' }}>✦</div>
          </div>
        )}

        {student.cardBackground === 'iridium' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-4 left-6 w-24 h-24 rounded-full bg-purple-600/25 blur-xl animate-crystal-pulse" />
            <div className="absolute top-6 right-6 text-purple-300 text-xs animate-floating-drift">🔮</div>
            <div className="absolute bottom-8 left-10 text-fuchsia-300 text-xs animate-twinkle">✦</div>
          </div>
        )}

        {student.cardBackground === 'golden' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-28 bg-amber-300/25 blur-lg animate-gold-gleam" />
            <div className="absolute top-6 left-6 text-amber-300 text-sm animate-floating-drift">✨</div>
            <div className="absolute top-8 right-6 text-yellow-200 text-xs animate-twinkle">★</div>
          </div>
        )}

        {student.cardBackground === 'sakura_shrine' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 left-5 text-pink-200 text-xs animate-floating-drift">🌸</div>
            <div className="absolute top-8 right-7 text-pink-300 text-xs animate-twinkle-delayed">✿</div>
          </div>
        )}

        {student.cardBackground === 'aurora_glacier' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-emerald-400/20 via-purple-400/10 to-transparent animate-pulse" />
            <div className="absolute top-4 right-5 text-emerald-200 text-xs animate-twinkle">✦</div>
            <div className="absolute top-10 left-5 text-cyan-200 text-xs animate-twinkle-delayed">❄</div>
          </div>
        )}

        {student.cardBackground === 'starfruit_fairyland' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 left-6 text-amber-200 text-xs animate-twinkle">★</div>
            <div className="absolute top-6 right-5 text-violet-200 text-xs animate-twinkle-delayed">✦</div>
            <div className="absolute bottom-7 left-1/3 text-yellow-200 text-xs animate-floating-drift">✨</div>
          </div>
        )}

        {student.cardBackground === 'crystal_waterfall' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-5 left-5 text-cyan-200 text-xs animate-twinkle">💎</div>
            <div className="absolute bottom-6 right-6 text-purple-200 text-xs animate-twinkle-delayed">✦</div>
          </div>
        )}

        {student.cardBackground === 'sky_cloud_castle' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 right-6 text-sky-100 text-xs animate-twinkle">✧</div>
            <div className="absolute top-8 left-6 text-amber-100 text-xs animate-floating-drift">☁</div>
          </div>
        )}

        {student.cardBackground === 'polar_arctic_friends' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-2 left-4 text-cyan-100 text-xs animate-twinkle">❄</div>
            <div className="absolute top-7 right-6 text-emerald-200 text-xs animate-twinkle-delayed">✦</div>
          </div>
        )}

        {student.cardBackground === 'volcano_lava_isle' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-orange-500/30 to-transparent animate-pulse" />
            <div className="absolute top-5 right-6 text-amber-300 text-xs animate-twinkle">✨</div>
          </div>
        )}

        {student.cardBackground === 'blizzard_snow_peak' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 left-5 text-white text-xs animate-twinkle">❅</div>
            <div className="absolute top-8 right-6 text-sky-100 text-xs animate-twinkle-delayed">❄</div>
          </div>
        )}

        {student.cardBackground === 'candy_boba_world' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 right-5 text-pink-200 text-xs animate-floating-drift">🍭</div>
            <div className="absolute top-9 left-6 text-yellow-100 text-xs animate-twinkle">✦</div>
          </div>
        )}

        {student.cardBackground === 'deep_sea_creatures' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-4 left-5 text-cyan-200 text-xs animate-floating-drift">🫧</div>
            <div className="absolute bottom-6 right-5 text-teal-200 text-xs animate-twinkle">✦</div>
          </div>
        )}

        {student.cardBackground === 'junk_food_carnival' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 left-6 text-amber-200 text-xs animate-twinkle">★</div>
            <div className="absolute top-7 right-6 text-rose-200 text-xs animate-floating-drift">✨</div>
          </div>
        )}

        {student.cardBackground === 'dino_amber_valley' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-4 right-6 text-lime-200 text-xs animate-twinkle">✦</div>
            <div className="absolute bottom-6 left-6 text-amber-200 text-xs animate-floating-drift">✨</div>
          </div>
        )}

        {student.cardBackground === 'enchanted_owl_library' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 left-5 text-amber-200 text-xs animate-floating-drift">✨</div>
            <div className="absolute top-8 right-6 text-yellow-200 text-xs animate-twinkle-delayed">✧</div>
          </div>
        )}

        {student.cardBackground === 'retro_pixel_arcade' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-2 left-4 text-cyan-300 text-xs animate-twinkle">★</div>
            <div className="absolute top-6 right-5 text-fuchsia-300 text-xs animate-twinkle-delayed">✦</div>
          </div>
        )}

        {student.cardBackground === 'space_crystal_observatory' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-3 left-6 text-cyan-200 text-xs animate-twinkle">✦</div>
            <div className="absolute top-7 right-5 text-pink-200 text-xs animate-twinkle-delayed">★</div>
          </div>
        )}

        {/* 1000分 Rainbow Sparkles */}
        {student.points >= 1000 && (
          <div className="absolute top-2 right-10 text-sm animate-bounce drop-shadow">
            ✨
          </div>
        )}
      </div>

      {/* 1. UPPER SCENIC CANVAS (Exposes the pixel scenery, avatar, stickers, and tags) */}
      <div className="relative z-10 p-2.5 flex flex-col justify-between h-[142px]">
        {/* Top Header: Roll No & Selection Checkbox */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-[11px] bg-[#4a2e13]/90 text-[#ffebb3] px-2 py-0.5 rounded border border-[#2b1807] shadow-md backdrop-blur-xs">
              #{student.rollNo}
            </span>
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

        {/* Stage Area: Avatar Character standing proudly in front of the pixel scene */}
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
            <div className="relative p-1 rounded-2xl bg-[#fffefc]/90 border-3 border-[#6b421d] shadow-xl hover:border-[#ffd700] hover:ring-2 hover:ring-[#fabc3f] transition-all transform group-hover/avatar:scale-105 backdrop-blur-xs">
              <AvatarRenderer avatar={student.avatar} name={student.name} size={62} />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/35 rounded-xl opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold font-pixel">
                更換
              </div>
            </div>
          </div>

          {/* Mini Farm Scenery Props on the field (Stickers, Crops, Animals) */}
          <div className="flex items-end gap-1.5 pb-1 opacity-95 group-hover:scale-105 transition-transform">
            {miniCrop && (
              <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                <PixelSprite name={miniCrop} size={28} />
              </div>
            )}
            {miniAnimal && (
              <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                <PixelSprite name={miniAnimal} size={28} animate={student.points >= 150} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. LOWER PARCHMENT DOCK (Stardew Valley Wooden Framed Info Board) */}
      <div className="relative z-10 p-2.5 bg-[#faeed1] border-t-3 border-[#6b421d] shadow-[0_-3px_10px_rgba(0,0,0,0.25)] flex flex-col justify-between gap-1.5">
        {/* Student Name Row */}
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-black text-lg sm:text-xl text-[#3d240d] truncate leading-snug">
            {student.name}
          </h4>
        </div>

        {/* Score Bar with Gold Coin & 1000分 Farm Progress */}
        <div className="bg-[#ede0c2] border border-[#c4a675] rounded p-1.5 flex flex-col gap-1 shadow-inner">
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

        {/* Bottom Actions: "⭐ 評分", "🎨", "🏡", "🏠", "🍳" */}
        <div className="pt-1.5 border-t border-[#dfcca4] flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onOpenPointsModal(student);
            }}
            className="pixel-btn-gold flex-1 min-w-0 py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-md active:scale-95 transition-all whitespace-nowrap"
            title="開啟課堂加扣分評定"
          >
            <Star className="w-3.5 h-3.5 fill-[#633300] shrink-0" />
            <span className="truncate">評分</span>
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
              className="pixel-btn-green py-1.5 px-1.5 text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all text-white shrink-0"
              title="走進該同學的專屬農場，觀賞漫步動物與植物"
            >
              <span>🏡</span>
            </button>
          )}

          {onOpenRoomDetail && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playCorrect();
                onOpenRoomDetail(student);
              }}
              className="bg-[#b45309] hover:bg-[#92400e] border-2 border-[#78350f] py-1.5 px-1.5 text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all text-white shrink-0"
              title="走進該同學的專屬溫馨房間（每50分升級裝潢！）"
            >
              <span>🏠</span>
            </button>
          )}

          {onOpenKitchenDetail && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playCorrect();
                onOpenKitchenDetail(student);
              }}
              className="bg-[#c2410c] hover:bg-[#9a3412] border-2 border-[#7c2d12] py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all text-white shrink-0"
              title="走進該同學的專屬夢幻廚房（每50分升級廚房與料理！）"
            >
              <span>🍳</span>
            </button>
          )}

          {onOpenBathroomDetail && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playCorrect();
                onOpenBathroomDetail(student);
              }}
              className="bg-[#0284c7] hover:bg-[#0369a1] border-2 border-[#0c4a6e] py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all text-white shrink-0"
              title="走進該同學的專屬夢幻洗手間（每50分升級浴室與浴具！）"
            >
              <span>🛁</span>
            </button>
          )}

          {onOpenLivingRoomDetail && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playCorrect();
                onOpenLivingRoomDetail(student);
              }}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] border-2 border-[#4c1d95] py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all text-white shrink-0"
              title="走進該同學的專屬歡樂客廳（看電視、玩遊戲、吃喝玩樂！）"
            >
              <span>🛋️</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
