export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-2xl space-y-3 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-balance text-base leading-relaxed text-charcoal-900/65">
          {description}
        </p>
      ) : null}
    </div>
  );
}
