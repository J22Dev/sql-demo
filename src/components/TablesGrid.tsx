import React from "react";
import TableCard from "./TableCard";

type TablesGridProps = {
  tables: { title: string; rows: string[] }[];
};
const TablesGrid = ({ tables }: TablesGridProps) => {
  return (
    <div>
      <h2 className="leading-snug text-4xl font-semibold mb-4">Tables</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {tables.map(({ title, rows }) => {
          return <TableCard title={title} rows={rows} key={title} />;
        })}
      </div>
    </div>
  );
};

export default TablesGrid;
