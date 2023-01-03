import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";
import UserTable from "./UserTable";

export default function UserDetails() {
  const { user, getUsers } = useUserAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <div className="HomePage">
        <Heading>Hello welcome</Heading>
        <h2>{user && user.email}</h2>
        <UserTable />
      </div>
      <Footer />
    </div>
  );
}
