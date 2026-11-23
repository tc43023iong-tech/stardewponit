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

// Latest 10 New Stardew Valley Pixel Card Backgrounds
import cardSakuraShrine from '../assets/images/card_sakura_shrine_1795003418383.jpg';
import cardAuroraGlacier from '../assets/images/card_aurora_glacier_1795003419550.jpg';
import cardWitchSwamp from '../assets/images/card_witch_swamp_1795003420940.jpg';
import cardCrystalWaterfall from '../assets/images/card_crystal_waterfall_1795003421510.jpg';
import cardMermaidLagoon from '../assets/images/card_mermaid_lagoon_1795003421274.jpg';
import cardLavenderWindmill from '../assets/images/card_lavender_windmill_1795003422861.jpg';
import cardSkyCastle from '../assets/images/card_sky_castle_1795003422827.jpg';
import cardCoralReef from '../assets/images/card_coral_reef_1795003423818.jpg';
import cardStarfruitRealm from '../assets/images/card_starfruit_realm_1795003424379.jpg';
import cardGingerCove from '../assets/images/card_ginger_cove_1795003424460.jpg';

// 7 New Panoramic Page Themes
import themePolarArctic from '../assets/images/theme_polar_arctic_1795428667683.jpg';
import themeVolcanoLava from '../assets/images/theme_volcano_lava_1795428666672.jpg';
import themeBlizzardMountain from '../assets/images/theme_blizzard_mountain_1795428666505.jpg';
import themeCandyDrinks from '../assets/images/theme_candy_drinks_1795428666849.jpg';
import themeUnderwaterOcean from '../assets/images/theme_underwater_ocean_1795428666589.jpg';
import themeJunkFood from '../assets/images/theme_junk_food_1795428746765.jpg';
import themeDinoJungle from '../assets/images/theme_dino_jungle_1795428666405.jpg';

// 10 New Creative Student Card Backgrounds
import cardPolarArctic from '../assets/images/card_polar_arctic_1795428666057.jpg';
import cardVolcanoLava from '../assets/images/card_volcano_lava_1795428666931.jpg';
import cardBlizzardPeak from '../assets/images/card_blizzard_peak_1795428666271.jpg';
import cardCandyDrinks from '../assets/images/card_candy_drinks_1795428666684.jpg';
import cardUnderwaterOcean from '../assets/images/card_underwater_ocean_1795428666390.jpg';
import cardJunkFood from '../assets/images/card_junk_food_1795428746928.jpg';
import cardDinoValley from '../assets/images/card_dino_valley_1795428666770.jpg';
import cardOwlLibrary from '../assets/images/card_owl_library_1795428665983.jpg';
import cardArcadeNight from '../assets/images/card_arcade_night_1795428748131.jpg';
import cardSpaceObservatory from '../assets/images/card_space_observatory_1795428748554.jpg';

export const SCENIC_PAGE_IMAGES: Record<string, string> = {
  spring_farm: springFarmBg,
  summer_sunflower: cardSummerSunflower,
  autumn_amber: autumnFarmBg,
  winter_frost: winterFarmBg,
  secret_woods: woodsFarmBg,
  cozy_homestead: classicOverworldBg,
  // 4 Mystic/Showcase Page Themes
  iridium_cavern: cardIridiumMine,
  iridium: cardIridiumMine,
  golden_palace: cardGoldenPalace,
  golden: cardGoldenPalace,
  ocean_sunset: cardOceanSunset,
  ocean: cardOceanSunset,
  galaxy_starlight: cardGalaxyStars,
  galaxy: cardGalaxyStars,
  // 7 New Creative Panoramic World Themes
  polar_penguins_bears: themePolarArctic,
  volcano_lava_island: themeVolcanoLava,
  blizzard_snow_mountain: themeBlizzardMountain,
  candy_drink_paradise: themeCandyDrinks,
  underwater_ocean_world: themeUnderwaterOcean,
  junk_food_paradise: themeJunkFood,
  dino_jungle_world: themeDinoJungle,
};

// 100% Unique, dedicated pixel art artwork for all 36 card styles
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

  // 3. Special 5 Pixel Materials
  desert_oasis: cardDesertOasis,
  volcano_caldera: cardVolcano,
  mushroom_cave: cardMushrooms,
  moonlight_jellies: cardJellies,
  junimo_orchard: cardOrchard,

  // 4. Fantasy & Scenic 10 Pixel Materials
  sakura_shrine: cardSakuraShrine,
  aurora_glacier: cardAuroraGlacier,
  witch_swamp: cardWitchSwamp,
  crystal_waterfall: cardCrystalWaterfall,
  mermaid_lagoon: cardMermaidLagoon,
  lavender_windmill: cardLavenderWindmill,
  sky_cloud_castle: cardSkyCastle,
  coral_reef_palace: cardCoralReef,
  starfruit_fairyland: cardStarfruitRealm,
  ginger_island_cove: cardGingerCove,

  // 5. Latest 10 Creative Wonderland Card Materials
  polar_arctic_friends: cardPolarArctic,
  volcano_lava_isle: cardVolcanoLava,
  blizzard_snow_peak: cardBlizzardPeak,
  candy_boba_world: cardCandyDrinks,
  deep_sea_creatures: cardUnderwaterOcean,
  junk_food_carnival: cardJunkFood,
  dino_amber_valley: cardDinoValley,
  enchanted_owl_library: cardOwlLibrary,
  retro_pixel_arcade: cardArcadeNight,
  space_crystal_observatory: cardSpaceObservatory,
};
