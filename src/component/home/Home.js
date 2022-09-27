import { Button, Heading } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';


export default function Home() {

  const {user , logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='HomePage'>
      <Heading>Hello welcome</Heading>
      <h2>{user && user.email}</h2>
      <Button mt={3} colorScheme='blue' onClick={handleLogout}>LogOut</Button>
    </div>
  )
}
