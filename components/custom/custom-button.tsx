import React, { forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const baseStyles =
  "rounded-full font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-tl from-orange-600 via-orange-500 to-yellow-400 text-white hover:from-orange-700 hover:to-yellow-500 hover:shadow-orange-400/50 shadow-2xl",
  secondary:
    "bg-gray-700 text-white hover:bg-gray-800 shadow-md hover:shadow-gray-500/30",
  outline: "border-2 border-orange-500 text-orange-600 hover:bg-orange-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
