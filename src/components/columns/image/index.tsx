import type { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps } from '$types';
import { omitNil } from '$utils/omit-nil';

export const imageColumnRenderCell =
  ({ alt }: ImageColumnExtraProps): GridColDef['renderCell'] =>
  record =>
    omitNil(record.value, <img src={`${record.value}`} alt={alt(record)} />);

export type ImageColumnExtraProps = { alt: (record: GridCellParams) => string };

export const ImageColumn: React.FC<ColumnBaseProps<ImageColumnExtraProps>> = memo(
  function ImageColumn(props) {
    useAddTableColumn({ type: 'image', filterable: false, sortable: false, ...props });
    return null;
  }
);
