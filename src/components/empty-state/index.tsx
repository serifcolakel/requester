import React from 'react';
import clsx from 'clsx';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export default function EmptyState({
  description,
  icon,
  title,
  className,
}: Props) {
  return (
    <div className={clsx('flex w-full px-1 py-8', className)}>
      <div className="flex flex-col items-center justify-center w-full h-full p-2 bg-gray-100 rounded-lg gap-y-4">
        {icon}
        <span className="text-3xl font-medium text-gray-500">{title}</span>
        <span className="w-8/12 text-sm text-center text-gray-400">
          {description}
        </span>
      </div>
    </div>
  );
}
