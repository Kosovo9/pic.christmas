# Implementation Plan: Christmas Prompt Engine (Pictures for Christmas)

## Objective
Implement a robust "Scene Engine" (prompt template system) to standardize and elevate the quality of AI-generated Christmas photos. This involves a new backend module for structured prompts, an updated AI generation endpoint, and a new "Scene Selection" step in the frontend Upload Wizard.

## Components

### 1. Backend: Prompt Templates Module
**File:** `c:\pic.christmas\backend\data\christmasPrompts.ts`
- **Purpose:** Define types (`ChristmasPrompt`, `ChristmasPromptCategory`) and store the master list of 100+ optimized prompts.
- **Structure:**
    ```typescript
    export type ChristmasPromptCategory = 'studio_magic' | 'global_locations' | 'home_hearth' | 'diverse_families' | 'pet_fun';
    export interface ChristmasPrompt {
        id: string;
        category: ChristmasPromptCategory;
        title: string;
        uiLabel: string;
        basePrompt: string;
        needsFamilyCount: boolean;
        supportsPets: boolean;
    }
    export const CHRISTMAS_PROMPTS = [ ... ];
    ```

### 2. Backend: AI Endpoint Update
**File:** `c:\pic.christmas\backend\routes\ai.routes.ts`
- **Change:** Add `POST /generate-christmas` (or update existing) to accept `promptId`.
- **Logic:**
    - Look up `promptId` in `CHRISTMAS_PROMPTS`.
    - Compose the final system prompt for the AI model (NanoBanana/Gemini) using the template's `basePrompt` + user config (adults, children, pets).
    - **Crucial:** Inject "Hyper-realism" and "Face Preservation" instructions.

### 3. Frontend: Prompt Data Mirror
**File:** `c:\pic.christmas\src\data\christmasPrompts.ts`
- **Purpose:** Provide the UI with the list of available scenes. (Mirrors backend data for latency/simplicity).

### 4. Frontend: Upload Wizard Enhancement
**File:** `c:\pic.christmas\src\components\UploadWizard.tsx`
- **Change:** Add a new **Step 1: Scene Selection**.
- **UI:** A visual grid of cards filtered by Category.
- **Flow:**
    1. Select Category (Studio, Location, etc.)
    2. Select Scene (Card Grid)
    3. Upload Photos (Existing Step 1 -> Step 2)
    4. Configure Details (Existing Step 2 -> Step 3)
    5. Submit (Sends `promptId` to API).

## Execution Steps
1.  Create `backend/data/christmasPrompts.ts` with the "The 10x Vision" content.
2.  Duplicate/Sync to `src/data/christmasPrompts.ts` for Frontend use.
3.  Update `backend/routes/ai.routes.ts` to implement the generation logic.
4.  Refactor `src/components/UploadWizard.tsx` to include the Scene Selection UI.
5.  Verify build and types.

## Future Scalability (Nexora)
The `ChristmasPrompt` interface is designed to be a subset of a future `SceneTemplate` which will support `mediaType: 'video'` for the Nexora Pro expansion.
