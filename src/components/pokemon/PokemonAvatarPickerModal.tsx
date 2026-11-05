import React, { useState, useMemo } from 'react';
import { Student } from '../../types/classroom';
import {
  resolvePokemonAvatar,
  POKEMON_CARD_THEMES,
  POKEMON_AVATAR_MAP,
  isEmoji,
} from '../../utils/pokemonAvatars';

interface PokemonAvatarPickerModalProps {
  student: Student;
  onClose: () => void;
  onSelectAvatar: (avatarId: number | string) => void;
  onSelectTheme: (themeKey: string) => void;
}

// 1. Sanrio exact subcategories from original target site
const SANRIO_SUBCATEGORIES = [
  { key: 'all', name: '全部', icon: '🎀' },
  { key: 'collection', name: 'Collection 典藏', icon: '✨', avatarIds: [10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040, 10041] },
  { key: 'kuromi', name: '酷洛米', icon: '🖤', avatarIds: [10042, 10043, 8247, 8248, 8249, 8250, 8251, 8252, 8055, 8056, 8057, 8058, 8059, 8060, 8061, 8062, 8063, 8064, 8229, 8230, 8231, 8232, 8233, 8292, 8293] },
  { key: 'kitty', name: 'Hello Kitty', icon: '🎀', avatarIds: [8031, 8032, 8033, 8034, 8035, 8151, 8157, 8320] },
  { key: 'melody', name: '美樂蒂', icon: '🌸', avatarIds: [8241, 8242, 8243, 8244, 8245, 8246, 8036, 8037, 8038, 8039, 8040, 8153, 8158, 8288, 8289, 8290, 8291] },
  { key: 'purin', name: '布丁狗', icon: '🍮', avatarIds: [8065, 8066, 8067, 8068, 8069, 8149, 8155, 8219, 8315, 8316, 8220, 8221, 8222, 8223] },
  { key: 'cinna', name: '大耳狗', icon: '☁️', avatarIds: [8234, 8235, 8236, 8237, 8238, 8239, 8240, 8070, 8071, 8072, 8073, 8074, 8150, 8156] },
  { key: 'pochacco', name: '帕恰狗', icon: '🐶', avatarIds: [8091, 8092, 8116, 8199, 8200, 8201, 8202, 8203, 8294] },
  { key: 'others', name: '其他好朋友', icon: '✨', avatarIds: [8075, 8076, 8088, 8089, 8090, 8132, 8119, 8131, 8154, 8152, 8295, 8296, 8297] },
];

// 2. Partner exact subcategories from original target site
const PARTNER_SUBCATEGORIES = [
  { key: 'all', name: '全部', icon: '🐾' },
  { key: 'puppy', name: '線條小狗', icon: '🐶', avatarIds: [13000, 13001, 13002, 13003, 13004, 13005, 13006, 13007, 13008, 13009, 13010, 13011, 13012, 13013, 13014, 13015] },
  { key: 'sumikko', name: '角落生物', icon: '🍱', avatarIds: [8001, 8002, 8003, 8004, 8005, 8006, 8007, 8008, 8009, 8010, 8011, 8012, 8013, 8014, 8015, 8016, 8017, 8018, 8019, 8020, 8021, 8022, 8023, 8024, 8025, 8026, 8027, 8028, 8029, 8030, 8299] },
  { key: 'chiikawa', name: 'chikawwa', icon: '🐹', avatarIds: [10000, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010, 10011, 10012, 10013, 10014, 10015, 10016, 10017, 10018, 10019, 10020, 10021, 10022, 10023, 10024, 10025, 8041, 8042, 8043, 8044, 8045, 8140, 8142, 8143, 8144, 8145, 8148, 8204, 8205, 8206, 8207, 8208, 8224, 8225, 8226, 8227, 8228, 8256, 8301, 8302, 8303, 8304, 8305, 8306, 8307, 8308, 8309, 8310, 8311, 8312, 8313, 8314] },
  { key: 'rilakkuma', name: '輕鬆熊', icon: '🍯', avatarIds: [8189, 8190, 8191, 8192, 8193, 8194, 8195, 8196, 8197, 8209, 8210, 8211, 8212, 8213, 8214, 8215, 8216, 8217] },
  { key: 'marvel', name: '漫威', icon: '🦸‍♂️', avatarIds: [8046, 8047, 8048, 8049, 8105, 8106, 8107, 8108, 8109, 8110, 8179, 8180, 8181, 8182, 8183, 8184, 8185, 8186, 8187, 8188] },
  { key: 'ultraman', name: '超人', icon: '⚡', avatarIds: [8086, 8087, 8169, 8170, 8171, 8172, 8173, 8174, 8175, 8176, 8177, 8178] },
  { key: 'snoopy', name: 'snoopy', icon: '🐶', avatarIds: [8079, 8080, 8317, 8318, 8319] },
  { key: 'princess', name: '公主', icon: '👑', avatarIds: [8081, 8082, 8083, 8095, 8096, 8097, 8098, 8121, 8122, 8123, 8124, 8125, 8126, 8127, 8128, 8129, 8130] },
  { key: 'bean', name: '憨豆先生', icon: '🧸', avatarIds: [8084, 8085, 8135, 8136, 8137, 8138, 8159, 8160, 8161, 8163, 8164, 8165, 8166, 8167, 8168] },
  { key: 'other_partners', name: '其他', icon: '✨', avatarIds: [10026, 10027, 10028, 8050, 8051, 8052, 8053, 8054, 8077, 8078, 8093, 8094, 8099, 8100, 8101, 8102, 8103, 8104, 8111, 8112, 8113, 8114, 8115, 8117, 8118, 8133, 8134, 8147] },
];

// 3. Animated subcategories
const ANIMATED_SUBCATEGORIES = [
  { key: 'all', name: '全部動態', icon: '⚡' },
  { key: 'emoji', name: '😀 表情符號', filter: (id: number) => id >= 9800 && id <= 9999 },
  { key: 'chiikawa_gif', name: '🐹 吉伊卡哇', filter: (id: number) => id >= 8307 && id <= 8314 },
  { key: 'sanrio_gif', name: '🎀 三麗鷗', filter: (id: number) => id === 8316 || id === 8320 },
  { key: 'snoopy_gif', name: '🐶 史努比', filter: (id: number) => id === 8318 || id === 8319 },
];

// 4. Background categories (for 149 500-pt themes)
const BG_THEME_CATEGORIES = [
  { key: 'all', name: '全部 (149款)', icon: '🏆' },
  { key: 'puppy', name: '🐶 線條小狗 (12款)', filter: (k: string) => k.includes('puppy') },
  { key: 'sanrio', name: '🎀 三麗鷗 (37款)', filter: (k: string) => k.includes('sanrio') || k.includes('kitty') || k.includes('melody') || k.includes('kuromi') || k.includes('purin') || k.includes('cinna') || k.includes('pochacco') || k.includes('keroppi') || k.includes('twinstars') },
  { key: 'chiikawa', name: '🐹 吉伊卡哇 (15款)', filter: (k: string) => k.includes('chiikawa') || k.includes('usagi') || k.includes('momonga') || k.includes('kurimanju') },
  { key: 'pokemon', name: '⚡ 寶可夢 (16款)', filter: (k: string) => k.includes('pokemon') || k.includes('snorlax') },
  { key: 'sumikko', name: '🍱 角落生物&熊 (10款)', filter: (k: string) => k.includes('sumikko') || k.includes('rilakkuma') },
  { key: 'disney', name: '🎬 動漫與迪士尼 (35款)', filter: (k: string) => k.includes('disney') || k.includes('conan') || k.includes('doraemon') || k.includes('shinchan') || k.includes('frozen') || k.includes('naruto') || k.includes('onepiece') || k.includes('snoopy') || k.includes('spongebob') || k.includes('toystory') || k.includes('zootopia') || k.includes('minions') || k.includes('marvel') },
  { key: 'fantasy', name: '🌌 奇幻與星空 (24款)', filter: (k: string) => k.includes('magic') || k.includes('pixel') || k.includes('space') || k.includes('star') || k.includes('castle') || k.includes('jurassic') || k.includes('ninja') || k.includes('campfire') || k.includes('orchard') || k.includes('cloud') },
];

const TABS = [
  { name: 'Gen 1 & 2', range: [1, 251] },
  { name: 'Gen 3 & 4', range: [252, 493] },
  { name: 'Gen 5 & 6', range: [494, 721] },
  { name: 'Gen 7, 8 & 9+', range: [722, 1025] },
  { name: '⚡ 動態pokemon', filter: (id: number) => id >= 12001 && id <= 13297 },
  { name: '✨ 精選', filter: (id: number) => id >= 2001 && id <= 3495 },
  { name: '😝 逗趣', filter: (id: number) => (id >= 4001 && id <= 4109) || (id >= 7001 && id <= 7127) || [8253, 8254, 8255, 8257, 8258, 8262, 8259, 8260, 8267, 8261, 8264, 8266, 8265, 8263].includes(id) },
  { name: '🐾 夥伴', filter: (id: number) => PARTNER_SUBCATEGORIES.some((s) => s.avatarIds?.includes(id)) },
  { name: '🎀 Sanrio', filter: (id: number) => SANRIO_SUBCATEGORIES.some((s) => s.avatarIds?.includes(id)) },
  { name: '動態', filter: (id: number) => (id >= 9800 && id <= 9999 || [8307, 8308, 8309, 8310, 8311, 8312, 8313, 8314, 8316, 8318, 8319, 8320].includes(id)) && ![9802, 9807, 9812, 9813, 9814, 9815, 9816, 9818, 9820, 9821, 9823, 9824, 9827, 9917, 9924, 9925, 9927, 9929, 9930, 9937, 9939, 9966, 9989, 9991, 9994, 9995, 9997, 9998, 9999].includes(id) },
  { name: '🏆 500分', filter: () => false },
];

export const PokemonAvatarPickerModal: React.FC<PokemonAvatarPickerModalProps> = ({
  student,
  onClose,
  onSelectAvatar,
  onSelectTheme,
}) => {
  const currentId = Number(student.pokemonId) || 25;
  const currentThemeKey = student.cardBackground || 'default';

  const [activeTab, setActiveTab] = useState<string>('Gen 1 & 2');
  const [subCategory, setSubCategory] = useState<string>('all');
  const [bgCategory, setBgCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [previewItem, setPreviewItem] = useState<{
    id?: number;
    themeKey?: string;
    name: string;
    badge: string;
    url: string;
    description: string;
  } | null>(null);

  // All known avatar IDs
  const allIds = useMemo(() => {
    const list: number[] = [];
    for (let i = 1; i <= 1025; i++) list.push(i);
    for (let i = 12001; i <= 13297; i++) list.push(i);
    Object.keys(POKEMON_AVATAR_MAP).forEach((k) => {
      const num = Number(k);
      if (!list.includes(num)) list.push(num);
    });
    return list;
  }, []);

  // Filtered avatar IDs
  const filteredIds = useMemo(() => {
    if (activeTab === '🏆 500分') return [];

    let items = allIds;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter((id) => String(id).includes(q));
      return sortOrder === 'desc' ? [...items].reverse() : items;
    }

    // Tab filtering
    if (activeTab === '🐾 夥伴') {
      if (subCategory === 'all') {
        items = items.filter((id) => PARTNER_SUBCATEGORIES.some((s) => s.avatarIds?.includes(id)));
      } else {
        const sub = PARTNER_SUBCATEGORIES.find((s) => s.key === subCategory);
        items = sub ? items.filter((id) => sub.avatarIds?.includes(id)) : [];
      }
    } else if (activeTab === '🎀 Sanrio') {
      if (subCategory === 'all') {
        items = items.filter((id) => SANRIO_SUBCATEGORIES.some((s) => s.avatarIds?.includes(id)));
      } else {
        const sub = SANRIO_SUBCATEGORIES.find((s) => s.key === subCategory);
        items = sub ? items.filter((id) => sub.avatarIds?.includes(id)) : [];
      }
    } else if (activeTab === '動態') {
      if (subCategory === 'all') {
        const dynDef = TABS.find((t) => t.name === '動態');
        items = dynDef?.filter ? items.filter(dynDef.filter) : [];
      } else {
        const sub = ANIMATED_SUBCATEGORIES.find((s) => s.key === subCategory);
        items = sub?.filter ? items.filter(sub.filter) : [];
      }
    } else if (activeTab === '⚡ 動態pokemon') {
      items = items.filter((id) => id >= 12001 && id <= 13297);
      if (subCategory === '1-200') items = items.filter((id) => id >= 12001 && id <= 12200);
      else if (subCategory === '201-400') items = items.filter((id) => id >= 12201 && id <= 12400);
      else if (subCategory === '401-600') items = items.filter((id) => id >= 12401 && id <= 12600);
      else if (subCategory === '601-800') items = items.filter((id) => id >= 12601 && id <= 12800);
      else if (subCategory === '801-1000') items = items.filter((id) => id >= 12801 && id <= 13000);
      else if (subCategory === '1001-1200') items = items.filter((id) => id >= 13001 && id <= 13200);
      else if (subCategory === '1201+') items = items.filter((id) => id >= 13201);
    } else {
      const tabDef = TABS.find((t) => t.name === activeTab);
      if (tabDef?.range) {
        items = items.filter((id) => id >= tabDef.range[0] && id <= tabDef.range[1]);
      } else if (tabDef?.filter) {
        items = items.filter(tabDef.filter);
      }
    }

    return sortOrder === 'desc' ? [...items].reverse() : items;
  }, [allIds, activeTab, subCategory, searchQuery, sortOrder]);

  // Card background themes list filtered by category
  const backgroundThemesList = useMemo(() => {
    const list = Object.values(POKEMON_CARD_THEMES);
    if (bgCategory === 'all') return list;
    const cat = BG_THEME_CATEGORIES.find((c) => c.key === bgCategory);
    if (!cat?.filter) return list;
    return list.filter((b) => cat.filter(b.key));
  }, [bgCategory]);

  // Shuffle pick random avatar
  const handleShuffle = () => {
    const rand = allIds[Math.floor(Math.random() * allIds.length)];
    onSelectAvatar(rand);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#FFFDF9] w-full max-w-7xl h-full max-h-[94vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-[5px] border-[#8D6E63] relative">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#FFF3E0] via-[#FFE0B2] to-[#FFF3E0] px-5 sm:px-8 py-3 shrink-0 shadow-sm relative z-10 border-b-2 border-[#D7CCC8]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            {/* Student Preview */}
            <div className="flex items-center gap-3.5 flex-1">
              <div className="bg-white p-1.5 shadow-md shrink-0 border-2 border-[#8D6E63] rounded-2xl relative">
                <img
                  src={resolvePokemonAvatar(currentId)}
                  className="w-11 h-11 object-contain"
                  alt={student.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#F59E0B] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow-xs">
                  #{currentId}
                </div>
              </div>

              <div className="flex flex-col leading-tight">
                <h2 className="text-xl sm:text-2xl font-black text-[#5D4037] tracking-tight">
                  幫 <span className="text-[#D97706]">{student.name}</span> 挑選新樣子 🌱
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="bg-[#E8F8F0] border border-[#81C784] text-[#2E7D32] text-[11px] px-2 py-0.5 rounded-full font-black">
                    🍀 目前編號: #{currentId}
                  </span>
                  <span className="text-stone-500 text-[11px] font-bold hidden sm:inline">
                    一行 8 格緊湊檢視 · 點選即時套用
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Shuffle, Search, Close */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleShuffle}
                title="隨機分配頭像"
                className="p-2 bg-white hover:bg-[#FFF8E1] rounded-xl border border-[#8D6E63] text-[#5D4037] transition-all shadow-xs flex items-center justify-center shrink-0 active:scale-95 cursor-pointer"
              >
                <span className="text-base">🔀</span>
              </button>

              <div className="relative flex-1 lg:w-60 shrink-0">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-40">🔍</span>
                <input
                  type="text"
                  placeholder="搜尋編號或關鍵字..."
                  className="w-full py-1.5 pl-8 pr-3 rounded-xl bg-white border border-[#D7CCC8] focus:border-[#F59E0B] outline-none text-xs font-black text-[#5D4037]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-[#8D6E63] hover:text-[#5D4037] text-3xl hover:scale-110 transition-transform leading-none font-light px-2 cursor-pointer"
              >
                ×
              </button>
            </div>
          </div>

          {/* Top Category Tabs (11 Tabs matching original site) */}
          {!searchQuery && (
            <div className="w-full flex overflow-x-auto gap-1.5 py-1.5 custom-scrollbar items-center border-t border-dashed border-[#8D6E63]/20 mt-2">
              {TABS.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => {
                    setActiveTab(t.name);
                    setSubCategory('all');
                  }}
                  className={`px-3 py-1 rounded-xl font-black text-xs whitespace-nowrap transition-all border cursor-pointer ${
                    activeTab === t.name
                      ? 'bg-[#4CAF50] text-white border-[#2E7D32] shadow-xs scale-102 font-black'
                      : 'bg-white/80 text-[#5D4037] border-[#D7CCC8] hover:bg-white hover:border-[#8D6E63]'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#FFFBF0]/30 custom-scrollbar">
          {/* Subcategories for 🐾 夥伴 */}
          {activeTab === '🐾 夥伴' && !searchQuery && (
            <div className="w-full flex items-center gap-1.5 overflow-x-auto py-1 px-2 mb-3 bg-white/80 rounded-xl border border-[#8D6E63]/20 shadow-2xs">
              <span className="text-xs font-black text-[#8D6E63] shrink-0 mr-1">📂 夥伴分類：</span>
              {PARTNER_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() => setSubCategory(sub.key)}
                  className={`px-2.5 py-0.5 rounded-lg font-black text-xs whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1 ${
                    subCategory === sub.key
                      ? 'bg-[#F59E0B] text-white border-[#D97706] shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-[#FFF8E1]'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Subcategories for 🎀 Sanrio */}
          {activeTab === '🎀 Sanrio' && !searchQuery && (
            <div className="w-full flex items-center gap-1.5 overflow-x-auto py-1 px-2 mb-3 bg-white/80 rounded-xl border border-[#8D6E63]/20 shadow-2xs">
              <span className="text-xs font-black text-[#8D6E63] shrink-0 mr-1">📂 三麗鷗：</span>
              {SANRIO_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() => setSubCategory(sub.key)}
                  className={`px-2.5 py-0.5 rounded-lg font-black text-xs whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1 ${
                    subCategory === sub.key
                      ? 'bg-[#EC4899] text-white border-[#BE185D] shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-[#FDF2F8]'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Subcategories for 動態 */}
          {activeTab === '動態' && !searchQuery && (
            <div className="w-full flex items-center gap-1.5 overflow-x-auto py-1 px-2 mb-3 bg-white/80 rounded-xl border border-[#8D6E63]/20 shadow-2xs">
              <span className="text-xs font-black text-[#8D6E63] shrink-0 mr-1">📂 動態表情：</span>
              {ANIMATED_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() => setSubCategory(sub.key)}
                  className={`px-2.5 py-0.5 rounded-lg font-black text-xs whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1 ${
                    subCategory === sub.key
                      ? 'bg-[#8B5CF6] text-white border-[#6D28D9] shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-[#F5F3FF]'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Subcategories for ⚡ 動態pokemon */}
          {activeTab === '⚡ 動態pokemon' && !searchQuery && (
            <div className="w-full flex items-center gap-1.5 overflow-x-auto py-1 px-2 mb-3 bg-white/80 rounded-xl border border-[#8D6E63]/20 shadow-2xs">
              <span className="text-xs font-black text-[#8D6E63] shrink-0 mr-1">📂 分區：</span>
              {[
                { id: 'all', label: '全部 (1297+)' },
                { id: '1-200', label: '#1-200' },
                { id: '201-400', label: '#201-400' },
                { id: '401-600', label: '#401-600' },
                { id: '601-800', label: '#601-800' },
                { id: '801-1000', label: '#801-1000' },
                { id: '1001-1200', label: '#1001-1200' },
                { id: '1201+', label: '#1201+ 特殊' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSubCategory(sub.id)}
                  className={`px-2.5 py-0.5 rounded-lg font-black text-xs whitespace-nowrap transition-all border cursor-pointer ${
                    subCategory === sub.id
                      ? 'bg-[#F59E0B] text-white border-[#D97706] shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-[#FFF8E1]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}

          {/* TAB: 🏆 500分 Card Background Themes (With Categories and Taller Vertical Previews) */}
          {activeTab === '🏆 500分' ? (
            <div className="space-y-4">
              {/* 500-pt Theme Category Filter Tabs */}
              <div className="w-full flex items-center gap-1.5 overflow-x-auto py-1 px-2 bg-white/80 rounded-xl border border-[#8D6E63]/20 shadow-2xs">
                <span className="text-xs font-black text-[#8D6E63] shrink-0 mr-1">🎨 壁紙分類：</span>
                {BG_THEME_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setBgCategory(cat.key)}
                    className={`px-3 py-1 rounded-xl font-black text-xs whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1 ${
                      bgCategory === cat.key
                        ? 'bg-[#D97706] text-white border-[#92400E] shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Taller Vertical Card Previews so teachers can clearly see the artwork */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {backgroundThemesList.map((bg) => {
                  const isCurrent = currentThemeKey === bg.key;

                  return (
                    <div
                      key={bg.key}
                      onClick={() => onSelectTheme(bg.key)}
                      className={`relative rounded-3xl border-3 transition-all cursor-pointer overflow-hidden min-h-[280px] sm:min-h-[310px] aspect-[3/4.2] flex flex-col justify-between shadow-sm hover:shadow-2xl hover:scale-[1.02] ${
                        isCurrent
                          ? 'ring-4 ring-[#F59E0B] border-[#D97706] scale-[1.02] shadow-xl'
                          : 'border-[#E7DFD5] hover:border-[#F59E0B] bg-white'
                      }`}
                    >
                      {/* Full Background Art Image */}
                      {bg.bgUrl ? (
                        <img
                          src={bg.bgUrl}
                          alt={bg.name}
                          className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05] saturate-[1.1]"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF0] to-[#FEF3C7]" />
                      )}

                      {/* Translucent Glass Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                      {/* Card Top: Mock student header */}
                      <div className="relative z-10 p-3 flex items-center justify-between">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded-lg bg-white/95 text-[#2E7D32] shadow-xs border border-white">
                          #{student.rollNo}
                        </span>
                        <span className="font-black text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 border border-white shadow-xs">
                          👑 500+
                        </span>
                      </div>

                      {/* Card Center: Student Avatar with Ring */}
                      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                        <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-white shadow-lg p-1 flex items-center justify-center">
                          <img
                            src={resolvePokemonAvatar(student.pokemonId || student.avatar)}
                            alt={student.name}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="mt-1 px-2.5 py-0.5 rounded-lg bg-white/90 text-[#4E2713] text-xs font-black shadow-xs border border-white">
                          {student.name}
                        </div>
                      </div>

                      {/* Card Bottom: Theme Title & Info with Clear Scrim */}
                      <div className="relative z-10 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-6 text-white flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-black text-sm text-amber-200 drop-shadow-sm truncate">
                            {bg.name}
                          </h4>
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500/80 text-white shrink-0">
                            {bg.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-200 line-clamp-2 mt-1 leading-tight">
                          {bg.description}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/20">
                          {isCurrent ? (
                            <span className="text-[10px] font-black text-amber-950 bg-amber-300 px-2 py-0.5 rounded-md">
                              使用中 ✓
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-300">點擊套用</span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewItem({
                                themeKey: bg.key,
                                name: bg.name,
                                badge: bg.badge,
                                url: bg.bgUrl,
                                description: bg.description,
                              });
                            }}
                            className="text-stone-300 hover:text-white text-xs font-black p-0.5"
                          >
                            🔍 放大
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* TAB: Avatar Gallery Grid - EXACTLY 8 ITEMS PER ROW (一行顯示8個) */
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E7DFD5]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#8D6E63]">
                    已載入 {filteredIds.length} 款頭像 (桌面一行 8 格緊湊檢視)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-2.5 py-0.5 text-xs font-black text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-lg cursor-pointer"
                >
                  {sortOrder === 'asc' ? '⬇️ 倒序排列' : '⬆️ 正序排列'}
                </button>
              </div>

              {filteredIds.length === 0 ? (
                <div className="py-20 text-center text-stone-400 font-black text-base">
                  找不到相符的頭像喔 🥺
                </div>
              ) : (
                /* Exactly 8 columns on desktop (grid-cols-4 sm:grid-cols-6 md:grid-cols-8) */
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-2.5">
                  {filteredIds.map((id) => {
                    const isSelected = id === currentId;
                    const avatarUrl = resolvePokemonAvatar(id);
                    const isEmojiItem = isEmoji(avatarUrl);

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => onSelectAvatar(id)}
                        className={`group relative w-full overflow-hidden p-1.5 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center active:scale-95 shadow-2xs cursor-pointer ${
                          isSelected
                            ? 'border-[#F59E0B] bg-[#FEF3C7] ring-3 ring-[#FDE68A] z-10 scale-105'
                            : 'border-[#E7DFD5] bg-white hover:border-[#81C784] hover:bg-[#F0FDF4]'
                        }`}
                      >
                        <div
                          className={`w-full flex items-center justify-between text-[10px] font-black mb-1 tabular-nums px-0.5 ${
                            isSelected ? 'text-[#B45309]' : 'text-stone-400'
                          }`}
                        >
                          <span className="truncate">
                            {id >= 13000 && id <= 13015
                              ? `#${id}`
                              : id >= 12001 && id <= 13025
                              ? `#${id - 12000}⚡`
                              : id >= 13026 && id <= 13297
                              ? `#M${id - 13025}⚡`
                              : `#${id}`}
                          </span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewItem({
                                id,
                                name: `頭像 #${id}`,
                                badge: `Avatar #${id}`,
                                url: avatarUrl,
                                description: '點擊下方「✨ 一鍵套用為頭像」即可立即套用',
                              });
                            }}
                            className="text-stone-400 hover:text-[#D97706] hover:scale-125 transition-transform p-0.5"
                            title="全圖預覽"
                          >
                            🔍
                          </span>
                        </div>

                        <div className="w-full flex items-center justify-center relative overflow-hidden aspect-square rounded-xl bg-stone-50/60 border border-[#E7DFD5] p-1">
                          {isEmojiItem ? (
                            <span className="text-2xl select-none">{avatarUrl}</span>
                          ) : (
                            <img
                              src={avatarUrl}
                              alt={`#${id}`}
                              className="w-full h-full object-contain pointer-events-none drop-shadow-2xs"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>

                        {isSelected && (
                          <div className="mt-1 text-[8px] font-black text-[#B45309] uppercase tracking-tight bg-[#FDE68A] px-1.5 py-0.2 rounded-full">
                            使用中 ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FFFDF9] py-2.5 px-6 text-center border-t border-[#E7DFD5] shrink-0 flex items-center justify-between">
          <p className="text-xs text-[#8D6E63] font-black tracking-wider">
            🌸 Sumikkogurashi Avatar Gallery • Miss Iong's Classroom
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl font-black text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
          >
            完成
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-4 border-[#8D6E63] p-6 max-w-sm w-full flex flex-col items-center gap-3 text-center shadow-2xl"
          >
            <h3 className="font-black text-xl text-[#5D4037]">{previewItem.name}</h3>
            <div className="w-52 h-52 rounded-2xl border-2 border-stone-200 p-2 flex items-center justify-center bg-stone-50 overflow-hidden">
              <img
                src={previewItem.url}
                alt={previewItem.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-stone-500 font-bold">{previewItem.description}</p>

            <div className="flex gap-2 w-full mt-2">
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="flex-1 py-2 rounded-xl text-xs font-black bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
              >
                關閉
              </button>
              <button
                type="button"
                onClick={() => {
                  if (previewItem.themeKey) {
                    onSelectTheme(previewItem.themeKey);
                  } else if (previewItem.id !== undefined) {
                    onSelectAvatar(previewItem.id);
                  }
                  setPreviewItem(null);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-black text-white bg-[#4CAF50] hover:bg-[#43A047] shadow-sm cursor-pointer"
              >
                ✨ 一鍵套用
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
