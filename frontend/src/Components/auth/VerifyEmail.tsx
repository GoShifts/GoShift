import { Button, Container } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverUrl } from "../../utils/common";

function VerifyEmail() {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 500,
    mt: "md",
  };

  useEffect(() => {
    console.log("useEffect");
    const verifyEmailUrl = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/auth/${param.id}/verify/${param.token}`
        );
        // const url = `${serverUrl}/auth/${param.id}/verify/${param.token}`;
        // await fetch(url);
        console.log(response);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        // backgroundColor: "skyblue",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "500px",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
        }}
      >
        <Container size="xs" {...demoProps}>
          {validUrl ? (
            <>
              <h1>Email address verified successfully</h1>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button radius="xl">{"Login"}</Button>
              </Link>
            </>
          ) : (
            <h1>404 Not Found</h1>
          )}
        </Container>
      </div>
    </div>
  );
}

export default VerifyEmail;
