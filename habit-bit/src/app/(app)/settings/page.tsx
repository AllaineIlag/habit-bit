import { PageScaffold } from "@/components/layout/page-scaffold"

export default function SettingsPage() {
  return (
    <PageScaffold title="Settings">
      <div className="max-w-2xl space-y-8">
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Appearance</h2>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground">Dark mode is currently forced for that premium Bento aesthetic.</p>
          </div>
        </section>
      </div>
    </PageScaffold>
  )
}
