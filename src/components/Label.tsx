import { ComponentProps, PropsWithChildren } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

const labelStyles = cva('', {
  variants: {
    severity: {
      h1: 'text-4xl font-bold text-gray-800',
      h2: 'text-3xl font-bold text-gray-800',
      h3: 'text-2xl font-bold text-gray-800',
      h4: 'text-xl font-bold text-gray-800',
      h5: 'text-lg font-bold text-gray-800',
      h6: 'text-base font-bold text-gray-800',
      classic: 'text-white text-base font-normal',
      paragraph: 'text-sm font-normal text-gray-800',
      meta: 'text-xs font-normal text-gray-400',
      light: 'text-white text-xs font-normal',
      error: 'text-red-500 text-sm font-normal',
      warning: 'text-warning-500 text-sm font-normal',
      success: 'text-success-500 text-sm font-normal',
      info: 'text-primary-600 text-sm font-normal',
      tabelHeader: 'text-black text-xs font-bold',
      default: 'text-gray-800 text-sm font-normal',
    },
  },
});

type LabelElementProps = ComponentProps<'label'>;

export interface LabelProps
  extends LabelElementProps,
    VariantProps<typeof labelStyles> {}

export default function Label({
  severity = 'default',
  children,
  className,
  ...labelProps
}: PropsWithChildren<LabelProps>) {
  return (
    <label
      htmlFor={labelProps.htmlFor}
      {...labelProps}
      className={clsx(
        className,
        labelStyles({
          severity,
        })
      )}
    >
      {children}
    </label>
  );
}
