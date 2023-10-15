import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      severity: {
        h1: 'text-4xl font-bold text-gray-800',
        h2: 'text-3xl font-bold text-gray-800',
        h3: 'text-2xl font-bold text-gray-800',
        h4: 'text-xl font-bold text-gray-800',
        h5: 'text-lg font-bold text-gray-800',
        h6: 'text-base font-bold text-gray-800',
        destructive: 'text-destructive-500 text-sm font-normal',
        secondary: 'text-secondary-500 text-sm font-normal',
        outline: 'text-gray-800 text-sm font-normal',
        default: 'text-gray-800 text-sm font-normal',
      },
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
