import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { getStudentKitchenArtwork, LIVE_KITCHEN_DISH_ROSTER } from '../../utils/kitchenArtwork';
import { AvatarRenderer } from './AvatarRenderer';
import { StudentKitchenDetailModal } from './StudentKitchenDetailModal';
import { soundManager } from '../../utils/sound';
import { ChefHat, Eye } from 'lucide-react';

interface KitchenShowcaseViewProps {
  students: Student[];
  onOpenPointsModal: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onSwitchToFarm?: (student: Student) => void;
  onSwitchToRoom?: (student: Student) => void;
  onSwitchToBathroom?: (student: Student) => void;
}

export const KitchenShowcaseView: React.FC<KitchenShowcaseViewProps> = ({
  students,
  onOpenPointsModal,
  onQuickAdd,
  onSwitchToFarm,
  onSwitchToRoom,
  onSwitchToBathroom,
}) => {
  const [inspectingStudent, setInspectingStudent] = useState<Student | null>(null);

  const handleOpenStudentKitchen = (student: Student) => {
    soundManager.playCorrect();
    setInspectingStudent(student);
  };

  return (
    <div className="space-y-4">
      {/* Kitchen Header */}
      <div className="pixel-parchment p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#c2410c] border-2 border-[#7c2d12] rounded-lg flex items-center justify-center text-white shadow">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-pixel text-sm sm:text-base text-[#4a2800]">
              🍳 星露谷學生專屬廚房 (Dream Student Kitchens)
            </h3>
            <p className="text-xs text-stone-700 font-bold">
              每位同學都能打造專屬夢幻廚房！每湊夠 50 分自動擴建升級灶台與美食風格（50 → 1250 分共 25 間專屬廚房，還能解鎖 16 道經典星露谷佳餚）！
            </p>
          </div>
        </div>

        {/* 1250分 50-Point Kitchen Progression Legend */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a3818] flex-wrap bg-[#f5e0b7] px-3 py-1.5 rounded-lg border border-[#c4a675]">
          <span className="text-rose-800">🕸️ &lt;0舊灶間</span>
          <span aria-hidden="true">·</span>
          <span>🪵 0小廚灶</span>
          <span aria-hidden="true">→</span>
          <span>🌿 50香草房</span>
          <span aria-hidden="true">→</span>
          <span>🌻 100烘焙坊</span>
          <span aria-hidden="true">→</span>
          <span>🍕 150石窯屋</span>
          <span aria-hidden="true">→</span>
          <span>🥞 200雙爐廚</span>
          <span aria-hidden="true">→</span>
          <span>🍯 300果醬坊</span>
          <span aria-hidden="true">→</span>
          <span>🥗 400溫室館</span>
          <span aria-hidden="true">→</span>
          <span>🔮 500魔藥廚</span>
          <span aria-hidden="true">→</span>
          <span>🍣 600櫻花料亭</span>
          <span aria-hidden="true">→</span>
          <span>🌙 700星月餐廚</span>
          <span aria-hidden="true">→</span>
          <span>🏝️ 750薑島吧</span>
          <span aria-hidden="true">→</span>
          <span>🦞 800海鮮館</span>
          <span aria-hidden="true">→</span>
          <span>☕ 850咖啡殿</span>
          <span aria-hidden="true">→</span>
          <span>👑 900皇家御膳</span>
          <span aria-hidden="true">→</span>
          <span>✨ 1000極光冰館</span>
          <span aria-hidden="true">→</span>
          <span>🐉 1050翡翠點心</span>
          <span aria-hidden="true">→</span>
          <span>🪽 1100天界廚</span>
          <span aria-hidden="true">→</span>
          <span>🌌 1150銀河料理</span>
          <span aria-hidden="true">→</span>
          <span>☀️ 1200金陽盛宴</span>
          <span aria-hidden="true">→</span>
          <span className="text-amber-900 font-black">💎 1250宇宙廚神殿 (每50分升級!)</span>
        </div>
      </div>

      {/* Pixel-Art Student Kitchen Cards Grid */}
      <div className="bg-[#3d220a] border-4 border-[#251305] p-3.5 sm:p-5 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {students.map((st) => {
            const kitchenArtwork = getStudentKitchenArtwork(st.points);
            const companionId = st.stardewAvatar || st.avatar || 'sdv_white_chicken';
            const unlockedDishes =
              st.points < 0
                ? []
                : LIVE_KITCHEN_DISH_ROSTER.filter((d) => d.unlockScore <= st.points);
            const previewDishes = unlockedDishes.slice(-4);

            return (
              <div
                key={st.id}
                onClick={() => handleOpenStudentKitchen(st)}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer select-none aspect-[16/11] flex flex-col justify-between bg-[#2b1807] shadow-md hover:shadow-2xl hover:-translate-y-0.5 ${
                  st.points < 0
                    ? 'border-[#f43f5e]/80 ring-1 ring-rose-500/40'
                    : st.points >= 1250
                    ? 'border-[#fde047] ring-2 ring-[#f59e0b]'
                    : st.points >= 1000
                    ? 'border-[#fbbf24] ring-2 ring-[#fde047]'
                    : st.points >= 700
                    ? 'border-[#818cf8]'
                    : st.points >= 400
                    ? 'border-[#fb923c]'
                    : st.points >= 100
                    ? 'border-[#f59e0b]'
                    : 'border-[#8b5a2b] hover:border-[#fbbf24]'
                }`}
              >
                {/* 16-bit Pixel Art Interior Kitchen Backdrop */}
                <img
                  src={kitchenArtwork.bgUrl}
                  alt={`${st.name} 的星露谷廚房`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/60 pointer-events-none" />

                {/* Top Row: Roll No & Points */}
                <div className="relative z-10 px-2.5 pt-2 flex items-center justify-between text-xs text-white">
                  <span className="font-mono font-black tracking-tight tabular-nums drop-shadow-sm">
                    #{String(st.rollNo).padStart(2, '0')} {st.name}
                  </span>
                  <span className="font-mono font-black text-[#fde047] tabular-nums drop-shadow-sm">
                    {st.points} 分
                  </span>
                </div>

                {/* Kitchen Companion + Unlocked Pixel Dishes Tray */}
                <div className="relative z-10 flex flex-col items-center justify-end gap-1.5 my-auto pt-2 pointer-events-none">
                  {st.points < 0 ? (
                    <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                      <div className="animate-crow-hop-flap">
                        <AvatarRenderer avatar="sdv_crow" name="冷灶烏鴉" size={40} bare={true} />
                      </div>
                      <div className="w-6 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                    </div>
                  ) : (
                    <>
                      <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                        <AvatarRenderer avatar={companionId} name={st.name} size={38} bare={true} />
                        <div className="w-7 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                      </div>
                      <div className="flex items-center gap-1 bg-[#2b1807]/80 border border-[#a16207]/70 px-1.5 py-0.5 rounded-lg shadow">
                        {previewDishes.map((dish) => (
                          <AvatarRenderer
                            key={dish.id}
                            avatar={dish.url}
                            name={dish.name}
                            size={22}
                            bare={true}
                          />
                        ))}
                        <span className="text-[9px] font-pixel text-[#fde68a] pl-0.5">
                          {unlockedDishes.length}/{LIVE_KITCHEN_DISH_ROSTER.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom Row: Kitchen Name & Enter Action */}
                <div className="relative z-10 px-2.5 pb-2 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-amber-100/95 font-bold truncate drop-shadow-sm">
                    {kitchenArtwork.icon} {kitchenArtwork.kitchenTitle}
                  </span>
                  <span className="text-[#fde047] font-bold flex items-center gap-1 shrink-0 group-hover:text-white transition-colors whitespace-nowrap">
                    <Eye className="w-3 h-3" />
                    進入
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Student Kitchen Exploration Modal */}
      {inspectingStudent && (() => {
        const liveInspectingStudent =
          students.find((s) => s.id === inspectingStudent.id) || inspectingStudent;
        return (
          <StudentKitchenDetailModal
            student={liveInspectingStudent}
            onClose={() => setInspectingStudent(null)}
            onQuickAdd={onQuickAdd}
            onOpenPointsModal={onOpenPointsModal}
            onSwitchToFarm={
              onSwitchToFarm
                ? (st) => {
                    setInspectingStudent(null);
                    onSwitchToFarm(st);
                  }
                : undefined
            }
            onSwitchToRoom={
              onSwitchToRoom
                ? (st) => {
                    setInspectingStudent(null);
                    onSwitchToRoom(st);
                  }
                : undefined
            }
            onSwitchToBathroom={
              onSwitchToBathroom
                ? (st) => {
                    setInspectingStudent(null);
                    onSwitchToBathroom(st);
                  }
                : undefined
            }
          />
        );
      })()}
    </div>
  );
};
