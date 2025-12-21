import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full border px-2 py-0.5",
    "text-xs font-medium w-fit whitespace-nowrap shrink-0",
    "gap-1 overflow-hidden",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    "transition-[color,box-shadow]",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-[hsl(var(--ring))/0.5]",
    "focus-visible:border-[hsl(var(--ring))]",
    "aria-invalid:border-[hsl(var(--destructive))]",
    "aria-invalid:ring-[hsl(var(--destructive))/0.2]",
    "dark:aria-invalid:ring-[hsl(var(--destructive))/0.4]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-transparent",
          "bg-[hsl(var(--primary))]",
          "text-[hsl(var(--primary-foreground))]",
          "[a&]:hover:bg-[hsl(var(--primary))/0.9]",
        ].join(" "),

        secondary: [
          "border-transparent",
          "bg-[hsl(var(--secondary))]",
          "text-[hsl(var(--secondary-foreground))]",
          "[a&]:hover:bg-[hsl(var(--secondary))/0.9]",
        ].join(" "),

        destructive: [
          "border-transparent",
          "bg-[hsl(var(--destructive))]",
          "text-[hsl(var(--destructive-foreground))]",
          "[a&]:hover:bg-[hsl(var(--destructive))/0.9]",
          "focus-visible:ring-[hsl(var(--destructive))/0.2]",
          "dark:focus-visible:ring-[hsl(var(--destructive))/0.4]",
          "dark:bg-[hsl(var(--destructive))/0.6]",
        ].join(" "),

        outline: [
          "border-[hsl(var(--border))]",
          "text-[hsl(var(--foreground))]",
          "[a&]:hover:bg-[hsl(var(--accent))]",
          "[a&]:hover:text-[hsl(var(--accent-foreground))]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
