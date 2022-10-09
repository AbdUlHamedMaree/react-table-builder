import { GridColDef } from '@mui/x-data-grid';
import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import { ColumnType } from '$types';

type FieldProps<T = {}> = Omit<
  GridColDef,
  'field' | 'sortComparator' | 'type' | 'valueOptions'
> & {
  source: string;
  type?: ColumnType;
} & T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type CustomColumnRenderParams = {};

export const CustomColumn: React.FC<FieldProps<CustomColumnRenderParams>> = memo(
  function CustomColumn(props) {
    useAddTableColumn({ type: 'custom', filterable: false, sortable: false, ...props });
    return null;
  }
);
