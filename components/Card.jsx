import React from "react";

const cardStyles = {
  base: "bg-[var(--bone)] border border-[var(--line)] rounded-[20px] transition-all duration-250 ease-out",
  hoverable: "hover:shadow-md hover:border-[var(--terra-700)] hover:-translate-y-1",
  sm: "p-5",
  md: "p-6",
  lg: "p-9"
};

export function Card({
  children,
  title,
  icon,
  hoverable = true,
  padding = "md",
  className = ""
}) {
  const hoverClass = hoverable ? cardStyles.hoverable : "";
  const paddingClass = cardStyles[padding] || cardStyles.md;
  const classes = `${cardStyles.base} ${hoverClass} ${paddingClass} ${className}`;

  return (
    <div className={classes}>
      {icon && <div className="mb-4 text-2xl">{icon}</div>}
      {title && (
        <h3 className="font-serif text-xl font-semibold text-[var(--ink-900)] mb-3 leading-tight">
          {title}
        </h3>
      )}
      <div className="text-[var(--ink-500)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
