import { Numeral } from 'numeral';
import React, { memo } from 'react';
import { useAddTableColumn } from '$hooks';
import { ColumnProps } from '$types';

type FormatParameters = Parameters<Numeral['format']>;

export type NumberColumnRenderParams = {
  inputString?: FormatParameters[0];
  roundingMethod?: FormatParameters[1];
};

export const NumberColumn: React.FC<ColumnProps<NumberColumnRenderParams>> = memo(
  function NumberColumn({ inputString, roundingMethod, ...props }) {
    useAddTableColumn({
      type: 'number',
      filterOperator: 'eq',
      renderProps: { inputString, roundingMethod },
      ...props,
    });
    return null;
  }
);
