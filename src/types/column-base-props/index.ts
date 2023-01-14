import type { GridColDef } from '@mui/x-data-grid';

export type ColumnBaseProps<T = unknown> = Omit<GridColDef, 'type' | 'valueOptions'> & T;
