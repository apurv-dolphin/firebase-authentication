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
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

export default function Home() {
  const { user, logOut, usersCollectionRef, getUsers, data, deleteUser } =
    useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Th>handle</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((newdata, index) => (
              <Tr key={index}>
                <Td>{newdata.firstname}</Td>
                <Td>{newdata.lastname}</Td>
                <Td>{newdata.email}</Td>
                <Td>{newdata.contactno}</Td>
                <Td>
                  <Button onClick={() => handleDelete(newdata.id)}>
                    Delete user
                  </Button>
                </Td>
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
