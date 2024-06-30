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
  Flex
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import React, { useState } from "react";
// import { useToast } from "@chakra-ui/react";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogInStaff({ setIsAuth }: Props) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // const toast = useToast();
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
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/staff/login`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const user = await response.json();
      console.log(user)
      // return;

      if (user.message) {
        // console.log(user.message);
        // setMsg(user.message);
        toast("Invalid Username or Password");
        form.reset();
        setLoading(false);
      } else {
        localStorage.setItem("staffid", user.staffId);
        localStorage.setItem("stafftoken", user.token);
        setIsAuth(true);
        setLoading(false);
        navigate("/staffHomepage");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: '100vh'}} // Full height of the viewport
    >
    <Paper radius="md" p="xl">
      <Text size="lg" fw={500}>
        Welcome to GoShift - Staff
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
          <Link to="/staff/forgot" style={{ textDecoration: "none" }}>
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

        <Group justify="end" mt="xl">
          {/* <Link to="/register" style={{ textDecoration: "none" }}>
            <Anchor component="button" type="button" c="dimmed" size="xs">
              {"Do not have an account? Register"}
            </Anchor>
          </Link> */}
          {loading ? (
            ""
          ) : (
            <Button type="submit" radius="xl">
              {"Login"}
            </Button>
          )}
        </Group>
        {msg && <p>{msg}</p>}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition: Bounce,
        />
        {/* Same as */}
        <ToastContainer />
      </form>
    </Paper>
    </Flex>
  );
}

export default LogInStaff;
