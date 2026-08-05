import { useState } from "react";
import TaskCard from "../components/TaskCard";
import { taskData } from "../data/taskData";

function Dashboard() {

  const [days, setDays] = useState(taskData);


  function toggleTask(dayId: number, taskId: number) {

    setDays(
      days.map((day) => {

        // Not the day we clicked
        if (day.id !== dayId) {
          return day;
        }

        // This is the correct day
        const updatedTasks = day.tasks.map((task) => {

          // This is the task we clicked
          if (task.id === taskId) {
            return {
              ...task,
              completed: !task.completed
            };
          }

          return task;
        });


        return {
          ...day,
          tasks: updatedTasks
        };

      })
    );
  }


  return (
    <main className="pt-26">

      {days.map((day) => (
        <TaskCard
          key={day.id}
          day={day}
          toggleTask={toggleTask}
        />
      ))}

    </main>
  );
}

export default Dashboard;

// imports useState to store the current days data as React state
// imports the TaskCard component and initial taskData

// inside Dashboard create days state:
// taskData = initial data
// days = current/changeable data

// create toggleTask function which gets passed:
// Dashboard -> TaskCard -> Task

// toggleTask receives dayId and taskId

// suppose we click task 103 belonging to day 1
// toggleTask(1, 103) gets called


// setDays updates our days state

// first days.map() iterates through every day

// check:
// day.id !== dayId

// if ID doesn't match, this isn't the day we need
// so return the day unchanged

// if ID matches, we've found the correct day


// now create updatedTasks by doing day.tasks.map()

// this iterates through every task INSIDE the matched day

// check:
// task.id === taskId

// if the task ID matches, copy the entire task using:
// ...task

// ...task means keep all existing properties of that task

// then overwrite only:
// completed: !task.completed

// so:
// false -> true
// true -> false

// if task ID doesn't match, return that task unchanged


// updatedTasks now contains all the original tasks
// except the clicked task has its completed value toggled


// now return:
// {
//   ...day,
//   tasks: updatedTasks
// }

// ...day copies the matched day as it was
// but tasks: updatedTasks replaces its old tasks array
// with our newly updated tasks array


// days.map() therefore produces a new days array where:
// non-matching days = unchanged
// matching day = contains updatedTasks

// setDays saves this new array into React state


// finally Dashboard renders the current days state:

// days.map((day) => <TaskCard />)

// this creates one TaskCard for every day

// each TaskCard receives:
// key={day.id} -> used by React to identify the card
// day={day} -> actual day object
// toggleTask={toggleTask} -> function used to modify task state

// toggleTask continues down:
// Dashboard -> TaskCard -> Task

// Dashboard is finally rendered by App.tsx
