export type ColumnType =
  | 'string'
  | 'number'
  | 'date'
  | 'boolean'
  | 'select'
  | 'image'
  | 'custom';
export type AllowedFilterTypes = Exclude<ColumnType, 'image' | 'custom'>;
export const allowedFilterTypes: AllowedFilterTypes[] = [
  'string',
  'number',
  'date',
  'select',
  'boolean',
];
