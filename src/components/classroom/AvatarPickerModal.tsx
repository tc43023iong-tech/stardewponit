import React, { useState, useMemo } from 'react';
import { Student } from '../../types/classroom';
import { STARDEW_AVATARS, StardewAvatarItem } from '../../data/classroomData';
import { AvatarRenderer } from './AvatarRenderer';
import { soundManager } from '../../utils/sound';
import { X, Shuffle, Check, Search, Sparkles } from 'lucide-react';

interface AvatarPickerModalProps {
  student: Student;
  onClose: () => void;
  onSaveAvatar: (studentId: string, avatarUrlOrSprite: string) => void;
}

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  student,
  onClose,
  onSaveAvatar,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(student.avatar || 'sdv_white_chicken');
  const [stardewSubFilter, setStardewSubFilter] = useState<'all' | 'animals' | 'villagers' | 'treasures'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handlePick = (avatarValue: string) => {
    soundManager.playClick();
    setSelectedAvatar(avatarValue);
  };

  const handleRandomPick = () => {
    soundManager.playTick();
    const rand = STARDEW_AVATARS[Math.floor(Math.random() * STARDEW_AVATARS.length)];
    if (rand) {
      setSelectedAvatar(rand.id);
    }
  };

  const handleSave = () => {
    soundManager.playCorrect();
    onSaveAvatar(student.id, selectedAvatar);
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

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
      <div className="pixel-wood-box max-w-3xl w-full flex flex-col overflow-hidden text-[#4a2800] max-h-[92vh] shadow-2xl">
        {/* Header */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffd700]" />
            <div>
              <h3 className="font-pixel text-xs sm:text-sm">
                更換星露谷伙伴頭像：{student.name} (#{student.rollNo})
              </h3>
              <p className="text-[10px] text-[#fed7aa]">
                純星露谷主題 · 提供 70+ 款農場咕咕雞、小鴨、松露萌豬、鵜鶘鎮村民與珍奇寶物！
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

        {/* Current Preview Bar */}
        <div className="bg-[#f5e0b7] p-3 border-b-2 border-[#b88b4a] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-1 rounded-xl bg-white border-2 border-[#8b5a2b] shadow-sm">
              <AvatarRenderer avatar={selectedAvatar} name={student.name} size={54} />
            </div>
            <div>
              <span className="text-xs font-bold text-[#5a3818] block">當前選中伙伴</span>
              <span className="text-xs font-extrabold text-[#3b1f0b] block">
                {currentAvatarItem?.name || selectedAvatar}
              </span>
              {currentAvatarItem?.role && (
                <span className="text-[11px] text-[#854d0e] font-bold block">
                  ✨ {currentAvatarItem.role}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleRandomPick}
            className="px-3.5 py-2 bg-[#faeed1] hover:bg-[#ffeec2] border-2 border-[#8b5a2b] rounded-lg text-xs font-bold font-pixel flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 text-[#5a3818]"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>隨機挑選</span>
          </button>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="bg-[#4d2e13] px-3 pt-2.5 pb-2 border-b-2 border-[#361f0d] flex flex-wrap items-center justify-between gap-2">
          {/* Sub Filters */}
          <div className="flex flex-wrap items-center gap-1">
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
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                  stardewSubFilter === sub.id
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#fed7aa] hover:bg-[#7c4f24]'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[150px] max-w-[210px] flex-1 sm:flex-none">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋伙伴名稱..."
              className="w-full bg-[#fdfbf7] border border-[#8b5a2b] pl-8 pr-2.5 py-1 text-xs rounded-lg focus:outline-none font-bold text-[#4a2800]"
            />
          </div>
        </div>

        {/* Avatar Grid (Pure Stardew Valley) */}
        <div className="p-4 bg-[#faeed1] overflow-y-auto max-h-[52vh]">
          {filteredStardewAvatars.length === 0 ? (
            <div className="text-center py-10 text-stone-500 font-bold text-xs">
              找不到符合「{searchQuery}」的星露谷伙伴，請嘗試其他關鍵字。
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filteredStardewAvatars.map((av) => (
                <button
                  key={av.id}
                  onClick={() => handlePick(av.id)}
                  className={`p-2.5 rounded-xl flex flex-col items-center border-2 transition-all cursor-pointer relative group ${
                    selectedAvatar === av.id
                      ? 'bg-[#ffeec2] border-[#fabc3f] ring-3 ring-[#fabc3f] scale-102 shadow-md'
                      : 'bg-white hover:bg-amber-50/70 border-[#c4a675] shadow-xs'
                  }`}
                >
                  <AvatarRenderer avatar={av.id} name={av.name} size={54} />
                  <span className="text-[11px] font-bold text-[#5a3818] mt-1.5 text-center truncate w-full">
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

        {/* Footer */}
        <div className="bg-[#faeed1] px-4 py-3 border-t-2 border-[#c4a675] flex items-center justify-between">
          <span className="text-xs text-[#5a3818] font-bold">
            已選中：{currentAvatarItem?.name || '專屬頭像'}
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
              <span>套用星露谷頭像</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
