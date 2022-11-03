import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "./task.css";
import NavBar from "../navbar/NavBar";
import DevloperUpdateService from "../../context/DevloperUpdateService";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");

  const getRecord = async () => {
    const data = await DevloperUpdateService.getAllTask();
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getTaskIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setTaskId(id);
  };
  useEffect(() => {
    getRecord();
  }, [tasks]);
  
  return (
    <>
      <NavBar />
      <div className="task-form">
        <div className="task-heading">
          <Badge bg="secondary">Task Details</Badge>
        </div>
        <AddTask id={taskId} setTaskId={setTaskId} getRecord={getRecord} />
        <TaskList
          getTaskId={getTaskIdHandler}
          tasks={tasks}
          getRecord={getRecord}
        />
      </div>
    </>
  );
}
