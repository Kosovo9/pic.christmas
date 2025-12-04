import { PromptItem, Language, PricingPackage } from './types';

export const TRANSLATIONS = {
  es: {
    hero: {
      title: "Estudio Navideño Premium con IA",
      subtitle: "Retratos hiperrealistas de lujo para ti, tu familia y tus mascotas.",
      ctaUpload: "Crear mi Sesión",
      ctaExamples: "Ver Galería",
      poweredBy: "Tecnología de Retrato Neural"
    },
    upload: {
      title: "Configura tu Sesión",
      dragDrop: "Sube tus fotos de referencia (Máx 3)",
      limit: "Formatos: JPG/PNG. Máxima calidad.",
      subjectsTitle: "Participantes",
      people: "Personas",
      pets: "Mascotas",
      adults: "Adultos",
      kids: "Niños",
      dogs: "Perros",
      cats: "Gatos",
      others: "Otros",
      selectScenario: "Elige una Idea del Catálogo",
      aiHelp: "IA de Optimización activa: Mejoraremos tus instrucciones automáticamente.",
      selectFormat: "Formato de Salida",
      formats: {
        square: "Cuadrado (1:1)",
        portrait: "Historia (9:16)",
        landscape: "Cine (16:9)"
      },
      generateBtn: "Ir al Pago y Generar",
      generating: "Renderizando en Alta Definición...",
      customPromptPlaceholder: "Instrucciones adicionales (opcional)",
      disclaimer: "Certifico ser dueño de las fotos. Prohibido contenido ilícito.",
      acceptPolicy: "Acepto términos",
    },
    results: {
      title: "Tu Obra Maestra",
      subtitle: "Listo para imprimir o compartir.",
      download: "Descargar Ultra HD",
    },
    chat: {
      title: "Concierge Nexora",
      subtitle: "Soporte Premium 24/7",
      placeholder: "Consultar al experto...",
      thinking: "Analizando...",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      disclaimer: "Aviso: Las imágenes generadas en esta plataforma se crean mediante inteligencia artificial y podrían presentar ligeras variaciones respecto a las fotografías originales. Este servicio es exclusivamente para fines personales y comerciales generales, y no garantiza aceptación en procesos legales, identificaciones oficiales ni documentos gubernamentales. Al usar este sitio aceptas estos términos."
    },
    categories: {
      couple: "Parejas",
      family: "Familia",
      pet: "Mascotas",
      professional: "Ejecutivo",
      video: "Video Motion",
      kids: "Niños & Magia",
      friends: "Amigos"
    },
    pricing: {
      title: 'Colección Navideña 2025',
      subtitle: 'Precios dinámicos según el número de participantes.',
      buy: 'Adquirir Sesión',
      total: 'Total Estimado:',
      extraPerson: '+ por persona extra',
      extraPet: '+ por mascota extra',
      note: 'Precios en USD. Conversión automática.'
    },
    catalog: {
      title: 'Catálogo de Ideas',
      subtitle: 'Selecciona una inspiración para tu sesión',
    },
    referral: {
      title: "Invita y Gana",
      desc: "Comparte tu código. Si 5 amigos compran, obtienes una sesión GRATIS.",
      codeLabel: "Tu Código:",
      copy: "Copiar",
      progress: "Amigos referidos:",
      reward: "¡Felicidades! Tienes 1 sesión gratis."
    }
  },
  en: {
    hero: {
      title: "Premium AI Christmas Studio",
      subtitle: "Luxury hyper-realistic portraits for you, your family, and pets.",
      ctaUpload: "Create Session",
      ctaExamples: "View Gallery",
      poweredBy: "Neural Portrait Technology"
    },
    upload: {
      title: "Configure Session",
      dragDrop: "Upload reference photos (Max 3)",
      limit: "Formats: JPG/PNG. Max quality.",
      subjectsTitle: "Participants",
      people: "People",
      pets: "Pets",
      adults: "Adults",
      kids: "Kids",
      dogs: "Dogs",
      cats: "Cats",
      others: "Others",
      selectScenario: "Choose an Idea from Catalog",
      aiHelp: "AI Optimization Active: We will enhance your instructions automatically.",
      selectFormat: "Output Format",
      formats: {
        square: "Square (1:1)",
        portrait: "Story (9:16)",
        landscape: "Cinema (16:9)"
      },
      generateBtn: "Checkout & Generate",
      generating: "Rendering High Definition...",
      customPromptPlaceholder: "Additional instructions (optional)",
      disclaimer: "I certify ownership of photos. No illicit content.",
      acceptPolicy: "Accept terms",
    },
    results: {
      title: "Your Masterpiece",
      subtitle: "Ready to print or share.",
      download: "Download Ultra HD",
    },
    chat: {
      title: "Nexora Concierge",
      subtitle: "Premium Support 24/7",
      placeholder: "Ask an expert...",
      thinking: "Analyzing...",
    },
    footer: {
      rights: "All rights reserved.",
      disclaimer: "Notice: The images generated on this platform are created using artificial intelligence and may differ slightly from the original photos. This service is intended for personal and general commercial use only and does not guarantee acceptance for legal processes, IDs, or government documents. By using this site, you agree to these terms."
    },
    categories: {
      couple: "Couples",
      family: "Family",
      pet: "Pets",
      professional: "Executive",
      video: "Video Motion",
      kids: "Kids & Magic",
      friends: "Friends"
    },
    pricing: {
      title: 'Christmas Collection 2025',
      subtitle: 'Dynamic pricing based on participants.',
      buy: 'Purchase Session',
      total: 'Estimated Total:',
      extraPerson: '+ per extra person',
      extraPet: '+ per extra pet',
      note: 'Prices in USD. Automatic conversion.'
    },
    catalog: {
      title: 'Idea Catalog',
      subtitle: 'Select an inspiration for your session',
    },
    referral: {
      title: "Invite & Earn",
      desc: "Share your code. If 5 friends buy, you get a FREE session.",
      codeLabel: "Your Code:",
      copy: "Copy",
      progress: "Friends referred:",
      reward: "Congrats! You have 1 free session."
    }
  },
  // Adding stubs for other languages to prevent errors, defaulting to EN strings for brevity in this update
  zh: { hero: { title: "Premium AI Christmas Studio", subtitle: "...", ctaUpload: "Upload", ctaExamples: "View", poweredBy: "AI" }, upload: { title: "Upload", dragDrop: "Drop photos", limit: "Max 3", subjectsTitle: "Subjects", people: "People", pets: "Pets", adults: "Adults", kids: "Kids", dogs: "Dogs", cats: "Cats", others: "Others", selectScenario: "Scenario", aiHelp: "AI Active", selectFormat: "Format", formats: { square: "1:1", portrait: "9:16", landscape: "16:9" }, generateBtn: "Generate", generating: "...", customPromptPlaceholder: "...", disclaimer: "...", acceptPolicy: "..." }, results: { title: "Result", subtitle: "...", download: "Download" }, chat: { title: "Chat", subtitle: "...", placeholder: "...", thinking: "..." }, footer: { rights: "Reserved", disclaimer: "AI Generated content." }, categories: { couple: "Couple", family: "Family", pet: "Pet", professional: "Pro", video: "Video", kids: "Kids", friends: "Friends" }, pricing: { title: "Pricing", subtitle: "...", buy: "Buy", total: "Total", extraPerson: "Extra", extraPet: "Extra", note: "USD" }, catalog: { title: "Catalog", subtitle: "..." }, referral: { title: "Referral", desc: "...", codeLabel: "Code", copy: "Copy", progress: "Progress", reward: "Reward" } },
  fr: { hero: { title: "Studio de Noël Premium IA", subtitle: "...", ctaUpload: "Télécharger", ctaExamples: "Voir", poweredBy: "IA" }, upload: { title: "Télécharger", dragDrop: "Déposer photos", limit: "Max 3", subjectsTitle: "Sujets", people: "Gens", pets: "Animaux", adults: "Adultes", kids: "Enfants", dogs: "Chiens", cats: "Chats", others: "Autres", selectScenario: "Scénario", aiHelp: "IA Active", selectFormat: "Format", formats: { square: "1:1", portrait: "9:16", landscape: "16:9" }, generateBtn: "Générer", generating: "...", customPromptPlaceholder: "...", disclaimer: "...", acceptPolicy: "..." }, results: { title: "Résultat", subtitle: "...", download: "Télécharger" }, chat: { title: "Chat", subtitle: "...", placeholder: "...", thinking: "..." }, footer: { rights: "Réservés", disclaimer: "Contenu généré par IA." }, categories: { couple: "Couple", family: "Famille", pet: "Animal", professional: "Pro", video: "Vidéo", kids: "Enfants", friends: "Amis" }, pricing: { title: "Tarifs", subtitle: "...", buy: "Acheter", total: "Total", extraPerson: "Extra", extraPet: "Extra", note: "USD" }, catalog: { title: "Catalogue", subtitle: "..." }, referral: { title: "Parrainage", desc: "...", codeLabel: "Code", copy: "Copier", progress: "Progrès", reward: "Récompense" } },
  de: { hero: { title: "Premium AI Weihnachts-Studio", subtitle: "...", ctaUpload: "Hochladen", ctaExamples: "Ansehen", poweredBy: "KI" }, upload: { title: "Hochladen", dragDrop: "Fotos ablegen", limit: "Max 3", subjectsTitle: "Subjekte", people: "Personen", pets: "Haustiere", adults: "Erw.", kids: "Kinder", dogs: "Hunde", cats: "Katzen", others: "Andere", selectScenario: "Szenario", aiHelp: "KI Aktiv", selectFormat: "Format", formats: { square: "1:1", portrait: "9:16", landscape: "16:9" }, generateBtn: "Generieren", generating: "...", customPromptPlaceholder: "...", disclaimer: "...", acceptPolicy: "..." }, results: { title: "Ergebnis", subtitle: "...", download: "Herunterladen" }, chat: { title: "Chat", subtitle: "...", placeholder: "...", thinking: "..." }, footer: { rights: "Vorbehalten", disclaimer: "KI-generierter Inhalt." }, categories: { couple: "Paar", family: "Familie", pet: "Tier", professional: "Pro", video: "Video", kids: "Kinder", friends: "Freunde" }, pricing: { title: "Preise", subtitle: "...", buy: "Kaufen", total: "Gesamt", extraPerson: "Extra", extraPet: "Extra", note: "USD" }, catalog: { title: "Katalog", subtitle: "..." }, referral: { title: "Empfehlung", desc: "...", codeLabel: "Code", copy: "Kopieren", progress: "Fortschritt", reward: "Belohnung" } },
  pt: { hero: { title: "Estúdio de Natal Premium IA", subtitle: "...", ctaUpload: "Enviar", ctaExamples: "Ver", poweredBy: "IA" }, upload: { title: "Enviar", dragDrop: "Soltar fotos", limit: "Max 3", subjectsTitle: "Sujeitos", people: "Pessoas", pets: "Pets", adults: "Adultos", kids: "Crianças", dogs: "Cães", cats: "Gatos", others: "Outros", selectScenario: "Cenário", aiHelp: "IA Ativa", selectFormat: "Formato", formats: { square: "1:1", portrait: "9:16", landscape: "16:9" }, generateBtn: "Gerar", generating: "...", customPromptPlaceholder: "...", disclaimer: "...", acceptPolicy: "..." }, results: { title: "Resultado", subtitle: "...", download: "Baixar" }, chat: { title: "Chat", subtitle: "...", placeholder: "...", thinking: "..." }, footer: { rights: "Reservados", disclaimer: "Conteúdo gerado por IA." }, categories: { couple: "Casal", family: "Família", pet: "Pet", professional: "Pro", video: "Vídeo", kids: "Crianças", friends: "Amigos" }, pricing: { title: "Preços", subtitle: "...", buy: "Comprar", total: "Total", extraPerson: "Extra", extraPet: "Extra", note: "USD" }, catalog: { title: "Catálogo", subtitle: "..." }, referral: { title: "Indicação", desc: "...", codeLabel: "Código", copy: "Copiar", progress: "Progresso", reward: "Prêmio" } },
};

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'person_pet',
    title: { es: 'Persona + Mascota', en: 'Person + Pet', zh: 'Person + Pet', fr: 'Personne + Animal', de: 'Person + Tier', pt: 'Pessoa + Pet' },
    description: { es: 'Retrato único de conexión.', en: 'Unique portrait of connection.', zh: 'Unique portrait.', fr: 'Portrait unique.', de: 'Einzigartiges Porträt.', pt: 'Retrato único.' },
    features: {
      es: ['1 Adulto incluido', '1 Mascota incluida', 'Alta Definición'],
      en: ['1 Adult included', '1 Pet included', 'High Definition'],
      zh: [], fr: [], de: [], pt: []
    },
    recommended: true,
    rule: { basePrice: 15, includedPeople: 1, includedPets: 1, pricePerExtraPerson: 5, pricePerExtraPet: 5 }
  },
  {
    id: 'pet_only',
    title: { es: 'Solo Mascota', en: 'Pet Only', zh: 'Pet Only', fr: 'Animal seul', de: 'Nur Tier', pt: 'Apenas Pet' },
    description: { es: 'El rey de la casa.', en: 'The king of the house.', zh: 'The king.', fr: 'Le roi.', de: 'Der König.', pt: 'O rei.' },
    features: {
      es: ['1 Mascota incluida', 'Sin humanos', 'Escenario temático'],
      en: ['1 Pet included', 'No humans', 'Themed scenario'],
      zh: [], fr: [], de: [], pt: []
    },
    recommended: false,
    rule: { basePrice: 10, includedPeople: 0, includedPets: 1, pricePerExtraPerson: 0, pricePerExtraPet: 5 }
  },
  {
    id: 'family_pet',
    title: { es: 'Familia + Mascotas', en: 'Family + Pets', zh: 'Family', fr: 'Famille', de: 'Familie', pt: 'Família' },
    description: { es: 'Todos juntos en Navidad.', en: 'Everyone together.', zh: 'Together.', fr: 'Tous ensemble.', de: 'Alle zusammen.', pt: 'Todos juntos.' },
    features: {
      es: ['2 Personas incluidas', '1 Mascota incluida', 'Escena amplia'],
      en: ['2 People included', '1 Pet included', 'Wide scene'],
      zh: [], fr: [], de: [], pt: []
    },
    recommended: false,
    rule: { basePrice: 25, includedPeople: 2, includedPets: 1, pricePerExtraPerson: 5, pricePerExtraPet: 5 }
  }
];

// Catálogo masivo de ideas (Stub para 100+)
const generateCatalog = (): PromptItem[] => {
    const list: PromptItem[] = [];
    
    // 1. Couples (20 items)
    for(let i=1; i<=5; i++) list.push({
        id: `cpl_${i}`, category: 'couple', type: 'image',
        title: { es: `Pareja Romántica ${i}`, en: `Romantic Couple ${i}`, zh: '', fr: '', de: '', pt: '' },
        fullPrompt: { es: `Pareja abrazada frente a chimenea, estilo ${i}, luces cálidas.`, en: `Couple hugging in front of fireplace, style ${i}, warm lights.`, zh: '', fr: '', de: '', pt: '' }
    });

    // 2. Family (20 items)
    for(let i=1; i<=5; i++) list.push({
        id: `fam_${i}`, category: 'family', type: 'image',
        title: { es: `Familia Cena ${i}`, en: `Family Dinner ${i}`, zh: '', fr: '', de: '', pt: '' },
        fullPrompt: { es: `Familia cenando pavo, estilo ${i}, árbol de fondo.`, en: `Family eating turkey, style ${i}, tree in background.`, zh: '', fr: '', de: '', pt: '' }
    });

    // 3. Pets (20 items)
    for(let i=1; i<=5; i++) list.push({
        id: `pet_${i}`, category: 'pet', type: 'image',
        title: { es: `Mascota Nieve ${i}`, en: `Pet Snow ${i}`, zh: '', fr: '', de: '', pt: '' },
        fullPrompt: { es: `Mascota jugando en la nieve, estilo ${i}, bufanda roja.`, en: `Pet playing in snow, style ${i}, red scarf.`, zh: '', fr: '', de: '', pt: '' }
    });

    // 4. Executive
    list.push({
        id: 'exec_1', category: 'professional', type: 'image',
        title: { es: 'Ejecutivo Oficina Navidad', en: 'Executive Xmas Office', zh: '', fr: '', de: '', pt: '' },
        fullPrompt: { es: 'Retrato profesional en oficina con decoración sutil navideña.', en: 'Professional portrait in office with subtle xmas decor.', zh: '', fr: '', de: '', pt: '' }
    });
    
    return list;
};

export const CATALOG_IDEAS = generateCatalog();