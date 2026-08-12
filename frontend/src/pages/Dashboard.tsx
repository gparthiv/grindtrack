import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { type ApiTaskType, type DayType } from "../data/taskData";

// translates API json to required Day[x,y,z,[]] type
// first name each json response from mongo as tasks which will initially be in DayType[]
// define grouped object containing a string and the API response 
// go thru each mongodb each json resp named task and make date const by splitting the task.date
// then check if grouped[date] exists or not if not then init with empty []
// else push the task in that dated group
// define days as each object put id and date as the res date
// isToday true false if it is today Date.toISOString()
// then in tasks init each task we got from response
// return days

// HELPING FUNCTION

function groupTaskByDate(tasks: ApiTaskType[]): DayType[] {
  const grouped: Record<string, ApiTaskType[]> = {};

  tasks.forEach((task) => {
    const date = task.date.split("T")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(task);
  });

  const days = Object.entries(grouped).map(([date, tasks]) => ({
    id: date,
    date: date,
    isToday: date === new Date().toISOString().split("T")[0],
    tasks: tasks.map((task) => ({
      id: task._id,
      title: task.title,
      subject: task.subject,
      completed: task.completed
    }))
  }));
  const today = new Date().toISOString().split("T")[0];

  const todayExists = days.some(
    (day) => day.date === today
  );

  if (!todayExists) {
    days.push({
      id: today,
      date: today,
      isToday: true,
      tasks: []
    });
  }

  // Newest date first
  days.sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  return days;
}


function Dashboard() {
  // to store the days state object that is response from server
  const [days, setDays] = useState<DayType[]>([]);
  // fetch the api get the data from there and setDay using the above helping func to flat the response
  // setDay as the days we return from groupTaskbyDays

  // getTask creates a res constant and fetches the backend api, data constant stores the json data of res
  // groupedDays stores the helping function processed data const
  // setDay sets the state as the groupedDays data
  // this becomes GET 
  async function getTask() {
    const res = await fetch("http://localhost:8000/api/tasks");
    const data = await res.json();
    const groupedDays = groupTaskByDate(data);
    setDays(groupedDays);
  }

  // defines the TaskUpdate type 
  type TaskUpdate = {
    title?: string;
    subject?: string;
    completed?: boolean;
  };

  // 
  // PATCH
  async function patchTask(taskId: string, updates: TaskUpdate) {
    const res = await fetch(`http://localhost:8000/api/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      }
    );
    if (!res.ok) {
      console.log("Failed to update task");
      return;
    }
    getTask();
  }


  // DELETE
  async function deleteTask(taskId: string) {
    const res = await fetch(`http://localhost:8000/api/tasks/${taskId}`,
      {
        method: "DELETE"
      }
    );
    if (!res.ok) {
      console.log("Failed to delete task");
      return;
    }
    getTask();
  }


  // CREATE
  async function createTask(title: string, subject: string) {
    const res = await fetch("http://localhost:8000/api/tasks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          subject: subject,
          date: new Date().toISOString(),
        })
      }
    );
    if (!res.ok) {
      console.log("Failed to create task");
      return;
    }
    getTask();
  };


  // each time render the getTask when needed
  useEffect(() => {
    getTask()
  }, []);


  return (
    <main className="pt-26">

      {days.map((day) => (
        <TaskCard
          key={day.id}
          day={day}
          patchTask={patchTask}
          deleteTask={deleteTask}
          createTask={createTask}
        />
      ))}

    </main>
  );
}

export default Dashboard;