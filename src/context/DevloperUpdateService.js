import { db } from "../Firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const devloperDailyUpdateRef = collection(db , "Daily-updates");
class DevloperUpdateService {
  addTask = (newTask) => {
    return addDoc(devloperDailyUpdateRef, newTask);
  };

  updateTask = (id, updatedTask) => {
    const bookDoc = doc(db, "Daily-updates", id);
    return updateDoc(bookDoc, updatedTask);
  };

  deleteTask = (id) => {
    const taskDoc = doc(db, "Daily-updates", id);
    return deleteDoc(taskDoc);
  };

  getAllTask = () => {
    return getDocs(devloperDailyUpdateRef);
  };

  getRecord = (id) => {
    const taskDoc = doc(db, "Daily-updates", id);
    return getDoc(taskDoc);
  };
}

export default new DevloperUpdateService();


