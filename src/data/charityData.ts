// Charity Organizations Data for CharitySection
// Data provided by user for Pic.Christmas philanthropy module

export interface CharityOrg {
    id: string;
    name: string;
    region: string;
    cause: string;
    logo_url: string;
    website: string;
}

export const CHARITY_ORGANIZATIONS: CharityOrg[] = [
    {
        id: "milagros_caninos",
        name: "Milagros Caninos",
        region: "LATAM",
        cause: "Perros en situaciones extremas y cáncer",
        logo_url: "/images/charity/milagros.png",
        website: "milagroscaninos.org"
    },
    {
        id: "best_friends",
        name: "Best Friends Animal Society",
        region: "USA/Global",
        cause: "Movimiento No-Kill para 2025",
        logo_url: "/images/charity/bestfriends.png",
        website: "bestfriends.org"
    },
    {
        id: "hs_international",
        name: "Humane Society International",
        region: "Europa/Asia",
        cause: "Rescate en desastres y granjas de carne",
        logo_url: "/images/charity/hsi.png",
        website: "hsi.org"
    }
];

// Viral Sharing Links
export const VIRAL_SHARE_LINKS = {
    whatsapp: "https://wa.me/?text=¡Socio!%20Mira%20a%20mi%20perro%20volando%20con%20Santa%20🎅.%20La%20IA%20de%20Pic.Christmas%20es%20una%20locura.%20Te%20dan%204hrs%20gratis%20aquí:%20https://pic.christmas",
    twitter: "https://twitter.com/intent/tweet?text=Estoy%20obsesionado%20con%20las%20fotos%20navideñas%20de%20mi%20mascota%20en%20@PicChristmas%20🎄.%20Pruébenlo%20antes%20de%20que%20se%20haga%20viral:%20https://pic.christmas%20#AIPets%20#ChristmasMagic",
    facebook: "https://www.facebook.com/sharer/sharer.php?u=https://pic.christmas&quote=¡Fotos%20navideñas%20épicas%20con%20IA!%20🎄",
};

// Commission rate for affiliates
export const AFFILIATE_COMMISSION_RATE = 0.20; // 20%

// Free tier duration
export const FREE_TIER_HOURS = 4;
