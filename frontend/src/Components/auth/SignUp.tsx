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
} from "@mantine/core";
import { Link } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useState } from "react";

function SignUp() {
  const [msg, setMsg] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
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
    try {
      const response = await fetch(`${serverUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        form.reset();
        setMsg(data.message);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper radius="md" p="xl">
      <Text size="lg" fw={500}>
        Welcome to GoShift
      </Text>
      <Divider label="Register" labelPosition="center" my="lg" />
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
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Anchor component="button" type="button" c="dimmed" size="xs">
              {"Already have an account? Login"}
            </Anchor>
          </Link>
          <Button type="submit" radius="xl">
            {"Register"}
          </Button>
        </Group>
        {msg && <p>{msg}</p>}
      </form>
    </Paper>
  );
}

export default SignUp;
