import React, { useState, useMemo } from 'react';
import { Student } from '../../types/classroom';
import { STARDEW_AVATARS } from '../../data/classroomData';
import { STUDENT_CARD_BACKGROUND_OPTIONS, CardBackgroundOption } from '../../data/classroomThemes';
import { CARD_PIXEL_BG_IMAGES } from '../../data/scenicBackgrounds';
import { AvatarRenderer } from './AvatarRenderer';
import { StudentCard } from './StudentCard';
import { soundManager } from '../../utils/sound';
import { X, Shuffle, Check, Search, Sparkles, Palette, User, Eye, Flame, Trees, Sparkle } from 'lucide-react';

interface AvatarPickerModalProps {
  student: Student;
  onClose: () => void;
  onSaveAvatar: (studentId: string, avatarUrlOrSprite: string, cardBackground?: string) => void;
}

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  student,
  onClose,
  onSaveAvatar,
}) => {
  const [modalTab, setModalTab] = useState<'avatar' | 'cardBackground'>('cardBackground');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(student.avatar || 'sdv_white_chicken');
  const [selectedCardBg, setSelectedCardBg] = useState<string>(student.cardBackground || 'auto');
  const [stardewSubFilter, setStardewSubFilter] = useState<'all' | 'animals' | 'villagers' | 'treasures'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handlePickAvatar = (avatarValue: string) => {
    soundManager.playClick();
    setSelectedAvatar(avatarValue);
  };

  const handlePickCardBg = (bgId: string) => {
    soundManager.playClick();
    setSelectedCardBg(bgId);
  };

  const handleRandomPick = () => {
    soundManager.playTick();
    if (modalTab === 'avatar') {
      const rand = STARDEW_AVATARS[Math.floor(Math.random() * STARDEW_AVATARS.length)];
      if (rand) {
        setSelectedAvatar(rand.id);
      }
    } else {
      const randBg = STUDENT_CARD_BACKGROUND_OPTIONS[Math.floor(Math.random() * STUDENT_CARD_BACKGROUND_OPTIONS.length)];
      if (randBg) {
        setSelectedCardBg(randBg.id);
      }
    }
  };

  const handleSave = () => {
    soundManager.playCorrect();
    onSaveAvatar(student.id, selectedAvatar, selectedCardBg);
    onClose();
  };

  // Filter Stardew avatars
  const filteredStardewAvatars = useMemo(() => {
    return STARDEW_AVATARS.filter((a) => {
      const matchSub = stardewSubFilter === 'all' || a.category === stardewSubFilter;
      const matchSearch =
        searchQuery === '' ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.role && a.role.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSub && matchSearch;
    });
  }, [stardewSubFilter, searchQuery]);

  const currentAvatarItem = STARDEW_AVATARS.find((a) => a.id === selectedAvatar);
  const currentCardBgItem = STUDENT_CARD_BACKGROUND_OPTIONS.find((b) => b.id === selectedCardBg);

  // Live Student Object for Instant Card Preview
  const previewStudent: Student = {
    ...student,
    avatar: selectedAvatar,
    cardBackground: selectedCardBg,
  };

  // Filter groups for background options
  const new5PixelAssets = STUDENT_CARD_BACKGROUND_OPTIONS.filter((o) =>
    ['desert_oasis', 'volcano_caldera', 'mushroom_cave', 'moonlight_jellies', 'junimo_orchard'].includes(o.id)
  );

  const seasonalAssets = STUDENT_CARD_BACKGROUND_OPTIONS.filter((o) =>
    ['auto', 'spring', 'summer', 'autumn', 'winter'].includes(o.id)
  );

  const mysticFantasyAssets = STUDENT_CARD_BACKGROUND_OPTIONS.filter((o) =>
    ['iridium', 'golden', 'forest', 'ocean', 'cabin', 'galaxy'].includes(o.id)
  );

  const renderBackgroundCard = (bgOpt: CardBackgroundOption, isNewBadge = false) => {
    const isSelected = selectedCardBg === bgOpt.id;

    return (
      <div
        key={bgOpt.id}
        onClick={() => handlePickCardBg(bgOpt.id)}
        className={`rounded-xl border-3 overflow-hidden cursor-pointer transition-all relative flex flex-col justify-between p-2.5 select-none ${
          isSelected
            ? 'border-[#fabc3f] ring-4 ring-[#fabc3f] shadow-lg scale-102 bg-white'
            : 'border-[#8b5a2b] hover:border-amber-600 bg-white/95 shadow-xs hover:scale-101'
        }`}
      >
        {/* NEW Badge if it's one of the 5 new pixel material assets */}
        {isNewBadge && (
          <span className="absolute top-1.5 right-1.5 z-10 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-pixel text-[8px] font-black px-1.5 py-0.5 rounded shadow">
            NEW
          </span>
        )}

        {/* Visual Mini Background Preview Box with Real Pixel Art */}
        <div className="relative h-20 rounded-lg overflow-hidden border-2 border-[#5a3818] shadow-inner mb-1.5 bg-[#2a1708]">
          {CARD_PIXEL_BG_IMAGES[bgOpt.id] ? (
            <img
              src={CARD_PIXEL_BG_IMAGES[bgOpt.id]}
              alt={bgOpt.name}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: bgOpt.skyGradient }}
            />
          )}
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span className="text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{bgOpt.icon}</span>
          </div>
        </div>

        {/* Content details */}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#3d240d] truncate">
              {bgOpt.name}
            </span>
            {isSelected && (
              <span className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] shadow shrink-0 ml-1">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            )}
          </div>
          <p className="text-[10px] text-stone-600 font-medium mt-0.5 line-clamp-1">
            {bgOpt.summary}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs">
      <div className="pixel-wood-box max-w-5xl w-full flex flex-col overflow-hidden text-[#4a2800] max-h-[94vh] shadow-2xl">
        {/* Header */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-2.5 border-b-4 border-[#361f0d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffd700]" />
            <div>
              <h3 className="font-pixel text-xs sm:text-sm text-[#ffd700]">
                客製化學生風格：{student.name} (#{student.rollNo})
              </h3>
              <p className="text-[10px] text-[#fed7aa]">
                提供 16 種星露谷像素卡片背景素材，點擊右方素材即可在此即時預覽卡片變換！
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 hover:bg-[#8b5a2b] text-[#ffd700] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="bg-[#4d2e13] px-3 pt-2 pb-1.5 border-b-2 border-[#361f0d] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setModalTab('cardBackground');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-pixel flex items-center gap-1.5 cursor-pointer transition-colors ${
                modalTab === 'cardBackground'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#fed7aa] hover:bg-[#7c4f24]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>🖼️ 卡片背景素材 (16款含5款全新像素素材)</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setModalTab('avatar');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-pixel flex items-center gap-1.5 cursor-pointer transition-colors ${
                modalTab === 'avatar'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#fed7aa] hover:bg-[#7c4f24]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>🌾 星露谷伙伴頭像 ({STARDEW_AVATARS.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomPick}
              className="px-3 py-1 bg-[#faeed1] hover:bg-[#ffeec2] border-2 border-[#8b5a2b] rounded-lg text-[11px] font-bold font-pixel flex items-center gap-1 cursor-pointer shadow-xs active:scale-95 text-[#5a3818]"
            >
              <Shuffle className="w-3 h-3" />
              <span>隨機挑選</span>
            </button>
          </div>
        </div>

        {/* Modal Body Tab 1: Card Background Options WITH DIRECT LIVE STUDENT CARD PREVIEW */}
        {modalTab === 'cardBackground' && (
          <div className="p-3 sm:p-4 bg-[#faeed1] overflow-y-auto max-h-[64vh]">
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              {/* Left Column: REAL LIVE STUDENT CARD PREVIEW (點擊後直接預覽應用於學生卡片) */}
              <div className="w-full lg:w-68 shrink-0 bg-[#ede0c2] p-3 rounded-2xl border-3 border-[#8b5a2b] shadow-lg flex flex-col items-center sticky top-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4a2800] mb-2 font-pixel">
                  <Eye className="w-4 h-4 text-amber-700" />
                  <span>卡片即時預覽效果</span>
                </div>

                {/* The actual real Student Card rendering live */}
                <div className="w-full max-w-[240px] pointer-events-none drop-shadow-md">
                  <StudentCard
                    student={previewStudent}
                    isSelected={false}
                    onToggleSelect={() => {}}
                    onQuickAdd={() => {}}
                    onOpenPointsModal={() => {}}
                    onChangeAvatar={() => {}}
                  />
                </div>

                <div className="mt-2 text-center">
                  <span className="font-pixel text-[10px] text-[#854d0e] bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 block">
                    當前背景：{currentCardBgItem?.name}
                  </span>
                  <p className="text-[10px] text-stone-600 font-bold mt-1">
                    👆 點擊右側任一背景素材，此卡片立即即時變換！
                  </p>
                </div>
              </div>

              {/* Right Column: Background options grouped nicely */}
              <div className="flex-1 space-y-4 min-w-0">
                {/* GROUP 1: 5 BRAND NEW STARDEW VALLEY PIXEL ASSETS (新增 5 款星露谷風的像素背景素材) */}
                <div className="bg-[#fef3c7] p-3 rounded-xl border-2 border-[#ca8a04] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">✨</span>
                      <h4 className="font-pixel text-xs text-[#854d0e] font-black">
                        【新增 5 款星露谷風像素背景素材】
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded">
                      點擊即時套用預覽
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {new5PixelAssets.map((bgOpt) => renderBackgroundCard(bgOpt, true))}
                  </div>
                </div>

                {/* GROUP 2: 🌾 經典田園與四季風格 */}
                <div>
                  <h4 className="font-pixel text-[11px] text-[#5a3818] font-bold mb-1.5 flex items-center gap-1">
                    <span>🌾 經典田園與四季季節風格</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {seasonalAssets.map((bgOpt) => renderBackgroundCard(bgOpt, false))}
                  </div>
                </div>

                {/* GROUP 3: 🔮 秘境、海濱與莊園風格 */}
                <div>
                  <h4 className="font-pixel text-[11px] text-[#5a3818] font-bold mb-1.5 flex items-center gap-1">
                    <span>🔮 魔法秘境、海濱與星空風格</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {mysticFantasyAssets.map((bgOpt) => renderBackgroundCard(bgOpt, false))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body Tab 2: Avatars */}
        {modalTab === 'avatar' && (
          <div className="p-3 sm:p-4 bg-[#faeed1] overflow-y-auto max-h-[64vh]">
            {/* Sub Filters & Search */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: `全部 (${STARDEW_AVATARS.length})` },
                  { id: 'animals', label: '🌾 農場動物 (15+種)' },
                  { id: 'villagers', label: '🏡 小鎮村民 (40+位)' },
                  { id: 'treasures', label: '💎 傳奇珍寶與神魚' },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      soundManager.playClick();
                      setStardewSubFilter(sub.id as any);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md cursor-pointer border ${
                      stardewSubFilter === sub.id
                        ? 'bg-[#6a4422] text-[#ffebb3] border-[#361f0d]'
                        : 'bg-[#faeed1] text-stone-700 border-[#c4a675] hover:bg-[#ffeec2]'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[150px] max-w-[210px] flex-1 sm:flex-none">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋頭像..."
                  className="w-full bg-[#fdfbf7] border border-[#8b5a2b] pl-8 pr-2.5 py-1 text-xs rounded-lg focus:outline-none font-bold text-[#4a2800]"
                />
              </div>
            </div>

            {filteredStardewAvatars.length === 0 ? (
              <div className="text-center py-10 text-stone-500 font-bold text-xs">
                找不到符合「{searchQuery}」的星露谷伙伴，請嘗試其他關鍵字。
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {filteredStardewAvatars.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => handlePickAvatar(av.id)}
                    className={`p-2 rounded-xl flex flex-col items-center border-2 transition-all cursor-pointer relative group ${
                      selectedAvatar === av.id
                        ? 'bg-[#ffeec2] border-[#fabc3f] ring-3 ring-[#fabc3f] scale-102 shadow-md'
                        : 'bg-white hover:bg-amber-50/70 border-[#c4a675] shadow-xs'
                    }`}
                  >
                    <AvatarRenderer avatar={av.id} name={av.name} size={48} />
                    <span className="text-[11px] font-bold text-[#5a3818] mt-1 text-center truncate w-full">
                      {av.name.split(' ')[0]}
                    </span>
                    {av.role && (
                      <span className="text-[9px] text-stone-500 truncate w-full text-center font-bold">
                        {av.role}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#faeed1] px-4 py-2.5 border-t-2 border-[#c4a675] flex items-center justify-between">
          <span className="text-xs text-[#5a3818] font-bold truncate pr-2">
            當前設定：【{currentAvatarItem?.name.split(' ')[0]}】｜【{currentCardBgItem?.name}】
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] text-xs font-bold border border-[#a3794b] rounded-lg cursor-pointer"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="pixel-btn-green px-5 py-1.5 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>確認套用</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
