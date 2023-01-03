import { db } from "../Firebase";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const devloperDailyUpdateRef = collection(db, "Daily-updates");

class DevloperUpdateService {
  addTask = (newTask) => {
    return addDoc(devloperDailyUpdateRef, newTask);
  };

  updateTask = (id, updatedTask) => {
    const updateTaskDoc = doc(db, "Daily-updates", id);
    return updateDoc(updateTaskDoc, updatedTask);
  };

  deleteTask = (id) => {
    const taskDoc = doc(db, "Daily-updates", id);
    return deleteDoc(taskDoc);
  };

  getRecord = (id) => {
    const taskDoc = doc(db, "Daily-updates", id);
    return getDoc(taskDoc);
  };
}

export default new DevloperUpdateService();
