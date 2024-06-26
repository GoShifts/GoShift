import {
  Paper,
  Title,
  TextInput,
  Button,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Divider,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./ForgotPassword.module.css";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ForgotPassword() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  const handleFormSubmit = async () => {
    console.log("Forgot Password");
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/auth/forgot`, {
        method: "POST",
        body: JSON.stringify(form.values),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message);
        // setMsg(data.message);
        toast(data.message);
        form.reset();
        setLoading(false);
      }
      // else {
      //   navigate("/dashboard");
      // }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Divider my="lg" />

      {/* <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text> */}

      <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
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
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Box ml={5}>Back to the login page</Box>
              </Link>
            </Center>
          </Anchor>
          {loading ? (
            ""
          ) : (
            <Button type="submit" className={classes.control}>
              Send reset Link
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
  );
}
