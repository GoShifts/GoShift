import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { Button, Group, Paper, Table, Title, Grid, Text} from "@mantine/core";

interface Shift {
  _id: string;
  date: string;
  time: string;
  buildingId: string;
  roomId: string;
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
              <Title order={2} style={{  marginTop:'20px' }}>
              Shift Details
            </Title>
            <Grid columns={2} style={{margin:'60px'}}>
              <div style={{width:"300px"}}>
                <Text  size="lg">
                  Shift Date:
                </Text>
                <Text  size="lg">
                  {shift.date}
                </Text>
              </div>
              <div style={{width:"300px"}}>
                <Text  size="lg">
                  Shift Time:
                </Text>
                <Text  size="lg">
                  {shift.time}
                </Text>
              </div>
              <div style={{width:"300px"}}>
                <Text size="lg">
                  Building:
                </Text>
                <Text  size="lg">
                  {shift.buildingId}
                </Text>
              </div>
              <div>
                <Text  size="lg">
                  Room:
                </Text>
                <Text  size="lg">
                {shift.roomId}
                </Text>
              </div>
            </Grid>
            <Title order={2} style={{  margin:'20px' }}>
              Staff for this Shift
            </Title>
              <Table style={{width:"80%"}}>
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
