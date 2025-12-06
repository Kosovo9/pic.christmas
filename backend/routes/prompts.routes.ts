import express from 'express';
import christmasPrompts from '../../data/christmas-prompts.json';

const router = express.Router();

// @desc    Get all Christmas prompts
// @route   GET /api/prompts
// @access  Public
router.get('/', (req, res) => {
    try {
        const { category, limit } = req.query;

        let prompts: any[] = [];

        if (category && typeof category === 'string') {
            // Get prompts from specific category
            const cat = christmasPrompts.categories[category as keyof typeof christmasPrompts.categories];
            if (cat) {
                prompts = cat.prompts;
            }
        } else {
            // Get all prompts from all categories
            Object.values(christmasPrompts.categories).forEach(cat => {
                prompts = prompts.concat(cat.prompts);
            });
        }

        // Apply limit if specified
        if (limit && !isNaN(Number(limit))) {
            prompts = prompts.slice(0, Number(limit));
        }

        res.json({
            prompts,
            total: prompts.length,
            categories: Object.keys(christmasPrompts.categories).map(key => ({
                id: key,
                name: christmasPrompts.categories[key as keyof typeof christmasPrompts.categories].name,
                icon: christmasPrompts.categories[key as keyof typeof christmasPrompts.categories].icon,
                count: christmasPrompts.categories[key as keyof typeof christmasPrompts.categories].prompts.length
            }))
        });
    } catch (error: any) {
        console.error('Get Prompts Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get random prompts
// @route   GET /api/prompts/random/:count
// @access  Public
router.get('/random/:count', (req, res) => {
    try {
        const count = parseInt(req.params.count) || 6;

        // Collect all prompts
        let allPrompts: any[] = [];
        Object.values(christmasPrompts.categories).forEach(cat => {
            allPrompts = allPrompts.concat(cat.prompts);
        });

        // Shuffle and pick random ones
        const shuffled = allPrompts.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(count, allPrompts.length));

        res.json({
            prompts: selected,
            total: selected.length
        });
    } catch (error: any) {
        console.error('Get Random Prompts Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get prompts by category
// @route   GET /api/prompts/category/:category
// @access  Public
router.get('/category/:category', (req, res) => {
    try {
        const { category } = req.params;

        const cat = christmasPrompts.categories[category as keyof typeof christmasPrompts.categories];

        if (!cat) {
            return res.status(404).json({
                message: 'Category not found',
                availableCategories: Object.keys(christmasPrompts.categories)
            });
        }

        res.json({
            category: {
                id: category,
                name: cat.name,
                icon: cat.icon
            },
            prompts: cat.prompts,
            total: cat.prompts.length
        });
    } catch (error: any) {
        console.error('Get Category Prompts Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single prompt by ID
// @route   GET /api/prompts/:id
// @access  Public
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;

        // Search through all categories
        let foundPrompt = null;
        let foundCategory = null;

        for (const [catKey, catData] of Object.entries(christmasPrompts.categories)) {
            const prompt = catData.prompts.find(p => p.id === id);
            if (prompt) {
                foundPrompt = prompt;
                foundCategory = {
                    id: catKey,
                    name: catData.name,
                    icon: catData.icon
                };
                break;
            }
        }

        if (!foundPrompt) {
            return res.status(404).json({ message: 'Prompt not found' });
        }

        res.json({
            prompt: foundPrompt,
            category: foundCategory
        });
    } catch (error: any) {
        console.error('Get Prompt Error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
