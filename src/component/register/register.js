import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactno] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  console.log("__demo" ,firstname, lastname, contactno);

  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp( email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main-form">
      <div className="inner-form">
        <Box mb={15}>
          <Heading>Register Form</Heading>
        </Box>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <FormControl onSubmit={handleSubmit}>
          <Box mb={2}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter first name..."
              outline={"1px solid gray"}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter last name..."
              outline={"1px solid gray"}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormLabel>Contact No.</FormLabel>
            <Input
              type="number"
              placeholder="Enter your number..."
              outline={"1px solid gray"}
              onChange={(e) => setContactno(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email..."
              outline={"1px solid gray"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password..."
              outline={"1px solid gray"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Button colorScheme="teal" variant="solid" mt={5} onClick={handleSubmit}>
            Submit
          </Button>
          <Box>Already have an account  <Link to="/login" style={{color: "blue"}}>login here !</Link></Box>
        </FormControl>
      </div>
    </div>
  );
}
