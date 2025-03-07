import styles from "./Tabs.module.css";
import { TabEnum } from "../types/Tab";

interface TabsProps {
  onChangeTab(completedTasks: boolean): void;
  countTasks: number;
  countCompletedTasks: number;
  tab: string;
}

export function Tabs({
  onChangeTab,
  countTasks,
  countCompletedTasks,
  tab,
}: TabsProps) {
  function handleChangedTab(completedTasks: boolean) {
    onChangeTab(completedTasks);
  }

  return (
    <>
      <div className={styles.content}>
        <div
          onClick={() => handleChangedTab(false)}
          className={tab === TabEnum.CREATED ? styles.active : ""}
        >
          <span className={styles.titleCreatedTasks}>Tarefas criadas</span>
          <span className={styles.badge}>{countTasks}</span>
        </div>
        <div
          onClick={() => handleChangedTab(true)}
          className={tab === TabEnum.COMPLETED ? styles.active : ""}
        >
          <span className={styles.titleFinishedTasks}>Concluídas</span>
          <span className={styles.badge}>
            {countCompletedTasks} de {countTasks}
          </span>
        </div>
      </div>
      <hr />
    </>
  );
}
