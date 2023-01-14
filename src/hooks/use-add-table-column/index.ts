import { useEffect } from 'react';
import { useTableBuilderColumns } from '$context';
import type { ColumnMetaData } from '$types/column-metadata';

export const useAddTableColumn = (props: ColumnMetaData) => {
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
