import {
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "../navbar/NavBar";
import AllSizeModal from "./AllSizeModal";
import BackdropModal from "./BackdropModal";
import "./blog.css";
import FormModal from "./FormModal";

export default function Blog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <NavBar />
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
        m={50}
      >
        Example of all Modal of Chakara UI
      </Text>

      <div className="normal-modal">
        <FormLabel>Normal modal Example :-</FormLabel>

        <Button onClick={onOpen}>Trigger modal</Button>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className="form-modal">
        <FormLabel>Form modal Example :-</FormLabel>
        <div>
        <FormModal />
        </div>
      </div>
      <div className="all-sizemodal">
        <FormLabel>All Size modal Example :-</FormLabel>
        <div>
          <AllSizeModal />
        </div>
      </div>
      <div className="form-modal">
        <FormLabel>Backdrop modal Example :-</FormLabel>
        <div>
        <BackdropModal />
        </div>
      </div>
    </div>
  );
}
