import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Select,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useEffect, useState } from "react";

interface BuildingState {
  _id: string;
  name: string;
  type: string;
  city: string;
}

function AddStaff() {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState<BuildingState[]>([]);

  const form = useForm({
    initialValues: {
      number: "",
      type: "",
      status: "",
      bedType: "",
      buildingId: "",
    },
  });

  // Submit Form to database
  const handleFormSubmit = async () => {
    // console.log(form.values);
    const userId = localStorage.getItem("id");
    const roomData = { ...form.values, userId: userId };
    // return;
    try {
      const response = await fetch(`${serverUrl}/room/add`, {
        method: "POST",
        body: JSON.stringify(roomData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        form.reset();
        navigate("/rooms");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <h3>Add New Room</h3>
        {/* {form.values.type} */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper radius="md" p="xl">
            <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
              {/* <form> */}
              <Stack>
                <TextInput
                  label="Number"
                  placeholder="Room Number"
                  value={form.values.number}
                  onChange={(event) =>
                    form.setFieldValue("number", event.currentTarget.value)
                  }
                  radius="md"
                />
                <Select
                  label="Type"
                  data={[
                    { value: "Single", label: "Single" },
                    { value: "Double", label: "Double" },
                    { value: "Suite", label: "Suite" },
                  ]}
                  {...form.getInputProps("type")}
                />
                <Select
                  label="Status"
                  data={[
                    { value: "Occupied", label: "Occupied" },
                    { value: "Available", label: "Available" },
                    { value: "Under Maintenance", label: "Under Maintenance" },
                  ]}
                  {...form.getInputProps("status")}
                />
                <Select
                  label="Bed Types"
                  data={[
                    { value: "Standard", label: "Standard" },
                    { value: "ICU", label: "ICU" },
                  ]}
                  {...form.getInputProps("bedType")}
                />
                <Select
                  label="Building"
                  data={buildings?.map((building) => ({
                    value: building._id,
                    label: building.name,
                  }))}
                  {...form.getInputProps("buildingId")}
                />
              </Stack>

              <Group justify="space-between" mt="xl">
                <Link to="/staff" style={{ textDecoration: "none" }}>
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

export default AddStaff;
