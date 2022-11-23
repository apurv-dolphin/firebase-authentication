import {
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
import { Button } from "react-bootstrap";
import DevloperUpdateService from "../../context/DevloperUpdateService";

const TaskList = ({ getTaskId, getRecord, tasks }) => {

  const deleteHandler = async (id) => {
    await DevloperUpdateService.deleteTask(id);
    getRecord();
  };
     
  console.log(tasks);
  useEffect(() => {
    getRecord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className="task-table">
      <TableContainer style={{border : "2px solid #e3e3e3"}}>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Task Details Table</TableCaption>
          <Thead>
            <Tr>
              <Th>No .</Th>
              <Th>Task Title</Th>
              <Th>Task Description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            { tasks && tasks.map((doc, index) => (
              <Tr key={doc.id}>
                <Td>{index + 1}</Td>
                <Td>{doc.title}</Td>
                <Td>{doc.description}</Td>
                <Td>
                  <Button
                    variant="secondary"
                    className="edit"
                    style={{ marginRight: "15px" }}
                    onClick={(e) => getTaskId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
