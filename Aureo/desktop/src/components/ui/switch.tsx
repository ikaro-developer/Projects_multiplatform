import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        [
          "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full",
          "border border-transparent shadow-xs transition-all outline-none",

          // background states
          "data-[state=checked]:bg-[hsl(var(--primary))]",
          "data-[state=unchecked]:bg-[hsl(var(--input))]",
          "dark:data-[state=unchecked]:bg-[hsl(var(--input))/0.8]",

          // focus
          "focus-visible:border-[hsl(var(--ring))]",
          "focus-visible:ring-[3px]",
          "focus-visible:ring-[hsl(var(--ring))/0.5]",

          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
        ].join(" "),
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          [
            "pointer-events-none block size-4 rounded-full ring-0",
            "transition-transform",

            // thumb colors
            "bg-[hsl(var(--background))]",
            "dark:data-[state=unchecked]:bg-[hsl(var(--foreground))]",
            "dark:data-[state=checked]:bg-[hsl(var(--primary-foreground))]",

            // position
            "data-[state=checked]:translate-x-[calc(100%-2px)]",
            "data-[state=unchecked]:translate-x-0",
          ].join(" ")
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
