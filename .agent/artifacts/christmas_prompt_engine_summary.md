---
title: Christmas Prompt Engine (Nuclear Edition)
status: Complete
key_features:
  - Nuclear Prompt Templates: "200+ Elon-level prompts categorized by vibe."
  - Upload Wizard 2.0: "Scene selection first, then upload, ensuring 10x better UX."
  - Backend Integration: "Dynamic prompt construction with hyper-realism and face preservation rules."
  - Platform Safety: "Strict adherence to internal generation flows (no external AI tools)."
technical_details:
  - Prompt Source: `backend/config/christmasPrompts.ts` (Single Source of Truth)
  - Frontend Sync: `src/data/christmasPrompts.ts` (Mirrored for UI speed)
  - Endpoint: `POST /api/ai/generate-christmas`
  - Integration: "Unsplash Mock -> Ready for NanoBanana SDK"
next_steps:
  - "Obtain NanoBanana/Gemini Production Keys"
  - "Replace mock Unsplash URLs with real AI generation calls"
  - "Deploy to Production"
---

# Implementation Summary

All "Nuclear" prompts have been integrated.
The backend build pipeline has been fixed to respect the new config location.
The Upload Wizard has been rewritten to handle the new categories (Elite Couples, Dynasty Family, Nat Geo Pets, etc.).
The system enforces "Face Preservation" and "Hyper-realism" in the system prompt construction.

Ready for next instructions.
