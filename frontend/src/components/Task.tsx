import type { TaskType, DayType } from "../data/taskData";
import SubjectTag from "./SubjectTag";

type TaskProps = {
  task: TaskType;
  day: DayType;
  toggleTask: (dayId: number, taskId: number) => void;
};


function Task({ task, day, toggleTask }: TaskProps) {

  return (
    <label className="flex items-center gap-3 w-full bg-green-100 dark:bg-green-950 px-4 border border-green-400 dark:border-green-700 rounded-sm">

      <input
        type="checkbox"
        checked={task.completed}
        disabled={!day.isToday}
        onChange={() => toggleTask(day.id, task.id)}
        className="size-4 shrink-0 accent-green-600 cursor-pointer disabled:cursor-not-allowed"
      />


      <p className="flex-1 text-sm text-green-800 dark:text-green-500">
        {task.title}
      </p>


      <SubjectTag subject={task.subject} />

    </label>
  );
}

export default Task;

// Task.tsx imports the TaskType and DayType blueprints/types.

// TaskProps defines what props the Task component must receive:
// - task must follow TaskType
// - day must follow DayType
// - toggleTask must be a function that accepts dayId and taskId


// Task does NOT import toggleTask directly from Dashboard.
// Dashboard passes toggleTask down through TaskCard,
// and TaskCard then passes it to Task as a prop.


// function Task({ task, day, toggleTask }: TaskProps)
//
// Here we destructure the three props:
// task
// day
// toggleTask
//
// : TaskProps tells TypeScript that these props must follow
// the structure defined in TaskProps.


// The component renders one individual task row containing:
// checkbox + task title + subject


// checked={task.completed}
// controls whether the checkbox appears checked based on task data.


// disabled={!day.isToday}
// disables the checkbox when this card isn't today's card.


// onChange={() => toggleTask(day.id, task.id)}
// calls the toggleTask function when the checkbox is clicked.
// We send the day ID and task ID so Dashboard knows exactly
// which task needs to be changed.


// task.title renders the task name.
// task.subject renders the subject.