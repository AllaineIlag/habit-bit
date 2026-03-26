import { PageScaffold } from '@/components/layout/page-scaffold';

export default function TasksPage() {
  return (
    <PageScaffold title="Tasks">
      <div className="flex items-center justify-center h-[50vh] text-zinc-500 font-medium italic">
        Task management incoming via /add-feature...
      </div>
    </PageScaffold>
  );
}
