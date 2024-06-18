import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { StaffTableScroll } from "../Components/Staff/StaffTable/StaffTableScroll";
import { useEffect, useState } from "react";
import { serverUrl } from "../utils/common";

interface StaffState {
  name: string;
  role: string;
}

function StaffPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<StaffState[]>([]);

  useEffect(() => {
    async function getAllStaff() {
      const response = await fetch(`${serverUrl}/staff/all`);
      const staff = await response.json();
      console.log(staff);
      // console.log(staff);
      setData(staff);
    }
    getAllStaff();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "#a1dae6",
          marginTop: "20px",
          padding: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h3>All Staff</h3>
          <Button
            type="submit"
            radius="xl"
            onClick={() => {
              navigate("/staff/add");
            }}
          >
            {"Add New Staff"}
          </Button>
        </div>
        <div style={{ backgroundColor: "whitesmoke" }}>
          <StaffTableScroll data={data} />
          {/* {data.map((bul) => (
          <>
            <div>{bul.name}</div>
            <div>{bul.type}</div>
            <div>{bul.city}</div>
          </>
        ))} */}
        </div>
      </div>
    </div>
  );
}

export default StaffPage;
