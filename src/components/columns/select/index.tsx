import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import { ColumnProps, SelectItem } from '$types';

export type SelectColumnRenderParams = { items: SelectItem[] };

export const SelectColumn: React.FC<ColumnProps<SelectColumnRenderParams>> = memo(
  function SelectColumn({ items, ...props }) {
    useAddTableColumn({
      type: 'select',
      renderProps: { items },
      filterOperator: 'eq',
      ...props,
    });
    return null;
  }
);
