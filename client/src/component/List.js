import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setisEditing] = useState(false);
    const [editedTitle, seteditedTitle] = useState(title);
    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
      seteditedTitle(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));

      setisEditing(false);
    };
    if (isEditing) {
      return (
        <>
          <div
            className={`flex items-center justify-between w-full bg-gray-100 px-4 py-1 my-2 text-gray-600 border rounded`}
          >
            <div className="items-center">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleEditChange}
                  className="w-full px-3 mr-4 text-gray-500 rounded"
                />
              </form>{" "}
            </div>
            <div className="items-center">
              <button
                className="px-4 py-2 float-right"
                onClick={() => setisEditing(false)}
              >
                x
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 float-right"
                type="submit"
              >
                save
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            key={id}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className={`${
              snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
            } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
          >
            <div className="items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => handleCompleteChange(id)}
              />{" "}
              <span className={completed ? "line-through" : undefined}>
                {title}
              </span>
            </div>
            <div className="items-center">
              <button
                className="px-4 py-2 float-right"
                onClick={() => handleClick(id)}
              >
                x
              </button>
              <button
                className="px-4 py-2 float-right"
                onClick={() => setisEditing(true)}
              >
                edit
              </button>
            </div>
          </div>
        </>
      );
    }
  }
);

export default List;
