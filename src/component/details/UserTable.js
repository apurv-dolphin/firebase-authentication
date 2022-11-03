import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useUserAuth } from "../../context/UserAuthContext";
import { Dna } from "react-loader-spinner";
import "./details.css";

export const ADMIN = "apurv.dolphinwebsolution@gmail.com";


export default function UserTable() {
  const { user, data, deleteUser } = useUserAuth();
  const [userDataShow, setUserDataShow] = useState(false);

  const handleDelete = async (id) => {
    await deleteUser(id);
  };


  useEffect(() => {
    if (user.email === ADMIN) {
      setUserDataShow(true);
    }
  }, [user.email]);

  return (
    <div>
      {userDataShow ? (
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
                    <Button onClick={() => handleDelete(newdata.id)} bg="red" color="#fff">
                      Delete user
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <div className="loader">
          <Dna
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
    </div>
  );
}
