type SubjectProp = { subject: string };
function SubjectTag({ subject }: SubjectProp) {
  return (
    <div className="rounded-sm bg-slate-100 dark:bg-neutral-800 px-2 scale-80 border border-slate-300 dark:border-neutral-700">

      <span className="my-auto text-black dark:text-white text-xs">
        {subject}
      </span>

    </div>
  );
}

export default SubjectTag;