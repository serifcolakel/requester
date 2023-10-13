import { ComponentProps, PropsWithChildren } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

type ButtonElementProps = ComponentProps<'button'>;

export interface ButtonProps
  extends ButtonElementProps,
    VariantProps<typeof buttonStyles> {
  label?: string;
}

const buttonStyles = cva(
  'flex text-xs group flex-row gap-x-2 items-center justify-center disabled:!bg-gray-800',
  {
    variants: {
      buttonType: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-violet-700 text-white hover:bg-violet-500',
        table: 'bg-primary-50 text-primary-500 hover:bg-primary-100',
        error: 'bg-red-600 text-white hover:bg-red-700',
        warning: 'bg-warning-500 text-white hover:bg-warning-600',
        success: 'bg-success-500 text-white hover:bg-success-600',
        info: 'bg-blue-500 text-white hover:bg-blue-600',
        default: 'bg-gray-400 text-white hover:bg-gray-500',
        paginationActive: 'bg-primary-500 text-white hover:bg-primary-600',
        paginationInactive: 'bg-gray-200 text-black hover:bg-gray-300',
        dark: 'bg-gray-800 text-white hover:bg-gray-700',
      },
      size: {
        default: 'h-[38px]',
        sm: 'h-8 !w-8',
        lg: 'h-12',
        xl: 'h-14',
        xxl: 'h-16',
      },
      padding: {
        default: 'px-5 py-2',
        sm: 'px-3 py-2',
        lg: 'px-5 py-3',
        xl: 'px-5 py-4',
        xxl: 'px-5 py-5',
      },
      rounded: {
        default: 'rounded-lg',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        xxl: 'rounded-2xl',
        none: 'rounded-none',
        full: 'rounded-full',
      },
      isFullWidth: {
        true: '!w-full',
        false: 'w-auto',
      },
    },
    compoundVariants: [{ buttonType: 'primary', size: 'default' }],
    defaultVariants: {
      buttonType: 'primary',
      size: 'default',
      rounded: 'default',
      padding: 'default',
      isFullWidth: false,
    },
  }
);

function Button({
  label,
  buttonType,
  rounded,
  padding,
  size,
  isFullWidth,
  className,
  children,
  ...buttonProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={clsx(
        className,
        buttonStyles({
          buttonType,
          rounded,
          padding,
          size,
          isFullWidth,
        })
      )}
      type="button"
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
