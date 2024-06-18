import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { StaffTableScroll } from "../Components/Staff/StaffTable/StaffTableScroll";
import { useEffect, useState } from "react";
import { serverUrl } from "../utils/common";
import { RoomTableScroll } from "../Components/Room/RoomTable/RoomTableScroll";

interface RoomState {
  number: string;
  type: string;
  status: string;
  bedType: string;
  building: string;
}

function RoomPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<RoomState[]>([]);

  useEffect(() => {
    async function getAllRooms() {
      const response = await fetch(`${serverUrl}/room/all`);
      const room = await response.json();
      console.log(room);
      // console.log(staff);
      setData(room);
    }
    getAllRooms();
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
          <h3>All Rooms</h3>
          <Button
            type="submit"
            radius="xl"
            onClick={() => {
              navigate("/room/add");
            }}
          >
            {"Add New Room"}
          </Button>
        </div>
        <div style={{ backgroundColor: "whitesmoke" }}>
          <RoomTableScroll data={data} />
          {/* <StaffTableScroll data={data} /> */}
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

export default RoomPage;
