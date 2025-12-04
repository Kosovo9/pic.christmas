import { GoogleGenAI } from "@google/genai";
import { PromptItem, AspectRatio, SubjectCounts } from "../types";

const apiKey = process.env.API_KEY || ''; 
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateChristmasContent = async (
  promptItem: PromptItem, 
  customInstruction: string | undefined,
  imageFile: File,
  aspectRatio: AspectRatio = '1:1',
  counts?: SubjectCounts
): Promise<string> => {
  const ai = getAI();
  const isVideo = promptItem.type === 'video';

  const base64Data = await fileToBase64(imageFile);
  const mimeType = imageFile.type;

  // Build enhanced prompt
  let subjectDesc = "";
  if (counts) {
      const parts = [];
      if (counts.adults > 0) parts.push(`${counts.adults} adults`);
      if (counts.kids > 0) parts.push(`${counts.kids} children`);
      if (counts.dogs > 0) parts.push(`${counts.dogs} dogs`);
      if (counts.cats > 0) parts.push(`${counts.cats} cats`);
      if (counts.others > 0) parts.push(`${counts.others} other pets`);
      if (parts.length > 0) subjectDesc = `Subjects in scene: ${parts.join(', ')}.`;
  }

  const enhancedInstruction = `
    [AI OPTIMIZED PROMPT]
    Context: Professional Christmas Studio Portrait.
    ${subjectDesc}
    Style: ${promptItem.fullPrompt.en}
    Additional User Notes: ${customInstruction || 'None'}
    Requirements: Hyper-realistic, 8k resolution, cinematic lighting, holiday atmosphere.
  `;

  try {
    if (isVideo) {
      if (!apiKey && (window as any).aistudio?.hasSelectedApiKey) {
         const hasKey = await (window as any).aistudio.hasSelectedApiKey();
         if (!hasKey) {
            await (window as any).aistudio.openSelectKey();
         }
      }

      const validVideoRatio = aspectRatio === '1:1' ? '9:16' : aspectRatio;
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: enhancedInstruction,
        image: {
          imageBytes: base64Data,
          mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p', 
          aspectRatio: validVideoRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) throw new Error("No video generated");
      return `${videoUri}&key=${process.env.API_KEY}`;
      
    } else {
      const model = 'gemini-2.5-flash-image';
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: enhancedInstruction },
          ],
        },
        config: { imageConfig: { aspectRatio: aspectRatio } }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
           return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image generated in response");
    }
  } catch (error) {
    console.error("Generation Error:", error);
    throw error;
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const sendMessageToAI = async (message: string): Promise<string> => {
    await new Promise(r => setTimeout(r, 1500));
    return "I am the Nexora Concierge. I can help you with pricing or style advice.";
};