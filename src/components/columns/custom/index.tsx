import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps, ColumnTypeUnion } from '$types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CustomColumnExtraProps = {
  type?: ColumnTypeUnion;
};

export const CustomColumn: React.FC<ColumnBaseProps<CustomColumnExtraProps>> = memo(
  function CustomColumn(props) {
    useAddTableColumn({ type: 'custom', filterable: false, sortable: false, ...props });
    return null;
  }
);
