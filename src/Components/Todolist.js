import './Todolist.css';
import React from 'react';
// import CheckIcon from '@material-ui/icons/Check';
import { BsCheckLg } from 'react-icons/bs';
import { TiEdit } from 'react-icons/ti';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
// import EditIcon from '@material-ui/icons/Edit';
//import CloseIcon from '@material-ui/icons/Close';

const Todolist = (props) => {
  const todolist = props.todolist.map((task, index) => {
    const taskComplete = (task) => {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/tasks/${task._id}`, {
          _id: task._id,
          todo: task.todo,
          isComplete: !task.isComplete,
        })
        .then((res) => props.taskComplete(res.data))
        .catch((err) => console.log(err));
    };

    const removeTask = (id) => {
      axios
        .delete(`http://localhost:8000/api/tasks/${id}`)
        .then((res) => props.removeTask(res.data))
        .catch((err) => console.log(err));
    };

    return (
      <li key={index}>
        <div style={{ display: 'flex' }}>
          <BsCheckLg className={task.isComplete ? 'isComplete' : 'checkicon'} />
          <p
            className={task.isComplete ? 'taskComplete' : ''}
            onClick={() => {
              taskComplete(task);
            }}
          >
            {task.todo}
          </p>
        </div>
        <div>
          <TiEdit
            className="edit"
            onClick={() => {
              props.tasktoUpdate(task);
              props.showPopup();
            }}
          />
          <GrClose
            className="close"
            onClick={() => {
              removeTask(task._id);
            }}
          />
        </div>
      </li>
    );
  });
  return (
    <div className="tasklist">
      <ul>{todolist}</ul>
    </div>
  );
};

export default Todolist;
