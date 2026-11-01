import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { getCropGrowth } from '../../data/classroomData';
import { AvatarRenderer } from './AvatarRenderer';
import { PixelSprite } from '../common/PixelSprite';
import { Trophy, Medal, Award, Flame, Star } from 'lucide-react';

interface LeaderboardViewProps {
  students: Student[];
  onOpenPointsModal: (student: Student) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  students,
  onOpenPointsModal,
}) => {
  const [filterType, setFilterType] = useState<'total' | 'positive'>('total');

  const sortedStudents = [...students].sort((a, b) => {
    if (filterType === 'positive') return b.posPoints - a.posPoints;
    return b.points - a.points;
  });

  const top1 = sortedStudents[0];
  const top2 = sortedStudents[1];
  const top3 = sortedStudents[2];
  const restStudents = sortedStudents.slice(3);

  return (
    <div className="space-y-6">
      {/* Title & Filter Bar */}
      <div className="pixel-parchment p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ffd700] border-2 border-[#8b5a2b] rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[#4a2800]" />
          </div>
          <div>
            <h3 className="font-pixel text-sm sm:text-base text-[#4a2800]">
              🏆 星露谷班級榮譽榜 (Hall of Fame)
            </h3>
            <p className="text-xs text-stone-600">
              表揚課堂表現優異、勤奮好學的農場之星！
            </p>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 bg-[#d6ba89] p-1 rounded-lg border border-[#a3794b]">
          <button
            onClick={() => setFilterType('total')}
            className={`px-3 py-1.5 rounded text-xs font-bold font-pixel cursor-pointer transition-colors ${
              filterType === 'total'
                ? 'bg-[#6a4422] text-[#ffebb3] shadow'
                : 'text-[#4a2800] hover:bg-[#eeddbb]'
            }`}
          >
            🌟 總積分榜
          </button>
          <button
            onClick={() => setFilterType('positive')}
            className={`px-3 py-1.5 rounded text-xs font-bold font-pixel cursor-pointer transition-colors ${
              filterType === 'positive'
                ? 'bg-[#6a4422] text-[#ffebb3] shadow'
                : 'text-[#4a2800] hover:bg-[#eeddbb]'
            }`}
          >
            🔥 積極表現榜
          </button>
        </div>
      </div>

      {/* Podium Showcase (Top 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* 2nd Place */}
        {top2 && (
          <div className="order-2 md:order-1 pixel-parchment p-4 rounded-xl border-4 border-slate-400 flex flex-col items-center text-center shadow-md bg-gradient-to-b from-slate-50 to-[#faeed1]">
            <div className="w-9 h-9 rounded-full bg-slate-300 border-2 border-slate-500 flex items-center justify-center mb-2 font-pixel text-xs text-slate-800 font-bold">
              🥈 2
            </div>
            <AvatarRenderer avatar={top2.avatar} name={top2.name} size={64} />
            <h4 className="font-bold text-base text-[#3d240d] mt-2 truncate w-full">
              {top2.name}
            </h4>
            <span className="text-xs text-stone-500 font-bold">#{top2.rollNo} 學號</span>
            <div className="font-pixel text-lg font-bold text-[#5a3818] mt-2">
              {filterType === 'total' ? `${top2.points} 分` : `+${top2.posPoints} 分`}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 mt-1 rounded bg-slate-200 text-slate-800 border border-slate-300">
              {getCropGrowth(top2.points).label}
            </span>
          </div>
        )}

        {/* 1st Place Champion */}
        {top1 && (
          <div className="order-1 md:order-2 pixel-wood-box p-5 rounded-2xl border-4 border-amber-500 flex flex-col items-center text-center shadow-xl bg-gradient-to-b from-amber-50 to-[#fdfbf7] relative -top-2">
            <div className="absolute -top-4 bg-[#fabc3f] border-2 border-[#633300] px-4 py-1 rounded-full font-pixel text-xs text-[#4a2800] flex items-center gap-1.5 shadow">
              <span>👑 總冠軍</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#fde047] border-2 border-[#b45309] flex items-center justify-center my-2 font-pixel text-sm text-[#78350f] font-bold shadow-md">
              🥇 1
            </div>
            <AvatarRenderer avatar={top1.avatar} name={top1.name} size={80} />
            <h4 className="font-extrabold text-lg sm:text-xl text-[#3d240d] mt-2 truncate w-full">
              {top1.name}
            </h4>
            <span className="text-xs text-stone-500 font-bold">#{top1.rollNo} 學號</span>
            <div className="font-pixel text-2xl font-black text-[#b45309] mt-2">
              {filterType === 'total' ? `${top1.points} 分` : `+${top1.posPoints} 分`}
            </div>
            <span className="text-xs font-bold px-3 py-1 mt-1.5 rounded bg-amber-100 text-amber-900 border border-amber-400">
              {getCropGrowth(top1.points).label}
            </span>
          </div>
        )}

        {/* 3rd Place */}
        {top3 && (
          <div className="order-3 pixel-parchment p-4 rounded-xl border-4 border-amber-700 flex flex-col items-center text-center shadow-md bg-gradient-to-b from-orange-50 to-[#faeed1]">
            <div className="w-9 h-9 rounded-full bg-amber-200 border-2 border-amber-700 flex items-center justify-center mb-2 font-pixel text-xs text-amber-900 font-bold">
              🥉 3
            </div>
            <AvatarRenderer avatar={top3.avatar} name={top3.name} size={64} />
            <h4 className="font-bold text-base text-[#3d240d] mt-2 truncate w-full">
              {top3.name}
            </h4>
            <span className="text-xs text-stone-500 font-bold">#{top3.rollNo} 學號</span>
            <div className="font-pixel text-lg font-bold text-[#5a3818] mt-2">
              {filterType === 'total' ? `${top3.points} 分` : `+${top3.posPoints} 分`}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 mt-1 rounded bg-amber-100 text-amber-800 border border-amber-300">
              {getCropGrowth(top3.points).label}
            </span>
          </div>
        )}
      </div>

      {/* Full Leaderboard Table (Ranks 4+) */}
      <div className="pixel-parchment rounded-xl p-4 shadow-md overflow-x-auto">
        <h4 className="font-pixel text-xs text-[#5a3818] mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4" /> 完整英雄排行榜 (Rankings)
        </h4>
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-[#b88b4a] text-[#5a3818] font-bold text-xs uppercase">
              <th className="py-2.5 px-3">排名</th>
              <th className="py-2.5 px-3">學生</th>
              <th className="py-2.5 px-3">作物成長階段</th>
              <th className="py-2.5 px-3 text-right">累計加分</th>
              <th className="py-2.5 px-3 text-right">累計扣分</th>
              <th className="py-2.5 px-3 text-right font-pixel">總積分</th>
              <th className="py-2.5 px-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((st, idx) => {
              const crop = getCropGrowth(st.points);
              return (
                <tr
                  key={st.id}
                  className="border-b border-[#dfcca4]/70 hover:bg-[#fff9ea] transition-colors"
                >
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block font-pixel text-xs font-bold px-2 py-0.5 rounded ${
                        idx === 0
                          ? 'bg-amber-300 text-amber-900'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-900'
                          : idx === 2
                          ? 'bg-orange-300 text-orange-900'
                          : 'text-stone-600'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <AvatarRenderer avatar={st.avatar} name={st.name} size={32} />
                      <div>
                        <div className="font-bold text-[#3d240d]">{st.name}</div>
                        <div className="text-[10px] text-stone-500">#{st.rollNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${crop.badgeBg}`}>
                      {crop.icon} {crop.label}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#16a34a]">
                    +{st.posPoints}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#dc2626]">
                    -{Math.abs(st.negPoints)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-pixel text-sm font-bold text-[#b45309]">
                    {st.points} 分
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => onOpenPointsModal(st)}
                      className="pixel-btn-gold px-2 py-1 text-[11px] font-bold rounded cursor-pointer"
                    >
                      評分
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
