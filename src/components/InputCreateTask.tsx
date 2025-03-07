import styles from "./InputCreateTask.module.css";
import { useState } from "react";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from 'uuid';

interface InputCreateTaskProps {
  onCreateTask(task: Task): void;
}

export function InputCreateTask({ onCreateTask }: InputCreateTaskProps) {
  const [taskTitle, setTaskTitle] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: taskTitle.trim(),
      isCompleted: false,
    };

    onCreateTask(newTask);
    setTaskTitle("");
  }

  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />
      <button type="submit" disabled={!taskTitle.trim()}>
        Criar
      </button>
    </form>
  );
}
