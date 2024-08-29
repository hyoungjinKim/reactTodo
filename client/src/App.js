import React, { useEffect, useState } from "react";
import List from "./component/List";
import Form from "./component/Form";
import "./App.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("my_todos");
    if (data) {
      setTodoData(JSON.parse(data));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = {
      id: new Date(),
      title: value,
      completed: false,
    };

    // 상태를 업데이트한 후 콜백에서 saveTodoData를 호출합니다.
    setTodoData((prev) => {
      const updatedTodoData = [...prev, newData];
      saveTodoData(updatedTodoData);
      return updatedTodoData;
    });

    setValue("");
  };

  const saveTodoData = (data) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem("my_todos", jsonData);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData} />
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
