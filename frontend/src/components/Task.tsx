import { useState } from "react";
import type { TaskType, DayType } from "../data/taskData";
import SubjectTag from "./SubjectTag";
import { Pencil, Trash2, Check } from "lucide-react";

type TaskUpdate = {
  title?: string;
  subject?: string;
  completed?: boolean;
};

type TaskProps = {
  task: TaskType;
  day: DayType;
  patchTask: (taskId: string, updates: TaskUpdate) => void;
  deleteTask: (taskId: string) => void;
};

function Task({ task, day, patchTask, deleteTask }: TaskProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function handleEdit() {
    if (editing) {
      // We are currently editing,
      // so save the new title
      patchTask(task.id, {
        title: title
      });
    }

    // Switch between edit and normal mode
    setEditing(!editing);
  }

  return (
    <label className="flex items-center gap-3 w-full bg-green-100 dark:bg-green-950 px-4 border border-green-400 dark:border-green-700 rounded-sm">

      {/* CHECKBOX */}

      <input
        type="checkbox"
        checked={task.completed}
        disabled={!day.isToday}
        onChange={() =>
          patchTask(task.id, {
            completed: !task.completed
          })
        }
        className="size-4 shrink-0 accent-green-600 cursor-pointer disabled:cursor-not-allowed"
      />

      {/* TITLE */}

      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dark:text-white flex-1 px-2 h-5 bg-green-50 dark:bg-green-900 rounded-sm"
        />
      ) : (
        <p className="flex-1 text-sm text-green-800 dark:text-green-500">
          {task.title}
        </p>
      )}

      {/* SUBJECT */}

      <SubjectTag subject={task.subject} />

      {/* EDIT + DELETE */}

      {day.isToday && (
        <div className="flex items-center gap-2">

          <button
            type="button"
            className="text-green-500 dark:text-green-700"
            onClick={handleEdit}
          >
            {editing ? (
              <Check size={15} />
            ) : (
              <Pencil size={15} />
            )}
          </button>

          <button
            type="button"
            className="text-green-500 dark:text-green-700"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 size={15} />
          </button>

        </div>
      )}

    </label>
  );
}

export default Task;

// Task.tsx imports the TaskType and DayType blueprints/types.

// TaskProps defines what props the Task component must receive:
// - task must follow TaskType
// - day must follow DayType
// - patchTask must be a function that accepts dayId and taskId


// Task does NOT import patchTask directly from Dashboard.
// Dashboard passes patchTask down through TaskCard,
// and TaskCard then passes it to Task as a prop.


// function Task({ task, day, patchTask }: TaskProps)
//
// Here we destructure the three props:
// task
// day
// patchTask
//
// : TaskProps tells TypeScript that these props must follow
// the structure defined in TaskProps.


// The component renders one individual task row containing:
// checkbox + task title + subject


// checked={task.completed}
// controls whether the checkbox appears checked based on task data.


// disabled={!day.isToday}
// disables the checkbox when this card isn't today's card.


// onChange={() => patchTask(day.id, task.id)}
// calls the patchTask function when the checkbox is clicked.
// We send the day ID and task ID so Dashboard knows exactly
// which task needs to be changed.


// task.title renders the task name.
// task.subject renders the subject.