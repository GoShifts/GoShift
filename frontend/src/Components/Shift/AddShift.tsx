import { Button, Group, Paper, Select, Modal } from "@mantine/core";
import { DateInput, DatePicker, DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useDisclosure } from "@mantine/hooks";
import { format } from 'date-fns';
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BuildingState {
  _id: string;
  name: string;
  type: string;
  city: string;
}

interface RoomState {
  _id: string;
  number: string;
  type: string;
  status: string;
  bedType: string;
}

interface StaffState {
  _id: string;
  name: string;
  role: string;
}

interface SelectedStaffState {
  staffId: string | null;
  role: string | null;
  name: string | null;
}

function AddShift() {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState<BuildingState[]>([]);
  const [rooms, setRooms] = useState<RoomState[]>([]);
  const [staff, setStaff] = useState<StaffState[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<SelectedStaffState[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<StaffState[]>([]);
  const [role, setRole] = useState<string | null>("");
  const [staffId, setStaffId] = useState<string | null>("");
  const [staffName, setStaffName] = useState<string | null>("");
  const [buildingId, setBuildingId] = useState<string | null>("");
  const [opened, { open, close }] = useDisclosure(false);


  const formatDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const form = useForm({
    initialValues: {
      date: "",
      time: "",
      buildingId: "",
      roomId: "",
    },
  });

// Handle form submission
const handleFormSubmit = async () => {
  const formattedDate = new Date(form.values.date).toDateString();

  const shiftData = { ...form.values,date: formattedDate, staff: selectedStaff };
// return;
  try {
    const response = await fetch(`${serverUrl}/shift/add`, {
      method: "POST",
      body: JSON.stringify(shiftData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data)
    if (!data.error) {
      form.reset();
      navigate("/shifts");
    } else {
      console.log("Error");
      toast(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

// Add staff to selectedStaff array
const handleAddStaff = () => {
  const staffMember = staff.find((member) => member._id === staffId);
  const alreadyAdded = selectedStaff.some((staff) => staff.staffId === staffId);
if(alreadyAdded){
  toast('Already Added')
}
  if (staffMember && !alreadyAdded) {
    setSelectedStaff([...selectedStaff, { staffId: staffId, role: role, name: staffMember.name }]);
  }
  close();
};



  // Fetch buildings and staff on component mount
  useEffect(() => {
    async function getData() {
      const userId = localStorage.getItem("id");

      // Fetch buildings
      const buildingResponse = await fetch(`${serverUrl}/building/all/` + userId);
      const buildings = await buildingResponse.json();
      setBuildings(buildings);

      // Fetch staff
      const staffResponse = await fetch(`${serverUrl}/staff/all/` + userId);
      const staff = await staffResponse.json();
      setStaff(staff);
    }
    getData();
  }, []);

  // Fetch rooms based on selected buildingId
  useEffect(() => {
    console.log('bid',buildingId)
    async function getRooms() {
      if (buildingId) {
        const roomResponse = await fetch(`${serverUrl}/room/bid/` + buildingId);
        const rooms = await roomResponse.json();
        console.log(rooms)
        setRooms(rooms);
      }
    }
    getRooms();
  }, [buildingId]);

  useEffect(() => {
    let data = staff.filter((staff) => staff.role === role);
    setFilteredStaff(data);
  }, [role]);

  // useEffect(() => {
  //   async function getAllBuildings() {
  //     const userId = localStorage.getItem("id");
  //     const response = await fetch(`${serverUrl}/building/all/` + userId);
  //     const buildings = await response.json();
  //     setBuildings(buildings);
  //   }
  //   getAllBuildings();
  // }, []);


  const handleRemoveStaff = (indexToRemove : any) => {
    const updatedStaffList = selectedStaff.filter((_, index) => index !== indexToRemove);
    setSelectedStaff(updatedStaffList);
  };
  
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
          // transition: Bounce,
        />
        {/* Same as */}
        <ToastContainer />
      <div
        style={{
          width: "80%",
          backgroundColor: "#E9ECEF",
          marginTop: "20px",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Add New Shift</h3>
        <div>
          <Paper radius="md" p="xl">
            <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: "10px",
                }}
              >
                <DatePickerInput
                  label="Pick date"
                  valueFormat="YYYY MMM DD"
                  placeholder="Pick date"
                  {...form.getInputProps("date")}
                />

                <Select
                  label="Time"
                  data={[
                    { value: "7AM to 7PM", label: "7AM to 7PM" },
                    { value: "7PM to 7AM", label: "7PM to 7AM" },
                    { value: "9AM to 5PM", label: "9AM to 5PM" },
                  ]}
                  {...form.getInputProps("time")}
                />
                {/* <Select
                  label="Building"
                  data={buildings?.map((building) => ({
                    value: building._id,
                    label: building.name,
                  }))}
                  {...form.getInputProps("buildingId")}
                />
                 */}
                <Select
  label="Building"
  data={buildings?.map((building) => ({
    value: building._id,
    label: building.name,
  }))}
  onChange={(value) => {
    // Ensure `value` is treated as a string
    const selectedBuildingId = value as string;
    form.setFieldValue("buildingId", selectedBuildingId);
    setBuildingId(selectedBuildingId);
    form.setFieldValue("roomId", ""); // Reset roomId when building changes
  }}
/>

                <Select
                  label="Room"
                  data={rooms?.map((room) => ({
                    value: room._id,
                    label: room.number,
                  }))}
                  {...form.getInputProps("roomId")}
                />
              </div>
              {/* {selectedStaff?.map((staff) => (
                <div>
                  <h3>{staff.role}</h3>
                  <h3>{staff._id}</h3>
                </div>
              ))} */}
             <div>
  <h4>Selected Staff</h4>
  {selectedStaff.map((staff, index) => (
    <div key={index}>
      <p>{staff.name} - {staff.role} &nbsp; | &nbsp; <span onClick={() => handleRemoveStaff(index)} style={{color:'red', cursor:'pointer'}}>X</span></p>
    </div>
  ))}
</div>

              <Modal opened={opened} onClose={close} title="Add Staff">
                <div style={{ marginBottom: "15px" }}>
                  <Select
                    label="Role"
                    data={[
                      { value: "Doctor", label: "Doctor" },
                      { value: "Nurse", label: "Nurse" },
                      { value: "Admin", label: "Admin" },
                      { value: "Maintenance", label: "Maintenance" },
                      { value: "Other", label: "Other" },
                    ]}
                    value={role}
                    onChange={setRole}
                  />
                  <Select
                    label="Staff"
                    data={filteredStaff?.map((staff) => ({
                      value: staff._id,
                      label: staff.name,
                    }))}
                    onChange={setStaffId}
                  />
                </div>
                <Group justify="end" mt="xl">
                  <Button radius="xl" onClick={handleAddStaff}>
                    Add
                  </Button>
                </Group>
              </Modal>
              <Group justify="end" mt="xl">
                <Button radius="xl" onClick={open}>
                  Add Staff
                </Button>
              </Group>

              <Group justify="end" mt="xl">
                <Link to="/shifts" style={{ textDecoration: "none" }}>
                  <Button color="red" radius="xl">
                    {"Cancel"}
                  </Button>
                </Link>
                <Button type="submit" radius="xl">
                  {"Submit"}
                </Button>
              </Group>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AddShift;
