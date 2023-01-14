import { useCallback, useMemo } from 'react';
import { createZustandContext, stateSetterHandler } from '$utils';
import { TableBuilderZustandActions, TableBuilderZustandState } from './model';

const [Provider, useTableBuilderColumns] = createZustandContext<
  TableBuilderZustandState,
  TableBuilderZustandActions
>();

export { useTableBuilderColumns };
export const TableBuilderColumnsProvider: React.FC<
  React.PropsWithChildren<{ name: string }>
> = ({ name, children }) => (
  <Provider
    name={`table-builder-columns - ${name}`}
    initialState={useMemo(() => ({ columns: [] }), [])}
    actions={useCallback(
      (set, get) => ({
        setColumn: stateSetterHandler(set, 'columns'),
        addColumn: column => {
          const i = get().columns.findIndex(c => c.source === column.source);
          if (i !== -1) {
            get().setColumn(v => {
              v[i] = column;
              return v;
            });
          } else {
            get().setColumn(v => [...v, column]);
          }
        },
      }),
      []
    )}
  >
    {children}
  </Provider>
);
