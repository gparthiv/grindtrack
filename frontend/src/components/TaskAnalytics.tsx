import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { type DayType } from "../data/taskData";

type TaskAnalyticsProps = {
  days: DayType[];
};

function TaskAnalytics({ days }: TaskAnalyticsProps) {

  // DAILY COMPLETION
  const dailyData = days
    .map((day) => ({
      date: day.date.slice(5),
      completed: day.tasks.filter(
        (task) => task.completed
      ).length,
    }))
    .reverse();

  // SUBJECT DISTRIBUTION
  const subjectMap: Record<string, number> = {};

  days.forEach((day) => {
    day.tasks.forEach((task) => {
      subjectMap[task.subject] =
        (subjectMap[task.subject] || 0) + 1;
    });
  });

  const subjectData = Object.entries(subjectMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  const greenShades = [
    "#166534",
    "#15803d",
    "#16a34a",
    "#22c55e",
    "#4ade80",
    "#86efac",
  ];
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">

      {/* DAILY COMPLETION */}
      <div className="col-span-2 h-64">

        <AreaChart
          width={600}
          height={250}
          data={dailyData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="greenFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#22c55e"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#22c55e"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            className="opacity-20"
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="completed"
            stroke="#22c55e"
            fill="url(#greenFill)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>

      </div>


      {/* SUBJECT DISTRIBUTION */}
      <div className="col-span-1 h-64">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={subjectData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={85}
              label
            >
              {subjectData.map((_, index) => (
                <Cell
                  key={index}
                  fill={greenShades[index % greenShades.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default TaskAnalytics;