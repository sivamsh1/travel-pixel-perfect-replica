
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-[9999] w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 pointer-events-auto",
        className
      )}
      onOpenAutoFocus={(e) => {
        // Don't automatically focus any element when popover opens
        // This allows us to control focus manually
        e.preventDefault();
      }}
      onClick={(e) => {
        // Stop propagation to prevent other elements from capturing the click
        e.stopPropagation();
      }}
      onPointerDownOutside={(e) => {
        // Prevent the popover from closing when clicking inside the calendar
        if (e.target instanceof Element && e.target.closest('[data-radix-calendar-root]')) {
          e.preventDefault();
        }
      }}
      style={{
        zIndex: 9999, // Ensure maximum z-index to prevent other elements from appearing on top
        backgroundColor: "white" // Ensure the background is opaque
      }}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
