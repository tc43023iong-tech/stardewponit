import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import {
  getStudentLivingRoomArtwork,
  LIVE_LIVING_ROOM_ACTIVITIES,
} from '../../utils/livingRoomArtwork';
import { AvatarRenderer } from './AvatarRenderer';
import { StudentLivingRoomDetailModal } from './StudentLivingRoomDetailModal';
import { soundManager } from '../../utils/sound';
import { Tv, Eye } from 'lucide-react';

interface LivingRoomShowcaseViewProps {
  students: Student[];
  onOpenPointsModal: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onSwitchToFarm?: (student: Student) => void;
  onSwitchToRoom?: (student: Student) => void;
  onSwitchToKitchen?: (student: Student) => void;
  onSwitchToBathroom?: (student: Student) => void;
}

export const LivingRoomShowcaseView: React.FC<LivingRoomShowcaseViewProps> = ({
  students,
  onOpenPointsModal,
  onQuickAdd,
  onSwitchToFarm,
  onSwitchToRoom,
  onSwitchToKitchen,
  onSwitchToBathroom,
}) => {
  const [inspectingStudent, setInspectingStudent] = useState<Student | null>(null);

  const handleOpenStudentLivingRoom = (student: Student) => {
    soundManager.playCorrect();
    setInspectingStudent(student);
  };

  return (
    <div className="space-y-4">
      {/* Living Room Header */}
      <div className="pixel-parchment p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7c3aed] border-2 border-[#4c1d95] rounded-lg flex items-center justify-center text-white shadow">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-pixel text-sm sm:text-base text-[#4a2800]">
              🛋️ 星露谷學生專屬歡樂客廳 (Dream Student Living Rooms)
            </h3>
            <p className="text-xs text-stone-700 font-bold">
              可以在客廳玩小遊戲、轉台看電視、享用爆米花飲料與桌遊手作！每湊夠 50 分全面升級娛樂廳（50 → 1250 分共 25 間專屬客廳，解鎖 {LIVE_LIVING_ROOM_ACTIVITIES.length} 項吃喝玩樂寶貝）！
            </p>
          </div>
        </div>

        {/* 1250分 50-Point Living Room Progression Legend */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a3818] flex-wrap bg-[#f5e0b7] px-3 py-1.5 rounded-lg border border-[#c4a675]">
          <span className="text-rose-800">🕯️ &lt;0停電客廳</span>
          <span aria-hidden="true">·</span>
          <span>📺 0木屋電視</span>
          <span aria-hidden="true">→</span>
          <span>🎮 50紅白機</span>
          <span aria-hidden="true">→</span>
          <span>🌻 100向陽茶點</span>
          <span aria-hidden="true">→</span>
          <span>🍿 150奶昔吧</span>
          <span aria-hidden="true">→</span>
          <span>🕹️ 200街機角</span>
          <span aria-hidden="true">→</span>
          <span>🎬 250壁爐影廳</span>
          <span aria-hidden="true">→</span>
          <span>🎤 300歡唱廳</span>
          <span aria-hidden="true">→</span>
          <span>🌿 400溫室茶座</span>
          <span aria-hidden="true">→</span>
          <span>🔮 500霓虹電玩</span>
          <span aria-hidden="true">→</span>
          <span>🌸 600櫻花劇院</span>
          <span aria-hidden="true">→</span>
          <span>🌙 700星空露台</span>
          <span aria-hidden="true">→</span>
          <span>🐠 800水族劇院</span>
          <span aria-hidden="true">→</span>
          <span>👑 900皇家宴會</span>
          <span aria-hidden="true">→</span>
          <span>🌌 1000極光電競</span>
          <span aria-hidden="true">→</span>
          <span>🌠 1150銀河全息</span>
          <span aria-hidden="true">→</span>
          <span className="text-violet-900 font-black">⭐ 1250星果娛樂聖殿 (每50分升級!)</span>
        </div>
      </div>

      {/* Pixel-Art Student Living Room Cards Grid */}
      <div className="bg-[#3d220a] border-4 border-[#251305] p-3.5 sm:p-5 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {students.map((st) => {
            const livingArtwork = getStudentLivingRoomArtwork(st.points);
            const companionId = st.stardewAvatar || st.avatar || 'sdv_dog';
            const unlockedActivities =
              st.points < 0
                ? []
                : LIVE_LIVING_ROOM_ACTIVITIES.filter((item) => item.unlockScore <= st.points);
            const previewItems = unlockedActivities.slice(-4);

            return (
              <div
                key={st.id}
                onClick={() => handleOpenStudentLivingRoom(st)}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer select-none aspect-[16/11] flex flex-col justify-between bg-[#1e1b4b] shadow-md hover:shadow-2xl hover:-translate-y-0.5 ${
                  st.points < 0
                    ? 'border-[#f43f5e]/80 ring-1 ring-rose-500/40'
                    : st.points >= 1250
                    ? 'border-[#f472b6] ring-2 ring-[#fde047]'
                    : st.points >= 1000
                    ? 'border-[#c084fc] ring-2 ring-[#f472b6]'
                    : st.points >= 700
                    ? 'border-[#818cf8]'
                    : st.points >= 400
                    ? 'border-[#a855f7]'
                    : st.points >= 100
                    ? 'border-[#7c3aed]'
                    : 'border-[#8b5a2b] hover:border-[#c084fc]'
                }`}
              >
                {/* 16-bit Pixel Art Interior Living Room Backdrop */}
                <img
                  src={livingArtwork.bgUrl}
                  alt={`${st.name} 的星露谷歡樂客廳`}
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
                  <span className="font-mono font-black text-[#e9d5ff] tabular-nums drop-shadow-sm">
                    {st.points} 分
                  </span>
                </div>

                {/* Living Room Companion + Unlocked Fun Items Tray */}
                <div className="relative z-10 flex flex-col items-center justify-end gap-1.5 my-auto pt-2 pointer-events-none">
                  {st.points < 0 ? (
                    <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                      <div className="animate-crow-hop-flap">
                        <AvatarRenderer avatar="sdv_crow" name="停電烏鴉" size={40} bare={true} />
                      </div>
                      <div className="w-6 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                    </div>
                  ) : (
                    <>
                      <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                        <AvatarRenderer avatar={companionId} name={st.name} size={38} bare={true} />
                        <div className="w-7 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                      </div>
                      <div className="flex items-center gap-1 bg-[#2e1065]/80 border border-[#c084fc]/70 px-1.5 py-0.5 rounded-lg shadow">
                        {previewItems.map((item) => (
                          <AvatarRenderer
                            key={item.id}
                            avatar={item.url}
                            name={item.name}
                            size={22}
                            bare={true}
                          />
                        ))}
                        <span className="text-[9px] font-pixel text-[#f3e8ff] pl-0.5">
                          {unlockedActivities.length}/{LIVE_LIVING_ROOM_ACTIVITIES.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom Row: Living Room Name & Enter Action */}
                <div className="relative z-10 px-2.5 pb-2 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-violet-100/95 font-bold truncate drop-shadow-sm">
                    {livingArtwork.icon} {livingArtwork.livingRoomTitle}
                  </span>
                  <span className="text-[#e9d5ff] font-bold flex items-center gap-1 shrink-0 group-hover:text-white transition-colors whitespace-nowrap">
                    <Eye className="w-3 h-3" />
                    進入
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Student Living Room Exploration Modal */}
      {inspectingStudent && (() => {
        const liveInspectingStudent =
          students.find((s) => s.id === inspectingStudent.id) || inspectingStudent;
        return (
          <StudentLivingRoomDetailModal
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
            onSwitchToKitchen={
              onSwitchToKitchen
                ? (st) => {
                    setInspectingStudent(null);
                    onSwitchToKitchen(st);
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
