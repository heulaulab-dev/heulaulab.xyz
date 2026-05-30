import React from 'react'

type ButtonVariant = 'filled' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
}

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    'bg-[var(--color-white)] text-[var(--color-void)] hover:bg-[var(--color-stone)]',
  outline:
    'bg-transparent text-[var(--color-white)] border border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-void)]',
}

export function Button({
  variant = 'filled',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center gap-2 rounded-[var(--radius-pill)]',
        'font-[var(--font-dm-mono)] font-medium tracking-wide',
        'transition-all duration-200 ease-out',
        'cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}