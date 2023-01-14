import type { NextPage } from 'next';
import {
  NumberColumn,
  TableBuilder,
  TextColumn,
  BooleanColumn,
  DateColumn,
  ActionsColumn,
} from '@mrii/react-table-builder';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { RemoveRedEye } from '@mui/icons-material';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return (
    <TableBuilder
      autoHeight
      rows={[
        {
          id: '1',
          name: 'pizza',
          age: 18,
          married: true,
          dob: new Date('10/10/2010').toISOString(),
        },
      ]}
    >
      <TextColumn field='name' />
      <NumberColumn field='age' />
      <BooleanColumn field='married' />
      <DateColumn field='dob' />
      <ActionsColumn
        field='actions'
        flex={1}
        align='right'
        headerName=''
        getActions={() => [<GridActionsCellItem label='Show' icon={<RemoveRedEye />} />]}
      />
    </TableBuilder>
  );
};

export default Page;
