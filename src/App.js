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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            <Route element={<ProtectedRouter />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/details" element={<UserDetails />} />
              <Route path="/task" element={<TaskPage />}/>
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
