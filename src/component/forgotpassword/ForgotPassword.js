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
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { resetPassword } = useUserAuth();

  const handleSubmit = async () => {
    setError("");
    try {
      setMessage("");
      await resetPassword(email);
      setMessage("check your email for the reset password link");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main-form">
      <div className="inner-form">
        <Box mb={15}>
          <Heading>Reset Password</Heading>
        </Box>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {message && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        )}
        <FormControl onSubmit={handleSubmit}>
          <Box mb={2}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email..."
              outline={"1px solid gray"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Button
            colorScheme="teal"
            variant="solid"
            mt={5}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Link to="/login">
            <Button colorScheme="teal" variant="solid" mt={5} ml={2}>
              Go to Login
            </Button>
          </Link>
        </FormControl>
      </div>
    </div>
  );
}
