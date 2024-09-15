'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

export default function Categories() {
  return (
    <Table
      selectionMode="single"
      isStriped
      aria-label="Categories table"
      fullWidth
      className="w-full"
      color="primary"
    >
      <TableHeader className="bg-black">
        <TableColumn>Nombre cat.</TableColumn>
        <TableColumn>Posición</TableColumn>
        <TableColumn>Id</TableColumn>
        <TableColumn>Editar</TableColumn>
        <TableColumn>Eliminar</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Remeras</TableCell>
          <TableCell>0</TableCell>
          <TableCell>65565465151818151</TableCell>
          <TableCell>Editar</TableCell>
          <TableCell>Eliminar</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Camisas</TableCell>
          <TableCell>1</TableCell>
          <TableCell>65565465151818151</TableCell>
          <TableCell>Editar</TableCell>
          <TableCell>Eliminar</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jeans</TableCell>
          <TableCell>2</TableCell>
          <TableCell>65565465151818151</TableCell>
          <TableCell>Editar</TableCell>
          <TableCell>Eliminar</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Shorts</TableCell>
          <TableCell>3</TableCell>
          <TableCell>65565465151818151</TableCell>
          <TableCell>Editar</TableCell>
          <TableCell>Eliminar</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
