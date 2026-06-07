import React, { useState } from "react";

const inputStyles = {
  base: "w-full font-sans text-base px-4 py-3 rounded-[12px] border border-[var(--line)] bg-[var(--cream)] text-[var(--ink-900)] transition-all duration-200 box-border",
  focus: "focus:outline-none focus:border-[var(--terra-500)] focus:bg-[var(--bone)] focus:shadow-[0_0_0_3px_rgba(196,103,58,0.12)]",
  error: "border-[var(--err)] bg-[var(--err-bg)]",
  label: "block text-sm font-semibold text-[var(--ink-900)] mb-2",
  helper: "text-sm text-[var(--ink-500)] mt-2",
  errorText: "text-sm text-[var(--err)] mt-2"
};

export function Input({
  type = "text",
  label,
  placeholder,
  helper,
  error,
  value = "",
  onChange,
  required = false,
  className = ""
}) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const hasError = !!error;
  const inputClass = `${inputStyles.base} ${inputStyles.focus} ${hasError ? inputStyles.error : ""} ${className}`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={inputStyles.label}>
          {label}
          {required && <span className="text-[var(--err)]">*</span>}
        </label>
      )}
      <input
        type={type}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClass}
        required={required}
      />
      {error && <p className={inputStyles.errorText}>{error}</p>}
      {!error && helper && <p className={inputStyles.helper}>{helper}</p>}
    </div>
  );
}
