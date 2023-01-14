import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps } from '$types';
import type { GridColDef } from '@mui/x-data-grid';
import { omitNil } from '$utils/omit-nil';
import { format as dateFnsFormat } from 'date-fns';

export const dateColumnValueFormatter =
  ({ format }: DateColumnExtraProps): GridColDef['valueFormatter'] =>
  ({ value }) =>
    omitNil(value, dateFnsFormat(new Date(value), format ?? 'Pp'));

export type DateColumnExtraProps = { format?: string };

export const DateColumn: React.FC<ColumnBaseProps<DateColumnExtraProps>> = memo(
  function DateColumn({ format, ...props }) {
    useAddTableColumn({
      type: 'date',
      valueFormatter: dateColumnValueFormatter({ format }),
      ...props,
    });
    return null;
  }
);
