export const knowledgeBase = {
    categories: [
        {
            name: "General & Service",
            questions: [
                { q: "What is Pic.Christmas?", a: "Pic.Christmas is a premium AI studio that transforms your selfies into hyper-realistic, 8K cinematic holiday portraits using our proprietary Quantum Engine." },
                { q: "How does it work?", a: "Simply upload a clear selfie, select a style from our catalog, and our AI will generate a masterpiece that locks your identity with 99.9% accuracy." },
                { q: "Is it free?", a: "We offer a free preview mode. To download the high-resolution 8K version without watermarks, there is a one-time premium fee." },
                { q: "How long does it take?", a: "Generations are nearly instant, taking only a few seconds thanks to our high-performance GPU cluster." },
                { q: "Can I use the photos commercially?", a: "Yes, once you purchase the premium version, you receive full commercial rights to your generated images." }
            ]
        },
        {
            name: "Payments & Pricing",
            questions: [
                { q: "What payment methods do you accept?", a: "We accept PayPal and Mercado Pago (supporting MXN and international cards). Stripe is currently disabled." },
                { q: "How much does it cost?", a: "The premium 8K unlock is currently $9.90 USD or approximately 199 MXN via Mercado Pago." },
                { q: "Is my payment secure?", a: "Absolutely. We use industry-standard encryption and process all payments through trusted gateways like PayPal and Mercado Pago." },
                { q: "Can I get a refund?", a: "Due to the digital nature of AI generation, we typically don't offer refunds, but if you're unhappy, our 'human elves' will review your case!" },
                { q: "Do you have a subscription?", a: "No, we believe in 'Pay-as-you-glow'. You only pay for the masterpieces you want to unlock." }
            ]
        },
        {
            name: "Technical & Quality",
            questions: [
                { q: "What is 8K resolution?", a: "Our 8K output provides extreme detail, perfect for large prints, digital billboards, or high-end social media profiles." },
                { q: "What is 'Identity Locking'?", a: "It's our advanced technology that ensures the AI-generated person looks exactly like you, preserving your unique facial features." },
                { q: "What kind of photo should I upload?", a: "A clear, well-lit selfie with no filters or sunglasses works best for the most realistic results." },
                { q: "Can I generate photos of my pets?", a: "Yes! We have a dedicated 'Pets' category in our style catalog." },
                { q: "What happens to my uploaded photo?", a: "Your privacy is our priority. Uploaded photos are used only for generation and are automatically deleted after 24 hours." }
            ]
        },
        {
            name: "Customization & Styles",
            questions: [
                { q: "Can I change the background?", a: "Our styles are pre-designed for maximum cinematic impact, but you can choose from over 200 unique locations in our catalog." },
                { q: "Do you support group photos?", a: "Currently, our Quantum Engine is optimized for single-person portraits to ensure 100% identity locking." },
                { q: "Can I get a physical print?", a: "We provide the 8K digital file, which is perfect for any professional printing service worldwide." },
                { q: "What are 'Viral Styles'?", a: "These are our most popular themes on TikTok and Instagram, designed to get maximum engagement." },
                { q: "Is there a limit to generations?", a: "In preview mode, there's a small cooldown. Premium users get priority access and unlimited attempts." }
            ]
        },
        {
            name: "Affiliates & Community",
            questions: [
                { q: "How do I join the affiliate program?", a: "Click on 'Affiliates' in the menu! You can earn 20% commission on every premium sale you refer." },
                { q: "When do I get paid as an affiliate?", a: "Payments are processed every 15 days via PayPal or Direct Bank Transfer once you reach the $50 threshold." },
                { q: "Where does the charity money go?", a: "We donate 3% of all revenue to local animal shelters to provide food and medical care for abandoned pets." },
                { q: "Do you have a community group?", a: "Yes! Join our Telegram group for viral templates and daily AI tips." },
                { q: "Can I be a brand ambassador?", a: "We love influencers! Reach out via the chat and I'll flag it for our marketing elves." }
            ]
        }
    ],
    getSystemPrompt: (language: string) => {
        return `You are Holly AI, the premium concierge for Pic.Christmas. 
        You have access to a deep knowledge base about our 8K AI generation service.
        Current Language: ${language}.
        
        CORE RULES:
        1. Be elegant, professional, and festive.
        2. If asked about payments, mention PayPal and Mercado Pago only.
        3. Emphasize our "Quantum Engine" and "Identity Locking" technology.
        4. Always encourage the user to try the 8K premium version.
        5. Learn from the conversation: if the user mentions a preference, remember it.
        
        KNOWLEDGE HIGHLIGHTS:
        - Price: $9.90 USD / 199 MXN.
        - Quality: 8K Ultra HD.
        - Privacy: 100% Secure, 24h deletion.
        - Charity: 3% of revenue goes to animal shelters.`;
    }
};
