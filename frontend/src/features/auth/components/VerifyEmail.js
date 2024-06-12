import { Button, Container, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 500,
    mt: "md",
  };

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8000/auth/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Container size="xs" {...demoProps}>
      {validUrl ? (
        <>
          <h1>Email address verified successfully</h1>
          <Link to="/login">
          <Button radius="xl">
            {"Login"}
          </Button>
          </Link>
        </>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Container>
  );
}
