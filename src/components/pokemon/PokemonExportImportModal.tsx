import React, { useState, useRef } from 'react';
import { ClassroomClass } from '../../types/classroom';

interface PokemonExportImportModalProps {
  mode: 'export' | 'import';
  classes: ClassroomClass[];
  currentClassId: string;
  onClose: () => void;
  onImportClasses: (imported: ClassroomClass[]) => void;
}

export const PokemonExportImportModal: React.FC<PokemonExportImportModalProps> = ({
  mode,
  classes,
  currentClassId,
  onClose,
  onImportClasses,
}) => {
  const currentClass = classes.find((c) => c.id === currentClassId) || classes[0];
  const [importStatus, setImportStatus] = useState<string>('');
  const [importError, setImportError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. JSON Export (Complete full data)
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(classes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `Miss_Iong_Classes_Full_Backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 2. CSV Export for Current Class
  const handleExportCSV = () => {
    if (!currentClass) return;
    const header = '座號,姓名,總分,獎勵正分,違紀扣分,寶可夢編號,自訂頭像,卡片背景,評定次數\n';
    const rows = currentClass.students
      .map(
        (s) =>
          `${s.rollNo},"${s.name}",${s.points},${s.posPoints || 0},${s.negPoints || 0},${
            s.pokemonId || 25
          },"${s.avatar || ''}","${s.cardBackground || ''}",${s.history ? s.history.length : 0}`
      )
      .join('\n');

    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentClass.className}_學生成績表_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  // Handle File Upload for Import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError('');
    setImportStatus('正在讀取解析檔案...');

    const reader = new FileReader();

    if (file.name.endsWith('.json')) {
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);

          let importedClasses: ClassroomClass[] = [];

          if (Array.isArray(parsed) && parsed.length > 0) {
            // Case A: Array of classes
            if ('students' in parsed[0]) {
              importedClasses = parsed;
            } else if ('rollNo' in parsed[0] || 'name' in parsed[0]) {
              // Case B: Array of students for current class
              importedClasses = classes.map((c) =>
                c.id === currentClassId ? { ...c, students: parsed } : c
              );
            }
          } else if (typeof parsed === 'object' && parsed !== null) {
            // Case C: Object with classes key or single class
            if (Array.isArray(parsed.classes)) {
              importedClasses = parsed.classes;
            } else if (Array.isArray(parsed.students)) {
              importedClasses = classes.map((c) =>
                c.id === currentClassId ? { ...c, students: parsed.students } : c
              );
            }
          }

          if (importedClasses.length > 0) {
            onImportClasses(importedClasses);
            setImportStatus(`🎉 成功匯入 ${importedClasses.length} 個班級資料！分數與紀錄已同步。`);
            setTimeout(() => {
              onClose();
            }, 1200);
          } else {
            setImportError('無法辨識此 JSON 格式，請確認是否為本系統匯出的備份檔。');
            setImportStatus('');
          }
        } catch (err) {
          setImportError('JSON 解析失敗，請檢查檔案格式是否正確。');
          setImportStatus('');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.csv')) {
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
          if (lines.length <= 1) {
            setImportError('CSV 檔案為空或僅有標題列。');
            setImportStatus('');
            return;
          }

          // Parse CSV rows into current class students
          const newStudents = [...currentClass.students];

          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map((c) => c.replace(/^"|"$/g, '').trim());
            if (cols.length >= 3) {
              const rollNo = parseInt(cols[0], 10);
              const name = cols[1];
              const points = parseInt(cols[2], 10) || 0;
              const posPoints = cols[3] ? parseInt(cols[3], 10) || 0 : points > 0 ? points : 0;
              const negPoints = cols[4] ? parseInt(cols[4], 10) || 0 : points < 0 ? Math.abs(points) : 0;
              const pokemonId = cols[5] ? parseInt(cols[5], 10) || 25 : undefined;
              const avatar = cols[6] || undefined;
              const cardBg = cols[7] || undefined;

              const idx = newStudents.findIndex(
                (s) => s.rollNo === rollNo || s.name.trim() === name
              );

              if (idx !== -1) {
                newStudents[idx] = {
                  ...newStudents[idx],
                  points,
                  posPoints,
                  negPoints,
                  pokemonId: pokemonId || newStudents[idx].pokemonId,
                  avatar: avatar || newStudents[idx].avatar,
                  cardBackground: cardBg || newStudents[idx].cardBackground,
                };
              }
            }
          }

          const updatedClasses = classes.map((c) =>
            c.id === currentClassId ? { ...c, students: newStudents } : c
          );

          onImportClasses(updatedClasses);
          setImportStatus(`🎉 成功由 CSV 更新 ${currentClass.className} 的成績與背景資料！`);
          setTimeout(() => {
            onClose();
          }, 1200);
        } catch {
          setImportError('CSV 解析出錯，請確認欄位格式。');
          setImportStatus('');
        }
      };
      reader.readAsText(file);
    } else {
      setImportError('不支援的檔案格式，請上傳 .json 或 .csv 檔案。');
      setImportStatus('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-[2.5rem] border-4 border-[#8D6E63] shadow-2xl max-w-xl w-full p-6 text-[#5D4037] flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#E7DFD5] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{mode === 'export' ? '📤' : '📥'}</span>
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                {mode === 'export' ? '資料備份匯出 (Export)' : '資料還原匯入 (Import)'}
              </h2>
              <p className="text-xs text-[#8D6E63] font-bold">
                跨介面兩邊分數、頭像、背景、加減分紀錄 100% 互通
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-[#8D6E63] font-black text-xl flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {mode === 'export' ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-stone-600">
              您可以選擇匯出全校所有班級的完整 JSON 備份檔，或僅匯出當前班級的 CSV 試算表。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExportJSON}
                className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/70 hover:bg-amber-100/80 transition-all flex flex-col items-center gap-2 text-center shadow-xs cursor-pointer group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">💾</span>
                <span className="font-black text-base text-[#B45309]">全班級完整備份 (.JSON)</span>
                <span className="text-xs text-stone-500 font-bold">
                  包含所有班級、學生、分數、詳細歷程、頭像與背景
                </span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 transition-all flex flex-col items-center gap-2 text-center shadow-xs cursor-pointer group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">📊</span>
                <span className="font-black text-base text-[#2E7D32]">
                  {currentClass?.className} 表格 (.CSV)
                </span>
                <span className="text-xs text-stone-500 font-bold">
                  適合以 Excel / Google 試算表檢視或列印
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-stone-600">
              支援上傳從系統匯出的 .json 完整備份或 .csv 成績表，將自動恢復所有學生分數、加減分歷程、頭像與背景！
            </p>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 border-3 border-dashed border-[#F59E0B] rounded-3xl bg-amber-50/40 hover:bg-amber-50/80 transition-all flex flex-col items-center justify-center gap-3 text-center cursor-pointer"
            >
              <span className="text-4xl animate-bounce">📁</span>
              <div className="font-black text-base text-[#B45309]">點擊此處選取要匯入的檔案</div>
              <span className="text-xs text-stone-400 font-bold">支援 .json 備份檔 或 .csv 表格檔</span>
            </div>

            {importStatus && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-black text-sm text-center">
                {importStatus}
              </div>
            )}

            {importError && (
              <div className="p-3 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 font-black text-sm text-center">
                ⚠️ {importError}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl font-black text-sm bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
