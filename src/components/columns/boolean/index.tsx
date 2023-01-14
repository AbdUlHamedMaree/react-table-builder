import { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import type { ColumnBaseProps } from '$types';
import { Check, Close } from '@mui/icons-material';
import type { SvgIconProps } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { omitNil } from '$utils/omit-nil';

export const booleanRenderCell =
  ({
    checkIconProps,
    closeIconProps,
  }: BooleanColumnExtraProps): GridColDef['renderCell'] =>
  ({ value }) =>
    omitNil(value, value ? <Check {...checkIconProps} /> : <Close {...closeIconProps} />);

export type BooleanColumnExtraProps = {
  checkIconProps?: SvgIconProps;
  closeIconProps?: SvgIconProps;
};

export const BooleanColumn: React.FC<ColumnBaseProps<BooleanColumnExtraProps>> = memo(
  function BooleanColumn({ checkIconProps, closeIconProps, ...props }) {
    useAddTableColumn({
      type: 'boolean',
      renderCell: booleanRenderCell({ checkIconProps, closeIconProps }),
      ...props,
    });
    return null;
  }
);
