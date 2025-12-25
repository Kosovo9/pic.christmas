export interface ChristmasPrompt {
    id: string;
    category: "woman" | "man" | "couple_HM" | "couple_HH" | "couple_MM" | "family" | "kids" | "baby" | "pets" | "stitch";
    scene_name: string;
    location?: string;
    basePrompt: string;
    aiStudioPrompt: string;
    negativePrompt: string;
    aspectRatio: "4:5" | "16:9" | "1:1";
    tags: string[];
}

export const CHRISTMAS_PROMPTS: ChristmasPrompt[] = [
    // --- SECCIÓN 1: STITCH MAGIC REALISM (THE BOOM) ---
    {
        id: "stitch_hero_001",
        category: "stitch",
        scene_name: "Stitch Snow Ice Cream",
        location: "Winter Wonderland",
        basePrompt: "{ID_REF} ultra-photoreal winter lifestyle portrait at dusk. Woman lying on fresh snow, long glossy dark hair, wearing plush light-blue faux-fur coat and matching fluffy earmuffs. Soft snowfall. Beside her: a cute blue alien creature (Stitch-like) with realistic plush/fur texture, orange knit scarf, both holding ice cream cones. Background: warm golden Christmas tree lights with strong bokeh.",
        aiStudioPrompt: "{ID_REF} woman in blue fur coat with Stitch on snow, both with ice cream, warm bokeh lights.",
        negativePrompt: "cartoon, anime, cgi, plastic skin, lowres, blur, bad anatomy, text, logo",
        aspectRatio: "4:5",
        tags: ["stitch", "viral", "blue"]
    },
    {
        id: "stitch_couple_002",
        category: "stitch",
        scene_name: "Stitch Urban Sled",
        location: "NYC Snowy Street",
        basePrompt: "{ID_REF} ultra-realistic full-body winter street fashion photo. Woman with long wavy black hair, baby-blue shearling coat, pulling a wooden sled. On the sled sits a large Stitch character in a Santa suit holding a decorated tree. Warm shopfront lights background.",
        aiStudioPrompt: "{ID_REF} pulling Stitch on sled in snowy city, 8K ultra-realistic.",
        negativePrompt: "cartoon, cgi, bad hands, logo",
        aspectRatio: "4:5",
        tags: ["stitch", "urban", "sled"]
    },

    // --- SECCIÓN 2: HIGH-FASHION EDITORIAL ---
    {
        id: "edit_arched_001",
        category: "woman",
        scene_name: "Arched Window Swing",
        location: "Luxury Studio",
        basePrompt: "{ID_REF} ultra-photoreal luxury Christmas studio portrait. Woman with long dark-blonde hair sits on a rope swing inside a large arched window. Vivid red evening gown, high slit, red stiletto sandals. Set: rich red/green/gold garlands, warm fairy lights, Christmas tree with red bows.",
        aiStudioPrompt: "{ID_REF} woman in red gown on swing inside arched window, luxury Christmas decor.",
        negativePrompt: "cartoon, illustration, plastic skin, extra fingers, text",
        aspectRatio: "4:5",
        tags: ["luxury", "red gown", "swing"]
    },
    {
        id: "edit_advent_002",
        category: "woman",
        scene_name: "Advent Calendar Editorial",
        location: "Fashion Studio",
        basePrompt: "{ID_REF} ultra-realistic high-fashion holiday editorial. Woman steps out from a life-size luxury advent calendar door (matte red/green, gold numbers). Emerald velvet corset bustier, gold skirt, red heels, Hollywood waves hair. Studio lighting, 85mm portrait.",
        aiStudioPrompt: "{ID_REF} stepping out of giant advent calendar, emerald and gold outfit, high-fashion.",
        negativePrompt: "cartoon, cgi, doll face, bad anatomy",
        aspectRatio: "4:5",
        tags: ["fashion", "emerald", "editorial"]
    },
    {
        id: "edit_emerald_003",
        category: "woman",
        scene_name: "Emerald Feather Glam",
        location: "Winter Glam Studio",
        basePrompt: "{ID_REF} ultra-realistic winter fashion editorial. Woman crouching on snowy ground, 3/4 profile, emerald feather strapless dress, emerald stockings, matching heels. Saturated emerald backdrop, cold cinematic lighting, light snow particles.",
        aiStudioPrompt: "{ID_REF} crouching in emerald feather dress on snow, cinematic winter light.",
        negativePrompt: "bad legs, extra limbs, plastic skin",
        aspectRatio: "4:5",
        tags: ["emerald", "feathers", "glam"]
    },

    // --- SECCIÓN 3: CINEMATIC CHARACTERS ---
    {
        id: "char_grinch_001",
        category: "woman",
        scene_name: "Mrs. Claus & Grinch Kiss",
        location: "Dark Christmas Studio",
        basePrompt: "{ID_REF} cinematic dark studio portrait. Woman in shiny red strapless holiday dress with white fur trim and long red gloves. Beside her, a tall green furry holiday creature in a Santa jacket kisses her cheek holding a large red ornament. Tree and gifts in background.",
        aiStudioPrompt: "{ID_REF} with green furry character, red dress, dark studio, warm bokeh.",
        negativePrompt: "cartoon, cgi, duplicate heads, lowres",
        aspectRatio: "4:5",
        tags: ["grinch-style", "funny", "dark-luxury"]
    },
    {
        id: "char_ghost_002",
        category: "couple_HM",
        scene_name: "Horror Santa Kitchen",
        location: "Christmas Kitchen",
        basePrompt: "{ID_REF} ultra-realistic cinematic couple portrait in Christmas kitchen. Woman in red/green fur-trim outfit and apron. Man in masked 'horror Santa' look (Santa suit with black mask). They prepare Christmas dinner, warm practical lights, fashion editorial realism.",
        aiStudioPrompt: "{ID_REF} couple in kitchen, man in horror santa mask, red and green theme.",
        negativePrompt: "cartoon, cgi, bad face, text",
        aspectRatio: "16:9",
        tags: ["horror", "funny", "kitchen"]
    },

    // --- SECCIÓN 4: MEN SOLO LUXURY ---
    {
        id: "man_penthouse_001",
        category: "man",
        scene_name: "Penthouse Luxury",
        location: "NYC Penthouse",
        basePrompt: "{ID_REF} professional ultra-luxury Christmas portrait. Subject in exact cream wool turtleneck with gold thread. Setting: minimalist penthouse, floor-to-ceiling windows, snowy city skyline at dusk. Crystal champagne flute, pine garland. Cinematic 50mm, RAW quality.",
        aiStudioPrompt: "{ID_REF} man in cream turtleneck, luxury penthouse, snowy skyline dusk.",
        negativePrompt: "plastic, cartoon, extra eyes, bad hands",
        aspectRatio: "4:5",
        tags: ["luxury", "man", "urban"]
    }
];
