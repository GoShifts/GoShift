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
import { LoginFormValues } from "./types";

function LogIn(): JSX.Element {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("");
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val: string) => (val ? null : auth_constants.login.validationError),
      password: (val: string) => (val ? null : auth_constants.login.validationError),
    },
  });

  // Login
  const handleFormSubmit = async (): Promise<void> => {
    console.log(form.values);
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const data: { message?: string } = await response.json();
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
        {auth_constants.welcome} | {auth_constants.login.title}
      </Text>

      <Divider label={auth_constants.login.title} labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder={auth_constants.emailField.placeholder}
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius={auth_constants.fieldRadius}
          />

          <PasswordInput
            required
            label="Password"
            placeholder={auth_constants.passwordField.placeholder}
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              auth_constants.login.validationError
            }
            radius={auth_constants.fieldRadius}
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <Anchor component="button" type="button" c="dimmed" size="xs">
              {auth_constants.login.register}
            </Anchor>
          </Link>
          <Button type="submit" radius={auth_constants.buttonRadius}>
            {auth_constants.login.title}
          </Button>
        </Group>
        {msg && <p>{msg}</p>}
      </form>
    </Paper>
  );
}

export default LogIn;
