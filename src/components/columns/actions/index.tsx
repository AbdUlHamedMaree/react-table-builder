import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps } from '$types';
import type { GridActionsColDef } from '@mui/x-data-grid';

export type ActionsColumnExtraProps = {
  getActions: GridActionsColDef['getActions'];
};

export const ActionsColumn: React.FC<ColumnBaseProps<ActionsColumnExtraProps>> = memo(
  function ActionsColumn({ getActions, ...props }) {
    useAddTableColumn({
      type: 'actions',
      getActions,
      filterable: false,
      sortable: false,
      ...props,
    });
    return null;
  }
);
