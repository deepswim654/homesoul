import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-primary to-primary-light text-white',
          'hover:shadow-lg hover:shadow-primary/30',
          'focus:ring-primary',
          'after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary-light after:to-primary after:opacity-0 after:transition-opacity hover:after:opacity-100',
          'transform hover:-translate-y-0.5',
        ],
        secondary: [
          'bg-gray-100 text-gray-900 border border-gray-200',
          'hover:bg-gray-200 hover:border-gray-300',
          'focus:ring-gray-400',
          'transform hover:-translate-y-0.5',
        ],
      },
      size: {
        sm: 'text-sm px-4 py-2 rounded-lg',
        default: 'text-base px-6 py-3 rounded-xl',
        lg: 'text-lg px-8 py-4 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}; 