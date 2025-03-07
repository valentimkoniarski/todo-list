import { useState, useCallback } from "react";
import { Header } from "./components/Header";
import { InputCreateTask } from "./components/InputCreateTask";
import { Tabs } from "./components/Tabs";
import type { Task as TaskType } from "./types/Task";
import { Task } from "./components/Task";
import { TabEnum } from "./types/Tab";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [tab, setTab] = useState<TabEnum>(TabEnum.CREATED);

  const handleCreateTask = useCallback((newTask: TaskType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const handleListTasks = useCallback((completedTasks: boolean) => {
    if (completedTasks) {
      setTab(TabEnum.COMPLETED);
    } else {
      setTab(TabEnum.CREATED);
    }
  }, []);

  const filteredTasks = tasks.filter((task) =>
    tab === TabEnum.CREATED ? task : task.isCompleted
  );

  const countCompletedTasks = tasks.filter((task) => task.isCompleted).length;

  function handleChangeStatus(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function handleRemoveTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <div>
      <Header />

      <main>
        <InputCreateTask onCreateTask={handleCreateTask} />

        <Tabs
          onChangeTab={handleListTasks}
          countTasks={tasks.length}
          countCompletedTasks={countCompletedTasks}
          tab={tab}
        />

        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            isCompleted={task.isCompleted}
            onChangeStatus={() => handleChangeStatus(task.id)}
            onRemoveTask={() => handleRemoveTask(task.id)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
