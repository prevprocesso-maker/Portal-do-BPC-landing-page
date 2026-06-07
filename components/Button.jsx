import React from "react";

const buttonStyles = {
  base: "font-sans font-semibold rounded-full border transition-all duration-200 ease-out inline-flex items-center gap-2 leading-none",
  primary: "bg-[var(--terra-500)] text-white border-transparent shadow-sm hover:bg-[var(--terra-700)] hover:shadow-md hover:-translate-y-0.5 active:scale-95",
  secondary: "bg-[var(--bone)] text-[var(--ink-900)] border-[var(--line)] hover:bg-[var(--bone-2)] hover:text-[var(--terra-300)] hover:border-[var(--terra-700)]",
  ghost: "bg-transparent text-[var(--terra-400)] border-transparent hover:bg-[var(--bone)] hover:text-[var(--terra-300)]",
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-7 py-4",
  disabled: "opacity-50 cursor-not-allowed hover:none"
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  icon,
  disabled = false,
  type = "button",
  className = "",
  href
}) {
  const variantClass = buttonStyles[variant] || buttonStyles.primary;
  const sizeClass = buttonStyles[size] || buttonStyles.md;
  const disabledClass = disabled ? buttonStyles.disabled : "";
  const classes = `${buttonStyles.base} ${variantClass} ${sizeClass} ${disabledClass} ${className}`;

  const content = (
    <>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
