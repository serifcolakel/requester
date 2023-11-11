import { useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';

import CustomTable from '@components/custom-table';
import { Input } from '@components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

import useVariable from '@hooks/useVariable';

export default function RequestDetail() {
  const t = useParams<{ id: string; collectionId: string }>();

  window.console.log(t);
  const { variables, loading, create, columns, setSearch, search } =
    useVariable(t.id ?? '');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full p-4">
      <div className="w-full p-4 space-y-4 bg-white">
        <header className="flex flex-row items-center justify-between">
          {t.collectionId}----
          {t.id}
          <Input
            className="w-1/4 h-8"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter variables..."
            value={search}
          />
          <TooltipProvider key="new variable">
            <Tooltip>
              <TooltipTrigger>
                <Plus className="w-8 h-8" onClick={() => create()} />
              </TooltipTrigger>
              <TooltipContent>Add new variable</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>
        <CustomTable columns={columns} data={variables} />
      </div>
    </div>
  );
}
