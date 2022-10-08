import { GridCellParams } from '@mui/x-data-grid';
import React, { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import { ColumnProps } from '$types';

export type ImageColumnRenderParams = { alt: string | ((rec: GridCellParams) => string) };

export const ImageColumn: React.FC<ColumnProps<ImageColumnRenderParams>> = memo(
  function ImageColumn(props) {
    useAddTableColumn({ type: 'image', filterable: false, sortable: false, ...props });
    return null;
  }
);
