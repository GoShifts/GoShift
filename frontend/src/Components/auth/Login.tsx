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
import React, { useState } from "react";

interface Props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogIn({ setIsAuth }: Props) {
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
    // console.log(form.values);
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const user = await response.json();
      if (user.message) {
        console.log(user.message);
        setMsg(user.message);
        form.reset();
      } else {
        localStorage.setItem("id", user.userId);
        localStorage.setItem("token", user.token);
        setIsAuth(true);
        navigate("/");
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

      <Divider label="Login" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
        <Stack>
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
          <Link to="/forgot" style={{ textDecoration: "none" }}>
            <Anchor
              // onClick={(event) => event.preventDefault()}
              pt={2}
              fw={500}
              fz="xs"
            >
              Forgot your password?
            </Anchor>
          </Link>
        </Stack>

        <Group justify="space-between" mt="xl">
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Anchor component="button" type="button" c="dimmed" size="xs">
              {"Do not have an account? Register"}
            </Anchor>
          </Link>
          <Button type="submit" radius="xl">
            {"Login"}
          </Button>
        </Group>
        {msg && <p>{msg}</p>}
      </form>
    </Paper>
  );
}

export default LogIn;
