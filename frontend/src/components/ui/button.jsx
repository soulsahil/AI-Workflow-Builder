import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-indigo-500 text-white hover:bg-indigo-600",
                outline:
                    "border border-slate-200 bg-white hover:bg-slate-100",
            },
            size: {
                default: "h-10 px-4 py-2",
                lg: "h-12 rounded-xl px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {

        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };