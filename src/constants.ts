import { PromptItem, Language } from './types';

export const TRANSLATIONS = {
    es: {
        hero: {
            title: "Convierte tus fotos en retratos navideños hiperrealistas en minutos",
            subtitle: "Para parejas, familias, mascotas y perfiles profesionales.",
            ctaUpload: "Sube tus fotos",
            ctaExamples: "Ver ejemplos",
        },
        upload: {
            title: "Sube tus fotos",
            dragDrop: "Arrastra y suelta tus fotos aquí, o haz clic para seleccionar",
            limit: "Máximo 5 fotos (JPG/PNG)",
            selectScenario: "Elige tu escenario navideño",
            generateBtn: "Generar Retratos",
            generating: "Creando magia navideña...",
            customPromptPlaceholder: "O escribe tu propia instrucción (ej: 'Añadir un filtro retro')",
            disclaimer: "Al continuar, aceptas que eres dueño de las fotos. No se permite contenido ofensivo, sexual o violento.",
            acceptPolicy: "Acepto las políticas de uso",
            formatTitle: "Formato",
            formats: {
                square: "Cuadrado (1:1)",
                portrait: "Vertical (9:16) - TikTok/Reels",
                landscape: "Horizontal (16:9)"
            }
        },
        results: {
            title: "Tu Galería Navideña",
            download: "Descargar Original (HD)",
            watermark: "",
        },
        chat: {
            title: "Nexora AI Help Desk 24/7",
            subtitle: "Asistente virtual para dudas sobre tu sesión navideña",
            placeholder: "Escribe tu pregunta...",
            thinking: "Escribiendo...",
        },
        footer: {
            rights: "Todos los derechos reservados.",
        },
        categories: {
            couple: "Parejas",
            family: "Familia",
            pet: "Mascotas",
            professional: "Profesional",
            video: "Video",
            custom: "Edición Libre",
        },
        pricing: {
            title: 'Precios de lanzamiento',
            subtitle: 'Promoción especial válida durante los primeros 10 días',
            packages: [
                { id: 'single', title: 'Foto Individual', description: '1 retrato en alta definición', price: '$5 USD', cta: 'Comprar' },
                { id: 'family', title: 'Sesión Familiar', description: '1 sesión para hasta 4 personas', price: '$10 USD', cta: 'Comprar' }
            ],
            note: 'Los precios se muestran en dólares americanos (USD). Las pasarelas de pago convierten automáticamente según tu ubicación.'
        },
        catalog: {
            title: 'Catálogo de Estilos',
            subtitle: 'Explora los estilos disponibles y elige tu favorito',
        }
    },
    en: {
        hero: {
            title: "Turn your photos into hyper-realistic Christmas portraits in minutes",
            subtitle: "For couples, families, pets, and professional profiles.",
            ctaUpload: "Upload your photos",
            ctaExamples: "See examples",
        },
        upload: {
            title: "Upload your photos",
            dragDrop: "Drag and drop your photos here, or click to select",
            limit: "Max 5 photos (JPG/PNG)",
            selectScenario: "Choose your Christmas scenario",
            generateBtn: "Generate Portraits",
            generating: "Creating Christmas magic...",
            customPromptPlaceholder: "Or type your own instruction (e.g., 'Add a retro filter')",
            disclaimer: "By continuing, you agree you own the photos. No offensive, sexual, or violent content allowed.",
            acceptPolicy: "I accept the usage policy",
            formatTitle: "Format",
            formats: {
                square: "Square (1:1)",
                portrait: "Vertical (9:16) - TikTok/Reels",
                landscape: "Landscape (16:9)"
            }
        },
        results: {
            title: "Your Christmas Gallery",
            download: "Download Original (HD)",
            watermark: "",
        },
        chat: {
            title: "Nexora AI Help Desk 24/7",
            subtitle: "Virtual assistant for your Christmas session questions",
            placeholder: "Type your question...",
            thinking: "Typing...",
        },
        footer: {
            rights: "All rights reserved.",
        },
        categories: {
            couple: "Couples",
            family: "Family",
            pet: "Pets",
            professional: "Professional",
            video: "Video",
            custom: "Free Edit",
        },
        pricing: {
            title: 'Introductory Pricing',
            subtitle: 'Special launch offer valid for the first 10 days',
            packages: [
                { id: 'single', title: 'Single Photo', description: 'One high-definition portrait', price: '$5 USD', cta: 'Buy' },
                { id: 'family', title: 'Family Session', description: 'One session for up to 4 people', price: '$10 USD', cta: 'Buy' }
            ],
            note: 'Prices are shown in USD. Payment gateways automatically convert based on your location.'
        },
        catalog: {
            title: 'Style Catalog',
            subtitle: 'Explore the available styles and pick your favorite',
        }
    },
    zh: {
        hero: {
            title: '将你的照片在几分钟内变成超逼真的圣诞肖像',
            subtitle: '适用于情侣、家庭、宠物和专业形象。',
            ctaUpload: '上传你的照片',
            ctaExamples: '查看示例',
        },
        upload: {
            title: '上传你的照片',
            dragDrop: '拖拽或点击选择你的照片',
            limit: '最多 5 张照片 (JPG/PNG)',
            selectScenario: '选择你的圣诞场景',
            generateBtn: '生成肖像',
            generating: '创造圣诞魔法中…',
            customPromptPlaceholder: '或输入你自己的指令 (例如：\'添加复古滤镜\')',
            disclaimer: '继续即表示你拥有这些照片。不允许冒犯性、性或暴力内容。',
            acceptPolicy: '我接受使用政策',
            formatTitle: "格式",
            formats: {
                square: "正方形 (1:1)",
                portrait: "竖屏 (9:16) - TikTok/Reels",
                landscape: "横屏 (16:9)"
            }
        },
        results: {
            title: '你的圣诞画廊',
            download: '下载原图 (HD)',
            watermark: '',
        },
        chat: {
            title: 'Nexora AI 帮助台 24/7',
            subtitle: '圣诞会话问题的虚拟助手',
            placeholder: '输入你的问题…',
            thinking: '输入中…',
        },
        footer: {
            rights: '版权所有。',
        },
        categories: {
            couple: '情侣',
            family: '家庭',
            pet: '宠物',
            professional: '专业',
            video: '视频',
            custom: '自定义编辑',
        },
        pricing: {
            title: '首发价',
            subtitle: '首 10 天的限时优惠',
            packages: [
                { id: 'single', title: '单张照片', description: '1 张高清肖像', price: '$5 USD', cta: '购买' },
                { id: 'family', title: '家庭套餐', description: '最多 4 人一场次', price: '$10 USD', cta: '购买' }
            ],
            note: '价格以美元显示，付款网关会根据你的地理位置自动转换。'
        },
        catalog: {
            title: '风格目录',
            subtitle: '浏览可用风格并选择你喜欢的',
        }
    },
    fr: {
        hero: {
            title: 'Transformez vos photos en portraits de Noël hyper-réalistes en quelques minutes',
            subtitle: 'Pour couples, familles, animaux de compagnie et profils professionnels.',
            ctaUpload: 'Téléchargez vos photos',
            ctaExamples: 'Voir des exemples',
        },
        upload: {
            title: 'Téléchargez vos photos',
            dragDrop: 'Glissez et déposez vos photos, ou cliquez pour sélectionner',
            limit: 'Maximum 5 photos (JPG/PNG)',
            selectScenario: 'Choisissez votre scène de Noël',
            generateBtn: 'Générer des portraits',
            generating: 'Création de magie de Noël…',
            customPromptPlaceholder: 'Ou écrivez votre propre instruction (ex: "Ajouter un filtre rétro")',
            disclaimer: 'En continuant, vous certifiez être propriétaire des photos. Aucun contenu offensant, sexuel ou violent autorisé.',
            acceptPolicy: 'J’accepte la politique d’utilisation',
            formatTitle: "Format",
            formats: {
                square: "Carré (1:1)",
                portrait: "Vertical (9:16) - TikTok/Reels",
                landscape: "Paysage (16:9)"
            }
        },
        results: {
            title: 'Votre galerie de Noël',
            download: 'Télécharger l’original (HD)',
            watermark: '',
        },
        chat: {
            title: 'Aide IA Nexora 24/7',
            subtitle: 'Assistant virtuel pour vos questions sur la session de Noël',
            placeholder: 'Écrivez votre question…',
            thinking: 'Écriture…',
        },
        footer: {
            rights: 'Tous droits réservés.',
        },
        categories: {
            couple: 'Couples',
            family: 'Famille',
            pet: 'Animaux',
            professional: 'Professionnel',
            video: 'Vidéo',
            custom: 'Édition libre',
        },
        pricing: {
            title: 'Tarifs d’introduction',
            subtitle: 'Offre spéciale de lancement valable les 10 premiers jours',
            packages: [
                { id: 'single', title: 'Photo unique', description: '1 portrait en haute définition', price: '$5 USD', cta: 'Acheter' },
                { id: 'family', title: 'Séance famille', description: 'Séance jusqu’à 4 personnes', price: '$10 USD', cta: 'Acheter' }
            ],
            note: 'Les prix sont affichés en USD. Les passerelles de paiement convertiront automatiquement selon votre localisation.'
        },
        catalog: {
            title: 'Catalogue de styles',
            subtitle: 'Découvrez les styles disponibles et choisissez votre préféré',
        }
    },
    de: {
        hero: {
            title: 'Verwandle deine Fotos in hyperrealistische Weihnachtsporträts in wenigen Minuten',
            subtitle: 'Für Paare, Familien, Haustiere und professionelle Profile.',
            ctaUpload: 'Lade deine Fotos hoch',
            ctaExamples: 'Beispiele ansehen',
        },
        upload: {
            title: 'Lade deine Fotos hoch',
            dragDrop: 'Ziehe deine Fotos hierher oder klicke zum Auswählen',
            limit: 'Maximal 5 Fotos (JPG/PNG)',
            selectScenario: 'Wähle dein Weihnachtsszenario',
            generateBtn: 'Porträts generieren',
            generating: 'Weihnachtszauber wird erstellt…',
            customPromptPlaceholder: 'Oder schreibe deine eigene Anweisung (z. B. "Füge einen Retrofilter hinzu")',
            disclaimer: 'Mit der Fortsetzung bestätigst du, Besitzer der Fotos zu sein. Kein anstößiger, sexueller oder gewalttätiger Inhalt erlaubt.',
            acceptPolicy: 'Ich akzeptiere die Nutzungsbedingungen',
            formatTitle: "Format",
            formats: {
                square: "Quadrat (1:1)",
                portrait: "Hochformat (9:16) - TikTok/Reels",
                landscape: "Querformat (16:9)"
            }
        },
        results: {
            title: 'Deine Weihnachtsgalerie',
            download: 'Original herunterladen (HD)',
            watermark: '',
        },
        chat: {
            title: 'Nexora KI-Hilfe 24/7',
            subtitle: 'Virtueller Assistent für Fragen zu deiner Weihnachtssession',
            placeholder: 'Schreibe deine Frage…',
            thinking: 'Schreibt…',
        },
        footer: {
            rights: 'Alle Rechte vorbehalten.',
        },
        categories: {
            couple: 'Paare',
            family: 'Familie',
            pet: 'Haustiere',
            professional: 'Professionell',
            video: 'Video',
            custom: 'Freie Bearbeitung',
        },
        pricing: {
            title: 'Einführungspreise',
            subtitle: 'Spezialangebote für die ersten 10 Tage',
            packages: [
                { id: 'single', title: 'Einzelnes Foto', description: '1 Porträt in hoher Auflösung', price: '$5 USD', cta: 'Kaufen' },
                { id: 'family', title: 'Familiensession', description: 'Session für bis zu 4 Personen', price: '$10 USD', cta: 'Kaufen' }
            ],
            note: 'Die Preise werden in USD angegeben. Die Zahlungsdienste wandeln automatisch je nach Standort um.'
        },
        catalog: {
            title: 'Stilkatalog',
            subtitle: 'Entdecke verfügbare Stile und wähle deinen Favoriten',
        }
    },
    pt: {
        hero: {
            title: 'Transforme suas fotos em retratos natalinos hiper-realistas em minutos',
            subtitle: 'Para casais, famílias, pets e perfis profissionais.',
            ctaUpload: 'Envie suas fotos',
            ctaExamples: 'Ver exemplos',
        },
        upload: {
            title: 'Envie suas fotos',
            dragDrop: 'Arraste e solte suas fotos aqui ou clique para selecionar',
            limit: 'Máximo de 5 fotos (JPG/PNG)',
            selectScenario: 'Escolha seu cenário natalino',
            generateBtn: 'Gerar retratos',
            generating: 'Criando magia de Natal…',
            customPromptPlaceholder: 'Ou escreva sua própria instrução (ex: "Adicionar filtro retrô")',
            disclaimer: 'Ao continuar, você confirma que é o dono das fotos. Conteúdo ofensivo, sexual ou violento não é permitido.',
            acceptPolicy: 'Aceito a política de uso',
            formatTitle: "Formato",
            formats: {
                square: "Quadrado (1:1)",
                portrait: "Vertical (9:16) - TikTok/Reels",
                landscape: "Paisagem (16:9)"
            }
        },
        results: {
            title: 'Sua Galeria de Natal',
            download: 'Baixar original (HD)',
            watermark: '',
        },
        chat: {
            title: 'Nexora AI Help Desk 24/7',
            subtitle: 'Assistente virtual para suas dúvidas sobre a sessão de Natal',
            placeholder: 'Digite sua pergunta…',
            thinking: 'Digitando…',
        },
        footer: {
            rights: 'Todos os direitos reservados.',
        },
        categories: {
            couple: 'Casais',
            family: 'Família',
            pet: 'Pets',
            professional: 'Profissional',
            video: 'Vídeo',
            custom: 'Edição Livre',
        },
        pricing: {
            title: 'Preços de introdução',
            subtitle: 'Oferta especial de lançamento válida nos primeiros 10 dias',
            packages: [
                { id: 'single', title: 'Foto avulsa', description: '1 retrato em alta definição', price: '$5 USD', cta: 'Comprar' },
                { id: 'family', title: 'Sessão de família', description: 'Sessão para até 4 pessoas', price: '$10 USD', cta: 'Comprar' }
            ],
            note: 'Os preços estão em USD. Os sistemas de pagamento converterão automaticamente conforme sua localização.'
        },
        catalog: {
            title: 'Catálogo de estilos',
            subtitle: 'Explore os estilos disponíveis e escolha o seu favorito',
        }
    }
};

export const INTERNAL_PROMPTS: PromptItem[] = [
    {
        id: 'couple_cozy',
        category: 'couple',
        type: 'image',
        title: { es: 'Pareja en Sala Acogedora', en: 'Cozy Living Room Couple', zh: '温馨客厅情侣', fr: 'Couple salon chaleureux', de: 'Paar im gemütlichen Wohnzimmer', pt: 'Casal em sala aconchegante' },
        description: { es: 'Chimenea, árbol y luces cálidas.', en: 'Fireplace, tree, and warm lights.', zh: '壁炉、圣诞树和暖灯。', fr: 'Cheminée, sapin et lumières chaudes.', de: 'Kamin, Baum und warmes Licht.', pt: 'Lareira, árvore e luzes quentes.' },
        coverImage: '/assets/hero3.jpg',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA de esta pareja, retrato navideño ultra fotorrealista en sala acogedora, chimenea cálida, árbol de Navidad con luces doradas, fondo bokeh suave, abrazados sonriendo, suéteres de invierno, cinemático 8K, iluminación de estudio, tonos de piel naturales. Preservar expresiones faciales originales, sin anatomía rara, sin extremidades extra.",
            en: "Using the REFERENCE PHOTO of this couple as the main subject, ultra photorealistic Christmas portrait in a cozy living room, warm fireplace, tall Christmas tree with golden fairy lights, soft bokeh background, they stand close together smiling, wearing winter sweaters, cinematic 8K, studio lighting, natural skin tones. Keep the original facial expressions and body posture from the REFERENCE PHOTO as close as possible. No extra limbs, no distorted faces, no unrealistic anatomy.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'pro_city',
        category: 'professional',
        type: 'image',
        title: { es: 'Ejecutivo Navideño', en: 'Holiday Executive', zh: '圣诞高管形象', fr: 'Cadre de Noël', de: 'Weihnachts-Manager', pt: 'Executivo natalino' },
        description: { es: 'Perfecto para LinkedIn.', en: 'Perfect for LinkedIn.', zh: '适合职业头像。', fr: 'Parfait pour LinkedIn.', de: 'Perfekt für LinkedIn.', pt: 'Perfeito para LinkedIn.' },
        coverImage: '/assets/hero4.jpg',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA, escena nocturna navideña elegante en la ciudad, frente a un árbol gigante, nieve ligera, edificios borrosos al fondo, abrigo de invierno elegante, ultra fotorrealista, retrato profesional, mantener rasgos y gestos originales.",
            en: "Using the REFERENCE PHOTO of this person, elegant Christmas city night scene, standing in front of a giant Christmas tree full of colorful lights, light snowfall, blurred city buildings in the background, stylish winter coat, ultra photorealistic, professional portrait, perfect for LinkedIn profile. Preserve identity, skin tone and natural expression.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'pet_snow',
        category: 'pet',
        type: 'image',
        title: { es: 'Mascota en la Nieve', en: 'Pet in the Snow', zh: '雪地宠物', fr: 'Animal dans la neige', de: 'Haustier im Schnee', pt: 'Pet na neve' },
        description: { es: 'Bosque nevado y luces.', en: 'Snowy forest and lights.', zh: '雪林和灯光。', fr: 'Forêt enneigée et lumières.', de: 'Verschneiter Wald und Lichter.', pt: 'Floresta nevada e luzes.' },
        coverImage: '/assets/hero3.jpg',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA de esta mascota, bosque nevado al atardecer, pinos con luces, brillo cálido, composición cinematográfica, pelaje ultra detallado, sin deformaciones.",
            en: "Using the REFERENCE PHOTO of this person and their dog, snowy forest at sunset, pine trees with string lights, both wearing matching Christmas scarves, warm glow on their faces, cinematic composition, ultra detailed fur and snow. Preserve the natural posture and proportions.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'family_tree',
        category: 'family',
        type: 'image',
        title: { es: 'Familia Clásica', en: 'Classic Family', zh: '经典家庭合影', fr: 'Famille classique', de: 'Klassische Familie', pt: 'Família clássica' },
        description: { es: 'Frente al gran árbol.', en: 'In front of the big tree.', zh: '站在大树前。', fr: 'Devant le grand sapin.', de: 'Vor dem großen Baum.', pt: 'Em frente à grande árvore.' },
        coverImage: '/assets/hero1.png',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA de esta familia, parados juntos frente a un enorme árbol de Navidad cubierto de luces multicolores, padres cargando al bebé, todos con ropa coordinada, ambiente festivo, profundidad de campo reducida, brillo suave, ultra fotorrealista.",
            en: "Using the REFERENCE PHOTO of this family, standing together in front of a huge Christmas tree covered in multicolor lights, parents holding their baby, everyone wearing coordinated red and black outfits, festive atmosphere, shallow depth of field, soft glow, ultra photorealistic.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'baby_gifts',
        category: 'family',
        type: 'image',
        title: { es: 'Bebé y Regalos', en: 'Baby & Gifts', zh: '宝宝与礼物', fr: 'Bébé et cadeaux', de: 'Baby und Geschenke', pt: 'Bebê e presentes' },
        description: { es: 'Rodeado de peluches y luz.', en: 'Surrounded by plushies and light.', zh: '被玩偶和灯光包围。', fr: 'Entouré de peluches et de lumière.', de: 'Umgeben von Kuscheltieren und Licht.', pt: 'Rodeado de pelúcias e luz.' },
        coverImage: '/assets/hero5.png',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA de este bebé, sentado en una manta suave entre un oso de peluche y un perro pequeño, rodeado de regalos de Navidad y cálidas luces de hadas, escena interior acogedora, sonrisa adorable, ultra fotorrealista, bokeh cremoso, 8K.",
            en: "Using the REFERENCE PHOTO of this baby, sitting on a soft blanket between a teddy bear and a small dog, surrounded by Christmas gifts and warm fairy lights, cozy indoor scene, adorable smile, ultra photorealistic, creamy bokeh, 8K.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'custom_edit',
        category: 'custom',
        type: 'image',
        title: { es: 'Tu idea (Nano Banana)', en: 'Your Idea (Nano Banana)', zh: '你的创意', fr: 'Votre idée', de: 'Deine Idee', pt: 'Sua ideia' },
        description: { es: 'Escribe tu propio prompt para editar.', en: 'Write your own prompt to edit.', zh: '自定义提示词。', fr: 'Écrivez votre propre prompt.', de: 'Schreibe deinen eigenen Prompt.', pt: 'Escreva seu próprio prompt.' },
        coverImage: '/assets/hero5.png',
        fullPrompt: {
            es: "",
            en: "",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'veo_commercial',
        category: 'video',
        type: 'video',
        title: { es: 'Video Anuncio Navideño', en: 'Christmas Commercial', zh: '圣诞广告视频', fr: 'Spot de Noël', de: 'Weihnachts-Werbespot', pt: 'Comercial de Natal' },
        description: { es: 'Genera un video mágico de 25–30s.', en: 'Generate a 25–30s magical video.', zh: '生成 25–30 秒魔幻视频。', fr: 'Vidéo magique de 25–30 s.', de: 'Magisches 25–30s-Video generieren.', pt: 'Gere um vídeo mágico de 25–30s.' },
        coverImage: '/assets/hero2.png',
        fullPrompt: {
            es: "Video cinematográfico, cálido y navideño. Transformación mágica de las personas en un entorno navideño de lujo. Luces bokeh, nieve cayendo suavemente, ambiente familiar, cero sexualización, diversidad de edades y tonos de piel.",
            en: "Cinematic, warm, Christmas-style video. Magical transformation of the subjects into a luxury Christmas environment. Bokeh lights, soft falling snow, family-friendly, no sexualization, diverse ages and skin tones.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'cafe_night',
        category: 'custom',
        type: 'image',
        title: { es: 'Café de Noche', en: 'Night Café', zh: '夜晚咖啡馆', fr: 'Café de nuit', de: 'Nachtcafé', pt: 'Café à noite' },
        description: { es: 'Ambiente nocturno en un café con faroles y luces.', en: 'Night-time atmosphere in a café with lanterns and lights.', zh: '夜晚灯笼与灯光的咖啡馆氛围。', fr: 'Ambiance nocturne dans un café aux lanternes et lumières.', de: 'Nachtstimmung im Café mit Laternen und Lichtern.', pt: 'Ambiente noturno em café com lanternas e luzes.' },
        coverImage: '/assets/hero2.png',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA, retrato navideño ultra fotorrealista en el exterior de un café antiguo, con faroles encendidos, reflejos en el pavimento mojado, ramas de abeto decoradas con luces, ambiente cálido y romántico, profundidad de campo suave. Preservar expresiones faciales y postura.",
            en: "Using the REFERENCE PHOTO, ultra photorealistic Christmas portrait outside a classic café at night, lanterns lit, reflections on wet pavement, spruce branches decorated with lights, warm and romantic atmosphere, soft depth of field. Keep the original facial expressions and posture. No extra limbs, no distorted faces.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'cafe_morning',
        category: 'custom',
        type: 'image',
        title: { es: 'Café al Amanecer', en: 'Morning Café', zh: '清晨咖啡馆', fr: 'Café à l’aube', de: 'Café bei Sonnenaufgang', pt: 'Café ao amanhecer' },
        description: { es: 'Café de día con luz suave de amanecer.', en: 'Daytime café bathed in gentle sunrise light.', zh: '清晨柔光咖啡馆。', fr: 'Café baigné de la lumière du lever du soleil.', de: 'Tagescafé im sanften Morgenlicht.', pt: 'Café diurno com luz suave do amanhecer.' },
        coverImage: '/assets/hero5.png',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA, retrato navideño fotorrealista en una terraza de café al amanecer, luz dorada, tazas humeantes, guirnaldas navideñas, ambiente acogedor y tranquilo. Mantener las expresiones faciales y postura naturales.",
            en: "Using the REFERENCE PHOTO, photorealistic Christmas portrait on a café terrace at sunrise, golden light, steaming cups, Christmas garlands, cozy and calm atmosphere. Preserve natural facial expressions and posture.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    },
    {
        id: 'paris_sunset',
        category: 'professional',
        type: 'image',
        title: { es: 'Atardecer en París', en: 'Sunset in Paris', zh: '巴黎日落', fr: 'Coucher de soleil à Paris', de: 'Sonnenuntergang in Paris', pt: 'Pôr do sol em Paris' },
        description: { es: 'Perfil con Torre Eiffel al fondo.', en: 'Profile with the Eiffel Tower in the background.', zh: '以埃菲尔铁塔为背景的肖像。', fr: 'Profil avec la tour Eiffel en arrière-plan.', de: 'Profil mit Eiffelturm im Hintergrund.', pt: 'Perfil com Torre Eiffel ao fundo.' },
        coverImage: '/assets/hero3.jpg',
        fullPrompt: {
            es: "Usando la FOTO DE REFERENCIA, escena de atardecer navideño en París con la Torre Eiffel iluminada al fondo, cielo rosado, luces cálidas reflejadas en el Sena, sujeto elegantemente vestido, mirada serena, ultra fotorrealista, tonos de piel naturales.",
            en: "Using the REFERENCE PHOTO, Christmas sunset scene in Paris with the illuminated Eiffel Tower in the background, pink sky, warm lights reflecting on the Seine, subject elegantly dressed with a serene expression, ultra photorealistic, natural skin tones.",
            zh: "",
            fr: "",
            de: "",
            pt: ""
        }
    }
];
