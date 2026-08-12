import { useState } from "react";
import { Check, X } from "lucide-react";
type AddTaskProps = {
  createTask: (
    title: string,
    subject: string
  ) => void;
  closeAddTask: () => void;
};
function AddTask({
  createTask,
  closeAddTask
}: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("DSA");


  function submit() {
    if (title.trim() === "") return;
    createTask(title, subject);
    setTitle("");
    closeAddTask();
  }
  return (
    <div className="
flex items-center gap-3
mx-3 mb-3
px-4 py-2
rounded-sm
bg-green-100
dark:bg-green-950
border border-green-400
dark:border-green-700
">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit();
          }
        }}
        placeholder="Add task..."
        className="dark:text-white flex-1 bg-transparent outline-none"
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="text-sm bg-transparent dark:bg-green-950 dark:text-white"
      >
        <option>DSA</option>
        <option>Core</option>
        <option>WebDev</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>Others  </option>
      </select>

      <button className="dark:text-white" onClick={submit}>
        <Check size={16} />
      </button>
      <button className="dark:text-white" onClick={closeAddTask}>
        <X size={16} />
      </button>
    </div>
  );
}

export default AddTask;