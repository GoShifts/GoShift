import { Paper, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

function AddShift() {
  const form = useForm({
    initialValues: {
      name: "",
      type: "",
    },
  });
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
            <form>
              {/* <Stack> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                    { value: "doctor", label: "Doctor" },
                    { value: "nurse", label: "Nurse" },
                    { value: "admin", label: "Admin" },
                    { value: "maintenance", label: "Maintenance" },
                    { value: "other", label: "Other" },
                  ]}
                  {...form.getInputProps("type")}
                  //   value={value ? value.value : null}
                  // onChange={() => form.setFieldValue("type", value)}
                />
              </div>
              {/* </Stack> */}
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AddShift;
