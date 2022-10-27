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
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { FiEyeOff, FiEye } from "react-icons/fi";
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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { signUp, createUser } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      await createUser(firstname, lastname, email, contactno, password);
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
              id="firstname"
              placeholder="Enter first name..."
              outline={"1px solid gray"}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              id="lastname"
              placeholder="Enter last name..."
              outline={"1px solid gray"}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormLabel>Contact No.</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+91" bg={"#959595"} />
              <Input
                type="tel"
                id="contactno"
                placeholder="Enter your number..."
                outline={"1px solid gray"}
                onChange={(e) => setContactno(e.target.value)}
              />
            </InputGroup>
          </Box>
          <Box mb={2}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder="Enter email..."
              outline={"1px solid gray"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter password..."
                outline={"1px solid gray"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Button
            colorScheme="teal"
            variant="solid"
            mt={5}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Box>
            Already have an account{" "}
            <Link to="/login" style={{ color: "blue" }}>
              login here !
            </Link>
          </Box>
        </FormControl>
      </div>
    </div>
  );
}
