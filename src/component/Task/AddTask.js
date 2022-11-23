import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import DevloperUpdateService from "../../context/DevloperUpdateService";
import { useUserAuth } from "../../context/UserAuthContext";
import "./task.css";

const AddTask = ({ id, setTaskId, getRecord }) => {
  const { user } = useUserAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const uid = user.uid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || description === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newTask = {
      uid,
      title,
      description,
    };

    try {
      if (id !== undefined && id !== "") {
        await DevloperUpdateService.updateTask(id, newTask);
        setTaskId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await DevloperUpdateService.addTask(newTask);
        setMessage({ error: false, msg: "New Task added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setDescription("");
    getRecord();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setTaskId("");
    setFlag(false);
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await DevloperUpdateService.getRecord(id);
      setTitle(docSnap.data().title);
      setDescription(docSnap.data().description);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      setFlag(true);
      editHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTaskTitle">
            <InputGroup>
              <InputGroup.Text id="formTaskTitle">Title</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTaskDescription">
            <InputGroup>
              <InputGroup.Text id="formTaskDescription">
                Description
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="Submit"
              onClick={() => setFlag(false)}
            >
              {flag ? "Update" : "Add"}
            </Button>
            {flag && (
              <Button variant="danger" onClick={handleClose}>
                Cancle
              </Button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddTask;
