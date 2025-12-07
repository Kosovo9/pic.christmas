export const backendTranslations: Record<string, Record<string, string>> = {
    es: {
        'error.safety_check_failed': 'La verificación de seguridad falló. Por favor intenta con otra imagen.',
        'error.safety_service_unavailable': 'El servicio de seguridad no está disponible temporalmente. Por favor intenta de nuevo.',
        'error.generic': 'Ocurrió un error inesperado.',
    },
    en: {
        'error.safety_check_failed': 'Safety check failed. Please try another image.',
        'error.safety_service_unavailable': 'Safety service temporarily unavailable. Please try again.',
        'error.generic': 'An unexpected error occurred.',
    },
    // Add other languages as needed, defaulting to EN for now to save space
};

export const getTranslation = (lang: string, key: string) => {
    const safeLang = backendTranslations[lang] ? lang : 'en';
    return backendTranslations[safeLang][key] || key;
};
