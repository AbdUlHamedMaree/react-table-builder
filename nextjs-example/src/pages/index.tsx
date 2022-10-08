import { NextPage } from 'next';
import { TableBuilder, TextColumn } from '@mrii/react-table-builder';

type PageProps = {};

const Page: NextPage<PageProps> = ({}) => {
  return <TableBuilder autoHeight rows={[{ id: '1', name: 'pizza' }]}>
    <TextColumn source='name' />
    <TextColumn source='name1' />
    <TextColumn source='name2' />
    <TextColumn source='name3' />
    <TextColumn source='name4' />
    <TextColumn source='name5' />
    <TextColumn source='name6' />
    <TextColumn source='name7' />
    <TextColumn source='name8' />
    <TextColumn source='name9' />
  </TableBuilder>;
};

export default Page;
