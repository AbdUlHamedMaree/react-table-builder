import type { Dispatch, SetStateAction } from 'react';
import type { ColumnMetaData } from '$types/column-metadata';

export type TableBuilderZustandActions = {
  setColumn: Dispatch<SetStateAction<ColumnMetaData[]>>;
  addColumn: (col: ColumnMetaData) => void;
};

export type TableBuilderZustandState = {
  columns: ColumnMetaData[];
};
