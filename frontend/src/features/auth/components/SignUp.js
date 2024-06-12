import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  createUserAsync,
  selectLoggedInUser,
  selectMessage,
} from "../authSlice";
import { Link, Navigate } from "react-router-dom";

export default function SignUp() {
  const user = useSelector(selectLoggedInUser);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 500,
    mt: "md",
  };

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

  const handleSubmit = (e) => {
    dispatch(createUserAsync(form.values));
    form.reset();
  };

  return (
    <>
      {/* {user && <Navigate to="/about"></Navigate>} */}
      <Container size="xs" {...demoProps}>
        <Paper radius="md" p="xl" pt="30px">
          <Text size="lg" fw={500}>
            Welcome to GoShifts
          </Text>

          <Divider labelPosition="center" my="lg" />

          <form onSubmit={form.onSubmit(() => handleSubmit())}>
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
              <Anchor component="button" type="button" c="dimmed" size="xs">
                <Link to="/login">{"Already have an account? Login"}</Link>
              </Anchor>
              <Button type="submit" radius="xl">
                {"Register"}
              </Button>
            </Group>
            {message && <p>{message}</p>}
          </form>
        </Paper>
      </Container>
    </>
  );
}
