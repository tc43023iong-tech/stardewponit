// Stardew Valley Scenic Background Assets
import springFarmBg from '../assets/images/stardew_farm_bg_1793625320760.jpg';
import autumnFarmBg from '../assets/images/stardew_autumn_bg_1793625338487.jpg';
import winterFarmBg from '../assets/images/stardew_winter_bg_1793625352268.jpg';
import woodsFarmBg from '../assets/images/stardew_woods_bg_1793625369367.jpg';
import classicOverworldBg from '../assets/images/stardew_valley_overworld_1793505142785.jpg';

// Card Material Background Assets
import cardDesertOasis from '../assets/images/card_desert_oasis_1793625393930.jpg';
import cardVolcano from '../assets/images/card_volcano_1793625412992.jpg';
import cardMushrooms from '../assets/images/card_mushrooms_1793625426682.jpg';
import cardJellies from '../assets/images/card_jellies_1793625439674.jpg';
import cardOrchard from '../assets/images/card_orchard_1793625454883.jpg';

export const SCENIC_PAGE_IMAGES: Record<string, string> = {
  spring_farm: springFarmBg,
  summer_sunflower: springFarmBg,
  autumn_amber: autumnFarmBg,
  winter_frost: winterFarmBg,
  secret_woods: woodsFarmBg,
  cozy_homestead: classicOverworldBg,
};

export const CARD_PIXEL_BG_IMAGES: Record<string, string> = {
  desert_oasis: cardDesertOasis,
  volcano_caldera: cardVolcano,
  mushroom_cave: cardMushrooms,
  moonlight_jellies: cardJellies,
  junimo_orchard: cardOrchard,
  spring: springFarmBg,
  summer: springFarmBg,
  autumn: autumnFarmBg,
  winter: winterFarmBg,
  forest: woodsFarmBg,
  cabin: classicOverworldBg,
  auto: springFarmBg,
};
