/**
 * @dsCard group="Components" viewport="800x200" name="Button"
 * @startingPoint section="Components" subtitle="Reusable button in 3 variants" viewport="800x200"
 */

export interface ButtonProps {
  /**
   * Button variant
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "ghost";

  /**
   * Button size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Optional leading icon
   */
  icon?: React.ReactNode;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * HTML type
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * className override
   */
  className?: string;

  /**
   * href for link button
   */
  href?: string;
}

export const Button: React.FC<ButtonProps>;
