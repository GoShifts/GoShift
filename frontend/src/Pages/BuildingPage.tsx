import { Button, TextInput } from "@mantine/core";
import { BuildingTable } from "../Components/Building/BuildingTable/BuildingTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { serverUrl } from "../utils/common";
import { BuildingTableScroll } from "../Components/Building/BuildingTableScroll/BuildingTableScroll";
import DataTable, { TableColumn } from "react-data-table-component";

interface BuildingState {
  name: string;
  type: string;
  city: string;
}

const columns: TableColumn<BuildingState>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
];

function BuildingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<BuildingState[]>([]);
  const [sortedData, setSortedData] = useState<BuildingState[]>([]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setSortedData(newData);
  };

  useEffect(() => {
    async function getAllBuildings() {
      const userId = localStorage.getItem("id");
      // console.log(userId);
      const response = await fetch(`${serverUrl}/building/all/` + userId);
      const buildings = await response.json();
      // console.log(buildings);
      setData(buildings);
      setSortedData(buildings);
    }
    getAllBuildings();
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
              navigate("/building/add");
            }}
          >
            {"Add New Building"}
          </Button>
          <TextInput placeholder="Search here..." onChange={handleFilter} />
        </div>
        <div style={{ backgroundColor: "whitesmoke" }}>
          {/* {data ? <BuildingTableScroll data={data} /> : "Error"} */}
          {/* {data ? "data" : "Error"} */}
          {
            <DataTable
              title="All Buildings"
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

export default BuildingPage;
