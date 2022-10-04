import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import UserTable from "./UserTable";

export default function Home() {
  const { user, logOut, getUsers } = useUserAuth();
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
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="HomePage">
      <Heading>Hello welcome</Heading>
      <h2>{user && user.email}</h2>
      <UserTable />
      <Button mt={3} colorScheme="blue" onClick={handleLogout}>
        LogOut
      </Button>
    </div>
  );
}
