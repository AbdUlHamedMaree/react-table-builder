import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridSlotsComponent,
} from '@mui/x-data-grid';
import { forwardRef, memo, useCallback, useEffect, useMemo } from 'react';
import get from 'lodash.get';
import {
  ColumnModel,
  FilterItem,
  useTableBuilderColumns,
  useTableBuilderFilters,
  useTranslation,
} from '$context';
import { renderMethods } from '$utils/render-methods';
import { stringToLabel } from '$utils/string-to-label';
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
        (col: ColumnModel): GridColDef => ({
          ...col,
          valueGetter: col.source.includes('.')
            ? params =>
                col.valueGetter
                  ? col.valueGetter({
                      ...params,
                      value: get(params.row, col.source, '-'),
                    })
                  : get(params.row, col.source, (col as any).value)
            : col.valueGetter,
          field: col.source,
          renderCell:
            col.renderCell ??
            (col.type ? (renderMethods as any)[col.type]?.(col.renderProps) : undefined),
          headerName: col.headerName ?? getLabel(col.source) ?? stringToLabel(col.source),
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
