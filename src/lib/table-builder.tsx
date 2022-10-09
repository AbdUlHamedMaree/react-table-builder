import { forwardRef, memo } from 'react';
import { CoreTableBuilder, CoreTableBuilderProps } from '$components';
import {
  TableBuilderColumnsProvider,
  TableBuilderFiltersProvider,
  TranslationProvider,
} from '$context';

export type TableBuilderProps = Exclude<CoreTableBuilderProps, 'rows'> & {
  name?: string;
  translation?: Record<string, string | undefined>;
};

export const TableBuilder = memo(
  forwardRef<HTMLDivElement, TableBuilderProps>(
    ({ name = 'not-implemented', translation = {}, ...props }, ref) => {
      return (
        <TableBuilderFiltersProvider name={name}>
          <TableBuilderColumnsProvider name={name}>
            <TranslationProvider translation={translation}>
              <CoreTableBuilder ref={ref} {...props} />
            </TranslationProvider>
          </TableBuilderColumnsProvider>
        </TableBuilderFiltersProvider>
      );
    }
  )
);

export default TableBuilder;
