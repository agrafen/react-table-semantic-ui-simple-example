import React, { useCallback, useMemo, useState } from 'react';
import { Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Column } from 'react-table';

import Table from './components/table';

interface Member {
  id: number;
  name: string;
}

function useDebounce(func: Function, delay: number = 500) {
  let timer: any = null;
  
  const debounce = useCallback((...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => func(...args), delay);
  }, [func]);

  return debounce;
}

export default function App() {
  const [search, setSearch] = useState<string | null>(null);
  console.log(search);
  
  const columns: Column[] = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'index',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
    ],
    []
  );

  const data: Member[] = useMemo(
    () =>
      [
        {
          id: 1,
          name: 'Joe',
        },
        {
          id: 2,
          name: 'Mariann',
        },
        {
          id: 3,
          name: 'Jocelyn',
        },
      ].filter((item) => (search ? item.name.toLowerCase().includes(search) : true)),
    [search]
  );

  const handleSearch = useDebounce((e: any, data: any) => setSearch(data.value.toLowerCase()));

  return (
    <React.StrictMode>
      <Input placeholder="Search handle..." onChange={handleSearch} />
      <Table id="TableTradesHistory" columns={columns} data={data} />
    </React.StrictMode>
  );
}
