/* eslint-disable max-len */
import * as React from 'react';

import { cn } from '@lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const inputStyles = cva(
  'w-full focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 placeholder:text-sm dark:placeholder-gray-500 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-gray-700 dark:focus:border-gray-700 dark:disabled:opacity-50 dark:disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        default:
          'border focus:border-primary border-input hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-primary',
        muted:
          'border focus:border-muted border-muted hover:border-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-muted',
        secondary:
          'border focus:border-secondary border-secondary hover:border-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-secondary',
        destructive:
          'border focus:border-destructive border-destructive hover:border-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-destructive',
      },
      inputHeight: {
        default: 'h-10',
        xs: 'h-6',
        sm: 'h-8',
        lg: 'h-12',
        xl: 'h-14',
        xxl: ' h-16',
        massive: ' h-18',
      },
      rounded: {
        none: 'rounded-none',
        base: 'rounded',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        xxl: 'rounded-2xl',
        full: 'rounded-full',
      },
      spacing: {
        default: 'px-3 py-2',
        sm: 'px-2 py-1',
        lg: 'px-4 py-3',
      },
      textSize: {
        default: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      intent: 'default',
      rounded: 'base',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      rounded,
      inputHeight,
      spacing,
      textSize,
      intent,
      type,
      ...props
    },
    ref
  ) => {
    return (
      <input
        className={cn(
          className,
          inputStyles({
            className,
            rounded,
            inputHeight,
            spacing,
            textSize,
            intent,
          })
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
