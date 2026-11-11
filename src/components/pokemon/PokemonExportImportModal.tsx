import React, { useState, useRef } from 'react';
import { ClassroomClass, Student, PointHistoryItem } from '../../types/classroom';

interface PokemonExportImportModalProps {
  mode: 'export' | 'import';
  classes: ClassroomClass[];
  currentClassId: string;
  onClose: () => void;
  onImportClasses: (imported: ClassroomClass[]) => void;
}

import {
  parseCsvRows,
  normalizeImportedClasses,
  normalizeImportedCsv,
  buildClassroomExportBundle,
  directExportClassroomJSON,
} from '../../utils/classroomDataIO';

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

  // 1. JSON Export (Complete full data across Pokemon and Stardew modes with native folder dialog)
  const handleExportJSON = async () => {
    const result = await directExportClassroomJSON(classes);
    if (result === 'saved') {
      setImportStatus('💾 班級完整資料已成功儲存至您指定的資料夾！');
    } else if (result === 'downloaded') {
      setImportStatus('💾 班級完整資料備份已自動下載！');
    }
  };

  // 2. CSV Export for Current Class
  const handleExportCSV = () => {
    if (!currentClass) return;
    const header = [
      '座號',
      '姓名',
      '總積分',
      '獎勵正分',
      '違紀扣分',
      '寶可夢編號',
      '寶可夢頭像',
      '星露谷頭像',
      '卡片背景主題',
      '評定總次數',
      '加減分詳細明細JSON',
    ].join(',');

    const rows = currentClass.students.map((s) => {
      const historyJson = JSON.stringify(s.history || []);
      // Escape double quotes inside CSV cell
      const escapedHistory = historyJson.replace(/"/g, '""');
      const escapedName = (s.name || '').replace(/"/g, '""');
      const pokemonAvatar = (s.pokemonAvatar || '').replace(/"/g, '""');
      const stardewAvatar = (s.stardewAvatar || s.avatar || '').replace(/"/g, '""');
      const cardBg = (s.cardBackground || s.cardTheme || '').replace(/"/g, '""');

      return [
        s.rollNo,
        `"${escapedName}"`,
        s.points,
        s.posPoints || 0,
        s.negPoints || 0,
        s.pokemonId || 25,
        `"${pokemonAvatar}"`,
        `"${stardewAvatar}"`,
        `"${cardBg}"`,
        s.history ? s.history.length : 0,
        `"${escapedHistory}"`,
      ].join(',');
    });

    const csvContent = '\uFEFF' + header + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${currentClass.className}_全維度學生成績與頭像歷程表_${new Date().toISOString().slice(0, 10)}.csv`
    );
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
          const normalized = normalizeImportedClasses(parsed, classes, currentClassId);

          if (normalized && normalized.length > 0) {
            onImportClasses(normalized);
            setImportStatus(
              `🎉 成功匯入 ${normalized.length} 個班級資料！雙介面分數、頭像、背景壁紙與歷史紀錄已完全還原。`
            );
            setTimeout(() => {
              onClose();
            }, 1200);
          } else {
            setImportError('無法辨識此 JSON 格式，請確認是否為課堂系統匯出的備份檔。');
            setImportStatus('');
          }
        } catch {
          setImportError('JSON 解析失敗，請檢查檔案格式是否正確。');
          setImportStatus('');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.csv')) {
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const updated = normalizeImportedCsv(content, classes, currentClassId);
          if (updated) {
            onImportClasses(updated);
            setImportStatus(`🎉 成功由 CSV 更新 ${currentClass.className} 的雙邊成績、頭像與歷史紀錄！`);
            setTimeout(() => {
              onClose();
            }, 1200);
          } else {
            setImportError('CSV 解析出錯或內容為空，請確認檔案格式是否正確。');
            setImportStatus('');
          }
        } catch {
          setImportError('CSV 解析出錯，請確認檔案編碼是否為 UTF-8。');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
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
                寶可夢與星露谷雙介面分數、頭像、背景、加減分詳細明細 100% 互通
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
              您可以匯出全班級的完整 JSON 備份檔（包含全部歷程紀錄與雙介面頭像背景），或匯出當前班級的 Excel / CSV 試算表。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExportJSON}
                className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/70 hover:bg-amber-100/80 transition-all flex flex-col items-center gap-2 text-center shadow-xs cursor-pointer group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">💾</span>
                <span className="font-black text-base text-[#B45309]">全校班級完整備份 (.JSON)</span>
                <span className="text-xs text-stone-500 font-bold">
                  含寶可夢與星露谷分數、每條加減分詳細明細、頭像與卡片背景
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
                  包含學號、姓名、正負分數、雙邊頭像、背景與完整明細
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-stone-600">
              支援上傳從系統匯出的 .json 完整備份或 .csv 表格，系統將智慧還原所有學生分數、每條加減分明細、寶可夢與星露谷頭像及背景！
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
              <span className="text-xs text-stone-400 font-bold">支援 .json 備份檔 或 .csv 表格檔 (UTF-8)</span>
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
