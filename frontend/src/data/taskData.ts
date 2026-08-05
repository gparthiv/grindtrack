export type TaskType = {
  id: number;
  title: string;
  subject: string;
  completed: boolean;
};

export type DayType = {
  id: number;
  date: string;
  isToday: boolean;
  tasks: TaskType[];
};

export const taskData: DayType[] = [
  {
    id: 1,
    date: "5 Aug",
    isToday: true,

    tasks: [
      {
        id: 101,
        title: "Solve Two Sum",
        subject: "DSA",
        completed: true,
      },
      {
        id: 102,
        title: "Learn Express",
        subject: "Backend",
        completed: false,
      },
      {
        id: 103,
        title: "Revise DBMS",
        subject: "Core",
        completed: false,
      },
    ],
  },

  {
    id: 2,
    date: "4 Aug",
    isToday: false,

    tasks: [
      {
        id: 201,
        title: "Binary Search",
        subject: "DSA",
        completed: true,
      },
      {
        id: 202,
        title: "MongoDB practice",
        subject: "Backend",
        completed: true,
      },
    ],
  },
];

// TaskType defines the structure of ONE task object.
// A TaskType must have:
// id, title, subject, completed

// DayType defines the structure of ONE day object.
// A DayType must have:
// id, date, isToday, tasks
//
// tasks is TaskType[] because one day can contain many tasks.


// taskData is DayType[]
// which means taskData is an ARRAY containing multiple DayType objects.


// "export type" creates and exports a TypeScript blueprint/type.
// It doesn't store any actual data.
// It tells TypeScript what shape our objects are expected to have.


// taskData is the actual variable containing our mock data.