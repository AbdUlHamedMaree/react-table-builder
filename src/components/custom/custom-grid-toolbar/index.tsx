import { forwardRef, useMemo } from 'react';
import type { GridToolbarContainerProps } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Box, Grid } from '@mui/material';

import type { SelectColumnExtraProps } from '$components/columns';
import { useTableBuilderFilters, useTranslation } from '$context';
import type { FilterAllowedColumnTypeUnion } from '$types';
import { FilterField } from '$components/filter-field';
import { CustomGridToolbarFilterButton } from '../custom-grid-filter-button';

export const CustomGridToolbar: React.FC = forwardRef<
  HTMLDivElement,
  GridToolbarContainerProps
>(function CustomGridToolbar(props, ref) {
  const [filters, editFilter] = useTableBuilderFilters(s => [s.filters, s.editFilter]);

  const t = useTranslation(s => s.getFieldLabel);
  const inputs = useMemo(
    () =>
      filters.map(filter => (
        <Grid key={filter.field} item>
          <FilterField
            type={filter.column.type as FilterAllowedColumnTypeUnion}
            value={filter.value}
            label={t(filter.field, true)}
            onChange={value => editFilter({ ...filter, value })}
            items={(filter.column.extraProps as SelectColumnExtraProps)?.items}
          />
        </Grid>
      )),
    [editFilter, filters, t]
  );

  return (
    <Box display='flex' justifyContent='space-between' alignItems='flex-start' p={2}>
      <Grid container spacing={2} flexWrap='wrap' flex='1 0'>
        {inputs}
      </Grid>

      <GridToolbarContainer {...props} ref={ref}>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <CustomGridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    </Box>
  );
});
