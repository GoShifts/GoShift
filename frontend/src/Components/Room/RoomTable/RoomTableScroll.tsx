import cx from "clsx";
import { useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import classes from "./RoomTableScroll.module.css";

type RoomTableType = {
  data: {
    number: string;
    type: string;
    status: string;
    bedType: string;
    building: string;
  }[];
};

export function RoomTableScroll({ data }: RoomTableType) {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <Table.Tr key={row.number}>
      <Table.Td>{row.number}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
      <Table.Td>{row.bedType}</Table.Td>
      <Table.Td>{row.building}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Number</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Bed Type</Table.Th>
            <Table.Th>Building</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
