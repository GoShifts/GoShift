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
import { loginUserAsync, selectError, selectLoggedInUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 500,
    mt: "md",
  };

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

  const handleSubmit = (e) => {
    dispatch(loginUserAsync(form.values));
  };

  return (
    <>
      {user && <Navigate to="/dashboard"></Navigate>}
      <Container size="xs" {...demoProps}>
        <Paper radius="md" p="xl" pt="30px">
          <Text size="lg" fw={500}>
            Welcome to GoShifts
          </Text>

          <Divider labelPosition="center" my="lg" />

          <form onSubmit={form.onSubmit(() => handleSubmit())}>
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
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor component="button" type="button" c="dimmed" size="xs">
                <Link to="/">{"Don't have an account? Register"}</Link>
              </Anchor>
              <Button type="submit" radius="xl">
                {"Login"}
              </Button>
            </Group>
            {error && <p>{error || error.message}</p>}
          </form>
        </Paper>
      </Container>
    </>
  );
}
