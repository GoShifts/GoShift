import { ForgotPassword } from "../../Components/ForgotPassword/ForgotPassword";

function ForgotPasswordPage() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "skyblue",
        // backgroundImage: "/assets/theme/background.jpg",
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
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
