# Project Law

## Project Identity
- **Name**: Habit-bit
- **Purpose**: A personal habit tracker focusing on visual continuity and gamified streaks. "A habit is a small bit of you that you do every day to become a better you."
- **Target User**: Personal use / Productivity Enthusiasts.
- **Core Value**: **"The Living Bridge"** — Dynamic visual representation of streaks in a premium Bento layout.
- **Out of Scope**: Native mobile apps (PWA only), Social sharing/leaderboards, Health-kit integrations (Phase 1).

## Standing Rules (Non-Negotiable)
1. **Build Validation**: Always verify compilation with the Next.js MCP tool before finishing any task.
2. **Atomic Scaffolding**: UI/Navigation first, logic second. Never implement multi-page features in one shot.
3. **Type-Safe Schema**: All database interactions must use generated Supabase types.
4. **Design Aesthetic**: Follow the **Premium Bento Dark Mode** reference (rounded tiles, Inter typography, subtle shadows/borders). Avoid vibrant neon unless requested. 
5. **Shadcn Standard**: Use the `shadcn` CLI/MCP to add components. Follow the `shadcn/ui` skill patterns for implementation.

## Stack
- Framework: Next.js 16 (App Router) + React 19
- Backend: Supabase (PostgreSQL + RLS)
- Styling: Tailwind CSS + Shadcn/ui (following Bento reference)
