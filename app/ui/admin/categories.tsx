'use client';
import { Button } from '@nextui-org/react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import Modal from './modal';
import styles from './table.module.css';

export default function Categories() {
  return (
    <>
      <Modal buttonTitle="Agregar categoría" />
      <Table
        selectionMode="single"
        isStriped
        aria-label="Categories table"
        fullWidth
        className={styles.table}
        color="primary"
        radius="none"
        classNames={{
          th: 'bg-primary/75 font-bold text-black rounded-none border-1',
          td: 'rounded-none border-1',
        }}
      >
        <TableHeader className="bg-black">
          <TableColumn>Nombre cat.</TableColumn>
          <TableColumn>Posición</TableColumn>
          <TableColumn>Id</TableColumn>
          <TableColumn width={20}>Editar</TableColumn>
          <TableColumn width={20}>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Remeras</TableCell>
            <TableCell>0</TableCell>
            <TableCell>65565465151818151</TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="edit" className="w-6" src="/edit.svg" />
              </Button>
            </TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="delete" className="w-7" src="/delete.svg" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Camisas</TableCell>
            <TableCell>1</TableCell>
            <TableCell>65565465151818151</TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="edit" className="w-6" src="/edit.svg" />
              </Button>
            </TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="delete" className="w-7" src="/delete.svg" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jeans</TableCell>
            <TableCell>2</TableCell>
            <TableCell>65565465151818151</TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="edit" className="w-6" src="/edit.svg" />
              </Button>
            </TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="delete" className="w-7" src="/delete.svg" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Shorts</TableCell>
            <TableCell>3</TableCell>
            <TableCell>65565465151818151</TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="edit" className="w-6" src="/edit.svg" />
              </Button>
            </TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="delete" className="w-7" src="/delete.svg" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
