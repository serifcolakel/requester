import { useParams } from 'react-router-dom';
import { PlusSquare } from 'lucide-react';

import CustomTable from '@components/custom-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

import useVariable from '@hooks/useVariable';

export default function EnvironmentDetail() {
  const t = useParams<{ id: string }>();

  const { variables, loading, setVariables, create, columns } = useVariable(
    t.id ?? ''
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full p-4 bg-gray-200">
      <div className="w-full p-4 space-y-4 bg-white">
        <header className="flex flex-row items-center justify-end">
          <TooltipProvider key="new variable">
            <Tooltip>
              <TooltipTrigger>
                <PlusSquare className="w-8 h-8" onClick={() => create()} />
              </TooltipTrigger>
              <TooltipContent>Add new variable</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>
        <CustomTable
          columns={columns}
          data={variables}
          setData={setVariables}
        />
      </div>
    </div>
  );
}
