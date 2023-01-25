import './Addtask.css';
import React, { useState } from 'react';
import axios from 'axios';

const Addtask = (props) => {
  const [task, Settask] = useState('');
  const addtask = () => {
    if (task.trim() === '') {
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/tasks`, {
          todo: task,
          isComplete: false,
        })
        .then((res) => {
          Settask('');
          props.addTask(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="addtask">
      <input
        type="text"
        placeholder="Add Task . . ."
        value={task}
        onChange={(event) => Settask(event.target.value)}
      />
      <button onClick={() => addtask()}>Add Task</button>
    </div>
  );
};

export default Addtask;
