import { Button } from "@mantine/core";
import { BuildingTable } from "../Components/Building/BuildingTable/BuildingTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { serverUrl } from "../utils/common";
import { BuildingTableScroll } from "../Components/Building/BuildingTableScroll/BuildingTableScroll";

interface BuildingState {
  name: string;
  type: string;
  city: string;
}

function BuildingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<BuildingState[]>([]);
  // const { good, setGood } = useState(faslse);
  // const datas = [
  //   {
  //     // _id: 1,
  //     name: "Eabox",
  //     type: "Kirsten",
  //     // floors: 1,
  //     // street: "8 Claremont Center",
  //     city: "Kafr Zaytā",
  //     // state: "Devi",
  //     // zipcode: "81",
  //   },
  //   {
  //     // _id: 2,
  //     name: "Eimbee",
  //     type: "Pen",
  //     // floors: 2,
  //     // street: "87167 La Follette Pass",
  //     city: "Lifuta",
  //     // state: "Frederique",
  //     // zipcode: "17",
  //   },
  //   {
  //     // _id: 3,
  //     name: "Trilia",
  //     type: "Dill",
  //     // floors: 3,
  //     // street: "9403 Buena Vista Avenue",
  //     city: "Oslo",
  //     // state: "Reinold",
  //     // zipcode: "1052",
  //   },
  //   {
  //     // _id: 4,
  //     name: "Gabcube",
  //     type: "Willey",
  //     // floors: 4,
  //     // street: "1020 Knutson Court",
  //     city: "Dangjiaxian",
  //     // state: "Cesaro",
  //     // zipcode: "4339",
  //   },
  //   {
  //     // _id: 5,
  //     name: "Yakijo",
  //     type: "Myrtia",
  //     // floors: 5,
  //     // street: "9 Colorado Crossing",
  //     city: "Togitsu",
  //     // state: "Caressa",
  //     // zipcode: "15",
  //   },
  // ];

  useEffect(() => {
    async function getAllBuildings() {
      const response = await fetch(`${serverUrl}/building/all`);
      const buildings = await response.json();
      console.log(buildings);
      // console.log(typeof datas);
      setData(buildings);
    }
    getAllBuildings();
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
          <h3>All Buildings</h3>
          <Button
            type="submit"
            radius="xl"
            onClick={() => {
              navigate("/building/add");
            }}
          >
            {"Add New Building"}
          </Button>
        </div>
        <div style={{ backgroundColor: "whitesmoke" }}>
          <BuildingTableScroll data={data} />
          {/* <BuildingTable data={data} /> */}
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

export default BuildingPage;
