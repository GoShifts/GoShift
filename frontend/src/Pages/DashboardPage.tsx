

// const data = [
//   { label: "A", value: 30 },
//   { label: "B", value: 80 },
//   { label: "C", value: 45 },
//   { label: "D", value: 60 },
//   { label: "E", value: 20 },
//   { label: "F", value: 90 },
//   { label: "G", value: 55 },
// ];

import Dashboard from "../Components/Dashboard/Dashboard";

// const linedata = [
//   { x: 0, y: 10 },
//   { x: 1, y: 20 },
//   { x: 2, y: 15 },
//   { x: 3, y: 25 },
//   { x: 4, y: 30 },
//   { x: 5, y: 35 },
//   { x: 6, y: 40 },
// ];

// interface AreaChartProps {
//   data: {
//     labels: string[];
//     datasets: {
//       label: string;
//       data: number[];
//       backgroundColor: string;
//       borderColor: string;
//       fill?: boolean;
//     }[];
//   };
// }

// const chartData: AreaChartProps["data"] = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [10, 20, 15, 25, 30, 27, 35],
//       backgroundColor: "rgba(54, 162, 235, 0.2)",
//       borderColor: "rgba(54, 162, 235, 1)",
//       fill: true,
//     },
//     {
//       label: "Dataset 2",
//       data: [15, 25, 20, 30, 35, 32, 40],
//       backgroundColor: "rgba(255, 99, 132, 0.2)",
//       borderColor: "rgba(255, 99, 132, 1)",
//       fill: true,
//     },
//   ],
// };
// interface PieChartProps {
//   data: {
//     labels: string[];
//     datasets: {
//       label: string;
//       data: number[];
//       backgroundColor: string[];
//       hoverBackgroundColor?: string[];
//     }[];
//   };
// }
// const pieChartData: PieChartProps["data"] = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       hoverBackgroundColor: [
//         "rgba(255, 99, 132, 0.8)",
//         "rgba(54, 162, 235, 0.8)",
//         "rgba(255, 206, 86, 0.8)",
//         "rgba(75, 192, 192, 0.8)",
//         "rgba(153, 102, 255, 0.8)",
//         "rgba(255, 159, 64, 0.8)",
//       ],
//     },
//   ],
// };



function DashboardPage() {
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
      <Dashboard/>
    </div>
  );
}

export default DashboardPage;

// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "10px",
//   }}
// >
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       width: "80%",
//       marginBottom: "20px",
//     }}
//   >
//     <BarChart data={data} width={400} height={300} barColor="salmon" />
//     <LineChart
//       data={linedata}
//       width={600}
//       height={400}
//       strokeColor="green"
//     />
//   </div>
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       width: "80%",
//     }}
//   >
//     <div>
//       <AreaChart data={chartData} />
//     </div>
//     <div>
//       <PieChart data={pieChartData} />
//     </div>
//     {/* <h1>hello 1</h1> */}
//     {/* <h1>hello 2</h1> */}
//   </div>
// </div>
