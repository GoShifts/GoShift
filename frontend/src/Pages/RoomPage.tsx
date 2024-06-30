import { Button, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../utils/common";
import { RoomTableScroll } from "../Components/Room/RoomTable/RoomTableScroll";
import DataTable, { TableColumn } from "react-data-table-component";

interface RoomState {
  number: string;
  type: string;
  status: string;
  bedType: string;
  buildingId: {name:string}
}

const columns: TableColumn<RoomState>[] = [
  {
    name: "Number",
    selector: (row) => row.number,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Bed Type",
    selector: (row) => row.bedType,
    sortable: true,
  },
  {
    name: "Building",
    selector: (row) => row.buildingId.name,
    sortable: true,
  },
];

function RoomPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<RoomState[]>([]);
  const [sortedData, setSortedData] = useState<RoomState[]>([]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row) => {
      return row.buildingId.name
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
          padding: "14px",
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
              navigate("/room/add");
            }}
          >
            {"Add New Room"}
          </Button>
          <TextInput placeholder="Search here..." onChange={handleFilter} />
        </div>
        <div style={{ backgroundColor: "whitesmoke" }}>
          {/* <RoomTableScroll data={data} /> */}
          {
            <DataTable
              title="All Rooms"
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

export default RoomPage;
