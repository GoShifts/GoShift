import { auth_constants } from "./constants";
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
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useState } from "react";
import { LoginFormValues, LoginErrorMessages, LoginProps } from "./types";

function LogIn() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
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
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message);
        setMsg(data.message);
        form.reset();
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper radius={auth_constants.fieldRadius} p="xl">
      <Text size={auth_constants.textSize} fw={500}>
        Welcome to GoShift | Login
      </Text>

      <Divider label="Login" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@goshift.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="sm"
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
            radius="sm"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Anchor component="button" type="button" c="dimmed" size="xs">
              {"Do not have an account? Register"}
            </Anchor>
          </Link>
          <Button type="submit" radius={auth_constants.buttonRadius}>
            {"Login"}
          </Button>
        </Group>
        {msg && <p>{msg}</p>}
      </form>
    </Paper>
  );
}

export default LogIn;
