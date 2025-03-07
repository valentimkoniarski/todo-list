import styles from "./Task.module.css";
import { Task as TaskType } from "../types/Task";
import { Trash } from "@phosphor-icons/react";

interface TaskProps extends TaskType {
  onChangeStatus(id: string): void;
  onRemoveTask(id: string): void;
}

export function Task({
  id,
  title,
  isCompleted,
  onChangeStatus,
  onRemoveTask,
}: TaskProps) {
  return (
    <div className={styles.content}>
      <div className={styles.cardTask}>
        <div className={styles.checkboxWrapper}>
          <input
            className={styles.checkbox}
            type="checkbox"
            onClick={() => onChangeStatus(id)}
          />
          <span className={isCompleted ? styles.completed : ""}>{title}</span>
        </div>

        <button
          className={styles.buttonRemove}
          onClick={() => onRemoveTask(id)}
        >
          <Trash size={16} color="#808080" />
        </button>
      </div>
    </div>
  );
}
