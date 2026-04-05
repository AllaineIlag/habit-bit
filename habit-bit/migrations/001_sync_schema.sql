-- Migration 001: Add icon and ensure category in habits table
-- Date: 2026-04-05

-- 1. Add icon column to habits table (text)
ALTER TABLE public.habits 
ADD COLUMN IF NOT EXISTS icon text;

-- 2. Ensure category column exists in habits table (text)
-- Note: category already exists based on seeds.sql, 
-- but we'll ensure it's there.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'habits' AND column_name = 'category') THEN
        ALTER TABLE public.habits ADD COLUMN category text;
    END IF;
END $$;

COMMENT ON COLUMN public.habits.icon IS 'Visual icon for the habit (lucide-react name)';
COMMENT ON COLUMN public.habits.category IS 'Life area categorization (e.g., Health, Work)';
