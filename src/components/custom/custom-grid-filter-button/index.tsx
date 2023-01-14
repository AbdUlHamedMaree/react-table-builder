/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ButtonProps, MenuProps } from '@mui/material';
import { Button, Tooltip, Box, Menu, MenuItem, Badge } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { CheckBox, CheckBoxOutlineBlank, FilterList } from '@mui/icons-material';
import { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import {
  useGridSelector,
  gridColumnLookupSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

import { useTableBuilderFilters, useTableBuilderColumns, useTranslation } from '$context';
import { allowedFilterTypes } from '$types';
import { mergeRefs } from '$utils';

const filterInitialValue = {
  date: [null, null],
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 180,
    color: 'text.secondary',
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: 'text.secondary',
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const CustomGridToolbarFilterButton = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const apiRef = useGridApiContext();
    const anchor = useRef<HTMLButtonElement>(null);
    const columns = useTableBuilderColumns(s => s.columns);
    const [filters, panel, setPanel, addFilter, deleteFilter] = useTableBuilderFilters(
      s => [s.filters, s.panel, s.setPanel, s.addFilter, s.deleteFilter]
    );
    const t = useTranslation(s => s.getFieldLabel);

    const lookup = useGridSelector(apiRef, gridColumnLookupSelector);

    const toggleFiltersPanel = useCallback(() => setPanel(v => !v), [setPanel]);

    const tooltipContentNode = useMemo(() => {
      if (filters.length === 0)
        return apiRef?.current.getLocaleText(
          'toolbarFiltersTooltipShow'
        ) as React.ReactElement;

      return (
        <div>
          {apiRef?.current.getLocaleText('toolbarFiltersTooltipActive')(filters.length)}
          <Box
            component='ul'
            sx={{
              margin: theme => theme.spacing(1, 1, 0.5),
              padding: theme => theme.spacing(0, 1),
            }}
          >
            {filters.map(
              el =>
                lookup[el.field] && (
                  <li key={el.field}>
                    {`${lookup[el.field].headerName || el.field}
                ${el.value}`}
                  </li>
                )
            )}
          </Box>
        </div>
      );
    }, [filters, apiRef, lookup]);

    const refs = useMemo(() => mergeRefs(ref, anchor), [ref]);
    const items = useMemo(
      () =>
        columns
          .filter(el => el.filterable && allowedFilterTypes.includes(el.type as any))
          .map(el => {
            const active = filters.findIndex(e => e.field === el.field) !== -1;
            return (
              <MenuItem
                key={el.field}
                onClick={() => {
                  active
                    ? deleteFilter(el.field)
                    : addFilter({
                        field: el.field,
                        column: el,
                        value: filterInitialValue[el.type as 'date'] ?? '',
                      });
                }}
              >
                {active ? <CheckBox /> : <CheckBoxOutlineBlank />}
                {t(el.field, true)}
              </MenuItem>
            );
          }),
      [addFilter, columns, deleteFilter, filters, t]
    );

    return (
      <>
        <Tooltip title={tooltipContentNode} enterDelay={1000}>
          <Button
            ref={refs}
            size='small'
            color='primary'
            {...props}
            onClick={toggleFiltersPanel}
            startIcon={
              <Badge badgeContent={filters.length} color='primary'>
                <FilterList />
              </Badge>
            }
          >
            {apiRef?.current.getLocaleText('toolbarFilters')}
          </Button>
        </Tooltip>
        <StyledMenu anchorEl={anchor.current} open={panel} onClose={toggleFiltersPanel}>
          {items}
        </StyledMenu>
      </>
    );
  })
);
