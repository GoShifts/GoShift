import { Button, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { serverUrl } from "../utils/common";
import DataTable, { TableColumn } from "react-data-table-component";
import { InventoryTable } from "../Components/Inventory/InventoryTable/InventoryTable";
import { SellTable } from "../Components/Sell/SellTable/SellTable";
import { InventoryTableScroll } from "../Components/Inventory/InventoryScroll/InventoryTableScroll";
import { SellTableScroll } from "../Components/Sell/SellScroll/SellTableScroll";

interface PurchaseState {
    itemName: string;
    quantity: number;
    purchaseDate: Date;
    pricePerUnit: number;
  }



  export interface Sale extends Document {
    itemName: string;
    pricePerUnit: number;
    quantity: number;
    saleDate: Date;
    staff: string;
    room: string;
    buildingname: string; // Assuming building name is stored as string
  }

  const columns: TableColumn<PurchaseState>[] = [
    {
      name: "Item Name",
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Purchase Date",
      selector: (row) => new Date(row.purchaseDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Price Per Unit",
      selector: (row) => row.pricePerUnit,
      sortable: true,
    },
  ];

  const saleColumns: TableColumn<Sale>[] = [
    {
      name: "Item Name",
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Sale Date",
      selector: (row) => new Date(row.saleDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Price Per Unit",
      selector: (row) => row.pricePerUnit,
      sortable: true,
    },
    {
      name: "Staff",
      selector: (row) => row.staff,
      sortable: true,
    },
    {
      name: "Room",
      selector: (row) => row.room,
      sortable: true,
    },
    {
      name: "Building",
      selector: (row) => row.buildingname, // Assuming 'buildingname' matches the field in your Sale schema
      sortable: true,
    },
  ];
function BuildingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<PurchaseState[]>([]);
  const [saledata, setsaleData] = useState<Sale[]>([]);
  const [sortedData, setSortedData] = useState<PurchaseState[]>([]);

  
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row) => {
      return row.itemName.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setSortedData(newData);
  };


  useEffect(() => {
    async function getAllPurchases() {
      try {
        const userId = localStorage.getItem("id");
        const response = await fetch(`${serverUrl}/purchase/all/` + userId);
        const purchases = await response.json();
        console.log(purchases)
        setSortedData(purchases);
        setData(purchases);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }

    async function getAllSale() {
        try {
          const userId = localStorage.getItem("id");
          const response = await fetch(`${serverUrl}/sell/all`);
          const purchases = await response.json();
          console.log('sale:',purchases)
          setsaleData(purchases);
        } catch (error) {
          console.error("Error fetching purchases:", error);
        }
      }

      getAllSale()
    getAllPurchases();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
     

      {/* Inventory Table */}
      <div style={{ width: "80%", backgroundColor: "#E9ECEF", marginTop: "20px", padding: "14px" }}>
        <h3>Inventory</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
      
        <Button
          type="button"
          radius="xl"
          onClick={() => {
            // Handle import from InventoryTable component
            navigate('/inventory/add')
          }}
        >
          Add Purchase
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

      {/* Sell Table */}
      <div style={{ width: "80%", backgroundColor: "#E9ECEF", marginTop: "20px", padding: "14px" }}>
        <h3>Our Selling</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
        <Button
          type="button"
          radius="xl"
          onClick={() => {
            // Handle import from SellTable component
            navigate('/sell/add')
          }}
        >
          Add Sale
        </Button>
        <TextInput placeholder="Search here..." onChange={handleFilter} />
        </div>
        <div style={{ backgroundColor: "whitesmoke", marginBottom: "20px", maxHeight: "400px", overflowY: "auto" }}>
          {/*<SellTableScroll />  Adjust component name and props as needed */}
          {
            <DataTable
              title="All Sales"
              columns={saleColumns}
              data={saledata}
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
