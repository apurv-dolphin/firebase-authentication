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
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import "./login.style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { logIn, googleSignIn, facebookSignIn } = useUserAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main-form">
      <div className="inner-form">
        <Box mb={15}>
          <Heading>Login Form</Heading>
        </Box>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <FormControl onSubmit={handleSubmit}>
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
                <Button h="1.75rem" size="sm" bg="#98e3fb" onClick={handleClick}>
                  {show ? <FiEye /> : <FiEyeOff />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box>
            <Button
              colorScheme="teal"
              variant="solid"
              mt={5}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              mt={5}
              ml={2}
              onClick={handleFacebookSignIn}
            >
              Facebook
            </Button>
          </Box>
          <Box>
            <Link to="/forgot-password" style={{ color: "blue" }}>
              Forgot Password ?
            </Link>
          </Box>

          <Box>
            Don't have an account{" "}
            <Link to="/register" style={{ color: "blue" }}>
              Click here !
            </Link>
          </Box>
          <Box className="g-btn">
            <GoogleButton type="dark" onClick={handleGoogleSignIn} />
          </Box>
        </FormControl>
      </div>
    </div>
  );
}
