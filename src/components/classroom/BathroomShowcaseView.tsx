import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { getStudentBathroomArtwork, LIVE_BATHROOM_SPA_ROSTER } from '../../utils/bathroomArtwork';
import { AvatarRenderer } from './AvatarRenderer';
import { StudentBathroomDetailModal } from './StudentBathroomDetailModal';
import { soundManager } from '../../utils/sound';
import { Bath, Eye } from 'lucide-react';

interface BathroomShowcaseViewProps {
  students: Student[];
  onOpenPointsModal: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onSwitchToFarm?: (student: Student) => void;
  onSwitchToRoom?: (student: Student) => void;
  onSwitchToKitchen?: (student: Student) => void;
  onSwitchToLivingRoom?: (student: Student) => void;
}

export const BathroomShowcaseView: React.FC<BathroomShowcaseViewProps> = ({
  students,
  onOpenPointsModal,
  onQuickAdd,
  onSwitchToFarm,
  onSwitchToRoom,
  onSwitchToKitchen,
  onSwitchToLivingRoom,
}) => {
  const [inspectingStudent, setInspectingStudent] = useState<Student | null>(null);

  const handleOpenStudentBathroom = (student: Student) => {
    soundManager.playCorrect();
    setInspectingStudent(student);
  };

  return (
    <div className="space-y-4">
      {/* Bathroom Header */}
      <div className="pixel-parchment p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0284c7] border-2 border-[#0c4a6e] rounded-lg flex items-center justify-center text-white shadow">
            <Bath className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-pixel text-sm sm:text-base text-[#4a2800]">
              🛁 星露谷學生專屬洗手間 (Dream Student Bathrooms)
            </h3>
            <p className="text-xs text-stone-700 font-bold">
              每位同學都能擁有專屬舒壓洗手間！每湊夠 50 分自動擴建升級浴池與溫泉主題（50 → 1250 分共 25 間專屬洗手間，還可解鎖 {LIVE_BATHROOM_SPA_ROSTER.length} 種香氛沐浴備品）！
            </p>
          </div>
        </div>

        {/* 1250分 50-Point Bathroom Progression Legend */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a3818] flex-wrap bg-[#f5e0b7] px-3 py-1.5 rounded-lg border border-[#c4a675]">
          <span className="text-rose-800">🌫️ &lt;0霧氣澡間</span>
          <span aria-hidden="true">·</span>
          <span>🪵 0原木洗手間</span>
          <span aria-hidden="true">→</span>
          <span>🌿 50薄荷浴</span>
          <span aria-hidden="true">→</span>
          <span>🌻 100木桶屋</span>
          <span aria-hidden="true">→</span>
          <span>🫧 150泡泡浴</span>
          <span aria-hidden="true">→</span>
          <span>🚿 200雨淋間</span>
          <span aria-hidden="true">→</span>
          <span>🍑 300花瓣殿</span>
          <span aria-hidden="true">→</span>
          <span>🌱 400溫室浴</span>
          <span aria-hidden="true">→</span>
          <span>🔮 500紫晶湯</span>
          <span aria-hidden="true">→</span>
          <span>🌸 600櫻花泉</span>
          <span aria-hidden="true">→</span>
          <span>🌙 700星月池</span>
          <span aria-hidden="true">→</span>
          <span>🏝️ 750薑島瀑布</span>
          <span aria-hidden="true">→</span>
          <span>🐚 800人魚宮</span>
          <span aria-hidden="true">→</span>
          <span>👑 900皇家浴殿</span>
          <span aria-hidden="true">→</span>
          <span>🌌 1000極光泉</span>
          <span aria-hidden="true">→</span>
          <span>🐉 1050翡翠湯</span>
          <span aria-hidden="true">→</span>
          <span>🪽 1100天界泉</span>
          <span aria-hidden="true">→</span>
          <span>🌠 1150銀河池</span>
          <span aria-hidden="true">→</span>
          <span>☀️ 1200金陽宮</span>
          <span aria-hidden="true">→</span>
          <span className="text-sky-900 font-black">💎 1250星果聖泉殿 (每50分升級!)</span>
        </div>
      </div>

      {/* Pixel-Art Student Bathroom Cards Grid */}
      <div className="bg-[#3d220a] border-4 border-[#251305] p-3.5 sm:p-5 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {students.map((st) => {
            const bathArtwork = getStudentBathroomArtwork(st.points);
            const companionId = st.stardewAvatar || st.avatar || 'sdv_duck';
            const unlockedSpa =
              st.points < 0
                ? []
                : LIVE_BATHROOM_SPA_ROSTER.filter((item) => item.unlockScore <= st.points);
            const previewSpa = unlockedSpa.slice(-4);

            return (
              <div
                key={st.id}
                onClick={() => handleOpenStudentBathroom(st)}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer select-none aspect-[16/11] flex flex-col justify-between bg-[#0f172a] shadow-md hover:shadow-2xl hover:-translate-y-0.5 ${
                  st.points < 0
                    ? 'border-[#f43f5e]/80 ring-1 ring-rose-500/40'
                    : st.points >= 1250
                    ? 'border-[#67e8f9] ring-2 ring-[#38bdf8]'
                    : st.points >= 1000
                    ? 'border-[#38bdf8] ring-2 ring-[#7dd3fc]'
                    : st.points >= 700
                    ? 'border-[#818cf8]'
                    : st.points >= 400
                    ? 'border-[#34d399]'
                    : st.points >= 100
                    ? 'border-[#0284c7]'
                    : 'border-[#8b5a2b] hover:border-[#38bdf8]'
                }`}
              >
                {/* 16-bit Pixel Art Interior Bathroom Backdrop */}
                <img
                  src={bathArtwork.bgUrl}
                  alt={`${st.name} 的星露谷洗手間`}
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
                  <span className="font-mono font-black text-[#7dd3fc] tabular-nums drop-shadow-sm">
                    {st.points} 分
                  </span>
                </div>

                {/* Bathroom Companion + Unlocked Spa Essentials Tray */}
                <div className="relative z-10 flex flex-col items-center justify-end gap-1.5 my-auto pt-2 pointer-events-none">
                  {st.points < 0 ? (
                    <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                      <div className="animate-crow-hop-flap">
                        <AvatarRenderer avatar="sdv_crow" name="霧氣烏鴉" size={40} bare={true} />
                      </div>
                      <div className="w-6 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                    </div>
                  ) : (
                    <>
                      <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                        <AvatarRenderer avatar={companionId} name={st.name} size={38} bare={true} />
                        <div className="w-7 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                      </div>
                      <div className="flex items-center gap-1 bg-[#0c4a6e]/80 border border-[#38bdf8]/70 px-1.5 py-0.5 rounded-lg shadow">
                        {previewSpa.map((item) => (
                          <AvatarRenderer
                            key={item.id}
                            avatar={item.url}
                            name={item.name}
                            size={22}
                            bare={true}
                          />
                        ))}
                        <span className="text-[9px] font-pixel text-[#bae6fd] pl-0.5">
                          {unlockedSpa.length}/{LIVE_BATHROOM_SPA_ROSTER.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom Row: Bathroom Name & Enter Action */}
                <div className="relative z-10 px-2.5 pb-2 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-sky-100/95 font-bold truncate drop-shadow-sm">
                    {bathArtwork.icon} {bathArtwork.bathroomTitle}
                  </span>
                  <span className="text-[#7dd3fc] font-bold flex items-center gap-1 shrink-0 group-hover:text-white transition-colors whitespace-nowrap">
                    <Eye className="w-3 h-3" />
                    進入
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Student Bathroom Exploration Modal */}
      {inspectingStudent && (() => {
        const liveInspectingStudent =
          students.find((s) => s.id === inspectingStudent.id) || inspectingStudent;
        return (
          <StudentBathroomDetailModal
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
            onSwitchToLivingRoom={
              onSwitchToLivingRoom
                ? (st) => {
                    setInspectingStudent(null);
                    onSwitchToLivingRoom(st);
                  }
                : undefined
            }
          />
        );
      })()}
    </div>
  );
};
