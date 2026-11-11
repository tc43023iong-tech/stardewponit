import { ClassroomClass, Student, PointHistoryItem } from '../types/classroom';

/**
 * Robust CSV parser handling multi-line quoted cells and escaped quotes
 */
export function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      currentCell = '';
      if (currentRow.length > 0 && currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Resolves any student background key or URL across various JSON backup formats
 */
export function resolveStudentCardBackground(st: any): string | undefined {
  let raw =
    st.cardBackground ??
    st.cardTheme ??
    st.themeKey ??
    st.theme ??
    st.background ??
    st.cardBg ??
    st.bgKey;

  if (typeof raw === 'object' && raw !== null) {
    raw = raw.key || raw.bgUrl || raw.url || raw.themeKey;
  }

  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed.length > 0 && trimmed !== 'default' && trimmed !== 'none') {
      return trimmed;
    }
  }
  return undefined;
}

/**
 * Normalizes imported JSON into valid ClassroomClass[] structure
 */
export function normalizeImportedClasses(
  parsed: any,
  existingClasses: ClassroomClass[],
  currentClassId: string
): ClassroomClass[] | null {
  if (!parsed) return null;

  let rawClasses: any[] = [];

  // Case 1: Standard backup bundle { classes: [...] }
  if (typeof parsed === 'object' && Array.isArray(parsed.classes)) {
    rawClasses = parsed.classes;
  } else if (Array.isArray(parsed) && parsed.length > 0) {
    // Case 2: Array of classes
    if ('students' in parsed[0]) {
      rawClasses = parsed;
    } else if ('rollNo' in parsed[0] || 'name' in parsed[0]) {
      // Case 3: Array of students for current class
      rawClasses = existingClasses.map((c) =>
        c.id === currentClassId ? { ...c, students: parsed } : c
      );
    }
  } else if (typeof parsed === 'object' && Array.isArray(parsed.students)) {
    // Case 4: Single class object { className, students: [...] }
    rawClasses = existingClasses.map((c) =>
      c.id === currentClassId ? { ...c, students: parsed.students } : c
    );
  }

  if (rawClasses.length === 0) return null;

  return rawClasses.map((cls, cIdx) => ({
    id: cls.id || `cls_${Date.now()}_${cIdx}`,
    className: cls.className || `班級 ${cIdx + 1}`,
    students: (cls.students || []).map((st: any, idx: number): Student => {
      const points = typeof st.points === 'number' ? st.points : 0;
      const posPoints = typeof st.posPoints === 'number' ? st.posPoints : points > 0 ? points : 0;
      const negPoints = typeof st.negPoints === 'number' ? st.negPoints : points < 0 ? Math.abs(points) : 0;
      const stardewAvatar = st.stardewAvatar || st.avatar || undefined;
      const avatar = st.avatar || stardewAvatar || undefined;
      const cardBg = resolveStudentCardBackground(st);

      return {
        id: st.id || `st_${Date.now()}_${cIdx}_${idx}`,
        rollNo: typeof st.rollNo === 'number' ? st.rollNo : idx + 1,
        name: st.name ? String(st.name).trim() : `學生${idx + 1}`,
        points,
        posPoints,
        negPoints,
        groupId: typeof st.groupId === 'number' ? st.groupId : undefined,
        pokemonId: typeof st.pokemonId === 'number' ? st.pokemonId : Math.floor(Math.random() * 150) + 1,
        pokemonAvatar: st.pokemonAvatar ? String(st.pokemonAvatar).trim() : undefined,
        stardewAvatar,
        avatar,
        cardBackground: cardBg,
        cardTheme: cardBg,
        history: Array.isArray(st.history) ? st.history : [],
      };
    }),
  }));
}

/**
 * Normalizes imported CSV rows into updated ClassroomClass[] structure
 */
export function normalizeImportedCsv(
  csvText: string,
  existingClasses: ClassroomClass[],
  currentClassId: string
): ClassroomClass[] | null {
  const parsedRows = parseCsvRows(csvText);
  if (parsedRows.length <= 1) return null;

  const currentClass = existingClasses.find((c) => c.id === currentClassId) || existingClasses[0];
  if (!currentClass) return null;

  const headerRow = parsedRows[0].map((h) => h.toLowerCase());
  const rollNoIdx = headerRow.findIndex((h) => h.includes('座號') || h.includes('學號') || h.includes('roll'));
  const nameIdx = headerRow.findIndex((h) => h.includes('姓名') || h.includes('name'));
  const pointsIdx = headerRow.findIndex((h) => h.includes('總分') || h.includes('總積分') || h.includes('points'));
  const posIdx = headerRow.findIndex((h) => h.includes('獎勵') || h.includes('正分') || h.includes('pos'));
  const negIdx = headerRow.findIndex((h) => h.includes('違紀') || h.includes('扣分') || h.includes('neg'));
  const pokeIdIdx = headerRow.findIndex((h) => h.includes('寶可夢編號') || h.includes('pokemonid'));
  const pokeAvatarIdx = headerRow.findIndex((h) => h.includes('寶可夢頭像') || h.includes('pokemonavatar'));
  const stardewAvatarIdx = headerRow.findIndex((h) => h.includes('星露谷') || h.includes('自訂頭像') || h.includes('stardewavatar'));
  const cardBgIdx = headerRow.findIndex(
    (h) => h.includes('背景') || h.includes('cardbackground') || h.includes('cardtheme') || h.includes('theme')
  );
  const historyIdx = headerRow.findIndex((h) => h.includes('明細') || h.includes('歷程') || h.includes('history'));

  const newStudents = [...currentClass.students];

  for (let i = 1; i < parsedRows.length; i++) {
    const cols = parsedRows[i];
    if (cols.length < 2) continue;

    const rollNo = rollNoIdx !== -1 ? parseInt(cols[rollNoIdx], 10) : parseInt(cols[0], 10);
    const name = nameIdx !== -1 ? cols[nameIdx] : cols[1];
    if (!name) continue;

    const points = pointsIdx !== -1 ? parseInt(cols[pointsIdx], 10) || 0 : parseInt(cols[2], 10) || 0;
    const posPoints = posIdx !== -1 ? parseInt(cols[posIdx], 10) || 0 : points > 0 ? points : 0;
    const negPoints = negIdx !== -1 ? parseInt(cols[negIdx], 10) || 0 : points < 0 ? Math.abs(points) : 0;

    const pokemonId = pokeIdIdx !== -1 && cols[pokeIdIdx] ? parseInt(cols[pokeIdIdx], 10) : undefined;
    const pokemonAvatar = pokeAvatarIdx !== -1 && cols[pokeAvatarIdx] ? cols[pokeAvatarIdx].trim() : undefined;
    const stardewAvatar = stardewAvatarIdx !== -1 && cols[stardewAvatarIdx] ? cols[stardewAvatarIdx].trim() : undefined;
    const cardBg = cardBgIdx !== -1 && cols[cardBgIdx] ? cols[cardBgIdx].trim() : undefined;

    let parsedHistory: PointHistoryItem[] | undefined;
    if (historyIdx !== -1 && cols[historyIdx]) {
      try {
        parsedHistory = JSON.parse(cols[historyIdx]);
      } catch {}
    }

    const existingIdx = newStudents.findIndex(
      (s) => (rollNo && s.rollNo === rollNo) || s.name.trim() === name.trim()
    );

    if (existingIdx !== -1) {
      const current = newStudents[existingIdx];
      newStudents[existingIdx] = {
        ...current,
        points,
        posPoints,
        negPoints,
        pokemonId: pokemonId || current.pokemonId,
        pokemonAvatar: pokemonAvatar || current.pokemonAvatar,
        stardewAvatar: stardewAvatar || current.stardewAvatar,
        avatar: stardewAvatar || current.avatar,
        cardBackground: cardBg || current.cardBackground,
        cardTheme: cardBg || current.cardTheme || current.cardBackground,
        history: parsedHistory || current.history || [],
      };
    } else {
      newStudents.push({
        id: `st_csv_${Date.now()}_${i}`,
        rollNo: rollNo || newStudents.length + 1,
        name: name.trim(),
        points,
        posPoints,
        negPoints,
        pokemonId: pokemonId || Math.floor(Math.random() * 150) + 1,
        pokemonAvatar,
        stardewAvatar,
        avatar: stardewAvatar,
        cardBackground: cardBg,
        cardTheme: cardBg,
        history: parsedHistory || [],
      });
    }
  }

  return existingClasses.map((c) =>
    c.id === currentClassId ? { ...c, students: newStudents } : c
  );
}

/**
 * Builds the complete export bundle object
 */
export function buildClassroomExportBundle(classes: ClassroomClass[]) {
  return {
    version: 2,
    exportDate: new Date().toISOString(),
    type: 'miss_iong_classroom_full_backup',
    description:
      'Contains complete student scores, avatars (Pokemon & Stardew), card backgrounds, and points history logs',
    classes: classes.map((c) => ({
      id: c.id,
      className: c.className,
      students: c.students.map((s) => {
        const cardBg = s.cardBackground || s.cardTheme || '';
        return {
          id: s.id,
          rollNo: s.rollNo,
          name: s.name,
          points: s.points,
          posPoints: s.posPoints || 0,
          negPoints: s.negPoints || 0,
          groupId: s.groupId,
          pokemonId: s.pokemonId || 25,
          pokemonAvatar: s.pokemonAvatar || '',
          stardewAvatar: s.stardewAvatar || s.avatar || '',
          avatar: s.avatar || s.stardewAvatar || '',
          cardBackground: cardBg,
          cardTheme: cardBg,
          history: s.history || [],
        };
      }),
    })),
  };
}

/**
 * Exports full classroom data directly popping the OS Save As folder dialog
 */
export async function directExportClassroomJSON(classes: ClassroomClass[]): Promise<'saved' | 'downloaded' | 'cancelled'> {
  const exportBundle = buildClassroomExportBundle(classes);
  const jsonContent = JSON.stringify(exportBundle, null, 2);
  const fileName = `Miss_Iong_Full_Classroom_Backup_${new Date().toISOString().slice(0, 10)}.json`;

  // 1. Try modern File System Access API (Pops native OS Save As folder picker)
  if (typeof (window as any).showSaveFilePicker === 'function') {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: 'JSON 班級完整備份檔案 (*.json)',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(jsonContent);
      await writable.close();
      return 'saved';
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return 'cancelled'; // User clicked Cancel in folder picker
      }
      // If permission or other error, fallback to direct anchor download
    }
  }

  // 2. Direct browser anchor download fallback
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  return 'downloaded';
}
