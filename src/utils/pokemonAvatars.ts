/**
 * Pokemon Avatar Resolver & Card Background Themes
 * Matching the exact resolution, fallback and styling of Miss Iong's Pokémon Class Points Manager
 */

import avatarMapRaw from '../data/pokemonAvatarMap.json';
import cardThemesRaw from '../data/pokemonCardThemes.json';
import megaIdsRaw from '../data/pokemonMegaIds.json';

export const POKEMON_AVATAR_MAP: Record<string, string> = avatarMapRaw as Record<string, string>;
export const POKEMON_CARD_THEMES: Record<string, any> = cardThemesRaw as Record<string, any>;
export const POKEMON_MEGA_IDS: number[] = megaIdsRaw as number[];

export const isEmoji = (e: string): boolean => {
  if (!e) return false;
  return /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e) || (e.length <= 4 && !e.startsWith('http') && !e.startsWith('/'));
};

/**
 * Resolves avatar image URL or emoji matching target function F(pokemonId)
 */
export function resolvePokemonAvatar(pokemonId: number | string | undefined): string {
  if (pokemonId === undefined || pokemonId === null || pokemonId === '') {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
  }

  // If already full URL or data URI
  if (typeof pokemonId === 'string') {
    if (pokemonId.startsWith('http://') || pokemonId.startsWith('https://') || pokemonId.startsWith('data:')) {
      return pokemonId;
    }
    if (pokemonId.startsWith('/avatars/')) {
      return `https://miss-iongs-poke-mon-class-points-ma.vercel.app${pokemonId}`;
    }
    const num = parseInt(pokemonId, 10);
    if (!isNaN(num)) {
      pokemonId = num;
    } else {
      return pokemonId;
    }
  }

  const id = Number(pokemonId);

  // Check custom avatar dictionary
  if (POKEMON_AVATAR_MAP[id]) {
    return POKEMON_AVATAR_MAP[id];
  }

  // Showdown animated GIFs (12001 .. 13297)
  if (id >= 12001 && id <= 13297) {
    const showdownId = id <= 13025 ? id - 12000 : (POKEMON_MEGA_IDS[id - 13026] || id - 12000);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${showdownId}.gif`;
  }

  // Standard PokeAPI official artwork (1 .. 1025)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function resolveStudentAvatar(student: { pokemonId?: number; avatar?: string } | undefined | null): string {
  if (!student) return resolvePokemonAvatar(25);
  return resolvePokemonAvatar(student.pokemonId || student.avatar);
}

/**
 * Card theme definition
 */
export interface TargetCardTheme {
  key: string;
  name: string;
  badge: string;
  bgUrl: string;
  description: string;
  accentBorder: string;
  badgeBg: string;
}

export function getCardTheme(themeKey?: string): TargetCardTheme | undefined {
  if (!themeKey || themeKey === 'default') return undefined;

  let rawTheme = POKEMON_CARD_THEMES[themeKey];
  if (!rawTheme) {
    // Try matching by key, badge, or name
    for (const k in POKEMON_CARD_THEMES) {
      const item = POKEMON_CARD_THEMES[k];
      if (
        k === themeKey ||
        item.key === themeKey ||
        (item.badge && item.badge.toLowerCase() === themeKey.toLowerCase()) ||
        item.name === themeKey
      ) {
        rawTheme = item;
        break;
      }
    }
  }

  // If themeKey is directly an image URL
  if (!rawTheme && (themeKey.startsWith('http://') || themeKey.startsWith('https://') || themeKey.startsWith('/') || themeKey.startsWith('data:'))) {
    const fullUrl = themeKey.startsWith('/') ? `https://20261011missiongsclass.vercel.app${themeKey}` : themeKey;
    return {
      key: 'custom_bg',
      name: '自訂背景',
      badge: 'Custom',
      bgUrl: fullUrl,
      description: '自訂背景壁紙',
      accentBorder: 'border-amber-300 hover:border-amber-500',
      badgeBg: 'bg-amber-100/90 text-amber-900 border-amber-300',
    };
  }

  if (!rawTheme) return undefined;

  let resolvedBgUrl = rawTheme.bgUrl || '';
  if (resolvedBgUrl.startsWith('/')) {
    resolvedBgUrl = `https://20261011missiongsclass.vercel.app${resolvedBgUrl}`;
  }

  return {
    ...rawTheme,
    bgUrl: resolvedBgUrl,
  };
}
