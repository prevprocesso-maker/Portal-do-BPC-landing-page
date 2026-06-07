/**
 * @dsCard group="Components" viewport="800x400" name="Card"
 */

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Card title (optional)
   */
  title?: React.ReactNode;

  /**
   * Card icon or badge (optional)
   */
  icon?: React.ReactNode;

  /**
   * Enable hover lift effect
   * @default true
   */
  hoverable?: boolean;

  /**
   * Card padding
   * @default "md"
   */
  padding?: "sm" | "md" | "lg";

  /**
   * className override
   */
  className?: string;
}

export const Card: React.FC<CardProps>;
