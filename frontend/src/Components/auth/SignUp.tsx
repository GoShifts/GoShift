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
import { Link } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useState } from "react";
import { SignUpFormValues, SignUpErrorMessages, SignUpResponse, SignUpProps } from "./types";

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
    <Paper radius={auth_constants.fieldRadius} p="xl">
      <Text size={auth_constants.textSize} fw={500}>
        Welcome to GoShift | Sign Up
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
            radius="sm"
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
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Anchor component="button" type="button" c="dimmed" size="xs">
              {"Already have an account? Login"}
            </Anchor>
          </Link>
          <Button type="submit" radius={auth_constants.buttonRadius}>
            {"Register"}
          </Button>
        </Group>
        {msg && <p>{msg}</p>}
      </form>
    </Paper>
  );
}

export default SignUp;
