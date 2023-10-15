/* eslint-disable max-len */
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const checkBoxStyles = cva('group-hover:cursor-pointer', {
  variants: {
    intent: {
      default:
        'text-primary-600 focus:ring-primary-600 focus:border-primary-600 accent-primary-500 border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      muted:
        'text-muted-500 focus:ring-muted-500 focus:border-muted-500 accent-muted-500 border border-muted data-[state=checked]:bg-muted data-[state=checked]:text-muted-foreground',
      secondary:
        'text-secondary-500 focus:ring-secondary-500 focus:border-secondary-500 accent-secondary-500 border border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground',
      warning:
        'text-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 accent-yellow-500 border border-yellow data-[state=checked]:bg-yellow data-[state=checked]:text-yellow-foreground',
      destructive:
        'text-destructive-500 focus:ring-destructive-500 focus:border-destructive-500 accent-destructive-500 border border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground',
    },
    dimension: {
      default: 'w-4 h-4',
      sm: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      xxl: 'w-10 h-10',
      massive: 'w-12 h-12',
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
  },
  compoundVariants: [
    {
      dimension: 'default',
    },
  ],
  defaultVariants: {
    dimension: 'default',
    intent: 'default',
    rounded: 'base',
  },
});

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkBoxStyles>
>(({ className, rounded, dimension, intent, ...props }, ref) => (
  <CheckboxPrimitive.Root
    className={cn(
      'peer shrink-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
      checkBoxStyles({ rounded, dimension, intent })
    )}
    ref={ref}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className={cn(checkBoxStyles({ rounded, dimension, intent }))} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
