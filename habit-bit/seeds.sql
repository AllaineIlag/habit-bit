-- Habit-bit Sample Seed Data
-- Run this AFTER creating a user in Supabase Auth.

DO $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Get the first available user
    SELECT id INTO target_user_id FROM auth.users LIMIT 1;
    
    IF target_user_id IS NULL THEN
        -- Create a dev user to associate the seed with
        target_user_id := '00000000-0000-0000-0000-000000000000';
        INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, role, aud, encrypted_password)
        VALUES (
            target_user_id, 
            'dev@habitbit.com', 
            now(), 
            now(), 
            now(), 
            '{"provider":"email","providers":["email"]}', 
            '{}', 
            'authenticated',
            'authenticated',
            '$2a$10$abcdefghijklmnopqrstuvwxyz123' -- Placeholder
        );
        RAISE NOTICE 'No user found. Created a dev user (dev@habitbit.com) with ID %', target_user_id;
    END IF;

    -- Clear existing (optional, for clean seed)
    DELETE FROM public.habit_logs WHERE user_id = target_user_id;
    DELETE FROM public.habits WHERE user_id = target_user_id;

        -- Morning Rituals
        INSERT INTO public.habits (user_id, name, description, category, icon_name, color_hex)
        VALUES 
        (target_user_id, 'Morning Ritual', 'Make Bed + Cook for Breakfast + Wash the Dishes', 'Household', 'Home', '#10b981'),
        (target_user_id, 'Morning Briefing', 'Checking the plans last night and what to do today', 'Mindset', 'ClipboardList', '#6366f1'),
        (target_user_id, 'Morning Exercise', 'Active movement session', 'Energy', 'Dumbbell', '#ef4444'),
        (target_user_id, 'Deep Work (AM)', 'Uninterrupted cognitive focus block', 'Focus', 'Cpu', '#f59e0b'),
        (target_user_id, 'Lunch', 'Nutritional recharge', 'Health', 'Utensils', '#10b981'),
        (target_user_id, 'Afternoon Reset', 'Mid-day House Chores', 'Household', 'Wind', '#6366f1'),
        (target_user_id, 'Deep Work (PM)', 'Second focus block', 'Focus', 'Cpu', '#f59e0b'),
        (target_user_id, 'Evening Recovery', 'Exercise + Bath', 'Health', 'Bath', '#8b5cf6'),
        (target_user_id, 'Dinner Prep', 'Cook for Dinner', 'Household', 'Flame', '#ef4444'),
        (target_user_id, 'Reflection & Planning', 'Plan tomorrow + Journal current day', 'Mindset', 'BookOpen', '#6366f1'),
        (target_user_id, 'Night Reading', 'Wind down with a book', 'Growth', 'Library', '#8b5cf6');

        RAISE NOTICE 'Seed habits created for user %', target_user_id;
    END IF;
END $$;
