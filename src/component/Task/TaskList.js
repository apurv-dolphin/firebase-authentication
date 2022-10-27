import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import DevloperUpdateService from "../../context/DevloperUpdateService";

const TaskList = ({ getTaskId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    const data = await DevloperUpdateService.getAllTask();
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await DevloperUpdateService.deleteTask(id);
    getRecord();
  };
  
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getRecord}>
          Refresh List
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No .</th>
            <th>Date</th>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{moment().format("DD/MM/YYYY")}</td>
                <td>{doc.title}</td>
                <td>{doc.description}</td>
                <td>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TaskList;
