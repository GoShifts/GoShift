import React, { useEffect, useState } from 'react';
import { Container, Title, Paper, Loader, Text, Button } from '@mantine/core';
import DataTable from 'react-data-table-component';
import { serverUrl } from '../utils/common';

import { useNavigate } from "react-router-dom";
const ShiftsPage = () => {
  const [upcomingShifts, setUpcomingShifts] = useState([]);
  const [passedShifts, setPassedShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem('staffid'); // Get staff ID from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch(`${serverUrl}/staff/shifts/${id}`);
        const data = await response.json();
        console.log(data);
        setUpcomingShifts(data.upcomingShifts);
        setPassedShifts(data.passedShifts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shifts:', error);
        setLoading(false);
      }
    };

    fetchShifts();
  }, [id]);

  const columns = [
    {
      name: 'Date',
      selector: row => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Time',
      selector: row => row.time,
      sortable: true,
    },
    {
      name: 'Room Number',
      selector: row => row.roomNumber,
      sortable: true,
    },
    {
      name: 'Building Name',
      selector: row => row.buildingName,
      sortable: true,
    },
  ];


  const handleProfileClick = () => {
    // Implement your profile navigation logic here
    console.log('Navigate to profile');
    navigate('/staff/profile')
  };

  return (
    <Container size="lg" my="xl">
        
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Title style={{ flex: 1 }}>GoShift</Title>
        <Button onClick={handleProfileClick} style={{ marginLeft: 'auto', marginBottom: '20px' }}>
          My Profile
        </Button>
      </div>
      <Title align="center" mb="lg">Shifts Overview</Title>
      
      {loading ? (
        <Loader size="xl" variant="bars" />
      ) : (
        <>
          <Paper shadow="sm" p="md" mb="xl">
            <Title order={3} align="center" mb="md">Upcoming Shifts</Title>
            {upcomingShifts.length > 0 ? (
              <DataTable
                columns={columns}
                data={upcomingShifts}
                pagination
                fixedHeader
                highlightOnHover
                striped
                noHeader
              />
            ) : (
              <Text align="center">No upcoming shifts.</Text>
            )}
          </Paper>

          <Paper shadow="sm" p="md">
            <Title order={3} align="center" mb="md">Passed Shifts</Title>
            {passedShifts.length > 0 ? (
              <DataTable
                columns={columns}
                data={passedShifts}
                pagination
                fixedHeader
                highlightOnHover
                striped
                noHeader
              />
            ) : (
              <Text align="center">No passed shifts.</Text>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default ShiftsPage;
