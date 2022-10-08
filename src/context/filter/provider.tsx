import { useCallback, useMemo } from 'react';
import { createZustandContext, stateSetterHandler } from '$utils';
import { TableBuilderFiltersActions, TableBuilderFiltersState } from './model';

const [Provider, useTableBuilderFilters] = createZustandContext<
  TableBuilderFiltersState,
  TableBuilderFiltersActions
>();

export { useTableBuilderFilters };

export const TableBuilderFiltersProvider: React.FC<
  React.PropsWithChildren<{ name: string }>
> = ({ name, children }) => (
  <Provider
    actions={useCallback(
      (set, get) => ({
        setFilters: stateSetterHandler(set, 'filters'),
        setPanel: stateSetterHandler(set, 'panel'),
        addFilter: filter => {
          if (get().filters.findIndex(f => f.field === filter.field) !== -1) return;
          get().setFilters(v => [...v, filter]);
        },
        deleteFilter: field => {
          get().setFilters(v => v.filter(el => el.field !== field));
        },
        editFilter: filter => {
          get().setFilters(e => e.map(el => (el.field === filter.field ? filter : el)));
        },
      }),
      []
    )}
    initialState={useMemo(() => ({ filters: [], panel: false }), [])}
    name={useMemo(() => `table-builder-filter - ${name}`, [name])}
    persist
  >
    {children}
  </Provider>
);
