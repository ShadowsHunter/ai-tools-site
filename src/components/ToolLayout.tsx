import { AdPlaceholder } from "./AdPlaceholder";
import { SidebarTools } from "./SidebarTools";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-[var(--muted-foreground)] max-w-2xl">
          {description}
        </p>
      </div>

      <div className="tool-container">
        {/* Main tool area */}
        <div className="tool-main">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            {children}
          </div>

          {/* Below-tool ad */}
          <div className="mt-6">
            <AdPlaceholder size="leaderboard" label="Advertisement" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="tool-sidebar space-y-6">
          <AdPlaceholder size="medium-rectangle" label="Advertisement" />
          <SidebarTools />
        </aside>
      </div>
    </div>
  );
}
