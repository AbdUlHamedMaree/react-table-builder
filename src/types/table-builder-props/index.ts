import type { CoreTableBuilderProps } from '$components/core-component';

export type TableBuilderProps = Exclude<CoreTableBuilderProps, 'rows'> & {
  name?: string;
  translation?: Record<string, string | undefined>;
};
