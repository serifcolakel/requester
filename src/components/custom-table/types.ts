import { ColumnDef, RowData, TableOptions } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    deleteData: (rowIndex: number) => void;
    duplicateData: (rowIndex: number) => void;
    getData?: () => TData[];
    isEditable?: boolean;
    getSelectedData?: () => TData[];
  }
}

export type CustomTableProps<T extends Record<string, unknown>> = {
  columns: ColumnDef<T>[];
  data: T[];
  setData?: React.Dispatch<React.SetStateAction<T[]>>;
  options?: TableOptions<T>;
  pageSize?: number;
};
