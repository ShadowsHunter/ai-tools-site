interface AdPlaceholderProps {
  size?: "leaderboard" | "medium-rectangle" | "banner";
  label?: string;
}

const dimensions = {
  leaderboard: { width: "728px", height: "90px", minH: "min-h-[90px]" },
  "medium-rectangle": { width: "300px", height: "250px", minH: "min-h-[250px]" },
  banner: { width: "468px", height: "60px", minH: "min-h-[60px]" },
};

export function AdPlaceholder({
  size = "medium-rectangle",
  label = "Ad",
}: AdPlaceholderProps) {
  const dim = dimensions[size];
  return (
    <div
      className={`ad-placeholder ${dim.minH} w-full`}
      role="complementary"
      aria-label={label}
    >
      <span>{label} — 728×90 / 300×250</span>
    </div>
  );
}
