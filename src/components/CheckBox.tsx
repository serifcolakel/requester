import React, { useId, type ComponentPropsWithRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import Label from './Label';

type CheckboxElementProps = ComponentPropsWithRef<'input'>;

const checkBoxStyles = cva('group-hover:cursor-pointer', {
  variants: {
    intent: {
      default:
        'text-gray-600 focus:ring-gray-600 focus:border-gray-600 accent-gray-500',
      success:
        'text-green-500 focus:ring-green-500 focus:border-green-500 accent-green-500',
      info: 'text-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 accent-indigo-500',
      warning:
        'text-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 accent-yellow-500',
      danger:
        'text-red-500 focus:ring-red-500 focus:border-red-500 accent-red-500',
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
      intent: 'default',
    },
  ],
  defaultVariants: {
    dimension: 'default',
    intent: 'default',
    rounded: 'none',
  },
});

type CheckBoxProps = CheckboxElementProps &
  VariantProps<typeof checkBoxStyles> & {
    label?: string;
  };

function CheckBox(
  { className, rounded, dimension, intent, ...otherProps }: CheckBoxProps,
  ref: React.Ref<HTMLInputElement>
) {
  const id = `checkbox-${useId()}`;

  return (
    <div className="flex flex-row items-center select-none gap-x-2">
      <input
        className={clsx(
          className,
          checkBoxStyles({
            rounded,
            dimension,
            intent,
          })
        )}
        id={id}
        {...otherProps}
        ref={ref}
        type="checkbox"
      />
      <Label className="cursor-pointer" htmlFor={id}>
        {otherProps.label}
      </Label>
    </div>
  );
}

export default React.forwardRef(CheckBox);
