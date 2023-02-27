import React from "react";
import { initSQL, tables } from "./constants/sql.constant";
import TablesGrid from "./components/TablesGrid";
import { useDatabase } from "./hooks/useDatabase";

const statements = {
  getGrades: `select s.firstName as studentFirst, s.lastName as studentLast, c.title as className, round(cast(SUM(g.scoredPoints) as float) /cast(SUM(a.points) as float),3) as score
  from student as s
  inner join 
  grade g on g.studentId = s.id
  inner join
  assignment a on a.id = g.assignmentId
  inner join
  class c on c.id = a.classId
  group by s.id, c.title;`,
};
const App = () => {
  const db = useDatabase(initSQL);
  const [statement, setStatement] = React.useState<string>(
    statements.getGrades
  );
  const [result, setResult] = React.useState<any[]>([]);
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setStatement(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult([]);
    if (db) {
      try {
        const res = db.exec(statement);
        console.log(res);
        setResult(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    if (db) {
      setResult(db.exec(statement));
    }
  }, [db]);
  return (
    <section>
      <div className="container py-8 space-y-8">
        <div>
          <h2 className="leading-snug text-4xl font-semibold">SQL</h2>
          <p className="text-xl mb-4">
            School database with subjects, teachers, students, classes,
            enrollments, assignments and grades. The initial query showcases
            grades by the student and class title. The syntax being used is
            SQLite.
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <textarea
              spellCheck="false"
              ref={textRef}
              rows={10}
              value={statement}
              onChange={handleChange}
              name="statement"
              className="w-full border-2 border-gray-400 rounded-md resize-y p-4"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-sm active:bg-blue-900 duration-200"
            >
              Submit
            </button>
          </form>
        </div>

        {Array.isArray(result) && result.length > 0 ? (
          <div>
            <h2 className="leading-snug text-4xl font-semibold mb-4">
              Results
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-md font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    {result[0].columns.map((col: string) => {
                      return (
                        <th className="px-6 py-4" key={col}>
                          {col}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                  {result.map((res) => {
                    return res.values.map((v: any[], idx: number) => {
                      return (
                        <tr key={idx}>
                          {v.map((item: string) => {
                            return <td key={item}>{item}</td>;
                          })}
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="leading-snug text-4xl font-semibold mb-4">
              No Results to display
            </h2>
            <p className="text-lg">Try using a different query.</p>
          </div>
        )}

        <TablesGrid tables={tables} />
      </div>
    </section>
  );
};

export default App;
