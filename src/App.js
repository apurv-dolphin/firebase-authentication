import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./component/blog/Blog";
import UserDetails from "./component/details/UserDetails";
import ForgotPassword from "./component/forgotpassword/ForgotPassword.js";
import Home from "./component/home/Home";
import Login from "./component/login/Login";
import Nomatch from "./component/nomatch/Nomatch";
import Register from "./component/register/register";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProtectedRouter } from "./ProtectedRouter";
import TaskPage from "./component/Task/TaskPage";
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./Firebase";

function App() {

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = getToken(messaging, { vapidKey: "BNTCreRd8GykjFwTO6gW3SvOShvPQWbFr4WuGZOoUVBzBXu-DnQNINZEdRft6myD5kRaHDISJ0F5uTsbT3uKzCM" });
      console.log("token", token);
    } else if (permission === "denied") {
      alert("You denied for the notification")
    }
  }

  useEffect(() => {
    requestPermission();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            <Route element={<ProtectedRouter />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/details" element={<UserDetails />} />
              <Route path="/task" element={<TaskPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Nomatch />} />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
