export interface ChristmasPrompt {
    id: string;
    category: string;
    scene_name: string;
    location?: string;
    basePrompt: string;
    aiStudioPrompt?: string;
    negativePrompt: string;
    aspectRatio: "4:5" | "16:9" | "1:1";
    tags: string[];
}

export const CHRISTMAS_PROMPTS: ChristmasPrompt[] = [
    // --- STITCH MAGIC REALISM (NEIL + ANTIGRAVITY MERGE) ---
    {
        id: "stitch_hero_001",
        category: "stitch",
        scene_name: "Stitch Snow Ice Cream",
        location: "Winter Wonderland",
        basePrompt: "{ID_REF} ultra-photoreal winter lifestyle portrait at dusk. Woman lying on fresh snow, long glossy dark hair, wearing plush light-blue faux-fur coat and matching fluffy earmuffs. Soft snowfall. Beside her: a cute blue alien creature (Stitch-like) with realistic plush/fur texture, orange knit scarf, both holding ice cream cones. Background: warm golden Christmas tree lights with strong bokeh.",
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
        negativePrompt: "cartoon, cgi, bad hands, logo",
        aspectRatio: "4:5",
        tags: ["stitch", "urban", "sled"]
    },

    // --- NEIL'S CLASSICS (COPIED FROM NEXORA-CHRISTMAS-STUDIO-FINALNEIL) ---
    {
        id: 'couple_cozy',
        category: 'couple_HM',
        scene_name: 'Pareja en Sala Acogedora',
        location: 'Cozy Living Room',
        basePrompt: "{ID_REF} ultra photorealistic Christmas portrait in a cozy living room, warm fireplace, tall Christmas tree with golden fairy lights, soft bokeh background, they stand close together smiling, wearing winter sweaters, cinematic 8K, studio lighting, natural skin tones.",
        negativePrompt: "bad hands, extra fingers, cartoon, illustration, low quality",
        aspectRatio: "4:5",
        tags: ["classic", "cozy", "couple"]
    },
    {
        id: 'pro_city',
        category: 'professional',
        scene_name: 'Ejecutivo Navideño',
        location: 'LinkedIn Winter City',
        basePrompt: "{ID_REF} elegant Christmas city night scene, standing in front of a giant Christmas tree full of colorful lights, light snowfall, blurred city buildings in the background, stylish winter coat, ultra photorealistic, professional portrait.",
        negativePrompt: "blur, lowres, cartoon, mask",
        aspectRatio: "4:5",
        tags: ["professional", "city", "nyc"]
    },
    {
        id: 'pet_snow',
        category: 'pets',
        scene_name: 'Mascota en la Nieve',
        location: 'Snowy Forest',
        basePrompt: "{ID_REF} sitting with their dog, snowy forest at sunset, pine trees with string lights, both wearing matching Christmas scarves, warm glow on their faces, cinematic composition, ultra detailed fur and snow.",
        negativePrompt: "disfigured, cartoon, fused limbs",
        aspectRatio: "1:1",
        tags: ["pets", "dog", "snow"]
    },
    {
        id: 'family_tree',
        category: 'family',
        scene_name: 'Familia Clásica',
        location: 'Traditional Tree',
        basePrompt: "{ID_REF} family standing together in front of a huge Christmas tree covered in multicolor lights, parents holding their baby, everyone wearing coordinated red and black outfits, festive atmosphere, shallow depth of field, soft glow, ultra photorealistic.",
        negativePrompt: "merged bodies, extra heads, distorted face",
        aspectRatio: "16:9",
        tags: ["family", "classic", "tree"]
    },

    // --- GLOBAL ICONS & HIGH FASHION (QUANTUM ADDITIONS) ---
    {
        id: "edit_arched_001",
        category: "woman",
        scene_name: "Arched Window Swing",
        location: "Luxury Studio",
        basePrompt: "{ID_REF} ultra-photoreal luxury Christmas studio portrait. Woman sits on a rope swing inside a large arched window. Vivid red evening gown, high slit, red stiletto sandals. Set: rich red/green/gold garlands, warm fairy lights, Christmas tree with red bows.",
        negativePrompt: "cartoon, illustration, plastic skin, extra fingers, text",
        aspectRatio: "4:5",
        tags: ["luxury", "red gown", "swing"]
    },
    {
        id: "edit_advent_002",
        category: "woman",
        scene_name: "Advent Calendar Editorial",
        location: "Fashion Studio",
        basePrompt: "{ID_REF} ultra-realistic high-fashion holiday editorial. Subject steps out from a life-size luxury advent calendar door (matte red/green, gold numbers). Emerald velvet corset bustier, gold skirt, red heels, Hollywood waves hair. Studio lighting, 85mm portrait.",
        negativePrompt: "cartoon, cgi, doll face, bad anatomy",
        aspectRatio: "4:5",
        tags: ["fashion", "emerald", "editorial"]
    }
];
