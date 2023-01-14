import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps } from '$types';
import { dateColumnValueFormatter } from '../date';

export const dateTimeColumnValueFormatter = dateColumnValueFormatter;

export type DateTimeColumnExtraProps = { format?: string };

export const DateTimeColumn: React.FC<ColumnBaseProps<DateTimeColumnExtraProps>> = memo(
  function DateTimeColumn({ format, ...props }) {
    useAddTableColumn({
      type: 'dateTime',
      valueFormatter: dateTimeColumnValueFormatter({ format }),
      ...props,
    });
    return null;
  }
);
