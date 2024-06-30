import cx from "clsx";
import { useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import classes from "./BuildingTableScroll.module.css";

type PurchaseTableType = {
  data: {
    itemName: string;
    quantity: number;
    purchaseDate: Date;
    pricePerUnit: number;
  }[];
};

export function InventoryTableScroll({ data }: PurchaseTableType) {
  const [scrolled, setScrolled] = useState(false);

  const rows = data?.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.itemName}</Table.Td>
      <Table.Td>{row.quantity}</Table.Td>
      <Table.Td>{new Date(row.purchaseDate).toLocaleDateString()}</Table.Td>
      <Table.Td>{row.pricePerUnit}</Table.Td>
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
            <Table.Th>Item Name</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Purchase Date</Table.Th>
            <Table.Th>Price Per Unit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
