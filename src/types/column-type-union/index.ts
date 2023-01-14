import type { GridNativeColTypes } from '@mui/x-data-grid';

export type ColumnTypeUnion = GridNativeColTypes | 'image' | 'custom';

export type FilterAllowedColumnTypeUnion = Exclude<
  ColumnTypeUnion,
  'image' | 'custom' | 'actions'
>;

export const allowedFilterTypes: FilterAllowedColumnTypeUnion[] = [
  'string',
  'number',
  'boolean',
  'date',
  'dateTime',
  'singleSelect',
];
