import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "./task.css";
import NavBar from "../navbar/NavBar";
import { useUserAuth } from "../../context/UserAuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
import Footer from "../footer/Footer";

export default function TaskPage() {
  const devloperDailyUpdateRef = collection(db, "Daily-updates");

  const { user } = useUserAuth();

  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");

  // console.log(tasks);

  const getRecord = async () => {
    const temp = [];
    const q = query(devloperDailyUpdateRef, where("uid", "==", user.uid || ""));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const data = Object.assign(doc.data(), { id: doc.id });
      temp.push(data);
    });
    setTasks(temp);
  };

  const getTaskIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setTaskId(id);
  };
  useEffect(() => {
    getRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Footer />
    </>
  );
}
