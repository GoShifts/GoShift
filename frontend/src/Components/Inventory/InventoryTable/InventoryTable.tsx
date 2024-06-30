import { useState } from "react";
import { Table, ScrollArea, TextInput, rem, Text, Group, Button } from "@mantine/core";
import { IconSearch, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import classes from "./BuildingTable.module.css";

interface PurchaseData {
  itemName: string;
  quantity: number;
  purchaseDate: Date;
  pricePerUnit: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSearch;

  return (
    <Table.Th className={classes.th}>
      <Button onClick={onSort} className={classes.control} variant="link">
        <Group >
          <Text >
            {children}
          </Text>
          <Icon
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </Group>
      </Button>
    </Table.Th>
  );
}

function filterData(data: PurchaseData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: PurchaseData[],
  sortBy: keyof PurchaseData | null,
  reverseSortDirection: boolean,
  search: string
) {
  if (!sortBy) return data;

  return [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return reverseSortDirection
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    } else {
      if (typeof aValue === "number" && typeof bValue === "number") {
        return reverseSortDirection ? bValue - aValue : aValue - bValue;
      } else {
        // Handle cases where values are not numeric (e.g., dates)
        if (reverseSortDirection) {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
      }
    }
  });
}


type InventoryTableProps = {
  data: PurchaseData[];
};

export function InventoryTable({ data }: InventoryTableProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof PurchaseData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof PurchaseData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, field, reversed, search));
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, sortBy, reverseSortDirection, value));
  };

  const rows = sortedData.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.itemName}</Table.Td>
      <Table.Td>{row.quantity}</Table.Td>
      <Table.Td>{row.purchaseDate.toLocaleDateString()}</Table.Td>
      <Table.Td>{row.pricePerUnit}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th sorted={sortBy === "itemName"} reversed={reverseSortDirection} onSort={() => setSorting("itemName")}>
              Item Name
            </Th>
            <Th sorted={sortBy === "quantity"} reversed={reverseSortDirection} onSort={() => setSorting("quantity")}>
              Quantity
            </Th>
            <Th sorted={sortBy === "purchaseDate"} reversed={reverseSortDirection} onSort={() => setSorting("purchaseDate")}>
              Purchase Date
            </Th>
            <Th sorted={sortBy === "pricePerUnit"} reversed={reverseSortDirection} onSort={() => setSorting("pricePerUnit")}>
              Price Per Unit
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text  >
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
