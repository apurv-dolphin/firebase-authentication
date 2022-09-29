import {
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../Firebase";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { user, logOut } = useUserAuth();
  const usersCollectionRef = collection(db, "Apurv-project");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [navigate, user, usersCollectionRef]);

  return (
    <div className="HomePage">
      <Heading>Hello welcome</Heading>
      <h2>{user && user.email}</h2>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Users Table</TableCaption>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Contact No</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((newdata, index) => (
              <Tr key={index}>
                <Td>{newdata.firstname}</Td>
                <Td>{newdata.lastname}</Td>
                <Td>{newdata.email}</Td>
                <Td>{newdata.contactno}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Button mt={3} colorScheme="blue" onClick={handleLogout}>
        LogOut
      </Button>
    </div>
  );
}
