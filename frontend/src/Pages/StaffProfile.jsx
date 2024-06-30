import React, { useEffect, useState } from 'react';
import { Container, Title, Paper, Loader, Text } from '@mantine/core';
import { serverUrl } from '../utils/common';

const StaffProfilePage = () => {
  const [staffProfile, setStaffProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem('staffid'); // Get staff ID from localStorage

  useEffect(() => {
    const fetchStaffProfile = async () => {
      try {
        const response = await fetch(`${serverUrl}/staff/profile/${id}`);
        const data = await response.json();
        setStaffProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff profile:', error);
        setLoading(false);
      }
    };

    fetchStaffProfile();
  }, [id]);

  return (
    <Container size="lg" my="xl">
    <Title align="center" mb="lg" style={{ fontSize: '2rem', fontWeight: 700 }}>My Profile</Title>
    
    {loading ? (
      <Loader size="xl" variant="bars" />
    ) : staffProfile ? (
      <Paper shadow="sm" p="md" style={{ borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Text style={{ fontSize: '1.1rem', fontWeight: 500, color:"#3d5170"}}>Name : <span style={{color:'darkgray'}}>{staffProfile.name}</span> </Text> 
        <Text style={{ fontSize: '1.1rem', fontWeight: 500 }}>Email: : <span style={{color:'darkgray'}}>{staffProfile.email}</span> </Text> 
        <Text style={{ fontSize: '1.1rem', fontWeight: 500 }}>Role :  <span style={{color:'darkgray'}}>{staffProfile.role}</span> </Text>
        {/* Add more profile details as needed */}
      </Paper>
    ) : (
      <Text align="center" style={{ fontSize: '1.2rem', fontWeight: 500, color: '#ff6347' }}>Profile not found</Text>
    )}
  </Container>
  );
};

export default StaffProfilePage;
