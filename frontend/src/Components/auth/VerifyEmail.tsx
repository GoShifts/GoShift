import { auth_constants } from "./constants";
import { Button, Container } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverUrl } from "../../utils/common";

function VerifyEmail(): JSX.Element {
  const [validUrl, setValidUrl] = useState<boolean>(true);
  const param = useParams<{ id: string; token: string }>();
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 500,
    mt: "md",
  };

  useEffect(() => {
    console.log("useEffect");
    const verifyEmailUrl = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${serverUrl}/auth/${param.id}/verify/${param.token}`
        );
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
              <h1>{auth_constants.verifyEmail.success}</h1>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button radius={auth_constants.buttonRadius}>{"Login"}</Button>
              </Link>
            </>
          ) : (
            <h1>{auth_constants.verifyEmail.notFound}</h1>
          )}
        </Container>
      </div>
    </div>
  );
}

export default VerifyEmail;
