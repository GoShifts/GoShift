import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { serverUrl } from "../utils/common";
import { Button, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface ShiftState {
  number: string;
  date: string;
  time: string;
  doctor: string;
  nurses: string;
  buildingId: string;
  roomId: string;
}

const columns: TableColumn<ShiftState>[] = [
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Time",
    selector: (row) => row.time,
    sortable: true,
  },
  {
    name: "Building",
    selector: (row) => row.buildingId,
    sortable: true,
  },
  {
    name: "Room",
    selector: (row) => row.roomId,
    sortable: true,
  },
  {
    name: "Doctor",
    selector: (row) => row.doctor,
    sortable: true,
  },
  {
    name: "Nurses",
    selector: (row) => row.nurses,
    sortable: true,
  },
];

function ShiftPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<ShiftState[]>([]);
  const [sortedData, setSortedData] = useState<ShiftState[]>([]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row) => {
      return row.buildingId
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setSortedData(newData);
  };

  useEffect(() => {
    async function getAllRooms() {
      const userId = localStorage.getItem("id");
      const response = await fetch(`${serverUrl}/room/all/` + userId);
      const room = await response.json();
      console.log(room);
      setData(room);
      setSortedData(room);
    }
    getAllRooms();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "#E9ECEF",
          marginTop: "20px",
          padding:"14px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Button
            type="submit"
            radius="xl"
            onClick={() => {
              navigate("/shifts/add");
            }}
          >
            {"Add New Shift"}
          </Button>
          <TextInput placeholder="Search here..." onChange={handleFilter} />
        </div>
        <div style={{ backgroundColor: "whitesmoke" }}>
          {/* <RoomTableScroll data={data} /> */}
          {
            <DataTable
              title="All Shifts"
              columns={columns}
              data={sortedData}
              pagination
              fixedHeader
              highlightOnHover
              striped
            />
          }
        </div>
      </div>
    </div>
  );
}

export default ShiftPage;
