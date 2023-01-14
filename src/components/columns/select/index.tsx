import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps, SelectItem } from '$types';
import type { GridColDef } from '@mui/x-data-grid';
import { omitNil } from '$utils/omit-nil';

export const selectColumnValueFormatter =
  ({ items }: SelectColumnExtraProps): GridColDef['valueFormatter'] =>
  ({ value }) =>
    omitNil(value, items.find(el => el.value === value)?.label ?? value);

export type SelectColumnExtraProps = { items: SelectItem[] };

export const SelectColumn: React.FC<ColumnBaseProps<SelectColumnExtraProps>> = memo(
  function SelectColumn({ items, ...props }) {
    useAddTableColumn({
      type: 'singleSelect',
      extraProps: { items },
      valueFormatter: selectColumnValueFormatter({ items }),
      ...props,
    });
    return null;
  }
);
