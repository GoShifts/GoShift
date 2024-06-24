import { Button, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { StaffTableScroll } from "../Components/Staff/StaffTable/StaffTableScroll";
import { useEffect, useState } from "react";
import { serverUrl } from "../utils/common";
import DataTable, { TableColumn } from "react-data-table-component";

interface StaffState {
  name: string;
  role: string;
}

const columns: TableColumn<StaffState>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => row.role,
    sortable: true,
  },
];

function StaffPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<StaffState[]>([]);
  const [sortedData, setSortedData] = useState<StaffState[]>([]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setSortedData(newData);
  };

  useEffect(() => {
    async function getAllStaff() {
      const userId = localStorage.getItem("id");
      const response = await fetch(`${serverUrl}/staff/all/`+ userId);
      const staff = await response.json();
      setData(staff);
      setSortedData(staff);
    }
    getAllStaff();
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
              navigate("/staff/add");
            }}
          >
            {"Add New Staff"}
          </Button>
          <TextInput placeholder="Search here..." onChange={handleFilter} />
        </div>
        <div style={{ backgroundColor: "whitesmoke" }}>
          {/* <StaffTableScroll data={data} /> */}
          {
            <DataTable
              title="All Staff"
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

export default StaffPage;
