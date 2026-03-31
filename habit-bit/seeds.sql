-- Habit-bit Specific Seed Data from User Screenshots
-- Run this AFTER creating a user in Supabase Auth.

DO $$
DECLARE
    target_user_id uuid;
    am_id uuid := '8b57c0d5-76f4-48b9-8cda-cb98bf411823';
    pm_id uuid := '7f7e57f5-3d55-426c-815d-b28164ca8ae6';
    eve_id uuid := '6441e2b4-684c-4ab9-a425-eac072b6deec';
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
    END IF;

    -- Clear existing habits for identifying this user
    DELETE FROM public.habit_logs WHERE user_id = target_user_id;
    DELETE FROM public.habits WHERE user_id = target_user_id;

    -- AM ROUTINE (13 habits)
    INSERT INTO public.habits (user_id, routine_id, order_index, name, category, frequency) VALUES
    (target_user_id, am_id, 0, '3:30 Wakeup', 'Energy', '{"type": "daily"}'),
    (target_user_id, am_id, 1, 'Make bed', 'Household', '{"type": "daily"}'),
    (target_user_id, am_id, 2, 'Pull Ups', 'Energy', '{"type": "daily"}'),
    (target_user_id, am_id, 3, 'Check Weight', 'Health', '{"type": "daily"}'),
    (target_user_id, am_id, 4, 'Refill 2L Jug', 'Health', '{"type": "daily"}'),
    (target_user_id, am_id, 5, 'Cook', 'Household', '{"type": "daily"}'),
    (target_user_id, am_id, 6, 'Wash dishes', 'Household', '{"type": "daily"}'),
    (target_user_id, am_id, 7, 'Cold Shower', 'Health', '{"type": "daily"}'),
    (target_user_id, am_id, 8, 'Read Book', 'Growth', '{"type": "daily"}'),
    (target_user_id, am_id, 9, 'Walk Outside', 'Energy', '{"type": "daily"}'),
    (target_user_id, am_id, 10, 'Morning House Chores', 'Household', '{"type": "daily"}'),
    (target_user_id, am_id, 11, 'Day Plan Briefing', 'Mindset', '{"type": "daily"}'),
    (target_user_id, am_id, 12, 'Deep work (4 hours)', 'Focus', '{"type": "daily"}');

    -- PM ROUTINE (6 habits)
    INSERT INTO public.habits (user_id, routine_id, order_index, name, category, frequency) VALUES
    (target_user_id, pm_id, 0, 'Lunch', 'Health', '{"type": "daily"}'),
    (target_user_id, pm_id, 1, 'Wash dishes', 'Household', '{"type": "daily"}'),
    (target_user_id, pm_id, 2, 'Deep work (2 hours)', 'Focus', '{"type": "daily"}'),
    (target_user_id, pm_id, 3, 'Exercise', 'Energy', '{"type": "daily"}'),
    (target_user_id, pm_id, 4, 'Cook dinner', 'Household', '{"type": "daily"}'),
    (target_user_id, pm_id, 5, 'Dinner', 'Health', '{"type": "daily"}');

    -- EVE ROUTINE (6 habits)
    INSERT INTO public.habits (user_id, routine_id, order_index, name, category, frequency) VALUES
    (target_user_id, eve_id, 0, 'Deep work (2 hours)', 'Focus', '{"type": "daily"}'),
    (target_user_id, eve_id, 1, 'Wash dishes', 'Household', '{"type": "daily"}'),
    (target_user_id, eve_id, 2, 'Prepare dish for tomorrow', 'Household', '{"type": "daily"}'),
    (target_user_id, eve_id, 3, 'Planning', 'Mindset', '{"type": "daily"}'),
    (target_user_id, eve_id, 4, 'Journal', 'Mindset', '{"type": "daily"}'),
    (target_user_id, eve_id, 5, 'Read Book', 'Growth', '{"type": "daily"}');

END $$;
