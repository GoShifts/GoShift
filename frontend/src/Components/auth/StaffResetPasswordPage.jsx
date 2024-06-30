

import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useState } from "react";

function StaffResetPasswordPage() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [msg, setMsg] = useState("");
  const form = useForm({
    initialValues: {
      password: "",
    },

    validate: {
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  // Submit Form to database
  const handleFormSubmit = async () => {
    console.log(form.values);
    console.log(id);
    try {
      const response = await fetch(`${serverUrl}/auth/reset/staff/${id}`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message);
        setMsg(data.message);
        form.reset();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Paper radius="md" p="xl" style={{width:'30%'}}>
      <Text size="lg" fw={500}>
        Reset Password
      </Text>

      <Divider my="lg" />

      <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
        <Stack>
          <PasswordInput
            required
            label="Enter New Password"
            placeholder="Enter new password"
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

        <Group justify="right" mt="xl">
          {/* <Link to="/" style={{ textDecoration: "none" }}>
            <Anchor component="button" type="button" c="dimmed" size="xs">
              {"Do not have an account? Register"}
            </Anchor>
          </Link> */}
          <Button type="submit" radius="xl">
            {"Update"}
          </Button>
        </Group>
        {msg && <p>{msg}</p>}
      </form>
    </Paper>
    </div>
  );
}

export default StaffResetPasswordPage;
