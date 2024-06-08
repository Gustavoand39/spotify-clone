"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-pointer group py-2",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-600">
      <SliderPrimitive.Range className="absolute h-full rounded-lg bg-white group-hover:bg-green-500" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="hidden h-3 w-3 rounded-full border-2 border-white bg-white ring-offset-white group-hover:block group-hover:scale-110 outline-none" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
