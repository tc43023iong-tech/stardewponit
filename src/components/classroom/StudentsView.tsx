import React, { useState, useMemo } from 'react';
import { Student } from '../../types/classroom';
import { StudentCard } from './StudentCard';
import { soundManager } from '../../utils/sound';
import { PixelSprite } from '../common/PixelSprite';
import { Search, Filter, ArrowUpDown, CheckSquare, Square, Plus, Star, Sparkles } from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  onOpenPointsModal: (students: Student[]) => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onChangeAvatar: (student: Student) => void;
  onBatchAdd: (targetStudents: Student[], delta: number) => void;
  onOpenFarmDetail?: (student: Student) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onOpenPointsModal,
  onQuickAdd,
  onChangeAvatar,
  onBatchAdd,
  onOpenFarmDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [farmTierFilter, setFarmTierFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rollNo' | 'pointsDesc' | 'posDesc'>('rollNo');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter & Sort
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesQuery =
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(s.rollNo).includes(searchQuery);

        let matchesTier = true;
        if (farmTierFilter === '1000') matchesTier = s.points >= 1000;
        else if (farmTierFilter === '500') matchesTier = s.points >= 500 && s.points < 1000;
        else if (farmTierFilter === '150') matchesTier = s.points >= 150 && s.points < 500;
        else if (farmTierFilter === '50') matchesTier = s.points >= 50 && s.points < 150;
        else if (farmTierFilter === '0') matchesTier = s.points < 50;

        return matchesQuery && matchesTier;
      })
      .sort((a, b) => {
        if (sortBy === 'pointsDesc') return b.points - a.points;
        if (sortBy === 'posDesc') return b.posPoints - a.posPoints;
        return a.rollNo - b.rollNo;
      });
  }, [students, searchQuery, farmTierFilter, sortBy]);

  // Selection toggles
  const handleToggleSelect = (studentId: string) => {
    const next = new Set(selectedIds);
    if (next.has(studentId)) {
      next.delete(studentId);
    } else {
      next.add(studentId);
    }
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    soundManager.playClick();
    if (selectedIds.size === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredStudents.map((s) => s.id)));
    }
  };

  const selectedStudentsList = students.filter((s) => selectedIds.has(s.id));

  return (
    <div className="space-y-4">
      {/* Control Filter Bar */}
      <div className="pixel-parchment p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-4 h-4 text-stone-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋姓名或學號..."
            className="w-full bg-[#fdfbf7] border-2 border-[#8b5a2b] pl-8 pr-3 py-1.5 text-xs font-bold rounded-lg focus:outline-none"
          />
        </div>

        {/* Farm Tier Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-[#5a3818] hidden sm:inline">農場等級：</span>
          <button
            onClick={() => {
              soundManager.playClick();
              setFarmTierFilter('all');
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-md border cursor-pointer ${
              farmTierFilter === 'all'
                ? 'bg-[#6a4422] text-[#ffebb3] border-[#361f0d]'
                : 'bg-[#faeed1] text-stone-700 border-[#c4a675] hover:bg-[#ffeec2]'
            }`}
          >
            全部
          </button>
          {[
            { id: '1000', label: '👑 滿級(1000分)', min: 1000 },
            { id: '500', label: '🍇 秘境(500分+)', min: 500, max: 999 },
            { id: '150', label: '🌽 牧場(150分+)', min: 150, max: 499 },
            { id: '50', label: '🌻 向日葵(50分+)', min: 50, max: 149 },
            { id: '0', label: '🌱 嫩苗(0分+)', min: 0, max: 49 },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => {
                soundManager.playClick();
                setFarmTierFilter(tier.id);
              }}
              className={`px-2 py-1 text-xs font-bold rounded-md border cursor-pointer ${
                farmTierFilter === tier.id
                  ? 'bg-[#6a4422] text-[#ffebb3] border-[#361f0d]'
                  : 'bg-[#faeed1] text-stone-700 border-[#c4a675] hover:bg-[#ffeec2]'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-[#5a3818]" />
          <select
            value={sortBy}
            onChange={(e) => {
              soundManager.playClick();
              setSortBy(e.target.value as any);
            }}
            className="bg-[#faeed1] border-2 border-[#8b5a2b] text-[#5a3818] text-xs font-bold py-1 px-2 rounded cursor-pointer focus:outline-none"
          >
            <option value="rollNo">依學號排序</option>
            <option value="pointsDesc">依總積分高到低</option>
            <option value="posDesc">依加分次數高到低</option>
          </select>
        </div>
      </div>

      {/* Batch Action Floating Toolbar (visible when students selected or select-all clicked) */}
      <div className="pixel-wood-dark p-2.5 rounded-xl shadow-lg border-2 border-[#2b1807] flex flex-wrap items-center justify-between gap-3 text-[#ffebb3]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-1.5 text-xs font-bold hover:text-white cursor-pointer"
          >
            {selectedIds.size === filteredStudents.length && filteredStudents.length > 0 ? (
              <CheckSquare className="w-4 h-4 text-[#ffd700]" />
            ) : (
              <Square className="w-4 h-4 text-[#d6ba89]" />
            )}
            <span>
              {selectedIds.size === filteredStudents.length && filteredStudents.length > 0
                ? '取消全選'
                : '全選本頁'}
            </span>
          </button>

          <span className="text-xs font-pixel text-[#ffd700]">
            已選取 {selectedIds.size} / {filteredStudents.length} 位
          </span>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBatchAdd(selectedStudentsList, 1)}
              className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white px-2.5 py-1 text-xs font-pixel rounded border border-[#81c784] flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
              title="全部選取學生 +1 分"
            >
              <Plus className="w-3.5 h-3.5" /> 1分
            </button>
            <button
              onClick={() => onBatchAdd(selectedStudentsList, 5)}
              className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white px-2.5 py-1 text-xs font-pixel rounded border border-[#81c784] flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
              title="全部選取學生 +5 分"
            >
              <Plus className="w-3.5 h-3.5" /> 5分
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenPointsModal(selectedStudentsList);
              }}
              className="pixel-btn-gold px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
            >
              <Star className="w-3.5 h-3.5 fill-[#633300]" />
              <span>批次評定表現</span>
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-stone-300 hover:text-white text-xs underline cursor-pointer"
            >
              清除選取
            </button>
          </div>
        )}
      </div>

      {/* Students Cards Grid */}
      {filteredStudents.length === 0 ? (
        <div className="pixel-parchment p-8 rounded-xl text-center">
          <PixelSprite name="scarecrow" size={48} className="mx-auto mb-2" />
          <p className="font-pixel text-xs text-[#5a3818]">無符合條件的學生</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredStudents.map((st) => (
            <StudentCard
              key={st.id}
              student={st}
              isSelected={selectedIds.has(st.id)}
              onToggleSelect={handleToggleSelect}
              onQuickAdd={onQuickAdd}
              onOpenPointsModal={(s) => onOpenPointsModal([s])}
              onChangeAvatar={onChangeAvatar}
              onOpenFarmDetail={onOpenFarmDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
};
