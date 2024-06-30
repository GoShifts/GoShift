// import BarChart from "../Components/Chart/BarChart";
import AreaChart from "../Components/Chart/ArearChart";
import AreaChartComponent from "../Components/Chart/ArearChart";
import BarChart from "../Components/Chart/BarChart";
// import LineChart from "../Components/Chart/LineChart";
// import PieChart from "../Components/Chart/PieChart";
import { PieChart } from 'react-minimal-pie-chart';

import {Helmet} from "react-helmet";
import "../Pages/styles/shards-dashboards.1.1.0.min.css";
import "../Pages/styles/extras.1.1.0.min.css";
import '../Pages/Dashboardstyle.css';
import React, { useEffect, useState } from 'react';

// import { Pie } from 'react-chartjs-2';

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
import { serverUrl } from "../utils/common";


interface StatisticsData {
  totalStaff: number;
  totalRooms: number;
  totalShifts: number;
  totalBuildings: number;
  totalSales: number;
}



function DashboardPage() {
  
const [stats, setStats] = useState<StatisticsData | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


const [stats2, setStats2] = useState([]);
const [loading2, setLoading2] = useState(true);
const [error2, setError2] = useState(null);


useEffect(() => {
  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${serverUrl}/shifts/weekly`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setStats2(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading2(false);
    }
  };

  fetchStatistics();
}, []);

const [saleData, setSalesData] = useState([]);
const [loading3, setLoading3] = useState(true);



const [shiftsData, setShiftsData] = useState([]);
const [loading4, setLoading4] = useState(true);



useEffect(() => {
  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/statistics/1`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setStats(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  

  const fetchShiftsDistribution = async () => {
    try {
      const response = await fetch(`${serverUrl}/shifts/staff-distribution`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setShiftsData(data);
      setLoading4(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchShiftsDistribution();

  const fetchSalesDistribution = async () => {
    try {
      const response = await fetch(`${serverUrl}/sales/building-distribution`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('sales', data);
      setSalesData(data);
      setLoading3(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchSalesDistribution()
  fetchStatistics();
}, []);





if (loading || loading2 || loading3 ||  loading4) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

  return (
    <div>
      <Helmet>
      <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" />
    <link rel="stylesheet" id="main-stylesheet" data-version="1.1.0" href="styles/shards-dashboards.1.1.0.min.css"/>
    <link rel="stylesheet" href="styles/extras.1.1.0.min.css"/>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    
      </Helmet>
      <div className="color-switcher animated">
      <h5>Accent Color</h5>
      <ul className="accent-colors">
        <li className="accent-primary active" data-color="primary">
          <i className="material-icons">check</i>
        </li>
        <li className="accent-secondary" data-color="secondary">
          <i className="material-icons">check</i>
        </li>
        <li className="accent-success" data-color="success">
          <i className="material-icons">check</i>
        </li>
        <li className="accent-info" data-color="info">
          <i className="material-icons">check</i>
        </li>
        <li className="accent-warning" data-color="warning">
          <i className="material-icons">check</i>
        </li>
        <li className="accent-danger" data-color="danger">
          <i className="material-icons">check</i>
        </li>
      </ul>
      <div className="actions mb-4">
        <a className="mb-2 btn btn-sm btn-primary w-100 d-table mx-auto extra-action" href="https://designrevision.com/downloads/shards-dashboard-lite/">
          <i className="material-icons">cloud</i> Download</a>
        <a className="mb-2 btn btn-sm btn-white w-100 d-table mx-auto extra-action" href="https://designrevision.com/docs/shards-dashboard-lite">
          <i className="material-icons">book</i> Documentation</a>
      </div>
      <div className="social-wrapper">
        <div className="social-actions">
          <h5 className="my-2">Help us Grow</h5>
          <div className="inner-wrapper">
            <a className="github-button" href="https://github.com/DesignRevision/shards-dashboard" data-icon="octicon-star" data-show-count="true" aria-label="Star DesignRevision/shards-dashboard on GitHub">Star</a>
             
          </div>
        </div>
        <div id="social-share" data-url="https://designrevision.com/downloads/shards-dashboard-lite/" data-text="🔥 Check out Shards Dashboard Lite, a free and beautiful Bootstrap 4 admin dashboard template!" data-title="share"></div>
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      </div>
      <div className="close">
        <i className="material-icons">close</i>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        
        
        
        <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
          <div className="main-navbar sticky-top bg-white">
            
            <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
              <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                <div className="input-group input-group-seamless ml-3">
                  <input className="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search"/> </div>
              </form>
            
            </nav>
          </div>
          
          <div className="main-content-container container-fluid px-4">
            
            <div className="page-header row no-gutters py-4">
              <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                <span className="text-uppercase page-subtitle">Dashboard</span>
                <h3 className="page-title">Overview</h3>
              </div>
            </div>
            
            
            <div className="row12">
              <div className="item12 col-lg col-md-6 col-sm-6 mb-4 ">
                <div className="stats-small stats-small--1 card card-small">
                  <div className="card-body p-0 d-flex">
                    <div className="d-flex flex-column m-auto">
                      <div className="stats-small__data text-center">
                        <span className="stats-small__label text-uppercase">Total Staff</span>
                        <h6 className="stats-small__value count my-3">{stats?.totalStaff}</h6>
                      </div>
                      <div className="stats-small__data">
                        <span className="stats-small__percentage stats-small__percentage--increase">All Time</span>
                      </div>
                    </div>
                    <canvas height="120" className="blog-overview-stats-small-1"></canvas>
                  </div>
                </div>
              </div>
              <div className="item12 col-lg col-md-6 col-sm-6 mb-4">
                <div className="stats-small stats-small--1 card card-small">
                  <div className="card-body p-0 d-flex">
                    <div className="d-flex flex-column m-auto">
                      <div className="stats-small__data text-center">
                        <span className="stats-small__label text-uppercase">Total Room</span>
                        <h6 className="stats-small__value count my-3">{stats?.totalRooms}</h6>
                      </div>
                      <div className="stats-small__data">
                        <span className="stats-small__percentage stats-small__percentage--increase">All Time</span>
                      </div>
                    </div>
                    <canvas height="120" className="blog-overview-stats-small-2"></canvas>
                  </div>
                </div>
              </div>
              <div className="item12 col-lg col-md-4 col-sm-6 mb-4">
                <div className="stats-small stats-small--1 card card-small">
                  <div className="card-body p-0 d-flex">
                    <div className="d-flex flex-column m-auto">
                      <div className="stats-small__data text-center">
                        <span className="stats-small__label text-uppercase">Shift</span>
                        <h6 className="stats-small__value count my-3">{stats?.totalShifts}</h6>
                      </div>
                      <div className="stats-small__data">
                        <span className="stats-small__percentage stats-small__percentage--increase">Current Month</span>
                      </div>
                    </div>
                    <canvas height="120" className="blog-overview-stats-small-3"></canvas>
                  </div>
                </div>
              </div>
              <div className="item12 col-lg col-md-4 col-sm-6 mb-4">
                <div className="stats-small stats-small--1 card card-small">
                  <div className="card-body p-0 d-flex">
                    <div className="d-flex flex-column m-auto">
                      <div className="stats-small__data text-center">
                        <span className="stats-small__label text-uppercase">Total Building</span>
                        <h6 className="stats-small__value count my-3">{stats?.totalBuildings}</h6>
                      </div>
                      <div className="stats-small__data">
                        <span className="stats-small__percentage stats-small__percentage--increase">All Time</span>
                      </div>
                    </div>
                    <canvas height="120" className="blog-overview-stats-small-4"></canvas>
                  </div>
                </div>
              </div>
              <div className="item12 col-lg col-md-4 col-sm-12 mb-4">
                <div className="stats-small stats-small--1 card card-small">
                  <div className="card-body p-0 d-flex">
                    <div className="d-flex flex-column m-auto">
                      <div className="stats-small__data text-center">
                        <span className="stats-small__label text-uppercase">Total Sale</span>
                        <h6 className="stats-small__value count my-3">{stats?.totalSales}</h6>
                      </div>
                      <div className="stats-small__data">
                      <span className="stats-small__percentage stats-small__percentage--increase">All Time</span>
                      </div>
                    </div>
                    <canvas height="120" className="blog-overview-stats-small-5"></canvas>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row12">       
              <div className="item13 col-lg-8 col-md-12 col-sm-12 mb-4">
                <div className="card card-small">
                  <div className="card-header border-bottom">
                    <h6 className="m-0">Users</h6>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row border-bottom py-2 bg-light">
                      <div className="col-12 col-sm-6">
                        <div id="blog-overview-date-range" className="input-daterange input-group input-group-sm my-auto ml-auto mr-auto ml-sm-auto mr-sm-0" style={{maxWidth: '100% !important'}}>
                          <input type="text" className="input-sm form-control" name="start" placeholder="Start Date" id="blog-overview-date-range-1"/>
                          <input type="text" className="input-sm form-control" name="end" placeholder="End Date" id="blog-overview-date-range-2"/>
                          <span className="input-group-append">
                            <span className="input-group-text">
                              <i className="material-icons"></i>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 d-flex mb-2 mb-sm-0">
                        <button type="button" className="btn btn-sm btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0">View Full Report &rarr;</button>
                      </div>
                    </div>
                    <ResponsiveContainer width="140%" aspect={3}>
                <LineChart data={stats2} margin={{ right: 300, top:30 }}>
                    <CartesianGrid />
                    <XAxis dataKey="day" interval={"preserveStartEnd"} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line
                        dataKey="count"
                        stroke="black"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              
              <div className="item13 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card card-small h-100">
                  <div className="card-header border-bottom">
                    <h6 className="m-0">Users by device</h6>
                  </div>
                  <div className="pieChart">
                    <div>

<PieChart
  data={saleData}
/>;
</div>
<div>
<PieChart
  data={shiftsData}
/>;
</div>
                  </div>
                  <div className="card-footer border-top">
                    <div className="row">
                      
                      <div className="col text-right view-report">
                        <a href="#">Full report &rarr;</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              
              
              
              
            </div>
            
          </div>
          
        </main>
      </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" ></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
    <script src="https://unpkg.com/shards-ui@latest/dist/js/shards.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Sharrre/2.0.1/jquery.sharrre.min.js"></script>
    <script src="scripts/extras.1.1.0.min.js"></script>
    <script src="scripts/shards-dashboards.1.1.0.min.js"></script>
    <script src="scripts/app/app-blog-overview.1.1.0.js"></script>
    </div>
  );
}

export default DashboardPage;
