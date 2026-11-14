import starterFarmBg from '../assets/images/student_farm_starter_1794665062055.jpg';
import standardFarmBg from '../assets/images/stardew_farm_bg_1793625320760.jpg';
import enchantedFarmBg from '../assets/images/student_farm_enchanted_1794665062723.jpg';
import legendaryFarmBg from '../assets/images/student_farm_legendary_1794665063858.jpg';

export interface FarmArtworkTier {
  bgUrl: string;
  showcaseCropId: string;
  showcaseLabel: string;
  unlockedCrops: { id: string; label: string }[];
}

export function getStudentFarmArtwork(points: number): FarmArtworkTier {
  if (points >= 750) {
    return {
      bgUrl: legendaryFarmBg,
      showcaseCropId: 'sdv_starfruit',
      showcaseLabel: points >= 1000 ? '星露傳奇天宮' : '皇家金輝莊園',
      unlockedCrops: [
        { id: 'sdv_starfruit', label: '奢華楊桃' },
        { id: 'sdv_ancient_fruit', label: '遠古水果' },
        { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
        { id: 'sdv_golden_pumpkin', label: '黃金南瓜' },
        { id: 'sdv_stardrop', label: '星之果實' },
        { id: 'sdv_prismatic_shard', label: '五彩碎片' },
      ],
    };
  }
  if (points >= 300) {
    return {
      bgUrl: enchantedFarmBg,
      showcaseCropId: 'sdv_ancient_fruit',
      showcaseLabel: points >= 500 ? '秘境晶石林園' : '鐵藝果園莊園',
      unlockedCrops: [
        { id: 'sdv_ancient_fruit', label: '遠古水果' },
        { id: 'sdv_pumpkin', label: '秋季巨瓜' },
        { id: 'sdv_blueberry', label: '飽滿藍莓' },
        { id: 'sdv_fairy_rose', label: '仙女玫瑰' },
        { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
      ],
    };
  }
  if (points >= 150) {
    return {
      bgUrl: standardFarmBg,
      showcaseCropId: 'sdv_pumpkin',
      showcaseLabel: '白木牧場田園',
      unlockedCrops: [
        { id: 'sdv_pumpkin', label: '秋季巨瓜' },
        { id: 'sdv_blueberry', label: '飽滿藍莓' },
        { id: 'sdv_cauliflower', label: '甘藍菜花' },
        { id: 'sdv_strawberry', label: '甜美草莓' },
      ],
    };
  }
  if (points >= 50) {
    return {
      bgUrl: starterFarmBg,
      showcaseCropId: 'sdv_strawberry',
      showcaseLabel: '硬木開拓農舍',
      unlockedCrops: [
        { id: 'sdv_strawberry', label: '甜美草莓' },
        { id: 'sdv_cauliflower', label: '甘藍菜花' },
        { id: 'sdv_blue_jazz', label: '藍爵士花' },
      ],
    };
  }
  return {
    bgUrl: starterFarmBg,
    showcaseCropId: 'sdv_blue_jazz',
    showcaseLabel: '原木初建牧區',
    unlockedCrops: [
      { id: 'sdv_blue_jazz', label: '藍爵士花' },
      { id: 'sdv_strawberry', label: '草莓幼苗' },
    ],
  };
}
