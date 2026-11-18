import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { getStudentRoomArtwork } from '../../utils/roomArtwork';
import { AvatarRenderer } from './AvatarRenderer';
import { StudentRoomDetailModal } from './StudentRoomDetailModal';
import { soundManager } from '../../utils/sound';
import { Home, Eye } from 'lucide-react';

interface RoomShowcaseViewProps {
  students: Student[];
  onOpenPointsModal: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onSwitchToFarm?: (student: Student) => void;
  onSwitchToKitchen?: (student: Student) => void;
}

export const RoomShowcaseView: React.FC<RoomShowcaseViewProps> = ({
  students,
  onOpenPointsModal,
  onQuickAdd,
  onSwitchToFarm,
  onSwitchToKitchen,
}) => {
  const [inspectingStudent, setInspectingStudent] = useState<Student | null>(null);

  const handleOpenStudentRoom = (student: Student) => {
    soundManager.playCorrect();
    setInspectingStudent(student);
  };

  return (
    <div className="space-y-4">
      {/* Room Header */}
      <div className="pixel-parchment p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#b45309] border-2 border-[#78350f] rounded-lg flex items-center justify-center text-white shadow">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-pixel text-sm sm:text-base text-[#4a2800]">
              🏠 星露谷學生溫馨房間 (Cozy Student Rooms)
            </h3>
            <p className="text-xs text-stone-700 font-bold">
              每位同學除了戶外農場，還擁有專屬小屋房間！每湊夠 50 分即自動翻新擴建（50 → 1250 分共 25 間漸進豪華房型）！
            </p>
          </div>
        </div>

        {/* 1250分 50-Point Room Progression Legend */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a3818] flex-wrap bg-[#f5e0b7] px-3 py-1.5 rounded-lg border border-[#c4a675]">
          <span className="text-rose-800">🕸️ &lt;0雨夜閣樓</span>
          <span aria-hidden="true">·</span>
          <span>🪵 0小木屋</span>
          <span aria-hidden="true">→</span>
          <span>💠 50茶香房</span>
          <span aria-hidden="true">→</span>
          <span>🌻 100暖爐廳</span>
          <span aria-hidden="true">→</span>
          <span>🍳 200兩房套房</span>
          <span aria-hidden="true">→</span>
          <span>🎹 300鋼琴廳</span>
          <span aria-hidden="true">→</span>
          <span>🌹 400花房</span>
          <span aria-hidden="true">→</span>
          <span>🔮 500魔法齋</span>
          <span aria-hidden="true">→</span>
          <span>🌸 600櫻花茶室</span>
          <span aria-hidden="true">→</span>
          <span>🌙 700觀星閣</span>
          <span aria-hidden="true">→</span>
          <span>🐠 800水族豪宅</span>
          <span aria-hidden="true">→</span>
          <span>👑 900金輝宮廷</span>
          <span aria-hidden="true">→</span>
          <span>✨ 1000極光殿</span>
          <span aria-hidden="true">→</span>
          <span>🏯 1050翡翠宮</span>
          <span aria-hidden="true">→</span>
          <span>🪽 1100天界殿</span>
          <span aria-hidden="true">→</span>
          <span>🌌 1150星環殿</span>
          <span aria-hidden="true">→</span>
          <span>🏛️ 1200黃金廳</span>
          <span aria-hidden="true">→</span>
          <span className="text-amber-900 font-black">💎 1250宇宙神殿 (每50分升級!)</span>
        </div>
      </div>

      {/* Pixel-Art Student Room Cards Grid */}
      <div className="bg-[#3d220a] border-4 border-[#251305] p-3.5 sm:p-5 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {students.map((st) => {
            const roomArtwork = getStudentRoomArtwork(st.points);
            const companionId = st.stardewAvatar || st.avatar || 'sdv_white_chicken';

            return (
              <div
                key={st.id}
                onClick={() => handleOpenStudentRoom(st)}
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
                    ? 'border-[#c084fc]'
                    : st.points >= 100
                    ? 'border-[#f59e0b]'
                    : 'border-[#8b5a2b] hover:border-[#fbbf24]'
                }`}
              >
                {/* 16-bit Pixel Art Interior Room Backdrop */}
                <img
                  src={roomArtwork.bgUrl}
                  alt={`${st.name} 的星露谷房間`}
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

                {/* Indoor Companion */}
                <div className="relative z-10 flex items-end justify-center gap-2 my-auto pt-4 pointer-events-none">
                  {st.points < 0 ? (
                    <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                      <div className="animate-crow-hop-flap">
                        <AvatarRenderer avatar="sdv_crow" name="閣樓烏鴉" size={40} bare={true} />
                      </div>
                      <div className="w-6 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                      <AvatarRenderer avatar={companionId} name={st.name} size={42} bare={true} />
                      <div className="w-7 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                    </div>
                  )}
                </div>

                {/* Bottom Row: Room Name & Enter Action */}
                <div className="relative z-10 px-2.5 pb-2 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-amber-100/95 font-bold truncate drop-shadow-sm">
                    {roomArtwork.icon} {roomArtwork.roomTitle}
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

      {/* Dedicated Student Room Exploration Modal */}
      {inspectingStudent && (() => {
        const liveInspectingStudent =
          students.find((s) => s.id === inspectingStudent.id) || inspectingStudent;
        return (
          <StudentRoomDetailModal
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
            onSwitchToKitchen={
              onSwitchToKitchen
                ? (st) => {
                    setInspectingStudent(null);
                    onSwitchToKitchen(st);
                  }
                : undefined
            }
          />
        );
      })()}
    </div>
  );
};
