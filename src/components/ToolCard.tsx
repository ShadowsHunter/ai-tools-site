import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category?: string;
}

export function ToolCard({
  name,
  description,
  href,
  icon: Icon,
  category,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:shadow-lg hover:border-[var(--primary)] transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          {category && (
            <span className="text-xs font-medium text-[var(--primary)] uppercase tracking-wide">
              {category}
            </span>
          )}
          <h3 className="mt-1 font-semibold text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
