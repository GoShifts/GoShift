import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { Button, Group, Paper, Table } from "@mantine/core";

interface Shift {
  _id: string;
  date: string;
  time: string;
  buildingId: string;
  staff: {
    name: string;
    role: string;
  }[];
}
// { shift }: ShiftState

function ShiftDetail() {
  const param = useParams();
  const shiftId = param.id;
  const [shift, setShift] = useState<Shift>();

  const rows = shift?.staff.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.role}</Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    async function getShiftById() {
      const response = await fetch(`${serverUrl}/shift/` + shiftId);
      const shift = await response.json();
      console.log(typeof shift);
      setShift(shift[0]);
    }
    getShiftById();
  }, [param.id]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "#E9ECEF",
          marginTop: "20px",
          padding: "14px",
        }}
      >
        {shift && (
          <Paper>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>Shift Date: </h3>
                <h3 style={{ paddingLeft: "10px", fontWeight: "500" }}>
                  {shift.date}
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>Shift Time: </h3>
                <h3 style={{ paddingLeft: "10px", fontWeight: "500" }}>
                  {shift.time}
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>Building: </h3>
                <h3 style={{ paddingLeft: "10px", fontWeight: "500" }}>
                  {shift.buildingId}
                </h3>
              </div>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Role</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </div>
            <Group justify="end" mt="xl" style={{ padding: "20px" }}>
              <Link to="/shifts">
                <Button radius="xl">Back</Button>
              </Link>
            </Group>
          </Paper>
        )}
      </div>
    </div>
  );
}

export default ShiftDetail;
