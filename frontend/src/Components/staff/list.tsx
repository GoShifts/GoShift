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

 // Staff List
  const GetStaff = () => {
    const navigate = useNavigate();
    const form = useForm({
      initialValues: {
        email: "",
        password: "",
      },
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      },
    });
    const handleFormSubmit = async () => {
      console.log(form.values);
      try {
        const response = await fetch(`${serverUrl}/staff`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div>
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>    
    );
  };



export default GetStaff;
