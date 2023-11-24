"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { TaskData } from "../../public/data";

interface TaskData {
  id: number;
  title: string;
  components: {
    operator_info: string;
    call_date: string;
  }[];
}

const Task = () => {
  const [data, setData] = useState<TaskData[] | []>([]);

  useEffect(() => {
    setData(TaskData);
  }, []);

  const handleItemClick = (id: string) => {
    return <Link href={`/callPage/${encodeURIComponent(id)}`}>{id}</Link>;
  };

  const onDragEnd = (e: DropResult) => {
    const { source, destination } = e;
    if (!destination) return;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))];
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section>
        <div className="flex my-10 gap-6">
          {data.map((data) => (
            <Droppable key={data.id} droppableId={`droppable${data.id}`}>
              {(provided) => (
                <div
                  className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h1 className="font-bold">{data.title} -&gt;</h1>
                  {data.components.map((component, index) => (
                    <Draggable
                      key={component.call_date}
                      draggableId={`draggable${component.call_date}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-gray-300 p-4 my-2"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          onClick={() => handleItemClick(component.call_date)}
                        >
                          {handleItemClick(component.call_date)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </section>
    </DragDropContext>
  );
};

export default Task;
