export type ChristmasPromptCategory =
    | 'studio_magic'
    | 'couples_elite'
    | 'family_dynasty'
    | 'pet_natgeo'
    | 'global_luxury'
    | 'fantasy_creative'
    | 'stitch_viral'
    | 'men_luxury';

export interface ChristmasPrompt {
    id: string;
    category: ChristmasPromptCategory;
    title: string;
    uiLabel: string;
    description: string;
    basePrompt: string;
    needsFamilyCount: boolean;
    supportsPets: boolean;
    previewImage?: string;
}

export const CHRISTMAS_PROMPTS: ChristmasPrompt[] = [
    // --- STITCH & YOU (VIRAL BOOM) ---
    {
        id: 'stitch_ice_cream',
        category: 'stitch_viral',
        title: 'Stitch Ice Cream',
        uiLabel: 'Stitch & Helados',
        description: 'Sharing ice cream with Stitch in a snowy park.',
        basePrompt: 'Hyper-realistic photo of a person [Subject] sharing a giant blue ice cream with Stitch (alien character from Disney), both sitting on a park bench covered in snow, wearing matching blue winter coats, Stitch has realistic fur texture and expressive eyes, snowy pine trees in background, cinematic 8k. Aspect Ratio 4:5. Style: Raw, Photorealistic.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'stitch_snowball_fight',
        category: 'stitch_viral',
        title: 'Stitch Snowball Fight',
        uiLabel: 'Guerra de Nieve con Stitch',
        description: 'Epic snowball fight in a backyard.',
        basePrompt: 'Action shot of [Subject] in an epic snowball fight with Stitch, Stitch is holding a massive snowball over his head, laughing mischievously, backyard setting with Christmas lights, snow flying through the air, motion blur, hyper-realistic, 8k. Aspect Ratio 4:5. Style: Raw, Photorealistic.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'stitch_surfing_sled',
        category: 'stitch_viral',
        title: 'Stitch Surfing Sled',
        uiLabel: 'Stitch Surfeando en Trineo',
        description: 'Stitch surfing on a sled through a snowy forest.',
        basePrompt: 'Cinematic wide shot of [Subject] and Stitch surfing on a high-tech sled through a snowy forest at high speed, Stitch is standing on the front like a surfboard, snow spray everywhere, bright winter sun, action photography. Aspect Ratio 4:5. Style: Raw, Photorealistic.',
        needsFamilyCount: false,
        supportsPets: false
    },

    // --- MEN SOLO LUXURY ---
    {
        id: 'men_penthouse_balcony',
        category: 'men_luxury',
        title: 'Penthouse Balcony',
        uiLabel: 'Vistas Penthouse',
        description: 'Man in a charcoal suit overlooking a snowy metropolis.',
        basePrompt: 'Sophisticated man [Subject] wearing a custom charcoal wool suit, standing on a penthouse balcony overlooking a snowy Manhattan at night, holding a crystal glass of whiskey, city lights glowing in background, cinematic lighting, sharp focus on eyes, ultra-realistic skin. Aspect Ratio 4:5. Style: Raw, Photorealistic.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'men_mahogany_library',
        category: 'men_luxury',
        title: 'Mahogany Library',
        uiLabel: 'Biblioteca de Lujo',
        description: 'Man in a cashmere turtleneck by the fireplace.',
        basePrompt: 'Man [Subject] sitting in a vintage leather wingback chair in a massive mahogany library, wearing a cream cashmere turtleneck, large fireplace in background, warm amber lighting, books everywhere, rich and successful vibe, 8k hyper-detailed. Aspect Ratio 4:5. Style: Raw, Photorealistic.',
        needsFamilyCount: false,
        supportsPets: true
    },

    // --- A. PAREJAS (ELITE EDITION) ---
    {
        id: 'couple_paris_luxury',
        category: 'couples_elite',
        title: 'Paris Luxury',
        uiLabel: 'Ritz Paris Balcony',
        description: 'Champagne on a private balcony at the Ritz Paris, Eiffel Tower sparkling.',
        basePrompt: 'Ultra-photorealistic portrait of a couple [Subject] on a private balcony at the Ritz Paris, Eiffel Tower sparkling in background (bokeh), wearing high-fashion winter coats, sipping champagne, soft golden hour lighting hitting their faces, shot on Hasselblad X2D, 100mm lens, extremely detailed skin texture. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'couple_ny_rooftop',
        category: 'couples_elite',
        title: 'NY Rooftop',
        uiLabel: 'Times Square Rooftop',
        description: 'Wrapped in a wool blanket looking over Times Square at night.',
        basePrompt: 'Cinematic shot of a couple [Subject] wrapping themselves in a wool blanket on a rooftop overlooking Times Square at night, snow resting on their eyelashes, neon lights reflecting in their eyes, steam from breath visible, raw emotional connection, Kodak Portra 400 film grain style. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'couple_swiss_alps',
        category: 'couples_elite',
        title: 'Swiss Alps',
        uiLabel: 'St. Moritz Ski Laugh',
        description: 'Laughing while falling into deep powder snow in St. Moritz.',
        basePrompt: 'Couple [Subject] laughing hysterically while falling into deep powder snow in St. Moritz, luxury ski resort background, bright sunlight, crisp blue sky, high contrast, vibrant colors, GoPro Hero 11 style but with DSLR depth of field, action shot. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'couple_tokyo_neon',
        category: 'couples_elite',
        title: 'Tokyo Neon',
        uiLabel: 'Shibuya Night Rain',
        description: 'Under transparent umbrellas in Shibuya Crossing with neon lights.',
        basePrompt: 'Cyberpunk Christmas vibe, couple [Subject] standing under transparent umbrellas in Shibuya Crossing, rain reflecting neon Christmas lights, moody teal and orange color grading, sharp focus on eyes, wet street reflections, cinematic masterpiece. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'couple_cozy_cabin',
        category: 'couples_elite',
        title: 'Cozy Cabin Close-up',
        uiLabel: 'Fireplace Intimacy',
        description: 'Extreme close-up illuminated only by the fire.',
        basePrompt: 'Extreme close-up of a couple’s [Subject] faces illuminated only by the fire of a fireplace, drinking hot cocoa, soft focus background of a Christmas tree, focus on the texture of the knit sweaters and skin pores, incredibly intimate and warm, 85mm f/1.2. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'couple_iceland_aurora',
        category: 'couples_elite',
        title: 'Iceland Aurora',
        uiLabel: 'Northern Lights',
        description: 'Standing under the Aurora Borealis in Iceland.',
        basePrompt: 'Couple [Subject] standing under the Northern Lights (Aurora Borealis) in Iceland, snow-covered ground, wearing thermal parkas, long exposure photography style, magical green and purple sky, stars visible, breathtaking landscape scale. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'couple_vintage_car',
        category: 'couples_elite',
        title: 'Vintage Car Date',
        uiLabel: 'Red Convertible in Snow',
        description: 'Overhead drone shot in a vintage car filled with gifts.',
        basePrompt: 'Couple [Subject] inside a vintage red convertible car filled with gifts, parked in a snowy forest, overhead drone shot looking down into the car, cozy vibes, plaid blankets, thermos, Wes Anderson symmetry style. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'couple_london_eye',
        category: 'couples_elite',
        title: 'London Eye Magic',
        uiLabel: 'Westminster Bridge',
        description: 'Night portrait with Big Ben and London Eye background.',
        basePrompt: 'Night portrait on the Westminster Bridge, Big Ben and London Eye in background with Christmas colors, motion blur of red double-decker buses passing by, couple [Subject] holding sparklers, dynamic lighting, sharp 4K. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'couple_beach_sunset',
        category: 'couples_elite',
        title: 'Beach Sunset',
        uiLabel: 'Australian Christmas',
        description: 'Santa hats and swimsuits on a white sand beach.',
        basePrompt: 'Couple [Subject] in Santa hats but wearing swimsuits on a white sand beach at sunset, small palm tree decorated with ornaments, golden lighting, splashing water, carefree and happy, high shutter speed freezing the water droplets. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'couple_library_elegance',
        category: 'couples_elite',
        title: 'Old Library Elegance',
        uiLabel: 'Harry Potter Vibe',
        description: 'Formal wear in a massive library with floating candles.',
        basePrompt: 'Couple [Subject] in formal wear (tuxedo and gown) in a massive Harry Potter-style library decorated for Christmas, floating candles effect, rich mahogany wood tones, warm ambient light, aristocratic vibe. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },

    // --- B. FAMILIAS (DYNASTY EDITION) ---
    {
        id: 'fam_royal_versailles',
        category: 'family_dynasty',
        title: 'Royal Family Vibe',
        uiLabel: 'Versailles Hall',
        description: 'Formal pose in a Versailles-style hall with a 20ft tree.',
        basePrompt: 'Family of [Count] posing formally in a Versailles-style hall with a 20-foot Christmas tree, gold and velvet textures, perfect symmetrical composition, soft softbox lighting from above, high-end editorial look. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fam_chaotic_morning',
        category: 'family_dynasty',
        title: 'Chaotic Morning',
        uiLabel: 'Christmas Morning Chaos',
        description: 'Documentary style wrapping paper explosion and happy exhaustion.',
        basePrompt: 'Documentary style wide shot of a living room at 7:00 AM Christmas morning, wrapping paper explosion, kids jumping, parents [Subject] drinking coffee looking exhausted but happy, sunlight streaming through windows, dust motes dancing in light, hyper-realistic clutter. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fam_ski_trip',
        category: 'family_dynasty',
        title: 'Ski Trip',
        uiLabel: 'Ski Lift Group Photo',
        description: 'Family on a ski lift with mountains in reflection.',
        basePrompt: 'Family [Subject] group photo on a ski lift, mountains in background, wearing goggles (reflections in goggles showing the mountain view), bright sun, snow spray, high energy, vibrant whites and blues. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: false
    },
    {
        id: 'fam_disney_mainstreet',
        category: 'family_dynasty',
        title: 'Disney Main Street',
        uiLabel: 'Magic Kingdom Night',
        description: 'Main Street USA with castle and snoap falling.',
        basePrompt: 'Family [Subject] standing on Main Street USA at Magic Kingdom (implied) at night, "snoap" (fake snow) falling, castle lit up in background with icicles, magical purple and blue lighting, joyous expressions, theme park photography style. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: false
    },
    {
        id: 'fam_chefs_kitchen',
        category: 'family_dynasty',
        title: 'Chef’s Kitchen',
        uiLabel: 'Cookie Making Mess',
        description: 'Covered in flour making cookies in a white marble kitchen.',
        basePrompt: 'Family [Subject] covered in flour making Christmas cookies in a high-end white marble kitchen, messy but aesthetic, focus on a child laughing with dough on nose, bright airy lighting, lifestyle magazine quality. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fam_matching_pajamas',
        category: 'family_dynasty',
        title: 'Matching Pajamas',
        uiLabel: 'The Classic PJs',
        description: 'Studio shot jumping in red/black buffalo plaid pajamas.',
        basePrompt: 'High-key studio shot, white background, entire family [Subject] (including dog) in matching red/black buffalo plaid pajamas, jumping in the air simultaneously, frozen motion, studio flash lighting, crisp and commercial. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fam_camping_xmas',
        category: 'family_dynasty',
        title: 'Camping Xmas',
        uiLabel: 'Tent in the Woods',
        description: 'Inside a glowing tent with campfire outside.',
        basePrompt: 'Family [Subject] inside a large glowing tent in the woods, Christmas lights strung on the tent, campfire outside, looking out at the camera, cozy amber tones, night photography, grainy film aesthetic. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fam_urban_skating',
        category: 'family_dynasty',
        title: 'Urban Skating',
        uiLabel: 'Rockefeller Skating',
        description: 'Ice skating with motion blur background.',
        basePrompt: 'Family [Subject] ice skating at Rockefeller Center, motion blur on background skaters, family sharp in center, holding hands, winter fashion, cold breath, dynamic angle from low down. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: false
    },
    {
        id: 'fam_train_station',
        category: 'family_dynasty',
        title: 'Train Station Reunion',
        uiLabel: 'Grand Central Hug',
        description: 'Emotional reunion on a train platform with steam.',
        basePrompt: 'Emotional shot of a family [Subject] hugging on a train platform (Grand Central vibe), steam from train, vintage luggage, Christmas wreaths on pillars, cinematic storytelling of "coming home", sepia-toned grading. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fam_reflection_shot',
        category: 'family_dynasty',
        title: 'Reflection Shot',
        uiLabel: 'Ornament Reflection',
        description: 'Reflection in a giant red Christmas ornament.',
        basePrompt: 'Photographing the family’s [Subject] reflection in a giant red Christmas ornament hanging on the tree, distorted fish-eye effect, room background curved, unique and artistic perspective. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },

    // --- C. MASCOTAS (NAT GEO EDITION) ---
    {
        id: 'pet_majestic_wolf',
        category: 'pet_natgeo',
        title: 'The Majestic Wolf-Dog',
        uiLabel: 'Snowy Cliff Twilight',
        description: 'Sitting on a snowy cliff edge at twilight.',
        basePrompt: 'Husky or [Subject Pet] sitting on a snowy cliff edge at twilight, wearing a subtle wreath collar, wind blowing fur, epic landscape background, National Geographic wildlife photography style, telephoto lens compression. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'pet_cat_tree_pov',
        category: 'pet_natgeo',
        title: 'Cat in the Tree (POV)',
        uiLabel: 'Inside the Tree',
        description: 'Shot from inside the tree looking out at the cat.',
        basePrompt: 'Shot from inside the Christmas tree looking out, cat’s [Subject Pet] face poking through branches, eyes dilated, ornaments in foreground blurred, playful and mischievous, macro details on whiskers. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'pet_underwater_dog',
        category: 'pet_natgeo',
        title: 'Underwater Dog',
        uiLabel: 'Diving for Ornament',
        description: 'Diving underwater to catch a red Christmas ball.',
        basePrompt: 'Golden Retriever [Subject Pet] diving underwater in a pool (or clear water) to catch a red Christmas ball, bubbles, refraction, bright blue water, high speed action, unique and funny. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'pet_hamster_village',
        category: 'pet_natgeo',
        title: 'Hamster Village',
        uiLabel: 'Gingerbread Giant',
        description: 'Tiny pet inside a miniature gingerbread village.',
        basePrompt: 'Tiny hamster/pet [Subject Pet] wearing a Santa hat inside a miniature gingerbread house village, macro photography, extremely shallow depth of field, magical lighting, cute overload. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'pet_sleeping_puppy',
        category: 'pet_natgeo',
        title: 'Sleeping Puppy',
        uiLabel: 'Sleep inside Santa Boot',
        description: 'Puppy sleeping inside a Santa boot.',
        basePrompt: 'Puppy [Subject Pet] sleeping inside a Santa boot, soft fuzzy texture, warm fireplace glow in background, serene and peaceful, 8K texture on the boot velvet. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },

    // --- BLOQUE 2: GLOBAL LUXURY ---
    {
        id: 'loc_dubai_burj',
        category: 'global_luxury',
        title: 'Dubai Burj Al Arab',
        uiLabel: 'Burj Al Arab Helipad',
        description: 'Sunset on the helipad with a Christmas tree.',
        basePrompt: 'Couple [Subject] on the helipad of Burj Al Arab, sunset, Christmas tree setup on the pad, ocean view, luxury gold lighting. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'loc_santorini_winter',
        category: 'global_luxury',
        title: 'Santorini Winter',
        uiLabel: 'Snowy Santorini',
        description: 'White terrace with rare xsnow and blue domes.',
        basePrompt: 'Family [Subject] on a white terrace in Santorini, blue domes, but with rare snow and Christmas lights, unique contrast, oceanic horizon. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'loc_kyoto_shrine',
        category: 'global_luxury',
        title: 'Kyoto Shrine',
        uiLabel: 'Snowy Fushimi Inari',
        description: 'Kimonos and snow at Fushimi Inari gates.',
        basePrompt: 'Couple [Subject] in kimonos with winter fur accessories, Fushimi Inari gates covered in light snow, subtle lanterns, peaceful mood. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'loc_london_regent',
        category: 'global_luxury',
        title: 'London Regent Street',
        uiLabel: 'Regent St Angels',
        description: 'Kissing in the middle of the road under Angel lights.',
        basePrompt: 'Low angle shot centered in Regent Street London, famous "Angels" lights overhead, couple [Subject] kissing in middle of road (long exposure traffic lights), bustling city. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },
    {
        id: 'loc_maldives_villa',
        category: 'global_luxury',
        title: 'Maldives Villa',
        uiLabel: 'Tropical Christmas',
        description: 'Overwater bungalow deck with a tropical tree.',
        basePrompt: 'Overwater bungalow deck, small tropical Christmas tree, couple [Subject] in swimwear drinking cocktails, turquoise water, sunny holiday. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: false
    },

    // --- FANTASY & CREATIVE ---
    {
        id: 'fan_north_pole',
        category: 'fantasy_creative',
        title: 'North Pole Workshop',
        uiLabel: 'Real Santa Workshop',
        description: 'Elf-style portrait with wooden toys.',
        basePrompt: 'Elf-style portrait of [Subject], background shelves full of wooden toys, warm amber light, North Pole workshop, magical dust. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fan_snowglobe',
        category: 'fantasy_creative',
        title: 'Inside a Snowglobe',
        uiLabel: 'Trapped in Globe',
        description: 'Surreal concept trapped inside a glass snowglobe.',
        basePrompt: 'Surreal concept, couple/family [Subject] trapped inside a glass snowglobe sitting on a mantelpiece, giant room outside, glass reflections, magical. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fan_cyberpunk',
        category: 'fantasy_creative',
        title: 'Cyberpunk 2077 Xmas',
        uiLabel: 'Neo-Christmas City',
        description: 'Futuristic city with neon robotic reindeer.',
        basePrompt: 'Futuristic city, flying cars delivering gifts, neon robotic reindeer, edgy fashion on [Subject], Night City vibe, blue and pink neon. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: false,
        supportsPets: true
    },
    {
        id: 'fan_hogwarts',
        category: 'fantasy_creative',
        title: 'Hogwarts Great Hall',
        uiLabel: 'Wizard Christmas',
        description: 'Floating candles and snowy ceiling.',
        basePrompt: 'Great Hall dining table, floating candles, long tables, house scarves on [Subject], magical ceiling with snow, stone walls, medieval fantasy. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'fan_matrix',
        category: 'fantasy_creative',
        title: 'Matrix Code',
        uiLabel: 'Digital Rain Tree',
        description: 'Green digital rain forming a Christmas tree.',
        basePrompt: 'Green digital rain forming the shape of a Christmas tree, [Subject] in trench coats and sunglasses, cool green tint, sci-fi code background. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },

    // --- SANTA + REINDEER (NUEVOS) ---
    {
        id: 'santa_classic_portrait',
        category: 'fantasy_creative',
        title: 'Santa Classic Portrait',
        uiLabel: 'Con Santa Clásico',
        description: 'Portrait with Santa Claus in his classic red suit.',
        basePrompt: 'Ultra-photorealistic portrait of [Subject] standing next to Santa Claus in his classic red velvet suit, white fluffy trim, sitting by a massive fireplace, Christmas tree with golden ornaments, warm ambient lighting, 8K detailed, cinematic. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'santa_reindeer_sleigh',
        category: 'fantasy_creative',
        title: 'Santa + Reindeer Sleigh',
        uiLabel: 'Santa con Renos en Trineo',
        description: 'Flying in Santa sleigh with magical reindeer over snowy village.',
        basePrompt: 'Epic cinematic shot of [Subject] riding in Santas magical sleigh alongside Santa Claus, pulled by 8 magnificent reindeer including Rudolph with glowing red nose, flying over a snow-covered European village at night, Northern Lights in sky, magical sparkles trailing behind, ultra-detailed fur on reindeer, 8K hyper-realistic. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'santa_workshop_elf',
        category: 'fantasy_creative',
        title: 'Santa Workshop',
        uiLabel: 'Taller de Santa',
        description: 'Inside Santas magical toy workshop at the North Pole.',
        basePrompt: 'Hyper-realistic interior of Santas Toy Workshop at North Pole, [Subject] dressed as an adorable elf helper, surrounded by wooden toys being built, conveyor belts of gifts, warm amber lighting, happy elves in background, magical dust particles, extremely detailed wood textures, cozy Christmas vibes. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'reindeer_stable',
        category: 'fantasy_creative',
        title: 'Reindeer Stable',
        uiLabel: 'Establo de Renos',
        description: 'Feeding and petting magical reindeer in their stable.',
        basePrompt: 'Documentary style shot of [Subject] in a magical reindeer stable, feeding carrots to Rudolph the red-nosed reindeer, other reindeer (Dasher, Dancer, Prancer, Vixen) visible in cozy wooden stables decorated with Christmas lights, hay and snow on ground, golden hour light streaming through windows, ultra-realistic fur textures. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },

    // --- STUDIO MAGIC (NUEVOS) ---
    {
        id: 'studio_white_luxury',
        category: 'studio_magic',
        title: 'White Studio Luxury',
        uiLabel: 'Estudio Blanco de Lujo',
        description: 'Professional white background studio with softbox lighting.',
        basePrompt: 'Professional photography studio session, [Subject] in elegant Christmas attire, pure white background with three-point softbox lighting, high-end fashion magazine quality, sharp focus on eyes, clean aesthetic, minimal props, 8K resolution, studio flash. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'studio_golden_christmas',
        category: 'studio_magic',
        title: 'Golden Christmas Studio',
        uiLabel: 'Estudio Dorado Navideño',
        description: 'Warm golden bokeh background with Christmas ornaments.',
        basePrompt: 'Professional studio portrait of [Subject], gorgeous golden bokeh background created by out-of-focus Christmas lights, warm amber color grading, subtle Christmas ornaments in frame, Rembrandt lighting, shallow depth of field f/1.4, magazine cover quality. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'studio_snow_magic',
        category: 'studio_magic',
        title: 'Snow Magic Studio',
        uiLabel: 'Estudio con Nieve Mágica',
        description: 'Studio shot with falling snow and dramatic lighting.',
        basePrompt: 'High-end studio photography, [Subject] with artificial snow falling gently, dramatic side lighting creating rim light effect on hair and shoulders, deep blue gradient background, winter fashion editorial style, crisp detail on snowflakes, 8K ultra-sharp. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    },
    {
        id: 'studio_red_velvet',
        category: 'studio_magic',
        title: 'Red Velvet Elegance',
        uiLabel: 'Elegancia Terciopelo Rojo',
        description: 'Luxurious red velvet backdrop with golden accents.',
        basePrompt: 'Opulent studio portrait, [Subject] posed against rich red velvet curtain backdrop, gold-framed props, Christmas wreath accent, theatrical lighting with warm fill, Victorian elegance meets modern photography, extremely detailed fabric textures. Aspect Ratio 4:5. Style: Raw, Photorealistic 8K.',
        needsFamilyCount: true,
        supportsPets: true
    }
];


