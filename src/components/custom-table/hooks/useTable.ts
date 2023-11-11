import React from 'react';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { CustomTableProps } from '../types';

import useImport from './useImport';
import useSkipper from './useSkipper';

export default function useTable<T extends Record<string, unknown>>({
  columns,
  data,
  setData,
  options,
  pageSize = 5,
}: CustomTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { handleExport } = useImport(data);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const [pagination, setPagination] = React.useState({
    pageSize,
    pageIndex: 0,
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    autoResetPageIndex,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        setData?.((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }

            return row;
          })
        );
      },
      deleteData: (rowIndex) => {
        skipAutoResetPageIndex();
        setData?.((old) => old.filter((_, index) => index !== rowIndex));
      },
      duplicateData: (rowIndex) => {
        skipAutoResetPageIndex();
        setData?.((old) => [
          ...old.slice(0, rowIndex + 1),
          old[rowIndex],
          ...old.slice(rowIndex + 1),
        ]);
      },
      getData: () => data,
      getSelectedData: () => {
        const selectedRowIds = Object.entries(rowSelection)
          .filter(([, isSelected]) => isSelected)
          .map(([rowId]) => rowId);

        return (
          data.filter((row) => selectedRowIds.includes(row.id as string)) ?? []
        );
      },
    },
    ...options,
  });

  return {
    table,
    handleExport,
  };
}
