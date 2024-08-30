import React, { useCallback, useEffect, useState } from "react";
import Lists from "./component/Lists";
import Form from "./component/Form";
import "./App.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    const initialTodoData = localStorage.getItem("todoData");
    if (initialTodoData) {
      setTodoData(JSON.parse(initialTodoData));
    } else {
      setTodoData([]);
    }
  }, []);
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = {
      id: new Date(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newData]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newData]));

    setValue("");
  };

  const handleRemoveClick = () => {
    localStorage.setItem("todoData", JSON.stringify([]));
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />
        <Form
          handleSubmit={handleSubmit}
          setTodoData={setTodoData}
          setValue={setValue}
          value={value}
        />
      </div>
    </div>
  );
}
