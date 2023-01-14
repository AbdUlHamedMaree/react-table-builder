import type { StateSetter } from '$types';
import type { ColumnMetaData } from '$types/column-metadata';

export type FilterItem<T = unknown> = {
  column: ColumnMetaData;
  field: string;
  value: T;
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
