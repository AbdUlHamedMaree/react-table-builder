import React, { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import { ColumnProps } from '$types';

export type TextColumnRenderParams = {};

export const TextColumn: React.FC<ColumnProps<TextColumnRenderParams>> = memo(
  function TextColumn(props) {
    useAddTableColumn({ type: 'string', filterOperator: 'contains', ...props });
    return null;
  }
);
