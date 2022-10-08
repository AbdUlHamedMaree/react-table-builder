import { GridColDef } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';
import { ColumnProps } from '$types/field-props';

export type ColumnModel = Pick<GridColDef, 'renderCell'> & ColumnProps;

export type TableBuilderZustandActions = {
  setColumn: Dispatch<SetStateAction<ColumnModel[]>>;
  addColumn: (col: ColumnModel) => void;
};

export type TableBuilderZustandState = {
  columns: ColumnModel[];
};
