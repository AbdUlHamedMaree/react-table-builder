import type { DataGridProps, GridColDef, GridSlotsComponent } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { forwardRef, memo, useCallback, useEffect, useMemo } from 'react';
import get from 'lodash.get';
import type { FilterItem } from '$context';
import { useTableBuilderColumns, useTableBuilderFilters, useTranslation } from '$context';
import { stringToLabel } from '$utils/string-to-label';
import type { ColumnMetaData } from '$types/column-metadata';
import { CustomGridFilterPanel, CustomGridToolbar } from '../custom';

export type CoreTableBuilderProps = React.PropsWithChildren<
  Omit<DataGridProps, 'columns'>
> & {
  onFilterChange?: (filters: FilterItem[]) => void;
};

export const CoreTableBuilder = memo(
  forwardRef<HTMLDivElement, CoreTableBuilderProps>(
    ({ onFilterChange, children, ...props }, ref) => {
      const columns = useTableBuilderColumns(s => s.columns);
      const filters = useTableBuilderFilters(s => s.filters);
      const getLabel = useTranslation(s => s.getFieldLabel);

      const resolveColumnProps = useCallback(
        (col: ColumnMetaData): GridColDef => ({
          ...col,
          valueGetter: params => {
            const value = get(params.row, col.field, '-');
            return (
              col.valueGetter?.({
                ...params,
                value,
              }) ?? value
            );
          },
          headerName: col.headerName ?? getLabel(col.field) ?? stringToLabel(col.field),
        }),
        [getLabel]
      );

      const resultColumns = useMemo<GridColDef[]>(
        () => columns.map(resolveColumnProps),
        [columns, resolveColumnProps]
      );

      const components = useMemo<Partial<GridSlotsComponent>>(
        () => ({
          Toolbar: CustomGridToolbar,
          FilterPanel: CustomGridFilterPanel,
          ...props.components,
        }),
        [props.components]
      );

      useEffect(() => {
        onFilterChange?.(filters);
      }, [filters, onFilterChange]);

      return (
        <>
          <DataGrid
            ref={ref}
            {...props}
            columns={resultColumns}
            components={components}
          />
          {children}
        </>
      );
    }
  )
);
