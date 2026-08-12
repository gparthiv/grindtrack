// for single Task component
export type TaskType = {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
};

// describes what MongoDB sends 
export type ApiTaskType = {
  _id: string;
  title: string;
  subject: string;
  completed: boolean;
  date: string;
};

// for the whole taskCard 
export type DayType = {
  id: string;
  date: string;
  isToday: boolean;
  tasks: TaskType[];
};


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
