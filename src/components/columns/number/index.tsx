import type { Numeral } from 'numeral';
import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps } from '$types';
import type { GridColDef } from '@mui/x-data-grid';
import { omitNil } from '$utils/omit-nil';
import numeral from 'numeral';

type FormatParameters = Parameters<Numeral['format']>;

export const numberColumnValueFormatter =
  ({
    inputString,
    roundingMethod,
  }: NumberColumnExtraProps): GridColDef['valueFormatter'] =>
  ({ value }) =>
    omitNil(value, numeral(value).format(inputString, roundingMethod));

export type NumberColumnExtraProps = {
  inputString?: FormatParameters[0];
  roundingMethod?: FormatParameters[1];
};

export const NumberColumn: React.FC<ColumnBaseProps<NumberColumnExtraProps>> = memo(
  function NumberColumn({ inputString, roundingMethod, ...props }) {
    useAddTableColumn({
      type: 'number',
      valueFormatter: numberColumnValueFormatter({ inputString, roundingMethod }),
      ...props,
    });
    return null;
  }
);
