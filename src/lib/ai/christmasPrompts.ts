export interface ScenePreset {
    id: string;
    name: string;
    scene_en: string;
    scene_es: string;
    tags: string[];
}

export const MASTER_PROMPT_TEMPLATE = {
    en_positive: "Ultra photorealistic Christmas portrait of {SCENE_EN}, based on the exact faces and bodies of the person(s) and pet(s) in the reference photo(s). Preserve identity 100%: same facial features, same proportions, same natural expressions, same skin tone, same hair style, same body type. The pets must also match perfectly their real fur patterns, colors and facial expressions from the reference. Perfect high-end studio photography look: detailed skin with natural pores, realistic hair strands, sharp and lifelike eyes with natural reflections, clean and accurate hands and fingers, natural body posture. Cinematic warm Christmas lighting: soft key light from the front, gentle fill light, subtle warm rim light coming from the Christmas tree and decorations, beautiful shadows without harsh contrast. Shot on a professional full-frame camera Sony A7R IV, 85mm f/1.4 prime lens, wide aperture, shallow depth of field, creamy background bokeh, HDR, ultra-detailed 8K resolution, razor-sharp focus on the eyes, no motion blur.",
    es_positive: "Retrato navideño ultra fotorealista de {ESCENA_ES}, basado en las caras y cuerpos exactos de las personas y las mascotas en las fotos de referencia. Preserva la identidad al 100%: mismos rasgos faciales, mismas proporciones, mismas expresiones naturales, mismo tono de piel, mismo estilo de cabello, mismo tipo de cuerpo. Las mascotas también deben coincidir perfectamente con sus patrones de pelaje reales, colores y expresiones faciales de la referencia. Apariencia de fotografía de estudio de alto nivel: piel detallada con poros naturales, cabello realista con mechones definidos, ojos nítidos y llenos de vida con reflejos naturales, manos y dedos limpios y anatómicamente correctos, posturas corporales naturales. Iluminación navideña cálida y cinematográfica: luz principal suave desde el frente, luz de relleno sutil, halo cálido tenue proveniente del árbol de Navidad y las decoraciones, sombras bonitas sin contraste agresivo. Tomado con una cámara profesional full-frame Sony A7R IV, lente prime 85mm f/1.4, apertura amplia, profundidad de campo reducida, bokeh cremoso en el fondo, HDR, resolución 8K ultra detallada, enfoque súper nítido en los ojos, sin desenfoque de movimiento.",
    en_negative: "low resolution, low quality, blurry, out of focus, overexposed, underexposed, washed out colors, flat lighting, dull lighting, grainy, noisy, AI artifacts, distorted face, deformed face, asymmetrical face, creepy smile, extra limbs, extra arms, extra legs, extra fingers, missing fingers, fused fingers, twisted hands, broken anatomy, wrong proportions, stretched body, double head, double face, multiple faces, warped pets, deformed pets, melted fur, cartoon style, 3D render, illustration, painting, anime, comic, lineart, text, watermark, logo, glitch, oversharpened, jpeg artifacts, duplicate people, floating objects, cut off heads, cut off limbs, heavy vignette, chromatic aberration, nudity, NSFW, blood, violence.",
    es_negative: "baja resolución, baja calidad, borroso, fuera de foco, sobreexpuesto, subexpuesto, colores apagados, iluminación plana, iluminación sin vida, con ruido, artefactos de IA, rostro distorsionado, rostro deformado, cara asimétrica, sonrisa extraña, extremidades adicionales, brazos extra, piernas extra, dedos extra, dedos faltantes, dedos fusionados, manos torcidas, anatomía incorrecta, proporciones equivocadas, cuerpo estirado, doble cabeza, doble rostro, múltiples caras, mascotas deformes, pelaje derretido, estilo caricatura, estilo anime, dibujo, ilustración, cómic, texto, marca de agua, logo, glitch, artefactos jpeg, personas duplicadas, objetos flotando, cabezas cortadas, extremidades cortadas, viñeteado fuerte, aberración cromática, desnudos, contenido NSFW, sangre, violencia.",
};

export const CHRISTMAS_PROMPTS: ScenePreset[] = [
    // ESTUDIOS (50)
    {
        id: "studio_couple_tree",
        name: "Pareja frente al árbol",
        scene_en: "a loving couple hugging in front of a Christmas tree with warm lights and red background",
        scene_es: "una pareja abrazada frente a un árbol de Navidad, luces cálidas y fondo rojo elegante",
        tags: ["studio", "couple", "romantic"]
    },
    {
        id: "studio_family_couch",
        name: "Familia en sillón",
        scene_en: "a family with mom, dad and two kids sitting on a couch, wearing Christmas sweaters, tree and gifts around",
        scene_es: "familia con papá, mamá y dos hijos pequeños sentados en un sillón, todos con suéteres navideños, árbol iluminado y regalos alrededor",
        tags: ["studio", "family", "cozy"]
    },
    {
        id: "studio_couple_gay_bench",
        name: "Pareja (H-H) en banco",
        scene_en: "a male couple holding hands, sitting on a bench in front of a red and gold tree, studio background with bokeh lights",
        scene_es: "pareja hombre-hombre tomados de la mano, sentados en un banco frente a un árbol rojo y dorado, fondo de estudio con luces bokeh",
        tags: ["studio", "couple", "gay", "romantic"]
    },
    {
        id: "studio_couple_lesbian_snow",
        name: "Pareja (M-M) copos nieva",
        scene_en: "a female couple smiling and looking at each other, wearing Santa hats, red background with soft snowflakes, Christmas tree on the side",
        scene_es: "pareja mujer-mujer sonriendo y mirándose a los ojos, con gorros de Santa y fondo rojo con copos de nieve suaves, árbol de Navidad al costado",
        tags: ["studio", "couple", "lesbian", "romantic"]
    },
    {
        id: "studio_solo_sphere",
        name: "Solo con esfera",
        scene_en: "a single person standing next to a white Christmas tree with golden lights, holding a shiny ornament",
        scene_es: "una persona sola en estudio, de pie junto a un árbol de Navidad blanco con luces doradas, sosteniendo una esfera brillante",
        tags: ["studio", "solo", "elegant"]
    },
    {
        id: "studio_woman_dog_scarf",
        name: "Mujer con perro y bufanda",
        scene_en: "a woman holding her dog, both wearing red scarves, in front of a studio background with fake fireplace and stockings",
        scene_es: "mujer con su perro en brazos, ambos con bufandas rojas, frente a fondo de estudio con chimenea falsa y medias colgadas",
        tags: ["studio", "solo", "pet", "dog"]
    },
    {
        id: "studio_man_dogs_floor",
        name: "Hombre con perros en piso",
        scene_en: "a man with two dogs sitting at his feet, in a studio with tree and gifts, wooden floor and warm lights",
        scene_es: "hombre con dos perros sentados a sus pies, en estudio con árbol y regalos, piso de madera y luces cálidas",
        tags: ["studio", "solo", "pet", "dog"]
    },
    {
        id: "studio_family_pet_floor",
        name: "Familia y perro en piso",
        scene_en: "mom, dad, two kids and a puppy, all sitting on the floor on a red blanket in front of the tree, smiling at the camera",
        scene_es: "mamá, papá, dos hijos y un perrito, todos sentados en el piso sobre una manta roja frente al árbol, sonriendo a la cámara",
        tags: ["studio", "family", "pet", "dog"]
    },
    {
        id: "studio_grandparents_grandkids",
        name: "Abuelos y nietos",
        scene_en: "grandparents sitting and grandkids standing behind hugging them, background with green tree and warm lights",
        scene_es: "abuelos con sus nietos en estudio, abuelos sentados y niños de pie atrás abrazándolos, fondo con árbol verde y luces cálidas",
        tags: ["studio", "family", "grandparents"]
    },
    {
        id: "studio_couple_ring",
        name: "Pareja compromiso",
        scene_en: "an engaged couple showing the ring in front of the tree, red background with bokeh lights",
        scene_es: "pareja de novios mostrando el anillo de compromiso frente al árbol, fondo rojo con luces bokeh",
        tags: ["studio", "couple", "romantic"]
    },
    {
        id: "studio_family_pajamas_bed",
        name: "Familia pijamas cama",
        scene_en: "a family of five (parents and three kids) wearing matching Christmas pajamas, sitting on a bed, warm lights and garlands",
        scene_es: "una familia de cinco humanos (padres y tres hijos) con pijamas navideñas a juego, sentados en la cama, luces cálidas y guirnaldas",
        tags: ["studio", "family", "pajamas"]
    },
    {
        id: "studio_woman_cats",
        name: "Mujer con gatos",
        scene_en: "a woman with three cats, one in arms and two near the tree, elegant red background",
        scene_es: "mujer con tres gatos, uno en brazos y dos cerca del árbol, fondo rojo elegante",
        tags: ["studio", "solo", "pet", "cat"]
    },
    {
        id: "studio_man_ugly_sweater",
        name: "Hombre ugly sweater",
        scene_en: "a single man wearing an ugly Christmas sweater, posing playfully in front of tree and gifts",
        scene_es: "hombre solo con suéter navideño feo (ugly sweater), posando divertido frente a árbol y regalos",
        tags: ["studio", "solo", "fun"]
    },
    {
        id: "studio_friends_selfie",
        name: "Amigos selfie",
        scene_en: "a group of friends (4 people) taking an imaginary selfie in front of the tree, natural laughter, red and gold background",
        scene_es: "grupo de amigos (4 personas) tomándose una selfie imaginaria frente al árbol, risas naturales, fondo rojo y dorado",
        tags: ["studio", "group", "fun"]
    },
    {
        id: "studio_family_baby_couch",
        name: "Familia bebé sillón",
        scene_en: "family with parents, two kids and a baby in arms, all around a couch, illuminated tree in background",
        scene_es: "familia con papás, dos hijos y un bebé en brazos, todos alrededor de un sillón, árbol iluminado al fondo",
        tags: ["studio", "family"]
    },
    {
        id: "studio_couple_floor_hands",
        name: "Pareja piso manos",
        scene_en: "couple sitting on the floor in front of the tree, among gifts, holding hands",
        scene_es: "pareja hombre-mujer sentados en el piso frente al árbol, entre regalos, tomados de la mano",
        tags: ["studio", "couple", "romantic"]
    },
    {
        id: "studio_couple_gay_dog",
        name: "Pareja (H-H) perro gorros",
        scene_en: "male couple with their dog, all wearing Santa hats, red background with soft lights, tree on the side",
        scene_es: "pareja hombre-hombre con su perro, todos con gorro de Santa, fondo rojo con luces suaves, árbol al costado",
        tags: ["studio", "couple", "gay", "pet"]
    },
    {
        id: "studio_couple_lesbian_cat",
        name: "Pareja (M-M) gato risas",
        scene_en: "female couple with a cat in arms, both laughing, background of garlands and tree",
        scene_es: "pareja mujer-mujer con un gato en brazos, ambas riendo, fondo de guirnaldas y árbol",
        tags: ["studio", "couple", "lesbian", "pet"]
    },
    {
        id: "studio_solo_vintage_chair",
        name: "Solo silla vintage",
        scene_en: "a single person sitting on a vintage studio chair, elegant Christmas tree behind, warm lights and elegant wall texture",
        scene_es: "una persona sola sentada en sillón tipo estudio vintage, árbol de Navidad detrás, luces cálidas y textura de pared elegante",
        tags: ["studio", "solo", "elegant"]
    },
    {
        id: "studio_family_pets_bench",
        name: "Familia y mascotas banco",
        scene_en: "family with 2 dogs and 2 humans sitting together on a bench, all looking at camera, red and gold background",
        scene_es: "familia con 2 perros y 2 humanos sentados juntos en una banca, todos mirando a cámara, fondo rojo y dorado",
        tags: ["studio", "family", "pet"]
    },
    {
        id: "studio_mom_son_hats",
        name: "Mamá hijo gorros",
        scene_en: "mom with her little son in arms, both wearing Santa hats, tree and bokeh lights behind",
        scene_es: "mamá con su hijo pequeño en brazos, ambos con gorritos de Santa, árbol y luces bokeh atrás",
        tags: ["studio", "family"]
    },
    {
        id: "studio_dad_daughter_gift",
        name: "Papá hija regalo",
        scene_en: "dad with teenage daughter, both standing in front of the tree, holding a gift box",
        scene_es: "papá con hija adolescente, ambos de pie frente al árbol, sosteniendo una caja de regalo",
        tags: ["studio", "family"]
    },
    {
        id: "studio_couple_dogs_rug",
        name: "Pareja perros alfombra",
        scene_en: "middle-aged couple with three small dogs, all sitting on a red rug, background of tree and fireplace",
        scene_es: "pareja de mediana edad con tres perros pequeños, todos sentados en una alfombra roja, fondo de árbol y chimenea",
        tags: ["studio", "couple", "pet"]
    },
    {
        id: "studio_big_family_santa",
        name: "Familia grande Santa",
        scene_en: "large family with five humans, all wearing Christmas sweaters and Santa hats, studio background with giant tree",
        scene_es: "familia numerosa con cinco humanos, todos con suéteres navideños y gorros de Santa, fondo de estudio con árbol gigante",
        tags: ["studio", "family", "group"]
    },
    {
        id: "studio_young_couple_lights",
        name: "Pareja joven luces suelo",
        scene_en: "young couple sitting on the floor, surrounded by Christmas lights on the ground, blurred tree behind",
        scene_es: "pareja joven sentada en el piso, rodeada de luces navideñas en el suelo, árbol desenfocado atrás",
        tags: ["studio", "couple", "romantic"]
    },
    {
        id: "studio_man_cats_tree",
        name: "Hombre gatos árbol",
        scene_en: "man with three cats around the tree, one on the couch and two on the floor",
        scene_es: "hombre con tres gatos alrededor del árbol, uno sobre el sillón y dos en el piso",
        tags: ["studio", "solo", "pet", "cat"]
    },
    {
        id: "studio_sisters_dresses",
        name: "Hermanas vestidos rojos",
        scene_en: "two sisters hugging in front of the tree, both wearing red dresses, golden lights in background",
        scene_es: "dos hermanas abrazadas frente al árbol, ambas con vestidos rojos, luces doradas en el fondo",
        tags: ["studio", "family"]
    },
    {
        id: "studio_brothers_dog_bench",
        name: "Hermanos perro banco",
        scene_en: "two brothers with their big dog, all sitting on a bench, red background with snowflakes",
        scene_es: "dos hermanos con su perro grande, todos sentados en una banca, fondo rojo con copos de nieve",
        tags: ["studio", "family", "pet"]
    },
    {
        id: "studio_grandma_grandkids_smile",
        name: "Abuela nietos sonrisa",
        scene_en: "grandma with two grandkids, all smiling, tree on the side and garlands",
        scene_es: "abuela con dos nietos, todos sonrientes, árbol al costado y guirnaldas",
        tags: ["studio", "family"]
    },
    {
        id: "studio_couple_back_hand",
        name: "Pareja espalda mano",
        scene_en: "couple slightly turned away from camera, looking at the Christmas tree, holding hands",
        scene_es: "pareja hombre-mujer de espaldas ligeramente a cámara, mirando al árbol de Navidad, tomados de la mano",
        tags: ["studio", "couple", "romantic"]
    },
    {
        id: "studio_woman_many_dogs",
        name: "Mujer muchos perros",
        scene_en: "a woman with five small dogs around her, all wearing red bandanas, background of tree and gifts",
        scene_es: "una mujer con cinco perros pequeños alrededor de ella, todos con pañuelos rojos, fondo de árbol y regalos",
        tags: ["studio", "solo", "pet"]
    },
    {
        id: "studio_family_baby_crawling",
        name: "Familia bebé gateando",
        scene_en: "family with a baby crawling in foreground and parents behind, tree and warm lights",
        scene_es: "familia con un bebé gateando en primer plano y padres detrás, árbol y luces cálidas",
        tags: ["studio", "family"]
    },
    {
        id: "studio_friends_cocoa",
        name: "Amigos chocolate",
        scene_en: "group of friends (5 people) toasting with hot cocoa mugs in front of the tree",
        scene_es: "grupo de amigos (5 personas) chocando tazas de chocolate caliente frente al árbol",
        tags: ["studio", "group", "fun"]
    },
    {
        id: "studio_couple_lesbian_pets",
        name: "Pareja (M-M) mascotas sillón",
        scene_en: "female couple with a dog and a cat, all together on a couch, red background with tree",
        scene_es: "pareja mujer-mujer con un perro y un gato, todos juntos en un sillón, fondo rojo con árbol",
        tags: ["studio", "couple", "lesbian", "pet"]
    },
    {
        id: "studio_man_high_chair",
        name: "Hombre silla alta",
        scene_en: "man sitting on a high chair, elegant Christmas tree behind, warm lights and soft shadow",
        scene_es: "hombre solo sentado en una silla alta, árbol de Navidad elegante detrás, luces cálidas y sombra suave",
        tags: ["studio", "solo", "elegant"]
    },
    {
        id: "studio_family_levels",
        name: "Familia niveles",
        scene_en: "mom, dad, son, daughter and two dogs, all arranged in levels in front of the tree",
        scene_es: "mamá, papá, hijo, hija y dos perros, todos acomodados en niveles frente al árbol",
        tags: ["studio", "family", "pet"]
    },
    {
        id: "studio_couple_gay_cat_stand",
        name: "Pareja (H-H) gato pie",
        scene_en: "male couple with their cat, one sitting and other standing behind, red background with garlands",
        scene_es: "pareja hombre-hombre con su gato, uno sentado y otro de pie detrás, fondo rojo con guirnaldas",
        tags: ["studio", "couple", "gay", "pet"]
    },
    {
        id: "studio_pregnant_couple",
        name: "Pareja embarazada",
        scene_en: "pregnant woman with her partner, both touching the belly in front of the tree",
        scene_es: "mujer embarazada con su pareja, ambos tocando la pancita frente al árbol",
        tags: ["studio", "couple", "family"]
    },
    {
        id: "studio_family_teens_scarves",
        name: "Familia adolescentes bufandas",
        scene_en: "family with teenager and small child, all with red scarves and light sweaters, background of white tree and lights",
        scene_es: "familia con adolescente y niño pequeño, todos con bufandas rojas y suéteres claros, fondo de árbol blanco y luces",
        tags: ["studio", "family"]
    },
    {
        id: "studio_solo_cats_lap",
        name: "Solo gatos regazo",
        scene_en: "single person with two cats on their lap, sitting on armchair in front of the tree",
        scene_es: "persona sola con dos gatos en su regazo, sentado en sillón frente al árbol",
        tags: ["studio", "solo", "pet"]
    },
    {
        id: "studio_couple_big_dogs",
        name: "Pareja perros grandes",
        scene_en: "couple and three large dogs, all on the floor on red blanket, background of tree and fireplace",
        scene_es: "pareja hombre-mujer y tres perros grandes, todos en el piso sobre manta roja, fondo de árbol y chimenea",
        tags: ["studio", "couple", "pet"]
    },
    {
        id: "studio_grandparents_4kids",
        name: "Abuelos 4 nietos",
        scene_en: "grandparents and four grandkids, all sitting together on a sofa, tree in background",
        scene_es: "abuelos y cuatro nietos, todos sentados juntos en un sofá, árbol al fondo",
        tags: ["studio", "family"]
    },
    {
        id: "studio_woman_big_dog_lying",
        name: "Mujer perro echado",
        scene_en: "woman with a large dog lying next to her, both looking at camera, red background with golden lights",
        scene_es: "mujer con un perro grande acostado a su lado, ambos mirando a cámara, fondo rojo con luces doradas",
        tags: ["studio", "solo", "pet"]
    },
    {
        id: "studio_friends_high_five",
        name: "Amigos high five",
        scene_en: "two friends with Christmas sweaters and Santa hats, high-fiving in front of the tree",
        scene_es: "dos amigos con suéteres navideños y gorros de Santa, chocando las manos frente al árbol",
        tags: ["studio", "group", "fun"]
    },
    {
        id: "studio_family_cats_table",
        name: "Familia gatos mesa",
        scene_en: "family of three humans and two cats, all around a small table with cookies and milk, tree background",
        scene_es: "familia de tres humanos y dos gatos, todos alrededor de una mesa pequeña con galletas y leche, fondo de árbol",
        tags: ["studio", "family", "pet"]
    },
    {
        id: "studio_couple_lesbian_floor",
        name: "Pareja (M-M) piso regalos",
        scene_en: "female couple sitting on the floor surrounded by gifts, tree in background, warm lights",
        scene_es: "pareja mujer-mujer sentadas en el piso rodeadas de regalos, árbol al fondo, luces cálidas",
        tags: ["studio", "couple", "lesbian"]
    },
    {
        id: "studio_man_mixed_pets",
        name: "Hombre mascotas mixtas",
        scene_en: "man with five mixed pets (dogs and cats), all together in a scene of tree and garlands",
        scene_es: "hombre con cinco mascotas mixtas (perros y gatos), todos juntos en una escena de árbol y guirnaldas",
        tags: ["studio", "solo", "pet"]
    },
    {
        id: "studio_dad_teens_standing",
        name: "Papá adolescentes pie",
        scene_en: "dad with two teenage children, all standing with background of tree and lights",
        scene_es: "papá con dos hijos adolescentes, todos de pie con fondo de árbol y luces",
        tags: ["studio", "family"]
    },
    {
        id: "studio_mom_teen_dog",
        name: "Mamá hija perro abrazo",
        scene_en: "mom with teenage daughter and dog, the three hugging in front of the tree",
        scene_es: "mamá con hija adolescente y perro, los tres abrazados frente al árbol",
        tags: ["studio", "family", "pet"]
    },
    {
        id: "studio_family_crescent",
        name: "Familia media luna",
        scene_en: "family group of five humans forming a slight crescent in front of the tree, all smiling at camera",
        scene_es: "grupo familiar de cinco humanos formando una ligera media luna frente al árbol, todos sonriendo a cámara",
        tags: ["studio", "family", "group"]
    },

    // LUGARES DEL MUNDO (50)
    {
        id: "world_ncy_rockefeller",
        name: "NYC Rockefeller Center",
        scene_en: "couple hugging in front of the giant Rockefeller Center Christmas tree in New York, night with lights and blurred crowd",
        scene_es: "pareja abrazada frente al árbol gigante del Rockefeller Center en Nueva York, noche con luces y gente desenfocada",
        tags: ["world", "nyc", "couple"]
    },
    {
        id: "world_budapest_market",
        name: "Budapest Mercado",
        scene_en: "family with two kids walking through a Christmas market in Budapest, warm lights, wooden stalls, mulled wine mug in hand",
        scene_es: "familia con dos hijos caminando por un mercado navideño en Budapest, luces cálidas, puestos de madera, copa de vino caliente en mano",
        tags: ["world", "budapest", "family"]
    },
    {
        id: "world_paris_eiffel",
        name: "París Torre Eiffel",
        scene_en: "couple in Paris, with illuminated Eiffel Tower in background and Christmas decoration, slight city blur",
        scene_es: "pareja hombre-mujer en París, con la Torre Eiffel iluminada al fondo y decoración navideña, ligero desenfoque de la ciudad",
        tags: ["world", "paris", "couple", "romantic"]
    },
    {
        id: "world_vienna_market",
        name: "Viena Mercado (M-M)",
        scene_en: "female couple in a Christmas market in Vienna, golden lights, food stalls, giant tree in background",
        scene_es: "pareja mujer-mujer en un mercado navideño en Viena, luces doradas, puestos de comida, árbol gigante al fondo",
        tags: ["world", "vienna", "couple", "lesbian"]
    },
    {
        id: "world_nyc_5th_ave",
        name: "NYC 5th Ave",
        scene_en: "family with dog walking down 5th Avenue in New York with decorated shop windows, night, lights",
        scene_es: "familia con perro caminando por la Quinta Avenida de Nueva York con escaparates decorados, noche, luces",
        tags: ["world", "nyc", "family", "pet"]
    },
    {
        id: "world_london_bigben",
        name: "Londres Big Ben (H-H)",
        scene_en: "male couple in London, with Big Ben and Christmas lights in distance, wet streets and reflections",
        scene_es: "pareja hombre-hombre en Londres, con el Big Ben y luces navideñas a lo lejos, calles mojadas y reflejos",
        tags: ["world", "london", "couple", "gay"]
    },
    {
        id: "world_madrid_plaza",
        name: "Madrid Plaza",
        scene_en: "single person with dog in an illuminated square in Madrid, huge tree and hanging lights",
        scene_es: "persona sola con su perro en una plaza iluminada en Madrid, árbol enorme y luces colgantes",
        tags: ["world", "madrid", "solo", "pet"]
    },
    {
        id: "world_mexico_zocalo",
        name: "CDMX Zócalo",
        scene_en: "family with three kids in the main square of Mexico City with giant Christmas tree and decorations",
        scene_es: "familia con tres hijos en la plaza principal de Ciudad de México con árbol navideño gigante y decoraciones",
        tags: ["world", "mexico", "family"]
    },
    {
        id: "world_tokyo_lights",
        name: "Tokio Luces",
        scene_en: "couple in a decorated street in Tokyo, winter lights, blurry signs, night atmosphere",
        scene_es: "pareja en una calle con decoraciones en Tokio, luces de invierno, letreros borrosos, ambiente nocturno",
        tags: ["world", "tokyo", "couple"]
    },
    {
        id: "world_swiss_alps",
        name: "Suiza Alpes",
        scene_en: "family with two dogs in a snowy alpine village in Switzerland, wooden houses with lights, mountains in background",
        scene_es: "familia con dos perros en un pueblo alpino nevado en Suiza, casas de madera con luces, montañas al fondo",
        tags: ["world", "switzerland", "family", "pet"]
    },
    {
        id: "world_prague_market",
        name: "Praga Mercado",
        scene_en: "couple walking holding hands through a Christmas market in Prague, illuminated castle in background, warm lights",
        scene_es: "pareja caminando tomada de la mano por un mercado navideño en Praga, castillo iluminado de fondo, luces cálidas",
        tags: ["world", "prague", "couple"]
    },
    {
        id: "world_nyc_ice_rink",
        name: "NYC Pista Hielo",
        scene_en: "group of friends at an outdoor ice rink in New York, illuminated trees, skyscrapers in background",
        scene_es: "grupo de amigos en una pista de hielo al aire libre en Nueva York, árboles iluminados, rascacielos al fondo",
        tags: ["world", "nyc", "group", "fun"]
    },
    {
        id: "world_strasbourg_street",
        name: "Estrasburgo Calle",
        scene_en: "family with a cat in arms in a decorated cobblestone street in Strasbourg, France, houses with lights, warm atmosphere",
        scene_es: "familia con un gato en brazos en una calle empedrada decorada en Estrasburgo, Francia, casas con luces, ambiente cálido",
        tags: ["world", "france", "family", "pet"]
    },
    {
        id: "world_copenhagen_cafe",
        name: "Copenhague Café",
        scene_en: "couple in a Christmas cafe in Copenhagen, cozy interior with garlands and candles, window with snow outside",
        scene_es: "pareja hombre-mujer en un café navideño en Copenhague, interior acogedor con guirnaldas y velas, ventana con nieve afuera",
        tags: ["world", "denmark", "couple"]
    },
    {
        id: "world_rome_street",
        name: "Roma Calle (M-M)",
        scene_en: "female couple in a historic street in Rome with hanging Christmas lights, soft night",
        scene_es: "pareja mujer-mujer en una calle histórica de Roma con luces navideñas colgantes, noche suave",
        tags: ["world", "rome", "couple", "lesbian"]
    },
    {
        id: "world_montreal_plaza",
        name: "Montreal Plaza Nieve",
        scene_en: "family with dog in a snowy square in Montreal, gigantic tree and modern buildings in background",
        scene_es: "familia con perro en una plaza nevada en Montreal, árbol gigantesco y edificios modernos al fondo",
        tags: ["world", "canada", "family", "pet"]
    },
    {
        id: "world_berlin_cat",
        name: "Berlín Gato",
        scene_en: "single person with cat in arms in front of a giant tree in Berlin, Christmas market and lights",
        scene_es: "persona sola con su gato en brazos frente a un árbol gigante en Berlín, mercado navideño y luces",
        tags: ["world", "berlin", "solo", "pet"]
    },
    {
        id: "world_vancouver_view",
        name: "Vancouver Mirador (H-H)",
        scene_en: "male couple at a lookout with view of decorated Vancouver city, lights in distance",
        scene_es: "pareja hombre-hombre en un mirador con vista a la ciudad de Vancouver decorada de Navidad, luces a lo lejos",
        tags: ["world", "canada", "couple", "gay"]
    },
    {
        id: "world_london_street",
        name: "Londres Calle",
        scene_en: "family with three kids in a decorated London street with hanging lights and elegant shops",
        scene_es: "familia con tres hijos en una calle decorada de Londres con luces colgantes y tiendas elegantes",
        tags: ["world", "london", "family"]
    },
    {
        id: "world_oslo_snow",
        name: "Oslo Nieve",
        scene_en: "couple with two dogs in a snowy square in Oslo, tree and warm lights",
        scene_es: "pareja con dos perros en una plaza nevada en Oslo, árbol y luces cálidas",
        tags: ["world", "norway", "couple", "pet"]
    },
    {
        id: "world_brussels_market",
        name: "Bruselas Mercado",
        scene_en: "family with grandparents in a Christmas market in Brussels, wooden stalls, illuminated ferris wheel",
        scene_es: "familia con abuelos en un mercado navideño en Bruselas, puestos de madera, rueda de la fortuna iluminada",
        tags: ["world", "belgium", "family"]
    },
    {
        id: "world_salzburg_bridge",
        name: "Salzburgo Puente",
        scene_en: "couple on a wooden bridge decorated with lights in Salzburg, river and city in background",
        scene_es: "pareja en un puente de madera decorado con luces en Salzburgo, río y ciudad al fondo",
        tags: ["world", "austria", "couple"]
    },
    {
        id: "world_chicago_tree",
        name: "Chicago Árbol",
        scene_en: "single person with dog in front of a huge Christmas tree in Chicago, skyscrapers and snow",
        scene_es: "persona sola con su perro frente a un enorme árbol navideño en Chicago, rascacielos y nieve",
        tags: ["world", "chicago", "solo", "pet"]
    },
    {
        id: "world_toronto_park",
        name: "Toronto Parque",
        scene_en: "family with two kids in a snowy park in Toronto, trees with lights and snow-covered bench",
        scene_es: "familia con dos hijos en un parque nevado en Toronto, árboles con luces y banco cubierto de nieve",
        tags: ["world", "canada", "family"]
    },
    {
        id: "world_lisbon_lights",
        name: "Lisboa Luces (M-M)",
        scene_en: "female couple walking under hanging lights in a pedestrian street in Lisbon, warm night atmosphere",
        scene_es: "pareja mujer-mujer caminando bajo luces colgantes en una calle peatonal de Lisboa, ambiente nocturno cálido",
        tags: ["world", "portugal", "couple", "lesbian"]
    },
    {
        id: "world_barcelona_balcony",
        name: "Barcelona Balcón",
        scene_en: "couple with a cat on a balcony in Barcelona, city illuminated for Christmas behind",
        scene_es: "pareja con un gato en un balcón en Barcelona, ciudad iluminada para Navidad detrás",
        tags: ["world", "barcelona", "couple", "pet"]
    },
    {
        id: "world_dubai_mall",
        name: "Dubái Mall",
        scene_en: "family with dog in a decorated mall in Dubai, giant indoor tree, luxurious lights and decorations",
        scene_es: "familia con perro en un centro comercial decorado en Dubái, árbol gigante en interiores, luces y decoraciones lujosas",
        tags: ["world", "dubai", "family", "pet"]
    },
    {
        id: "world_stockholm_snow",
        name: "Estocolmo Calle (H-H)",
        scene_en: "male couple in a snowy street in Stockholm with hanging Christmas lights, colorful houses in background",
        scene_es: "pareja hombre-hombre en una calle nevada de Estocolmo con luces navideñas colgando, casas de colores al fondo",
        tags: ["world", "sweden", "couple", "gay"]
    },
    {
        id: "world_sydney_harbour",
        name: "Sídney Muelle",
        scene_en: "single person with two dogs on a decorated pier in Sydney, modern Christmas tree and harbour view",
        scene_es: "persona sola con dos perros en un muelle decorado en Sídney, árbol navideño moderno y vista al puerto",
        tags: ["world", "australia", "solo", "pet"]
    },
    {
        id: "world_austria_village",
        name: "Austria Villa",
        scene_en: "family with three kids in an alpine villa in Austria, wooden houses with lights, snow and mountains",
        scene_es: "familia con tres hijos en una villa alpina en Austria, casas de madera con luces, nieve y montañas",
        tags: ["world", "austria", "family"]
    },
    {
        id: "world_cologne_cathedral",
        name: "Colonia Catedral",
        scene_en: "couple in a Christmas market in Cologne, illuminated cathedral in background, wooden stalls",
        scene_es: "pareja en un mercado navideño en Colonia, catedral iluminada al fondo, puestos de madera",
        tags: ["world", "germany", "couple"]
    },
    {
        id: "world_buenos_aires_terrace",
        name: "Buenos Aires Terraza",
        scene_en: "single person with cat on a terrace overlooking Buenos Aires decorated for Christmas, lights and buildings",
        scene_es: "persona sola con su gato en una terraza con vista a la ciudad de Buenos Aires decorada para Navidad, luces y edificios",
        tags: ["world", "argentina", "solo", "pet"]
    },
    {
        id: "world_paris_seine",
        name: "París Sena",
        scene_en: "family with two dogs walking along the Seine in Paris, trees with lights, city view",
        scene_es: "familia con dos perros en un paseo junto al río Sena en París, árboles con luces, vista de la ciudad",
        tags: ["world", "paris", "family", "pet"]
    },
    {
        id: "world_edinburgh_castle",
        name: "Edimburgo Castillo (M-M)",
        scene_en: "female couple in a decorated cobblestone street in Edinburgh, castle in distance",
        scene_es: "pareja mujer-mujer en una calle empedrada decorada con luces en Edimburgo, castillo a lo lejos",
        tags: ["world", "scotland", "couple", "lesbian"]
    },
    {
        id: "world_mexico_terrace",
        name: "CDMX Terraza Amigos",
        scene_en: "group of friends on a terrace in Mexico City with Christmas lights and night city view",
        scene_es: "grupo de amigos en una terraza en Ciudad de México con luces navideñas y vista nocturna de la ciudad",
        tags: ["world", "mexico", "group"]
    },
    {
        id: "world_moscow_park",
        name: "Moscú Parque",
        scene_en: "family with a big dog in a snowy park in Moscow, tall trees and Christmas lights",
        scene_es: "familia con un perro grande en un parque nevado en Moscú, árboles altos y luces navideñas",
        tags: ["world", "russia", "family", "pet"]
    },
    {
        id: "world_rio_lookout",
        name: "Río Mirador",
        scene_en: "couple at a lookout with view of Rio de Janeiro illuminated and decorated for Christmas, warm night",
        scene_es: "pareja hombre-mujer en un mirador con vista a Río de Janeiro iluminado y decorado para Navidad, noche cálida",
        tags: ["world", "brazil", "couple"]
    },
    {
        id: "world_seoul_street",
        name: "Seúl Calle",
        scene_en: "single person with two cats in a street in Seoul decorated with Christmas lights, shops in background",
        scene_es: "persona sola con dos gatos en una calle de Seúl decorada con luces navideñas, tiendas al fondo",
        tags: ["world", "korea", "solo", "pet"]
    },
    {
        id: "world_orlando_park",
        name: "Orlando Parque",
        scene_en: "family with three kids in Christmas theme park in Orlando, lights, trees and blurred rides",
        scene_es: "familia con tres hijos en parque de atracciones navideño en Orlando, luces, árboles y juegos mecánicos desenfocados",
        tags: ["world", "usa", "family"]
    },
    {
        id: "world_amsterdam_canal",
        name: "Ámsterdam Canal (H-H)",
        scene_en: "male couple on illuminated bridge in Amsterdam, canals and lights reflected in water",
        scene_es: "pareja hombre-hombre en puente iluminado en Ámsterdam, canales y luces reflejadas en el agua",
        tags: ["world", "netherlands", "couple", "gay"]
    },
    {
        id: "world_budapest_danube",
        name: "Budapest Danubio",
        scene_en: "couple with dog walking along Danube in Budapest, Christmas lights and city in background",
        scene_es: "pareja con perro en un paseo junto al Danubio en Budapest, luces navideñas y ciudad al fondo",
        tags: ["world", "budapest", "couple", "pet"]
    },
    {
        id: "world_warsaw_square",
        name: "Varsovia Plaza",
        scene_en: "family with grandparents and kids in a decorated square in Warsaw, giant tree, lights and historic buildings",
        scene_es: "familia con abuelos y niños en una plaza decorada en Varsovia, árbol gigante, luces y edificios históricos",
        tags: ["world", "poland", "family"]
    },
    {
        id: "world_sydney_opera",
        name: "Sídney Ópera",
        scene_en: "single person with dog in front of huge Christmas tree in Sydney, opera house in slightly blurred background",
        scene_es: "persona sola con su perro frente a un enorme árbol navideño en Sídney, ópera al fondo ligeramente desenfocada",
        tags: ["world", "australia", "solo", "pet"]
    },
    {
        id: "world_zurich_market",
        name: "Zúrich Mercado (M-M)",
        scene_en: "female couple walking through a Christmas market in Zurich, wooden stalls, tree and mountains in distance",
        scene_es: "pareja mujer-mujer caminando por un mercado navideño en Zúrich, puestos de madera, árbol y montañas a lo lejos",
        tags: ["world", "switzerland", "couple", "lesbian"]
    },
    {
        id: "world_santiago_street",
        name: "Santiago Calle",
        scene_en: "family with two kids and a cat in a decorated street in Santiago de Chile, hanging lights and illuminated trees",
        scene_es: "familia con dos hijos y un gato en una calle decorada en Santiago de Chile, luces colgantes y árboles iluminados",
        tags: ["world", "chile", "family", "pet"]
    },
    {
        id: "world_bogota_terrace",
        name: "Bogotá Terraza",
        scene_en: "group of friends on a terrace in Bogota with Christmas decoration and night city view",
        scene_es: "grupo de amigos en una terraza en Bogotá con decoración navideña y vista nocturna de la ciudad",
        tags: ["world", "colombia", "group"]
    },
    {
        id: "world_munich_square",
        name: "Múnich Plaza",
        scene_en: "couple with two dogs in a snowy square in Munich, Christmas market and lights",
        scene_es: "pareja hombre-mujer con dos perros en una plaza nevada en Múnich, mercado navideño y luces",
        tags: ["world", "germany", "couple", "pet"]
    },
    {
        id: "world_finland_lake",
        name: "Finlandia Lago",
        scene_en: "family with dog walking by frozen lake in Finland, snowy forest and soft lights",
        scene_es: "familia con un perro en paseo junto a lago congelado en Finlandia, bosque nevado y luces suaves",
        tags: ["world", "finland", "family", "pet"]
    },
    {
        id: "world_dublin_street",
        name: "Dublín Calle",
        scene_en: "single person with dog in a decorated street in Dublin, illuminated pubs and garlands",
        scene_es: "persona sola con su perro en una calle decorada en Dublín, pubs iluminados y guirnaldas",
        tags: ["world", "ireland", "solo", "pet"]
    },
    {
        id: "world_generic_view",
        name: "Mirador Ciudad",
        scene_en: "couple, family and pets together at a lookout with view of a generic large city illuminated for Christmas, soft fireworks in background",
        scene_es: "pareja, familia y mascotas juntos en un mirador con vista a una gran ciudad iluminada para Navidad (ciudad genérica), fuegos artificiales suaves al fondo",
        tags: ["world", "generic", "group", "pet"]
    },
];
