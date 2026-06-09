import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva("ui-badge", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "ui-badge-variant-default",
      outline: "ui-badge-variant-outline",
      success: "ui-badge-variant-success",
    },
  },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
