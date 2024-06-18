import { NavbarNested } from "../Components/NavbarNested/NavbarNested";
import SignUpPage from "./auth/SignUpPage";

function DashboardPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* <NavbarNested /> */}
      </div>
      <div>
        {/* <SignUpPage /> */}
      </div>
    </div>
  );
}

export default DashboardPage;
