import { type DayType } from "../data/taskData";

type TaskHeatmapProps = {
  days: DayType[];
};

type HeatmapCell = {
  date: string;
  completed: number;
};

function getLocalDate(date: Date) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function getDateFromString(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function TaskHeatmap({ days }: TaskHeatmapProps) {

  /*
   * --------------------------------
   * 1. Count completed tasks per day
   * --------------------------------
   */

  const completedByDate: Record<string, number> = {};

  days.forEach((day) => {
    completedByDate[day.date] = day.tasks.filter(
      (task) => task.completed
    ).length;
  });


  /*
   * --------------------------------
   * 2. Find first day with a task
   * --------------------------------
   */

  const datesWithTasks = days
    .filter((day) => day.tasks.length > 0)
    .map((day) => day.date)
    .sort();

  if (datesWithTasks.length === 0) {
    return null;
  }

  const firstDate = getDateFromString(
    datesWithTasks[0]
  );

  const today = new Date();


  /*
   * --------------------------------
   * 3. Move first date back to Monday
   *
   * Sunday = 0
   * Monday = 1
   * ...
   * Saturday = 6
   * --------------------------------
   */

  const firstDayOfWeek = firstDate.getDay();

  const daysSinceMonday =
    firstDayOfWeek === 0
      ? 6
      : firstDayOfWeek - 1;

  firstDate.setDate(
    firstDate.getDate() - daysSinceMonday
  );


  /*
   * --------------------------------
   * 4. Move today forward to Sunday
   * --------------------------------
   */

  const lastDate = new Date(today);

  const lastDayOfWeek = lastDate.getDay();

  const daysUntilSunday =
    lastDayOfWeek === 0
      ? 0
      : 7 - lastDayOfWeek;

  lastDate.setDate(
    lastDate.getDate() + daysUntilSunday
  );


  /*
   * --------------------------------
   * 5. Generate every day
   * --------------------------------
   */

  const cells: HeatmapCell[] = [];

  const currentDate = new Date(firstDate);

  while (currentDate <= lastDate) {

    const date = getLocalDate(currentDate);

    cells.push({
      date,
      completed: completedByDate[date] || 0,
    });

    currentDate.setDate(
      currentDate.getDate() + 1
    );
  }


  /*
   * --------------------------------
   * 6. Split into weeks
   * --------------------------------
   */

  const weeks: HeatmapCell[][] = [];

  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }


  /*
   * --------------------------------
   * 7. Color intensity
   * --------------------------------
   */

  function getIntensity(completed: number) {

    if (completed === 0) {
      return "bg-slate-200 dark:bg-neutral-800";
    }

    if (completed === 2) {
      return "bg-green-200 dark:bg-green-900";
    }

    if (completed === 3) {
      return "bg-green-400 dark:bg-green-700";
    }

    if (completed === 4) {
      return "bg-green-500 dark:bg-green-600";
    }

    return "bg-green-700 dark:bg-green-500";
  }


  /*
   * --------------------------------
   * 8. Month labels
   * --------------------------------
   */

  const monthLabels: {
    label: string;
    weekIndex: number;
  }[] = [];

  weeks.forEach((week, index) => {

    const firstCell = week[0];

    if (!firstCell) return;

    const date = getDateFromString(
      firstCell.date
    );

    const month = date.toLocaleString(
      "en-US",
      { month: "short" }
    );

    const previous = monthLabels.at(-1);

    if (!previous || previous.label !== month) {
      monthLabels.push({
        label: month,
        weekIndex: index,
      });
    }
  });


  return (
    <div className="max-w-4xl mx-auto mt-8">

      {/* MONTHS */}
      <div className="relative mb-2 h-4">
        {monthLabels.map((month) => (
          <span
            key={`${month.label}-${month.weekIndex}`}
            className="absolute text-xs text-slate-500 dark:text-slate-400"
            style={{
              left: `${month.weekIndex * 15}px`,
            }}
          >
            {month.label}
          </span>
        ))}
      </div>

      {/* HEATMAP */}

      <div className="flex gap-0.75">

        {weeks.map((week, weekIndex) => (

          <div
            key={weekIndex}
            className="flex flex-col gap-0.75"
          >

            {week.map((cell) => (

              <div
                key={cell.date}
                title={`${cell.date} · ${cell.completed} completed`}
                className={`
                  w-3 h-3
                  rounded-xs
                  ${getIntensity(cell.completed)}
                `}
              />

            ))}

          </div>

        ))}

      </div>


      {/* LEGEND */}

      <div className="flex justify-end items-center gap-1 mt-2 text-xs text-slate-500 dark:text-slate-400 mb-8">

        <span>Less</span>

        <div className="w-3 h-3 rounded-xs bg-slate-200 dark:bg-neutral-800" />

        <div className="w-3 h-3 rounded-xs bg-green-200 dark:bg-green-900" />

        <div className="w-3 h-3 rounded-xs bg-green-400 dark:bg-green-700" />

        <div className="w-3 h-3 rounded-xs bg-green-500 dark:bg-green-600" />

        <div className="w-3 h-3 rounded-xs bg-green-700 dark:bg-green-500" />

        <span>More</span>

      </div>

    </div>
  );
}

export default TaskHeatmap;