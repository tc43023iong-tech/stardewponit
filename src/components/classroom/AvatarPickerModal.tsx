import React, { useState, useMemo } from 'react';
import { Student } from '../../types/classroom';
import { STARDEW_AVATARS } from '../../data/classroomData';
import { STUDENT_CARD_BACKGROUND_OPTIONS } from '../../data/classroomThemes';
import { AvatarRenderer } from './AvatarRenderer';
import { soundManager } from '../../utils/sound';
import { X, Shuffle, Check, Search, Sparkles, Palette, User } from 'lucide-react';

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
  const [modalTab, setModalTab] = useState<'avatar' | 'cardBackground'>('avatar');
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

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs">
      <div className="pixel-wood-box max-w-4xl w-full flex flex-col overflow-hidden text-[#4a2800] max-h-[94vh] shadow-2xl">
        {/* Header */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffd700]" />
            <div>
              <h3 className="font-pixel text-xs sm:text-sm text-[#ffd700]">
                客製化學生風格：{student.name} (#{student.rollNo})
              </h3>
              <p className="text-[10px] text-[#fed7aa]">
                可自由挑選 70+ 款星露谷伙伴頭像，以及 11 種專屬卡片田園背景風格！
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

        {/* Live Preview Bar */}
        <div className="bg-[#f5e0b7] p-3 border-b-2 border-[#b88b4a] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-white border-2 border-[#8b5a2b] shadow-sm">
              <AvatarRenderer avatar={selectedAvatar} name={student.name} size={52} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-[#3b1f0b]">
                  {student.name}
                </span>
                <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-1.5 py-0.5 rounded">
                  #{student.rollNo}
                </span>
              </div>
              <div className="text-xs font-bold text-[#5a3818] mt-0.5 flex flex-wrap items-center gap-2">
                <span>頭像：<strong className="text-amber-900">{currentAvatarItem?.name.split(' ')[0] || selectedAvatar}</strong></span>
                <span>·</span>
                <span>背景：<strong className="text-emerald-900">{currentCardBgItem?.name || selectedCardBg}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRandomPick}
            className="px-3.5 py-1.5 bg-[#faeed1] hover:bg-[#ffeec2] border-2 border-[#8b5a2b] rounded-lg text-xs font-bold font-pixel flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 text-[#5a3818]"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>隨機挑選</span>
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="bg-[#4d2e13] px-3 pt-2.5 pb-2 border-b-2 border-[#361f0d] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
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
              <span>🖼️ 卡片背景風格 (11款)</span>
            </button>
          </div>

          {modalTab === 'avatar' && (
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
          )}
        </div>

        {/* Modal Body Tab 1: Avatars */}
        {modalTab === 'avatar' && (
          <div className="p-3 sm:p-4 bg-[#faeed1] overflow-y-auto max-h-[52vh]">
            {/* Sub Filters */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
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

            {filteredStardewAvatars.length === 0 ? (
              <div className="text-center py-10 text-stone-500 font-bold text-xs">
                找不到符合「{searchQuery}」的星露谷伙伴，請嘗試其他關鍵字。
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
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
                    <AvatarRenderer avatar={av.id} name={av.name} size={50} />
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

        {/* Modal Body Tab 2: Card Background Options */}
        {modalTab === 'cardBackground' && (
          <div className="p-3 sm:p-4 bg-[#faeed1] overflow-y-auto max-h-[52vh] space-y-3">
            <div className="bg-[#ede0c2] p-2.5 rounded-lg border border-[#c4a675] text-xs font-bold text-[#5a3818]">
              🎨 點擊下方卡片背景，即可為【{student.name}】套用獨一無二的田園背景視覺風格！
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {STUDENT_CARD_BACKGROUND_OPTIONS.map((bgOpt) => {
                const isSelected = selectedCardBg === bgOpt.id;

                return (
                  <div
                    key={bgOpt.id}
                    onClick={() => handlePickCardBg(bgOpt.id)}
                    className={`rounded-xl border-3 overflow-hidden cursor-pointer transition-all relative flex flex-col justify-between p-3 select-none ${
                      isSelected
                        ? 'border-[#fabc3f] ring-4 ring-[#fabc3f] shadow-lg scale-102 bg-white'
                        : 'border-[#8b5a2b] hover:border-amber-600 bg-white/90 shadow-xs hover:scale-101'
                    }`}
                  >
                    {/* Visual Mini Background Preview Box */}
                    <div className="relative h-20 rounded-lg overflow-hidden border-2 border-[#5a3818] shadow-inner mb-2">
                      {/* Sky layer */}
                      <div
                        className="absolute inset-x-0 top-0 h-12"
                        style={{ background: bgOpt.skyGradient }}
                      />
                      {/* Mountains */}
                      <svg
                        className="absolute top-4 inset-x-0 w-full h-8 opacity-40"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 25"
                      >
                        <polygon points="0,25 25,8 50,25 75,10 100,25" fill="#1b4332" />
                      </svg>
                      {/* Ground */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-8"
                        style={{
                          backgroundColor: bgOpt.groundBg,
                          backgroundImage: bgOpt.groundPattern,
                          backgroundSize: '12px 12px',
                        }}
                      />
                      {/* Center Badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl drop-shadow">{bgOpt.icon}</span>
                      </div>
                    </div>

                    {/* Content details */}
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#3d240d]">
                          {bgOpt.name}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-xs shadow">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-600 font-medium mt-1 line-clamp-2">
                        {bgOpt.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#faeed1] px-4 py-3 border-t-2 border-[#c4a675] flex items-center justify-between">
          <span className="text-xs text-[#5a3818] font-bold">
            當前設定：{currentAvatarItem?.name.split(' ')[0]} ｜ {currentCardBgItem?.name.split(' ')[0]}
          </span>
          <div className="flex items-center gap-2">
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
