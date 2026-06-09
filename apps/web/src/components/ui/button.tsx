import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva("ui-button", {
  defaultVariants: {
    size: "default",
    variant: "default",
  },
  variants: {
    size: {
      default: "ui-button-size-default",
      sm: "ui-button-size-sm",
    },
    variant: {
      default: "ui-button-variant-default",
      ghost: "ui-button-variant-ghost",
      secondary: "ui-button-variant-secondary",
    },
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ className, size, variant, ...props }: ButtonProps) => (
  <button
    className={cn(buttonVariants({ size, variant }), className)}
    {...props}
  />
);
