import {
  Button,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Modal,
} from "@mantine/core";
import { DateInput, DatePicker, DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useDisclosure } from "@mantine/hooks";

interface BuildingState {
  _id: string;
  name: string;
  type: string;
  city: string;
}

interface StaffState {
  _id: string;
  name: string;
  role: string;
}

interface SelectedStaffState {
  _id: string | null;
  role: string | null;
}

function AddShift() {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState<BuildingState[]>([]);
  const [staff, setStaff] = useState<StaffState[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<SelectedStaffState[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<StaffState[]>([]);
  const [role, setRole] = useState<string | null>("");
  const [staffId, setStaffId] = useState<string | null>("");
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      date: new Date(),
      time: "",
      buildingId: "",
    },
  });

  // submit form to the database
  const handleFormSubmit = async () => {
    console.log(form.values);
    // const userId = localStorage.getItem("id");
    // const roomData = { ...form.values, userId: userId };
    // // return;
    // try {
    //   const response = await fetch(`${serverUrl}/room/add`, {
    //     method: "POST",
    //     body: JSON.stringify(roomData),
    //     headers: { "content-type": "application/json" },
    //   });
    //   const data = await response.json();
    //   if (data) {
    //     console.log(data);
    //     form.reset();
    //     navigate("/rooms");
    //   } else {
    //     console.log("Error");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleAddStaff = () => {
    setSelectedStaff([...selectedStaff, { _id: staffId, role: role }]);
    console.log(selectedStaff);
    close();
  };

  useEffect(() => {
    async function getAllBuildings() {
      const userId = localStorage.getItem("id");
      const buildingResponse = await fetch(
        `${serverUrl}/building/all/` + userId
      );
      const buildings = await buildingResponse.json();
      setBuildings(buildings);
      const staffResponse = await fetch(`${serverUrl}/staff/all/` + userId);
      const staff = await staffResponse.json();
      setStaff(staff);
    }
    getAllBuildings();
  }, []);

  useEffect(() => {
    let data = staff.filter((staff) => staff.role === role);
    setFilteredStaff(data);
  }, [role]);

  useEffect(() => {
    async function getAllBuildings() {
      const userId = localStorage.getItem("id");
      const response = await fetch(`${serverUrl}/building/all/` + userId);
      const buildings = await response.json();
      setBuildings(buildings);
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Add New Shift</h3>
        {/* {form.values.type} */}
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
                <Select
                  label="Building"
                  data={buildings?.map((building) => ({
                    value: building._id,
                    label: building.name,
                  }))}
                  {...form.getInputProps("buildingId")}
                />
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
