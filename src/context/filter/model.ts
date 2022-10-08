import { StateSetter } from '$types';
import { ColumnModel } from '../table-builder';

export type FilterItem<T = unknown> = {
  column: ColumnModel;
  field: string;
  value: T;
  operatorValue: string;
};

export type TableBuilderFiltersState = {
  filters: FilterItem[];
  panel: boolean;
};

export type TableBuilderFiltersActions = {
  setPanel: StateSetter<boolean>;
  setFilters: StateSetter<FilterItem[]>;
  addFilter: (filter: FilterItem) => void;
  deleteFilter: (field: string) => void;
  editFilter: (filter: FilterItem) => void;
};
