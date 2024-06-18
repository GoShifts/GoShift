import { Button, Group, Paper, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";

function AddBuilding() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      type: "",
      city: "",
      street: "",
      state: "",
      zip: "",
    },
  });

  const handleFormSubmit = async () => {
    console.log(form.values);
    try {
      const response = await fetch(`${serverUrl}/building/add`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        navigate("/building");
      } else {
        console.log("error");
      }
      //   if (data.message) {
      //     console.log(data.message);
      //     // setMsg(data.message);
      //     form.reset();
      //   } else {
      //     navigate("/dashboard");
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "#a1dae6",
          marginTop: "20px",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Add New Building</h3>
        {/* {form.values.type} */}
        <div>
          <Paper radius="md" p="xl">
            <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
              {/* <Stack> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <TextInput
                  required
                  label="Name"
                  placeholder="Building Name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                  mr="20px"
                />
                <Select
                  label="Type"
                  data={[
                    { value: "hospital", label: "Hospital" },
                    { value: "nursingHome", label: "Nursing Home" },
                  ]}
                  {...form.getInputProps("type")}
                  //   value={value ? value.value : null}
                  // onChange={() => form.setFieldValue("type", value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <TextInput
                  required
                  label="City"
                  placeholder="City Name"
                  value={form.values.city}
                  onChange={(event) =>
                    form.setFieldValue("city", event.currentTarget.value)
                  }
                  radius="md"
                  mr="20px"
                />
                <TextInput
                  required
                  label="State"
                  placeholder="State Name"
                  value={form.values.state}
                  onChange={(event) =>
                    form.setFieldValue("state", event.currentTarget.value)
                  }
                  radius="md"
                  mr="20px"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <TextInput
                  required
                  label="Street"
                  placeholder="Street Name"
                  value={form.values.street}
                  onChange={(event) =>
                    form.setFieldValue("street", event.currentTarget.value)
                  }
                  radius="md"
                  mr="20px"
                />
                <TextInput
                  required
                  label="Zip Code"
                  placeholder="Zip Code"
                  value={form.values.zip}
                  onChange={(event) =>
                    form.setFieldValue("zip", event.currentTarget.value)
                  }
                  radius="md"
                  mr="20px"
                />
              </div>
              <Group justify="end" mt="xl">
                <Link to="/building" style={{ textDecoration: "none" }}>
                  <Button color="red" radius="xl">
                    {"Cancel"}
                  </Button>
                </Link>
                <Button type="submit" radius="xl">
                  {"Submit"}
                </Button>
              </Group>
              {/* </Stack> */}
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AddBuilding;
