import type {
  ActionsColumnExtraProps,
  BooleanColumnExtraProps,
  CustomColumnExtraProps,
  DateColumnExtraProps,
  DateTimeColumnExtraProps,
  ImageColumnExtraProps,
  NumberColumnExtraProps,
  SelectColumnExtraProps,
  TextColumnExtraProps,
} from '$components';
import type { GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import type { ColumnTypeUnion } from './column-type-union';

export type ColumnTypeToColumnExtraProps = {
  string: TextColumnExtraProps;
  number: NumberColumnExtraProps;
  boolean: BooleanColumnExtraProps;
  date: DateColumnExtraProps;
  dateTime: DateTimeColumnExtraProps;
  singleSelect: SelectColumnExtraProps;
  actions: ActionsColumnExtraProps;
  image: ImageColumnExtraProps;
  custom: CustomColumnExtraProps;
};

export type ColumnMetaData<T extends ColumnTypeUnion = ColumnTypeUnion> = Omit<
  GridColDef,
  'type' | 'valueOptions'
> & {
  extraProps?: ColumnTypeToColumnExtraProps[T];
} & ({ type: T } | { type: 'actions'; getActions: GridActionsColDef['getActions'] });
