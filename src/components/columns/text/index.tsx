import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps } from '$types';
import type { GridColDef } from '@mui/x-data-grid';
import { omitNil } from '$utils/omit-nil';

export const textColumnValueFormatter =
  (_: TextColumnExtraProps): GridColDef['valueFormatter'] =>
  ({ value }) =>
    omitNil(value, value);

export type TextColumnExtraProps = {};

export const TextColumn: React.FC<ColumnBaseProps<TextColumnExtraProps>> = memo(
  function TextColumn(props) {
    useAddTableColumn({
      type: 'string',
      valueFormatter: textColumnValueFormatter({}),
      ...props,
    });
    return null;
  }
);
