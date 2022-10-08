import { GridColDef } from '@mui/x-data-grid';
import { RenderMethodsParameters } from '$utils/render-methods';
import { ColumnType } from '../column-type';

export type ColumnProps<T = {}> = Omit<GridColDef, 'field' | 'type' | 'valueOptions'> & {
  source: string;
  filterOperator?: string;
  type?: ColumnType;
  renderProps?: RenderMethodsParameters;
} & T;
