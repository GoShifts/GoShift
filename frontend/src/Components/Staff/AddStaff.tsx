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
import { useState } from "react";

function AddStaff() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      role: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  // Submit Form to database
  const handleFormSubmit = async () => {
    console.log(form.values);
    const userId = localStorage.getItem("id");
    const staffData = { ...form.values, userId: userId };
    try {
      const response = await fetch(`${serverUrl}/staff/add`, {
        method: "POST",
        body: JSON.stringify(staffData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        form.reset();
        navigate("/staff");
      } else {
        console.log("Error");
      }
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
          backgroundColor: "#E9ECEF",
          marginTop: "20px",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Add New Staff</h3>
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
              <Stack>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
                <Select
                  label="Role"
                  data={[
                    { value: "Doctor", label: "Doctor" },
                    { value: "Nurse", label: "Nurse" },
                    { value: "Admin", label: "Admin" },
                    { value: "Maintenance", label: "Maintenance" },
                    { value: "Other", label: "Other" },
                  ]}
                  {...form.getInputProps("role")}
                />
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                  radius="md"
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                  radius="md"
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
