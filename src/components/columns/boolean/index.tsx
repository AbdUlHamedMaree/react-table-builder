import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import { ColumnProps } from '$types';

export type BooleanColumnRenderParams = {};

export const BooleanColumn: React.FC<ColumnProps<BooleanColumnRenderParams>> = memo(
  function BooleanColumn(props) {
    useAddTableColumn({ type: 'boolean', filterOperator: 'eq', ...props });
    return null;
  }
);
