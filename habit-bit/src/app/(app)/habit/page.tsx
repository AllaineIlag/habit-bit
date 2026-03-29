import { PageScaffold } from '@/components/layout/page-scaffold';
import { getHabits, getRoutines } from '@/actions/habits';
import { HabitManagementView } from '@/components/habits/habit-management-view';

export default async function HabitPage() {
  const [habits, routines] = await Promise.all([
    getHabits(),
    getRoutines()
  ]);

  return (
    <PageScaffold title="Habit Management">
      <HabitManagementView initialHabits={habits} routines={routines} />
    </PageScaffold>
  );
}
