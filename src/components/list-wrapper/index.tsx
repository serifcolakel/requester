import React from 'react';
import { Loader, MemoryStickIcon } from 'lucide-react';

import EmptyState from '@components/empty-state';

type Props = {
  isEmpty: boolean;
  children: React.ReactNode;
  loading?: boolean;
};

export default function ListWrapper({ isEmpty, children, loading }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-y-4">
        <Loader className="animate-spin" size={55} />
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        className="h-full"
        description="There is no data to display. You can create a new one."
        icon={
          <MemoryStickIcon className="inline-block w-16 h-16 text-gray-500" />
        }
        title="No data available."
      />
    );
  }

  if (!children) {
    return null;
  }

  if (Array.isArray(children)) {
    return <>{children.map((child) => child)}</>;
  }

  return children;
}
