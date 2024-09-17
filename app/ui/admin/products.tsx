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

export default function Products() {
  return (
    <>
      <Modal buttonTitle="Agregar producto" />
      <Table
        selectionMode="single"
        isStriped
        aria-label="Products table"
        fullWidth
        className={styles.table}
        color="primary"
        radius="none"
        classNames={{
          th: 'bg-primary/75 font-bold text-black rounded-none border-1',
          td: 'rounded-none border-1',
        }}
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Ref.</TableColumn>
          <TableColumn>Nom. Categoria</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn width={20}>Fotos</TableColumn>
          <TableColumn width={20}>Editar</TableColumn>
          <TableColumn width={20}>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>0</TableCell>
            <TableCell>1</TableCell>
            <TableCell>MUJER-CHALECOS </TableCell>
            <TableCell>Chaleco de mujer</TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="photos" className="w-8" src="/photos.svg" />
              </Button>
            </TableCell>
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
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>MUJER-VESTIDOS</TableCell>
            <TableCell>Vestido de mujer</TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="photos" className="w-8" src="/photos.svg" />
              </Button>
            </TableCell>
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
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>MUJER-REMERAS</TableCell>
            <TableCell>Remera de mujer</TableCell>
            <TableCell>
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="photos" className="w-8" src="/photos.svg" />
              </Button>
            </TableCell>
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
