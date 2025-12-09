# 🛡️ SECURITY IMPLEMENTATION PLAN: DEAD MAN'S SWITCH & RATE LIMITING

## Objective
Implement a robust, automated 3-layer security system to protect the `pic.christmas` project from excessive costs during the viral "Free for 12 Hours" launch.

## Components to Create

1.  **`src/lib/rateLimiter.ts`**: Core logic for tracking usage, checking limits, and enforcing the 12-hour kill switch.
2.  **`src/components/SystemStatus.tsx`**: A visual "heads-up display" (HUD) component to show real-time status (Time Remaining, Spend vs. Cap).
3.  **`src/app/api/generate/route.ts` (Update)**: Integrate the validation logic into the main generation endpoint.
4.  **Database Migration**: SQL commands to create necessary Supabase tables.

## 1. `src/lib/rateLimiter.ts`
- **Responsibilities**:
    - Connect to Supabase.
    - Define `RATE_LIMIT_CONFIG` (Max 10 req/hr, $50 max spend, 12h limit).
    - `checkRateLimit(userId)`: Validate per-user frequency.
    - `checkSpendLimit()`: Validate global spend against the $50 cap (estimated).
    - `isKillSwitchActive()`: Check if we are within the 12-hour window.
    - `logGenerationRequest()`: Record successful generations for auditing.

## 2. `src/components/SystemStatus.tsx`
- **Responsibilities**:
    - Client-side component.
    - Fetches system status from API every 30s.
    - safe visual indication (Green/Orange/Red) of system state.
    - shows countdown and spend progress bar.

## 3. API Integration (`src/app/api/generate/route.ts`)
- **Action**: Modify the existing route.
- **Workflow**:
    - Receive Request -> `validateGenerationRequest()`
    - If Invalid -> Return 429/403.
    - If Valid -> Generate Image (Replicate).
    - Perform Generation.
    - `logGenerationRequest()` -> Save metadata to Supabase.

## 4. SQL Setup (Supabase)
- **Tables**: `generation_requests`, `system_config`.
- **Action**: User needs to run provided SQL in Supabase Dashboard.

## Execution Order
1.  Create `src/lib/rateLimiter.ts`.
2.  Create `src/components/SystemStatus.tsx`.
3.  Modify `src/app/api/generate/route.ts` to use new logic.
4.  Add `SystemStatus` to `src/app/generate/page.tsx`.
5.  Provide SQL to user (via Markdown artifact) to run in Supabase.
