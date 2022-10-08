import { useTableBuilderColumns, useTableBuilderFilters } from '$context';
import { useGridApiContext } from '@mui/x-data-grid';
import { useEffect } from 'react';

export const CustomGridFilterPanel: React.FC = () => {
  const apiRef = useGridApiContext();
  const [filters, addFilter, deleteFilter] = useTableBuilderFilters(s => [
    s.filters,
    s.addFilter,
    s.deleteFilter,
  ]);

  const columns = useTableBuilderColumns(s => s.columns);

  useEffect(() => {
    const source = apiRef.current.state.tabIndex.columnHeader?.field;
    if (!source) return;

    const active = filters.findIndex(e => e.field === source) !== -1;
    const columnDef = columns.find(c => c.source === source);

    if (active) return deleteFilter(source);
    if (!columnDef) return;

    addFilter({
      field: source,
      column: columnDef,
      operatorValue: columnDef.filterOperator ?? 'eq',
      value: columnDef.type === 'date' ? [null, null] : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
