import React, { useState } from 'react';
import { ClassroomClass, Student } from '../../types/classroom';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';

interface PokemonClassSettingsModalProps {
  currentClass: ClassroomClass;
  onClose: () => void;
  onUpdateClass: (updated: ClassroomClass) => void;
}

export const PokemonClassSettingsModal: React.FC<PokemonClassSettingsModalProps> = ({
  currentClass,
  onClose,
  onUpdateClass,
}) => {
  const [classNameInput, setClassNameInput] = useState<string>(currentClass.className);
  const [studentsList, setStudentsList] = useState<Student[]>(currentClass.students);

  // New Student State
  const [newName, setNewName] = useState<string>('');
  const [newRollNo, setNewRollNo] = useState<string>(
    String(Math.max(0, ...currentClass.students.map((s) => s.rollNo)) + 1)
  );

  const handleSaveClassName = () => {
    if (!classNameInput.trim()) return;
    onUpdateClass({
      ...currentClass,
      className: classNameInput.trim(),
      students: studentsList,
    });
    onClose();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const rollNo = parseInt(newRollNo, 10) || studentsList.length + 1;
    const newStudent: Student = {
      id: `${currentClass.id}-${Date.now()}`,
      rollNo,
      name: newName.trim(),
      points: 0,
      posPoints: 0,
      negPoints: 0,
      pokemonId: Math.floor(Math.random() * 150) + 1,
      history: [],
    };

    const updated = [...studentsList, newStudent];
    setStudentsList(updated);
    setNewName('');
    setNewRollNo(String(rollNo + 1));
  };

  const handleRemoveStudent = (studentId: string) => {
    if (confirm('確定要從名單中移除此學生嗎？')) {
      setStudentsList(studentsList.filter((s) => s.id !== studentId));
    }
  };

  const handleUpdateStudent = (id: string, newFields: Partial<Student>) => {
    setStudentsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...newFields } : s))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-[2.5rem] border-4 border-[#8D6E63] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#5D4037]">
        {/* Header */}
        <div className="bg-[#FFF3E0] py-4 px-6 md:px-8 flex justify-between items-center border-b-3 border-[#D7CCC8] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">⚙️</span>
            <div>
              <h2 className="text-2xl font-black tracking-tight">系統設定 & 名單管理</h2>
              <p className="text-xs text-[#8D6E63] font-bold">
                修改班級名稱、點擊直接編輯學生姓名與座號、新增與移除學生
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8D6E63] hover:text-[#5D4037] active:scale-95 transition-all text-2xl font-black flex items-center justify-center border border-[#D7CCC8] shadow-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#FFFBF0]/20">
          {/* Class Name Edit */}
          <div className="bg-white p-4 rounded-2xl border-2 border-[#E7DFD5] flex flex-col gap-2">
            <label className="text-xs font-black text-[#8D6E63]">班級名稱：</label>
            <input
              type="text"
              value={classNameInput}
              onChange={(e) => setClassNameInput(e.target.value)}
              className="px-4 py-2 bg-stone-50 rounded-xl border border-[#D7CCC8] text-base font-black focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          {/* Add New Student Form */}
          <form
            onSubmit={handleAddStudent}
            className="bg-[#FFF8E1] p-4 rounded-2xl border-2 border-[#FDE68A] flex flex-col gap-3"
          >
            <span className="text-xs font-black text-[#8D6E63]">新增學生至此班級：</span>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="number"
                placeholder="座號"
                value={newRollNo}
                onChange={(e) => setNewRollNo(e.target.value)}
                className="w-20 px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-sm font-black text-center focus:outline-none"
              />
              <input
                type="text"
                placeholder="學生姓名 (例如：李小明)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 min-w-[160px] px-4 py-2 bg-white rounded-xl border border-[#D7CCC8] text-sm font-black focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl font-black text-sm text-white bg-[#F59E0B] hover:bg-[#D97706] shadow-sm cursor-pointer whitespace-nowrap"
              >
                + 加入名單
              </button>
            </div>
          </form>

          {/* Students List */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#8D6E63]">
                現有名單 ({studentsList.length} 位學生)：
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                ✏️ 點擊文字框可直接修改姓名與座號
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {studentsList.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-2 px-3 bg-white rounded-xl border border-[#E7DFD5] shadow-2xs gap-2"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <img
                      src={resolveStudentAvatar(s)}
                      alt={s.name}
                      className="w-8 h-8 object-contain shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    {/* Editable Roll No */}
                    <input
                      type="number"
                      value={s.rollNo}
                      onChange={(e) =>
                        handleUpdateStudent(s.id, { rollNo: parseInt(e.target.value, 10) || s.rollNo })
                      }
                      className="w-14 px-1.5 py-1 text-center font-mono text-xs font-black bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#F59E0B] focus:outline-none shrink-0"
                      title="修改座號"
                    />
                    {/* Editable Name */}
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => handleUpdateStudent(s.id, { name: e.target.value })}
                      className="flex-1 min-w-[90px] px-2.5 py-1 text-sm font-black text-[#5D4037] bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#F59E0B] focus:outline-none"
                      placeholder="修改學生姓名"
                      title="直接在此修改學生姓名"
                    />
                    <span className="text-xs font-bold text-[#2E7D32] shrink-0 whitespace-nowrap">
                      {s.points} 分
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(s.id)}
                    className="text-xs font-black text-rose-600 hover:text-rose-800 p-1 px-2 rounded-lg hover:bg-rose-50 cursor-pointer shrink-0"
                  >
                    刪除
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FFF8E1] border-t border-[#E7DFD5] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-black text-sm bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSaveClassName}
            className="px-7 py-2.5 rounded-xl font-black text-base text-white bg-[#4CAF50] hover:bg-[#43A047] border-b-3 border-[#2E7D32] shadow-md active:scale-95 transition-all cursor-pointer"
          >
            💾 儲存名冊設定
          </button>
        </div>
      </div>
    </div>
  );
};
