// Stardew Valley Scenic Background Assets
import springFarmBg from '../assets/images/stardew_farm_bg_1793625320760.jpg';
import autumnFarmBg from '../assets/images/stardew_autumn_bg_1793625338487.jpg';
import winterFarmBg from '../assets/images/stardew_winter_bg_1793625352268.jpg';
import woodsFarmBg from '../assets/images/stardew_woods_bg_1793625369367.jpg';
import classicOverworldBg from '../assets/images/stardew_valley_overworld_1793505142785.jpg';

// Individual Thematic Card Background Assets
import cardSpringFairy from '../assets/images/card_spring_fairy_1793774841552.jpg';
import cardSummerSunflower from '../assets/images/card_summer_sunflower_1793774870016.jpg';
import cardIridiumMine from '../assets/images/card_iridium_mine_1793774885634.jpg';
import cardGoldenPalace from '../assets/images/card_golden_palace_1793774908914.jpg';
import cardOceanSunset from '../assets/images/card_ocean_sunset_1793774923985.jpg';
import cardGalaxyStars from '../assets/images/card_galaxy_stars_1793774941549.jpg';

// Special 5 Stardew Pixel Assets
import cardDesertOasis from '../assets/images/card_desert_oasis_1793625393930.jpg';
import cardVolcano from '../assets/images/card_volcano_1793625412992.jpg';
import cardMushrooms from '../assets/images/card_mushrooms_1793625426682.jpg';
import cardJellies from '../assets/images/card_jellies_1793625439674.jpg';
import cardOrchard from '../assets/images/card_orchard_1793625454883.jpg';

export const SCENIC_PAGE_IMAGES: Record<string, string> = {
  spring_farm: springFarmBg,
  summer_sunflower: cardSummerSunflower,
  autumn_amber: autumnFarmBg,
  winter_frost: winterFarmBg,
  secret_woods: woodsFarmBg,
  cozy_homestead: classicOverworldBg,
  // 4 New Unique Page Themes
  iridium_cavern: cardIridiumMine,
  iridium: cardIridiumMine,
  golden_palace: cardGoldenPalace,
  golden: cardGoldenPalace,
  ocean_sunset: cardOceanSunset,
  ocean: cardOceanSunset,
  galaxy_starlight: cardGalaxyStars,
  galaxy: cardGalaxyStars,
};

// 100% Unique, dedicated pixel art artwork for all 16 card styles
export const CARD_PIXEL_BG_IMAGES: Record<string, string> = {
  // 1. Seasonal & Garden
  auto: springFarmBg,
  spring: cardSpringFairy,
  summer: cardSummerSunflower,
  autumn: autumnFarmBg,
  winter: winterFarmBg,

  // 2. Mystic, Royal, Ocean, Cabin & Galaxy
  iridium: cardIridiumMine,
  golden: cardGoldenPalace,
  forest: woodsFarmBg,
  ocean: cardOceanSunset,
  cabin: classicOverworldBg,
  galaxy: cardGalaxyStars,

  // 3. New 5 Pixel Materials
  desert_oasis: cardDesertOasis,
  volcano_caldera: cardVolcano,
  mushroom_cave: cardMushrooms,
  moonlight_jellies: cardJellies,
  junimo_orchard: cardOrchard,
};
