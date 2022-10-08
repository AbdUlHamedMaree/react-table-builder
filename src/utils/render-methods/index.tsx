import { GridColDef } from '@mui/x-data-grid';
import { Check, Close } from '@mui/icons-material';
import numeral from 'numeral';
import {
  BooleanColumnRenderParams,
  DateColumnRenderParams,
  NumberColumnRenderParams,
  SelectColumnRenderParams,
  TextColumnRenderParams,
  ImageColumnRenderParams,
} from '$components/columns';
import { format as dateFnsFormat } from 'date-fns';

type RenderCell = GridColDef['renderCell'];

export type RenderMethod<P> = (params: P) => RenderCell;

export type RenderMethods = {
  string: RenderMethod<TextColumnRenderParams>;
  number: RenderMethod<NumberColumnRenderParams>;
  boolean: RenderMethod<BooleanColumnRenderParams>;
  date: RenderMethod<DateColumnRenderParams>;
  select: RenderMethod<SelectColumnRenderParams>;
  image: RenderMethod<ImageColumnRenderParams>;
  custom: undefined;
};

export type RenderMethodsParameters = Parameters<
  Omit<RenderMethods, 'custom'>[keyof Omit<RenderMethods, 'custom'>]
>[number];

const omitUnwanted = (val: any, toRet: any): any => {
  if (val === null || val === undefined) return '-';
  return toRet;
};

export const renderMethods: RenderMethods = {
  string:
    () =>
    ({ value }) =>
      omitUnwanted(value, `${value}`),
  number:
    ({ inputString, roundingMethod }) =>
    ({ value }) =>
      omitUnwanted(value, numeral(value).format(inputString, roundingMethod)),
  boolean:
    () =>
    ({ value }) =>
      omitUnwanted(value, value ? <Check /> : <Close />),
  date:
    ({ format }) =>
    ({ value }) =>
      omitUnwanted(
        value,
        dateFnsFormat(value instanceof Date ? value : new Date(value), format ?? 'Pp')
      ),
  select:
    ({ items }) =>
    ({ value }) =>
      omitUnwanted(value, items.find(el => el.value === value)?.label ?? value),
  image:
    ({ alt }) =>
    rec =>
      // eslint-disable-next-line react/destructuring-assignment
      omitUnwanted(
        rec.value,
        <img src={`${rec.value}`} alt={typeof alt === 'string' ? alt : alt(rec)} />
      ),
  custom: undefined,
};
