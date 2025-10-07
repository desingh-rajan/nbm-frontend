import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const base = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring disabled:opacity-60 disabled:cursor-not-allowed rounded-full';

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm md:text-base',
  lg: 'h-14 px-8 text-base md:text-lg',
};

const variantMap: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-brand text-white hover:shadow-glow-green shadow-card transition-all duration-300',
  secondary: 'bg-gradient-accent text-white hover:brightness-95 shadow-card transition-all duration-300',
  outline: 'border-2 border-[var(--color-brand)] text-[var(--color-text)] hover:bg-gradient-soft transition-all duration-300',
  ghost: 'text-[var(--color-text-muted)] hover:text-[var(--color-brand)] hover:bg-gradient-soft transition-all duration-300',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) => {
  return (
    <button className={clsx(base, sizeMap[size], variantMap[variant], className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
