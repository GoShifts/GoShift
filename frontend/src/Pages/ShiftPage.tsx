import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { serverUrl } from "../utils/common";
import { Button, TextInput } from "@mantine/core";
import { Navigate, useNavigate } from "react-router-dom";
import ShiftDetail from "../Components/Shift/ShiftDetail";

interface ShiftState {
  _id: string;
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

  // Click handler for shift detail
  function handleRowClicked(row: ShiftState) {
    // return <ShiftDetail shift={row} />;
    const shiftId = row._id;
    console.log(shiftId);
    navigate(`/shift/${shiftId}`);
  }

  useEffect(() => {
    async function getAllShifts() {
      // const userId = localStorage.getItem("id");
      const response = await fetch(`${serverUrl}/shift/all`);
      const shift = await response.json();
      // console.log(shift);
      setData(shift);
      setSortedData(shift);
    }
    getAllShifts();
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
              onRowClicked={handleRowClicked}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default ShiftPage;
