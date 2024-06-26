// import BarChart from "../Components/Chart/BarChart";
// import AreaChart from "../Components/Chart/ArearChart";
// import AreaChartComponent from "../Components/Chart/ArearChart";
// import BarChart from "../Components/Chart/BarChart";
// import LineChart from "../Components/Chart/LineChart";
import PieChart from "../Components/Chart/PieChart";
import React from "react";
import { Helmet } from "react-helmet";
import "./styles/shards-dashboards.1.1.0.min.css";
import "./styles/extras.1.1.0.min.css";
import "./DashboardPage.module.css";

import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { label: "A", value: 30 },
  { label: "B", value: 80 },
  { label: "C", value: 45 },
  { label: "D", value: 60 },
  { label: "E", value: 20 },
  { label: "F", value: 90 },
  { label: "G", value: 55 },
];

// Sample chart data
const pdata = [
  {
    name: "MongoDb",
    student: 11,
    fees: 120,
  },
  {
    name: "Javascript",
    student: 15,
    fees: 12,
  },
  {
    name: "PHP",
    student: 5,
    fees: 10,
  },
  {
    name: "Java",
    student: 10,
    fees: 5,
  },
  {
    name: "C#",
    student: 9,
    fees: 4,
  },
  {
    name: "C++",
    student: 10,
    fees: 8,
  },
];
interface AreaChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      fill?: boolean;
    }[];
  };
}

const chartData: AreaChartProps["data"] = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 20, 15, 25, 30, 27, 35],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      fill: true,
    },
    {
      label: "Dataset 2",
      data: [15, 25, 20, 30, 35, 32, 40],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      fill: true,
    },
  ],
};
interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor?: string[];
    }[];
  };
}
const pieChartData: PieChartProps["data"] = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      hoverBackgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
    },
  ],
};

function DashboardPage() {
  return (
    <></>
    // <div>
    //   {/* <Helmet> */}
    //   <link
    //     href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
    //     rel="stylesheet"
    //   />
    //   <link
    //     href="https://fonts.googleapis.com/icon?family=Material+Icons"
    //     rel="stylesheet"
    //   />
    //   <link
    //     rel="stylesheet"
    //     href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    //     integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    //   />
    //   <link
    //     rel="stylesheet"
    //     id="main-stylesheet"
    //     data-version="1.1.0"
    //     href="styles/shards-dashboards.1.1.0.min.css"
    //   />
    //   <link rel="stylesheet" href="styles/extras.1.1.0.min.css" />
    //   <script async defer src="https://buttons.github.io/buttons.js"></script>
    //   {/* </Helmet> */}
    //   <div className="color-switcher animated">
    //     <h5>Accent Color</h5>
    //     <ul className="accent-colors">
    //       <li className="accent-primary active" data-color="primary">
    //         <i className="material-icons">check</i>
    //       </li>
    //       <li className="accent-secondary" data-color="secondary">
    //         <i className="material-icons">check</i>
    //       </li>
    //       <li className="accent-success" data-color="success">
    //         <i className="material-icons">check</i>
    //       </li>
    //       <li className="accent-info" data-color="info">
    //         <i className="material-icons">check</i>
    //       </li>
    //       <li className="accent-warning" data-color="warning">
    //         <i className="material-icons">check</i>
    //       </li>
    //       <li className="accent-danger" data-color="danger">
    //         <i className="material-icons">check</i>
    //       </li>
    //     </ul>
    //     <div className="actions mb-4">
    //       <a
    //         className="mb-2 btn btn-sm btn-primary w-100 d-table mx-auto extra-action"
    //         href="https://designrevision.com/downloads/shards-dashboard-lite/"
    //       >
    //         <i className="material-icons">cloud</i> Download
    //       </a>
    //       <a
    //         className="mb-2 btn btn-sm btn-white w-100 d-table mx-auto extra-action"
    //         href="https://designrevision.com/docs/shards-dashboard-lite"
    //       >
    //         <i className="material-icons">book</i> Documentation
    //       </a>
    //     </div>
    //     <div className="social-wrapper">
    //       <div className="social-actions">
    //         <h5 className="my-2">Help us Grow</h5>
    //         <div className="inner-wrapper">
    //           <a
    //             className="github-button"
    //             href="https://github.com/DesignRevision/shards-dashboard"
    //             data-icon="octicon-star"
    //             data-show-count="true"
    //             aria-label="Star DesignRevision/shards-dashboard on GitHub"
    //           >
    //             Star
    //           </a>
    //         </div>
    //       </div>
    //       <div
    //         id="social-share"
    //         data-url="https://designrevision.com/downloads/shards-dashboard-lite/"
    //         data-text="🔥 Check out Shards Dashboard Lite, a free and beautiful Bootstrap 4 admin dashboard template!"
    //         data-title="share"
    //       ></div>
    //       <div className="loading-overlay">
    //         <div className="spinner"></div>
    //       </div>
    //     </div>
    //     <div className="close">
    //       <i className="material-icons">close</i>
    //     </div>
    //   </div>
    //   <div className="container-fluid">
    //     <div className="row">
    //       <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
    //         <div className="main-navbar sticky-top bg-white">
    //           <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
    //             <form
    //               action="#"
    //               className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
    //             >
    //               <div className="input-group input-group-seamless ml-3">
    //                 <input
    //                   className="navbar-search form-control"
    //                   type="text"
    //                   placeholder="Search for something..."
    //                   aria-label="Search"
    //                 />{" "}
    //               </div>
    //             </form>
    //           </nav>
    //         </div>

    //         <div className="main-content-container container-fluid px-4">
    //           <div className="page-header row no-gutters py-4">
    //             <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
    //               <span className="text-uppercase page-subtitle">
    //                 Dashboard
    //               </span>
    //               <h3 className="page-title">Overview</h3>
    //             </div>
    //           </div>

    //           <div className="row12">
    //             <div className="item12 col-lg col-md-6 col-sm-6 mb-4 ">
    //               <div className="stats-small stats-small--1 card card-small">
    //                 <div className="card-body p-0 d-flex">
    //                   <div className="d-flex flex-column m-auto">
    //                     <div className="stats-small__data text-center">
    //                       <span className="stats-small__label text-uppercase">
    //                         Posts
    //                       </span>
    //                       <h6 className="stats-small__value count my-3">
    //                         2,390
    //                       </h6>
    //                     </div>
    //                     <div className="stats-small__data">
    //                       <span className="stats-small__percentage stats-small__percentage--increase">
    //                         4.7%
    //                       </span>
    //                     </div>
    //                   </div>
    //                   <canvas
    //                     height="120"
    //                     className="blog-overview-stats-small-1"
    //                   ></canvas>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="item12 col-lg col-md-6 col-sm-6 mb-4">
    //               <div className="stats-small stats-small--1 card card-small">
    //                 <div className="card-body p-0 d-flex">
    //                   <div className="d-flex flex-column m-auto">
    //                     <div className="stats-small__data text-center">
    //                       <span className="stats-small__label text-uppercase">
    //                         Pages
    //                       </span>
    //                       <h6 className="stats-small__value count my-3">182</h6>
    //                     </div>
    //                     <div className="stats-small__data">
    //                       <span className="stats-small__percentage stats-small__percentage--increase">
    //                         12.4%
    //                       </span>
    //                     </div>
    //                   </div>
    //                   <canvas
    //                     height="120"
    //                     className="blog-overview-stats-small-2"
    //                   ></canvas>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="item12 col-lg col-md-4 col-sm-6 mb-4">
    //               <div className="stats-small stats-small--1 card card-small">
    //                 <div className="card-body p-0 d-flex">
    //                   <div className="d-flex flex-column m-auto">
    //                     <div className="stats-small__data text-center">
    //                       <span className="stats-small__label text-uppercase">
    //                         Comments
    //                       </span>
    //                       <h6 className="stats-small__value count my-3">
    //                         8,147
    //                       </h6>
    //                     </div>
    //                     <div className="stats-small__data">
    //                       <span className="stats-small__percentage stats-small__percentage--decrease">
    //                         3.8%
    //                       </span>
    //                     </div>
    //                   </div>
    //                   <canvas
    //                     height="120"
    //                     className="blog-overview-stats-small-3"
    //                   ></canvas>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="item12 col-lg col-md-4 col-sm-6 mb-4">
    //               <div className="stats-small stats-small--1 card card-small">
    //                 <div className="card-body p-0 d-flex">
    //                   <div className="d-flex flex-column m-auto">
    //                     <div className="stats-small__data text-center">
    //                       <span className="stats-small__label text-uppercase">
    //                         Users
    //                       </span>
    //                       <h6 className="stats-small__value count my-3">
    //                         2,413
    //                       </h6>
    //                     </div>
    //                     <div className="stats-small__data">
    //                       <span className="stats-small__percentage stats-small__percentage--increase">
    //                         12.4%
    //                       </span>
    //                     </div>
    //                   </div>
    //                   <canvas
    //                     height="120"
    //                     className="blog-overview-stats-small-4"
    //                   ></canvas>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="item12 col-lg col-md-4 col-sm-12 mb-4">
    //               <div className="stats-small stats-small--1 card card-small">
    //                 <div className="card-body p-0 d-flex">
    //                   <div className="d-flex flex-column m-auto">
    //                     <div className="stats-small__data text-center">
    //                       <span className="stats-small__label text-uppercase">
    //                         Subscribers
    //                       </span>
    //                       <h6 className="stats-small__value count my-3">
    //                         17,281
    //                       </h6>
    //                     </div>
    //                     <div className="stats-small__data">
    //                       <span className="stats-small__percentage stats-small__percentage--decrease">
    //                         2.4%
    //                       </span>
    //                     </div>
    //                   </div>
    //                   <canvas
    //                     height="120"
    //                     className="blog-overview-stats-small-5"
    //                   ></canvas>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="row12">
    //             <div className="item13 col-lg-8 col-md-12 col-sm-12 mb-4">
    //               <div className="card card-small">
    //                 <div className="card-header border-bottom">
    //                   <h6 className="m-0">Users</h6>
    //                 </div>
    //                 <div className="card-body pt-0">
    //                   <div className="row border-bottom py-2 bg-light">
    //                     <div className="col-12 col-sm-6">
    //                       <div
    //                         id="blog-overview-date-range"
    //                         className="input-daterange input-group input-group-sm my-auto ml-auto mr-auto ml-sm-auto mr-sm-0"
    //                         style={{ maxWidth: "100% !important" }}
    //                       >
    //                         <input
    //                           type="text"
    //                           className="input-sm form-control"
    //                           name="start"
    //                           placeholder="Start Date"
    //                           id="blog-overview-date-range-1"
    //                         />
    //                         <input
    //                           type="text"
    //                           className="input-sm form-control"
    //                           name="end"
    //                           placeholder="End Date"
    //                           id="blog-overview-date-range-2"
    //                         />
    //                         <span className="input-group-append">
    //                           <span className="input-group-text">
    //                             <i className="material-icons"></i>
    //                           </span>
    //                         </span>
    //                       </div>
    //                     </div>
    //                     <div className="col-12 col-sm-6 d-flex mb-2 mb-sm-0">
    //                       <button
    //                         type="button"
    //                         className="btn btn-sm btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
    //                       >
    //                         View Full Report &rarr;
    //                       </button>
    //                     </div>
    //                   </div>
    //                   <ResponsiveContainer width="140%" aspect={3}>
    //                     <LineChart
    //                       data={pdata}
    //                       margin={{ right: 300, top: 30 }}
    //                     >
    //                       <CartesianGrid />
    //                       <XAxis dataKey="name" interval={"preserveStartEnd"} />
    //                       <YAxis></YAxis>
    //                       <Legend />
    //                       <Tooltip />
    //                       <Line
    //                         dataKey="student"
    //                         stroke="black"
    //                         activeDot={{ r: 8 }}
    //                       />
    //                       <Line
    //                         dataKey="fees"
    //                         stroke="red"
    //                         activeDot={{ r: 8 }}
    //                       />
    //                     </LineChart>
    //                   </ResponsiveContainer>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="item13 col-lg-4 col-md-6 col-sm-12 mb-4">
    //               <div className="card card-small h-100">
    //                 <div className="card-header border-bottom">
    //                   <h6 className="m-0">Users by device</h6>
    //                 </div>
    //                 <div className="pieChart">
    //                   <PieChart data={pieChartData} />
    //                   <PieChart data={pieChartData} />
    //                 </div>
    //                 <div className="card-footer border-top">
    //                   <div className="row">
    //                     <div className="col text-right view-report">
    //                       <a href="#">Full report &rarr;</a>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="row12">
    //             <div className="item13 col-lg-3 col-md-12 col-sm-12 mb-4">
    //               <div className="card card-small">
    //                 <div className="card-header border-bottom">
    //                   <h6 className="m-0">Top Referrals</h6>
    //                 </div>
    //                 <div className="card-body p-0">
    //                   <ul className="list-group list-group-small list-group-flush">
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         GitHub
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         19,291
    //                       </span>
    //                     </li>
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         Stack Overflow
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         11,201
    //                       </span>
    //                     </li>
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         Hacker News
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         9,291
    //                       </span>
    //                     </li>
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         Reddit
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         8,281
    //                       </span>
    //                     </li>
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         The Next Web
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         7,128
    //                       </span>
    //                     </li>
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         Tech Crunch
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         6,218
    //                       </span>
    //                     </li>
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         YouTube
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         1,218
    //                       </span>
    //                     </li>
    //                     <li className="list-group-item d-flex px-3">
    //                       <span className="text-semibold text-fiord-blue">
    //                         Adobe
    //                       </span>
    //                       <span className="ml-auto text-right text-semibold text-reagent-gray">
    //                         827
    //                       </span>
    //                     </li>
    //                   </ul>
    //                 </div>
    //                 <div className="card-footer border-top">
    //                   <div className="row">
    //                     <div className="col">
    //                       <select className="custom-select custom-select-sm">
    //                         <option selected>Last Week</option>
    //                         <option value="1">Today</option>
    //                         <option value="2">Last Month</option>
    //                         <option value="3">Last Year</option>
    //                       </select>
    //                     </div>
    //                     <div className="col text-right view-report">
    //                       <a href="#">Full report &rarr;</a>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="item13 col-lg-5 col-md-12 col-sm-12 mb-4">
    //               <div className="card card-small blog-comments">
    //                 <div className="card-header border-bottom">
    //                   <h6 className="m-0">Discussions</h6>
    //                 </div>
    //                 <div className="card-body p-0">
    //                   <div className="blog-comments__item d-flex p-3">
    //                     <div className="blog-comments__avatar mr-3">
    //                       <img src="images/avatars/1.jpg" alt="User avatar" />{" "}
    //                     </div>
    //                     <div className="blog-comments__content">
    //                       <div className="blog-comments__meta text-muted">
    //                         <a className="text-secondary" href="#">
    //                           James Johnson
    //                         </a>{" "}
    //                         on
    //                         <a className="text-secondary" href="#">
    //                           Hello World!
    //                         </a>
    //                         <span className="text-muted">– 3 days ago</span>
    //                       </div>
    //                       <p className="m-0 my-1 mb-2 text-muted">
    //                         Well, the way they make shows is, they make one show
    //                         ...
    //                       </p>
    //                       <div className="blog-comments__actions">
    //                         <div className="btn-group btn-group-sm">
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-success">
    //                               <i className="material-icons">check</i>
    //                             </span>{" "}
    //                             Approve{" "}
    //                           </button>
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-danger">
    //                               <i className="material-icons">clear</i>
    //                             </span>{" "}
    //                             Reject{" "}
    //                           </button>
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-light">
    //                               <i className="material-icons">more_vert</i>
    //                             </span>{" "}
    //                             Edit{" "}
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="blog-comments__item d-flex p-3">
    //                     <div className="blog-comments__avatar mr-3">
    //                       <img src="images/avatars/2.jpg" alt="User avatar" />{" "}
    //                     </div>
    //                     <div className="blog-comments__content">
    //                       <div className="blog-comments__meta text-muted">
    //                         <a className="text-secondary" href="#">
    //                           James Johnson
    //                         </a>{" "}
    //                         on
    //                         <a className="text-secondary" href="#">
    //                           Hello World!
    //                         </a>
    //                         <span className="text-muted">– 4 days ago</span>
    //                       </div>
    //                       <p className="m-0 my-1 mb-2 text-muted">
    //                         After the avalanche, it took us a week to climb out.
    //                         Now...
    //                       </p>
    //                       <div className="blog-comments__actions">
    //                         <div className="btn-group btn-group-sm">
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-success">
    //                               <i className="material-icons">check</i>
    //                             </span>{" "}
    //                             Approve{" "}
    //                           </button>
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-danger">
    //                               <i className="material-icons">clear</i>
    //                             </span>{" "}
    //                             Reject{" "}
    //                           </button>
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-light">
    //                               <i className="material-icons">more_vert</i>
    //                             </span>{" "}
    //                             Edit{" "}
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="blog-comments__item d-flex p-3">
    //                     <div className="blog-comments__avatar mr-3">
    //                       <img src="images/avatars/3.jpg" alt="User avatar" />{" "}
    //                     </div>
    //                     <div className="blog-comments__content">
    //                       <div className="blog-comments__meta text-muted">
    //                         <a className="text-secondary" href="#">
    //                           James Johnson
    //                         </a>{" "}
    //                         on
    //                         <a className="text-secondary" href="#">
    //                           Hello World!
    //                         </a>
    //                         <span className="text-muted">– 5 days ago</span>
    //                       </div>
    //                       <p className="m-0 my-1 mb-2 text-muted">
    //                         My money's in that office, right? If she start
    //                         giving me...
    //                       </p>
    //                       <div className="blog-comments__actions">
    //                         <div className="btn-group btn-group-sm">
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-success">
    //                               <i className="material-icons">check</i>
    //                             </span>{" "}
    //                             Approve{" "}
    //                           </button>
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-danger">
    //                               <i className="material-icons">clear</i>
    //                             </span>{" "}
    //                             Reject{" "}
    //                           </button>
    //                           <button type="button" className="btn btn-white">
    //                             <span className="text-light">
    //                               <i className="material-icons">more_vert</i>
    //                             </span>{" "}
    //                             Edit{" "}
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="card-footer border-top">
    //                   <div className="row">
    //                     <div className="col text-center view-report">
    //                       <button type="submit" className="btn btn-white">
    //                         View All Comments
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </main>
    //     </div>
    //   </div>

    //   <script
    //     src="https://code.jquery.com/jquery-3.3.1.min.js"
    //     integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    //   ></script>
    //   <script
    //     src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
    //     integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
    //   ></script>
    //   <script
    //     src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    //     integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
    //   ></script>
    //   <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
    //   <script src="https://unpkg.com/shards-ui@latest/dist/js/shards.min.js"></script>
    //   <script src="https://cdnjs.cloudflare.com/ajax/libs/Sharrre/2.0.1/jquery.sharrre.min.js"></script>
    //   <script src="scripts/extras.1.1.0.min.js"></script>
    //   <script src="scripts/shards-dashboards.1.1.0.min.js"></script>
    //   <script src="scripts/app/app-blog-overview.1.1.0.js"></script>
    // </div>
  );
}

export default DashboardPage;
