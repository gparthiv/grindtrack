import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { type ApiTaskType, type DayType } from "../data/taskData";
import { useNavigate } from "react-router-dom";
import { getLocalDate } from "../utils/formatDate";
import TaskHeatmap from "../components/TaskHeatmap";
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
const API_URL = import.meta.env.VITE_API_URL;
function groupTaskByDate(tasks: ApiTaskType[]): DayType[] {
  const grouped: Record<string, ApiTaskType[]> = {};

  // Group actual MongoDB tasks by date
  tasks.forEach((task) => {
    const date = task.date.split("T")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(task);
  });

  // Convert grouped object into DayType[]
  const days: DayType[] = Object.entries(grouped).map(
    ([date, tasks]) => ({
      id: date,
      date: date,
      isToday:
        date === getLocalDate(),

      tasks: tasks.map((task) => ({
        id: task._id,
        title: task.title,
        subject: task.subject,
        completed: task.completed,
      })),
    })
  );

  // Today's date
  const today = getLocalDate();

  // Check whether MongoDB returned any task for today
  const todayExists = days.some(
    (day) => day.date === today
  );

  // If not, create an EMPTY day
  if (!todayExists) {
    days.push({
      id: today,
      date: today,
      isToday: true,
      tasks: [],
    });
  }

  // Newest day first
  days.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  return days;
}


function Dashboard() {
  // to store the days state object that is response from server
  const navigate = useNavigate();
  const [days, setDays] = useState<DayType[]>([]);
  // fetch the api get the data from there and setDay using the above helping func to flat the response
  // setDay as the days we return from groupTaskbyDays

  // getTask creates a res constant and fetches the backend api, data constant stores the json data of res
  // groupedDays stores the helping function processed data const
  // setDay sets the state as the groupedDays data
  // this becomes GET 
  async function getTask() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const res = await fetch(
      `${API_URL}/api/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }

      return;
    }

    const groupedDays = groupTaskByDate(data);

    setDays(groupedDays);
  }

  // defines the TaskUpdate type 
  type TaskUpdate = {
    title?: string;
    subject?: string;
    completed?: boolean;
  };

  // PATCH
  async function patchTask(
    taskId: string,
    updates: TaskUpdate
  ) {
    const token = localStorage.getItem("token");
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await fetch(
      `${API_URL}/api/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Timezone": timezone,
        },
        body: JSON.stringify(updates),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return;
    }

    getTask();
  }


  // DELETE
  async function deleteTask(taskId: string) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/api/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      console.log(data.message);
      return;
    }

    getTask();
  }


  // CREATE
  async function createTask(
    title: string,
    subject: string
  ) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/api/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          subject,
          date: getLocalDate(),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return;
    }

    getTask();
  }


  // each time render the getTask when needed
  useEffect(() => {
    getTask()
  }, []);


  return (
    <main className="pt-26 px-4 sm:px-6 md:px-8">
      <div className="animate-fade-in-delay">
        <TaskHeatmap days={days} />
      </div>

      <div className="animate-fade-in-delay-2">
        {days.map((day) => (
          <TaskCard
            key={day.id}
            day={day}
            patchTask={patchTask}
            deleteTask={deleteTask}
            createTask={createTask}
          />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;