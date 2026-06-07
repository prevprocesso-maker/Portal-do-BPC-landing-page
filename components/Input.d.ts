/**
 * @dsCard group="Components" viewport="800x300" name="Input"
 */

export interface InputProps {
  /**
   * Input type
   * @default "text"
   */
  type?: "text" | "email" | "tel" | "number" | "password";

  /**
   * Input label
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Helper text below input
   */
  helper?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;

  /**
   * Input value (for controlled)
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (value: string) => void;

  /**
   * Required state
   */
  required?: boolean;

  /**
   * className override
   */
  className?: string;
}

export const Input: React.FC<InputProps>;
