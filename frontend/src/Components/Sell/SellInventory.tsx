import React, { useState, useEffect } from "react";
import {
  Button,
  Group,
  Paper,
  Select,
  Stack,
  TextInput,
  Text,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InventoryItem {
  _id: string;
  itemName: string;
  quantity: number;
  pricePerUnit: number;
}

interface Staff {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  number: string;
}

interface Building {
  _id: string;
  name: string;
}

function SellInventory() {
  const navigate = useNavigate();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [buildingList, setBuildingList] = useState<Building[]>([]);
  const [buildingId, setBuildingId] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading indicator

  const form = useForm({
    initialValues: {
      date: "",
      staff: "",
      room: "",
      buildingId: "",
    },
  });

  // Fetch all necessary data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("id");
      try {
        // Fetch inventory items
        const responseInventory = await fetch(`${serverUrl}/purchase/all/${userId}`);
        const dataInventory = await responseInventory.json();
        setInventoryItems(dataInventory);

        // Fetch staff list
        const responseStaff = await fetch(`${serverUrl}/staff/all/${userId}`);
        const dataStaff = await responseStaff.json();
        setStaffList(dataStaff);

        

        // Fetch building list
        const responseBuilding = await fetch(`${serverUrl}/building/all/${userId}`);
        const dataBuilding = await responseBuilding.json();
        setBuildingList(dataBuilding);

      

        // After fetching all data, set loading to false
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  // Fetch rooms based on selected buildingId
  useEffect(() => {
    console.log('bid',buildingId)
    async function getRooms() {
      if (buildingId) {
        const roomResponse = await fetch(`${serverUrl}/room/bid/` + buildingId);
        const rooms = await roomResponse.json();
        console.log(rooms)
        setRoomList(rooms);
      }
    }
    getRooms();
  }, [buildingId]);

  // Calculate total price based on selected item and quantity
  useEffect(() => {
    if (selectedItem) {
      setTotalPrice(selectedItem.pricePerUnit * quantity);
    }
  }, [selectedItem, quantity]);

  const handleFormSubmit = async () => {
    const { date, staff, room, buildingId } = form.values;
    const sellData = {
      itemName: selectedItem?.itemName,
      pricePerUnit: selectedItem?.pricePerUnit,
      quantity,
      saleDate: date,
      staff,
      room,
      buildingId,
    };

    try {
      const response = await fetch(`${serverUrl}/sell/add`, {
        method: "POST",
        body: JSON.stringify(sellData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log(data)
      if (data) {
        toast.success("Inventory Sold");
        navigate("/inventory");
      } else {
        console.log("Error selling inventory");
      }
    } catch (error) {
      console.error("Error selling inventory:", error);
    }
  };

  const handleItemChange = (event:any) => {
    // if (value) {
      // const value = parseInt(event);
      console.log(event)
      const selectedItem = inventoryItems.find((item) => item._id === event);
      if (selectedItem) {
        console.log(selectedItem)
        setSelectedItem(selectedItem);
        setQuantity(selectedItem.quantity); // Reset quantity when item changes
      }
    // }
  };


  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.currentTarget.value);
    console.log(value, ' ', selectedItem?.quantity)
    if (selectedItem && value > selectedItem.quantity) {
      setError("Exceeds available quantity - "+selectedItem.quantity);
      toast('Quantity exceeded the stock')
    } else {
      setQuantity(value);
      setError(null);
    }
  };

  if (isLoading) {
    return <Loader size="md" />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ width: "80%", backgroundColor: "#E9ECEF", marginTop: "20px", padding: "14px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3>Sell Inventory Item</h3>
          <Paper radius="md" p="xl">
            <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
              <Stack>

              <Select
                    label="Select Item"
                    placeholder="Select Item"
                    data={inventoryItems?.map((staff) => ({
                      value: staff._id,
                      label: staff.itemName,
                    }))}
                    
                      onChange={(value) => {
                        // Ensure `value` is treated as a string
                        const item = value as string;
                        console.log(item)
                        handleItemChange(item);
                        // Reset roomId when building changes
                      }}
                    
                  />
                
                <TextInput
                  label="Quantity"
                  type="number"
                  value={quantity.toString()}
                  onChange={handleQuantityChange}
                  required
                  min={1}
                />
                {error && <Text color="red">{error}</Text>}
                <TextInput
                  label="Date of Sale"
                  type="date"
                  {...form.getInputProps("date")}
                  required
                />

                <Select
                    label="Select Staff"
                    placeholder="Select Staff"
                    data={staffList?.map((staff) => ({
                      value: staff.name,
                      label: staff.name,
                    }))}
                    onChange={(value) => {
                      if (typeof value === "string") form.setFieldValue("staff", value);
                    }}
                  />
                
                <Select
  label="Building"
  data={buildingList?.map((building) => ({
    value: building._id,
    label: building.name,
  }))}
  onChange={(value) => {
    // Ensure `value` is treated as a string
    const selectedBuildingId = value as string;
    
    buildingList.map((building, index)=>{ if(building._id === value){form.setFieldValue("buildingId", building.name);}})
    setBuildingId(selectedBuildingId);
    form.setFieldValue("roomId", ""); // Reset roomId when building changes
  }}
/>

                <Select
                  label="Room"
                  data={roomList?.map((room) => ({
                    value: room.number,
                    label: room.number,
                  }))}
                  onChange={(value) => {
                    if (typeof value === "string") form.setFieldValue("room", value);
                  }}
                />
              
                <Group justify="end">
                  <Link to="/inventory" style={{ textDecoration: "none" }}>
                    <Button color="red" radius="xl">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" radius="xl">
                    Submit
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default SellInventory;
