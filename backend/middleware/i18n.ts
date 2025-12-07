import { Request, Response, NextFunction } from 'express';

export const i18nMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get language from header
    const langHeader = req.headers['accept-language'];

    // Simple parser: take the first language before comma or hyphen if simple
    // Example: "es-ES,es;q=0.9" -> "es"
    // Example: "en" -> "en"

    let lang = 'en'; // default

    if (langHeader) {
        const firstLang = langHeader.split(',')[0].trim().split('-')[0];
        if (['es', 'en', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar'].includes(firstLang)) {
            lang = firstLang;
        }
    }

    // Attach to request
    (req as any).language = lang;

    next();
};
