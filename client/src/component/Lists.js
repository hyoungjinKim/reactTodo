import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todoData); // 새로운 배열을 생성
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoData(items);
    localStorage.setItem("todoData", JSON.stringify(items));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((data, index) => (
              <Draggable
                key={data.id}
                draggableId={data.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <List
                    id={data.id}
                    title={data.title}
                    completed={data.completed}
                    todoData={todoData}
                    setTodoData={setTodoData}
                    provided={provided}
                    snapshot={snapshot}
                    handleClick={handleClick}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default Lists;
