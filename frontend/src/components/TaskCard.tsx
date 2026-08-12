import { useState } from "react";
import Task from "./Task";
import { type DayType } from "../data/taskData";
import AddTask from "./AddTask";
import SubjectTag from "./SubjectTag";
import {
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import { formatDate } from "../utils/formatDate";

type TaskUpdate = {
  title?: string;
  subject?: string;
  completed?: boolean;
}


type TaskCardProps = {
  day: DayType;
  patchTask: (taskId: string, updates: TaskUpdate) => void;
  deleteTask: (taskId: string) => void;
  createTask: (title: string, subject: string) => void;
};


function TaskCard({ day, patchTask, deleteTask, createTask }: TaskCardProps) {

  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  function toggleDropdown() {
    setOpen(!open);
  }


  const total = day.tasks.length;

  const completed = day.tasks.filter(
    (task) => task.completed
  ).length;

  const subjects = [
    ...new Set(day.tasks.map((task) => task.subject))
  ];

  const percentage =
    total === 0 ? 0 : (completed / total) * 100;

  return (
    <div
      className="
    relative flex border border-slate-200 dark:border-neutral-700
    bg-slate-100 dark:bg-neutral-800 max-w-4xl rounded-md mx-auto
    overflow-hidden mb-4 py-2
    "
    >

      {/* LEFT SIDE */}

      <div className=" absolute left-0 top-0 bottom-0 w-20 rounded-l-md bg-black dark:bg-white">

        <div className="text-white dark:text-black flex flex-col items-center justify-center h-full scale-90">

          <div className="font-bold scale-125">{completed}</div>

          {!day.isToday ? (<div className="scale-70">DONE</div>) : (<div className="scale-70">TODAY</div>)}

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="ml-20 flex flex-col w-full">


        {/* CARD HEADER */}

        <div className="flex w-full items-start justify-between py-2 px-4">

          <div className="flex gap-1">

            <div className="text-black dark:text-white">
              {formatDate(day.date)}
            </div>
          </div>


          <div className="flex gap-1">

            <div className="text-black dark:text-white">
              {completed}/{total}
            </div>

            <div className="flex pl-1">
              {subjects.map((subject) => (
                <SubjectTag
                  key={subject}
                  subject={subject}
                />
              ))}
            </div>

            <div
              className="size-6 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(green ${percentage}%, #cbd5e1 0)`
              }}
            >
              <div className="size-4 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center">

                {completed === total && total > 0 && (
                  <Check size={12} className="text-green-600" />
                )}

              </div>
            </div>

            <button onClick={toggleDropdown} className="px-1 text-black dark:text-white">
              {open ? (<ChevronUp size={16} />) : (<ChevronDown size={16} />)}
            </button>
            {day.isToday && (<button className="dark:text-white"
              onClick={() => setAdding(!adding)}
            >
              +
            </button>)}
          </div>

        </div>


        {/* DROPDOWN */}

        {open && (
          <>
            <div className="flex flex-col gap-2 my-2 mx-3">

              {day.tasks.map((task) => (

                <Task
                  key={task.id}
                  task={task}
                  day={day}
                  patchTask={patchTask}
                  deleteTask={deleteTask}
                />

              ))}

            </div>
            {adding && (
              <AddTask
                createTask={createTask}
                closeAddTask={() => setAdding(false)}
              />
            )}
          </>

        )}

      </div>

    </div >
  );
}

export default TaskCard;


// TaskCard.tsx imports useState.
// Here useState ONLY stores the open/closed state of this card's dropdown.
// It does NOT store days or completed tasks.


// It imports DayType, which is the blueprint/type for ONE day object.


// It imports the Task component because TaskCard will render
// multiple <Task /> components inside its dropdown.


// TaskCardProps defines what TaskCard must receive:
// 1. day -> one actual day object following DayType
// 2. patchTask -> a function that takes dayId and taskId and returns nothing


// function TaskCard({ day, patchTask }: TaskCardProps)
//
// destructures the two actual props received by TaskCard,
// while : TaskCardProps tells TypeScript what structure those props must follow.


// open stores whether THIS TaskCard's dropdown is open or closed.


// toggleDropdown changes open:
// false -> true
// true -> false


// total is calculated from the number of tasks belonging to this day:
// day.tasks.length


// completed is calculated by filtering this day's tasks
// where task.completed === true and then taking the resulting length.


// The main div creates the overall TaskCard.


// The left absolute div displays the calculated completed count
// and the "DONE" label.


// The right section displays:
// day.date
// "today" only when day.isToday is true
// completed/total
// subjects and progress bar later
// dropdown button


// Clicking the dropdown button calls toggleDropdown,
// which changes open and causes React to re-render.


// If open === true, the dropdown is rendered.


// Inside the dropdown:
// day.tasks.map(...) loops through every task belonging to this day.


// For every task in day.tasks, React creates one <Task /> component.


// Each <Task /> receives:
// task -> the current task object
// day -> the current day object
// patchTask -> the function originally created in Dashboard


// key={task.id} is used by React to uniquely identify each Task
// created by the map.
