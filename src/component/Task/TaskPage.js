import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "./task.css";
import NavBar from "../navbar/NavBar";


export default function TaskPage() {
  const [taskId, setTaskId] = useState("");

  const getTaskIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setTaskId(id);
  };
  return (
    <>
      <NavBar />
      <div className="task-form">
        <div className="task-heading">
          <Badge bg="secondary">Task Details</Badge>
        </div>
        <AddTask id={taskId} setTaskId={setTaskId} />
        <TaskList getTaskId={getTaskIdHandler} />
      </div>
    </>
  );
}
