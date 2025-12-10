// Script to generate remaining 24 Christmas photos using platform API
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://pic-christmas-final-v1.netlify.app/api/generate';
const OUTPUT_DIR = 'C:/Users/roberto27979/.gemini/antigravity/brain/fd45ec5a-8eb7-4394-9594-01b3007af697/generated_photos';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Convert image to base64
function imageToBase64(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
}

// Photo generation prompts
const PROMPTS = {
    // Couple (4 remaining)
    couple: [
        {
            name: 'couple_sleigh_ride',
            prompt: 'Romantic couple in horse-drawn sleigh winter portrait: Young couple bundled together in antique wooden sleigh, wrapped in red and black plaid wool blankets, woman in white knit hat and scarf, man in dark winter coat, majestic horses with bells pulling sleigh, snow-covered countryside landscape, winter sunset with pink and orange sky, steam from horses breath visible in cold air, magical golden hour lighting, professional outdoor winter photography, shot with Nikon Z9, 70-200mm f/2.8 lens, cinematic composition, romantic fairytale atmosphere'
        },
        {
            name: 'couple_church_christmas',
            prompt: 'Couple at candlelight Christmas Eve service: Young couple in church pew, each holding lit white candles, woman in elegant navy dress with pearl earrings, man in dark suit, beautiful stained glass windows with nativity scene glowing in background, soft candlelight illuminating faces with warm glow, peaceful and reverent atmosphere, other candles creating bokeh in background, spiritual moment captured, editorial church photography style, shot with Sony A7IV, 85mm f/1.4 lens, low light photography, sacred and intimate mood'
        },
        {
            name: 'couple_baking_cookies',
            prompt: 'Couple baking Christmas cookies in modern kitchen: Young couple laughing together, flour dusted on faces and aprons, woman decorating gingerbread men with colorful icing, man rolling dough, marble countertop covered with cookie cutters and baking supplies, warm kitchen lighting from pendant lamps, Christmas decorations visible in background, candid joyful moment, lifestyle food photography, shot with Canon EOS R6, 50mm f/1.8, natural window light mixed with warm interior lighting, authentic happiness captured, homey and intimate atmosphere'
        },
        {
            name: 'couple_new_years_eve',
            prompt: 'Couple celebrating New Years Eve portrait: Young couple in elegant party attire, woman in sequined gold cocktail dress, man in sharp black suit with champagne-colored tie, raising crystal champagne flutes in toast, colorful fireworks exploding in night sky background, bokeh lights from city skyline, confetti falling, festive celebration atmosphere, professional event photography, shot with Canon EOS R5, 50mm f/1.2 lens wide open, shallow depth of field, vibrant colors, joyful celebration captured, luxury party editorial style'
        }
    ],
    // Woman (10 photos)
    woman: [
        {
            name: 'woman_cozy_reading',
            prompt: 'Woman reading Christmas story by fireplace: Mature woman wrapped in chunky knit blanket, reading hardcover book, steaming mug of hot chocolate with marshmallows on side table, Christmas tree lights twinkling in background, warm fireplace glow, peaceful cozy atmosphere, lifestyle photography, shot with Canon EOS R6, 50mm f/1.4, warm color tones, intimate moment, editorial style'
        },
        {
            name: 'woman_winter_fashion',
            prompt: 'Fashion portrait of woman in luxury winter coat: Mature woman in elegant long wool coat, professional makeup, snow falling gently, city Christmas lights background with bokeh, confident pose, editorial fashion photography, shot with Hasselblad X2D, 80mm lens, 4K quality, sophisticated style, Vogue-inspired'
        },
        {
            name: 'woman_baking_scene',
            prompt: 'Woman decorating gingerbread house: Mature woman in festive Christmas apron, decorating elaborate gingerbread house with royal icing, flour dusted on hands, warm kitchen with Christmas decorations, natural window light, joyful expression, food photography style, shot with Sony A7IV, 35mm f/1.8, warm tones, candid moment'
        },
        {
            name: 'woman_gift_wrapping',
            prompt: 'Woman wrapping Christmas presents: Mature woman sitting on floor surrounded by colorful wrapping paper, ribbons, and bows, wrapping gifts with care, cozy living room with Christmas tree in background, warm lighting, candid lifestyle moment, shot with Fujifilm X-T5, 23mm f/1.4, natural authentic expression, homey atmosphere'
        },
        {
            name: 'woman_snow_angel',
            prompt: 'Woman making snow angel: Mature woman in winter coat and knit hat, lying in fresh snow making snow angel, laughing joyfully, snowy forest background, golden hour lighting, playful moment, outdoor winter photography, shot with Nikon Z8, 24-70mm f/2.8, authentic happiness, winter wonderland'
        },
        {
            name: 'woman_christmas_morning',
            prompt: 'Woman opening Christmas gift: Mature woman in cozy pajamas opening wrapped present, surprised delighted expression, Christmas tree lights glowing, morning sunlight through window, authentic emotion, lifestyle photography, shot with Canon EOS R5, 50mm f/1.2, warm morning light, intimate moment'
        },
        {
            name: 'woman_holiday_dinner',
            prompt: 'Woman preparing Christmas dinner: Mature woman in elegant outfit setting beautiful Christmas table, turkey centerpiece, festive decorations, candles, warm dining room lighting, culinary photography style, shot with Sony A1, 35mm f/1.4, rich colors, sophisticated atmosphere'
        },
        {
            name: 'woman_ice_skating',
            prompt: 'Woman ice skating at outdoor rink: Mature woman in elegant skating outfit, graceful pose on ice, Christmas lights around rink, winter evening atmosphere, festive background, action photography, shot with Canon EOS R3, 70-200mm f/2.8, frozen motion, magical winter scene'
        },
        {
            name: 'woman_caroling',
            prompt: 'Woman singing Christmas carols: Mature woman holding songbook, singing with joy, snowy evening with vintage street lamps, warm scarf and coat, community atmosphere, nostalgic feel, street photography style, shot with Leica Q3, 28mm f/1.7, authentic moment, festive spirit'
        },
        {
            name: 'woman_spa_christmas',
            prompt: 'Woman relaxing in luxury spa: Mature woman in spa robe, surrounded by Christmas candles and decorations, peaceful serene expression, wellness photography, shot with Hasselblad H6D, 80mm lens, soft lighting, self-care moment, tranquil atmosphere'
        }
    ],
    // Man (10 photos)
    man: [
        {
            name: 'man_santa_ceo',
            prompt: 'Professional man as modern Santa CEO: Mature man in red suit jacket over white shirt, office setting with Christmas decorations, confident business pose, corporate photography, shot with Canon EOS R5, 85mm f/1.4, professional lighting, 4K quality, executive portrait style'
        },
        {
            name: 'man_outdoor_adventure',
            prompt: 'Man hiking in snowy mountains: Mature man in winter hiking gear, backpack with Christmas decorations, snow-covered pine trees, dramatic mountain landscape, adventure photography, shot with Nikon Z9, 24-70mm f/2.8, golden hour lighting, epic outdoor scene'
        },
        {
            name: 'man_workshop_santa',
            prompt: 'Man as Santas workshop manager: Mature man surrounded by wooden toys and tools, vintage workbench, warm workshop lighting, craftsman aesthetic, detailed scene, lifestyle photography, shot with Fujifilm GFX 100S, 50mm f/3.5, artisan atmosphere, traditional Christmas'
        },
        {
            name: 'man_formal_christmas',
            prompt: 'Man in elegant tuxedo at Christmas gala: Mature man in classic black tuxedo, bow tie, champagne glass, luxury venue with Christmas decorations, sophisticated atmosphere, professional event photography, shot with Sony A1, 85mm f/1.4, confident expression, formal portrait'
        },
        {
            name: 'man_fireplace_portrait',
            prompt: 'Man relaxing by fireplace with book: Mature man in leather armchair, reading book, whiskey glass on side table, Christmas tree in background, cozy study with warm lighting, lifestyle portrait, shot with Leica SL2, 50mm f/1.4, refined atmosphere, gentleman aesthetic'
        },
        {
            name: 'man_snow_sports',
            prompt: 'Man skiing down snowy slope: Mature man in professional ski gear, action shot skiing, mountain Christmas resort background, winter sports photography, shot with Canon EOS R3, 100-500mm f/4.5-7.1, dynamic composition, athletic moment'
        },
        {
            name: 'man_gift_shopping',
            prompt: 'Man shopping for Christmas gifts: Mature man in elegant winter coat, carrying luxury shopping bags, festive store window displays, city lights, candid street photography, shot with Fujifilm X-T5, 35mm f/1.4, holiday rush atmosphere, urban Christmas'
        },
        {
            name: 'man_family_tradition',
            prompt: 'Man decorating Christmas tree: Mature man reaching to place star on top of tree, family room setting, warm atmosphere, traditional moment, lifestyle photography, shot with Canon EOS R6, 24-70mm f/2.8, genuine smile, heartwarming scene'
        },
        {
            name: 'man_winter_cabin',
            prompt: 'Man at rustic winter cabin: Mature man chopping firewood outside log cabin, snow-covered landscape, flannel shirt, outdoor lifestyle, authentic moment, natural lighting, shot with Nikon Z8, 50mm f/1.8, rugged atmosphere, winter retreat'
        },
        {
            name: 'man_new_year_toast',
            prompt: 'Man raising champagne glass for New Year: Mature man in formal attire, champagne toast, fireworks reflection in background, celebration atmosphere, festive party, professional portrait, shot with Sony A7IV, 50mm f/1.2, joyful expression, elegant celebration'
        }
    ]
};

// Generate photo using API
async function generatePhoto(imageBase64, prompt, outputName) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            refPhotos: [imageBase64],
            prompt: prompt,
            language: 'en',
            width: 1080,
            height: 1350,
            quantity: 1,
            formatId: 'christmas-portrait'
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(API_URL, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (result.success && result.imageUrl) {
                        console.log(`✅ Generated: ${outputName}`);
                        resolve({ name: outputName, url: result.imageUrl });
                    } else {
                        console.error(`❌ Failed: ${outputName} - ${result.error}`);
                        reject(new Error(result.error || 'Generation failed'));
                    }
                } catch (error) {
                    console.error(`❌ Parse error for ${outputName}:`, error);
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.error(`❌ Request error for ${outputName}:`, error);
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// Main execution
async function main() {
    console.log('🎄 Starting Christmas Photo Generation...\n');

    const sourceImages = {
        couple: 'C:/Users/roberto27979/.gemini/antigravity/brain/fd45ec5a-8eb7-4394-9594-01b3007af697/uploaded_image_0_1765396472559.jpg',
        woman: 'C:/Users/roberto27979/.gemini/antigravity/brain/fd45ec5a-8eb7-4394-9594-01b3007af697/uploaded_image_1_1765396472559.jpg',
        man: 'C:/Users/roberto27979/.gemini/antigravity/brain/fd45ec5a-8eb7-4394-9594-01b3007af697/uploaded_image_2_1765396472559.jpg'
    };

    const results = [];
    let totalGenerated = 0;

    // Generate couple photos (4 remaining)
    console.log('📸 Generating Couple Photos (4)...');
    const coupleBase64 = imageToBase64(sourceImages.couple);
    for (const photo of PROMPTS.couple) {
        try {
            const result = await generatePhoto(coupleBase64, photo.prompt, photo.name);
            results.push(result);
            totalGenerated++;
            // Wait 3 seconds between requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (error) {
            console.error(`Failed to generate ${photo.name}:`, error.message);
        }
    }

    // Generate woman photos (10)
    console.log('\n📸 Generating Woman Photos (10)...');
    const womanBase64 = imageToBase64(sourceImages.woman);
    for (const photo of PROMPTS.woman) {
        try {
            const result = await generatePhoto(womanBase64, photo.prompt, photo.name);
            results.push(result);
            totalGenerated++;
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (error) {
            console.error(`Failed to generate ${photo.name}:`, error.message);
        }
    }

    // Generate man photos (10)
    console.log('\n📸 Generating Man Photos (10)...');
    const manBase64 = imageToBase64(sourceImages.man);
    for (const photo of PROMPTS.man) {
        try {
            const result = await generatePhoto(manBase64, photo.prompt, photo.name);
            results.push(result);
            totalGenerated++;
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (error) {
            console.error(`Failed to generate ${photo.name}:`, error.message);
        }
    }

    // Save results
    const resultsFile = path.join(OUTPUT_DIR, 'generation_results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

    console.log(`\n✅ Generation Complete!`);
    console.log(`📊 Total Generated: ${totalGenerated}/24`);
    console.log(`📁 Results saved to: ${resultsFile}`);
}

// Run
main().catch(console.error);
