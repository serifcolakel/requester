import { useMemo } from 'react';
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
  AiTwotoneDelete,
} from 'react-icons/ai';
import { SlidersHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Label } from '@components/ui/label';

import { UseVariable } from '@hooks/useVariable';

import { Variable } from '@services/variable/types';

import Update from '../forms/Update';

type Props = Pick<UseVariable, 'update' | 'remove'>;

export default function useTableColums({ remove, update }: Props) {
  const columns: ColumnDef<Variable>[] = useMemo(
    () => [
      // {
      //   id: 'select',
      //   header: ({ table }) => (
      //     <Checkbox
      //       aria-label="Select all"
      //       checked={table.getIsAllPageRowsSelected()}
      //       onCheckedChange={(value) =>
      //         table.toggleAllPageRowsSelected(!!value)
      //       }
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       aria-label="Select row"
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => row.toggleSelected(!!value)}
      //     />
      //   ),
      //   enableSorting: false,
      //   enableHiding: false,
      // },
      {
        accessorKey: 'name',
        enableSorting: true,
        enableHiding: false,
        header: ({ column }) => {
          const isAsc = column.getIsSorted() === 'asc';

          return (
            <Label
              className="flex flex-row cursor-pointer"
              onClick={() => column.toggleSorting(isAsc)}
            >
              Name
              {isAsc ? (
                <AiOutlineSortDescending className="w-4 h-4 ml-2" />
              ) : (
                <AiOutlineSortAscending className="w-4 h-4 ml-2 transform rotate-180" />
              )}
            </Label>
          );
        },
        cell: ({ row }) => {
          return <Label>{row.getValue('name')}</Label>;
        },
      },
      {
        accessorKey: 'value',
        enableSorting: true,
        enableHiding: false,
        header: ({ column }) => {
          const isAsc = column.getIsSorted() === 'asc';

          return (
            <Label
              className="flex flex-row cursor-pointer"
              onClick={() => column.toggleSorting(isAsc)}
            >
              Value
              {isAsc ? (
                <AiOutlineSortDescending className="w-4 h-4 ml-2" />
              ) : (
                <AiOutlineSortAscending className="w-4 h-4 ml-2 transform rotate-180" />
              )}
            </Label>
          );
        },
        cell: ({ row }) => {
          return <Label>{row.getValue('value') || '-'}</Label>;
        },
      },
      {
        id: 'actions',
        header: () => 'Actions',
        cell: ({ row }) => {
          const variable = row.original;

          return (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <Button className="flex p-0 mx-auto" variant="ghost">
                      <span className="sr-only">Open menu</span>
                      <SlidersHorizontal className="w-5 h-5" />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="group"
                    onClick={() => remove(variable.id)}
                  >
                    <AiTwotoneDelete className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-600" />
                    Delete variable
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Update update={update} variable={variable} />
            </div>
          );
        },
      },
    ],
    [remove, update]
  );

  return {
    columns,
  };
}
