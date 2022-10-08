import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import { ColumnProps } from '$types';

export type DateColumnRenderParams = { format?: string };

export const DateColumn: React.FC<ColumnProps<DateColumnRenderParams>> = memo(
  function DateColumn({ format, ...props }) {
    useAddTableColumn({
      type: 'date',
      renderProps: { format },
      filterOperator: 'between',
      ...props,
    });
    return null;
  }
);
