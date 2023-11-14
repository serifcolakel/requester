import clsx from 'clsx';

import { TMethod } from '@common/types';

type Props = {
  method: TMethod;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function MethodLabel({ method, className, ...props }: Props) {
  return (
    <span
      className={clsx(
        'text-xs font-semibold',
        method === 'GET' && 'text-green-800',
        method === 'POST' && 'text-orange-800',
        method === 'PUT' && 'text-blue-800',
        method === 'DELETE' && 'text-red-800',
        className
      )}
      {...props}
    >
      {method}
    </span>
  );
}
