import { useEffect } from 'react';
import { useTableBuilderColumns } from '$context';
import { ColumnProps } from '$types';

export const useAddTableColumn = (props: ColumnProps) => {
  const addColumn = useTableBuilderColumns(s => s.addColumn);

  useEffect(() => {
    addColumn({
      filterable: true,
      width: 200,
      ...props,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
};
