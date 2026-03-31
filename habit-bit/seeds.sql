-- Habit-bit Specific Seed Data for Allaine Benedict Ilag
-- Associating 25 habits across AM, PM, and EVE routines.

DO $$
DECLARE
    target_user_id uuid := '5b395d16-a137-4d15-9915-390ae69480f4';
    am_id uuid := '8b57c0d5-76f4-48b9-8cda-cb98bf411823';
    pm_id uuid := '7f7e57f5-3d55-426c-815d-b28164ca8ae6';
    eve_id uuid := '6441e2b4-684c-4ab9-a425-eac072b6deec';
BEGIN
    -- Ensure user exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = target_user_id) THEN
        RAISE EXCEPTION 'User Allaine Benedict Ilag (%) not found.', target_user_id;
    END IF;

    -- Clear existing habits for this user for a clean seed
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

    -- RULES CHECKLIST (13 rules)
    -- Standardized Sentence Case, no duplicates
    INSERT INTO public.rules (user_id, order_index, title) VALUES
    (target_user_id, 0, 'No breakfast until 10 AM'),
    (target_user_id, 1, 'No snooze'),
    (target_user_id, 2, 'No sugar'),
    (target_user_id, 3, 'No coffee'),
    (target_user_id, 4, 'No game day'),
    (target_user_id, 5, 'No watching entertainment'),
    (target_user_id, 6, 'No scrolling'),
    (target_user_id, 7, 'No fapping'),
    (target_user_id, 8, 'No phone on CR'),
    (target_user_id, 9, 'No caffeine 10 hours'),
    (target_user_id, 10, 'No food 3 hours'),
    (target_user_id, 11, 'No stimulating activity 2 hours'),
    (target_user_id, 12, 'No screens 1 hour');

END $$;
