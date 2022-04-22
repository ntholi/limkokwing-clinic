import { Group, Loader, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import TableCaption from '../utils/TableCaption';
import Drug from './drug';
import { loadDrugs } from './drug-service';
import Row from './Row';

type Props = {
  setDrug: (drug: Drug | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function DrugsTable({ setDrug, setOpenForm }: Props) {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return loadDrugs((item) => {
      setDrugs(item);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableCaption loading={loading} />
          {drugs.map((item) => (
            <Row
              key={item.id}
              item={item}
              setDrug={setDrug}
              setOpenForm={setOpenForm}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DrugsTable;
