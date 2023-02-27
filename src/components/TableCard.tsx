import React from "react";

type TableCardProps = {
  title: string;
  rows: string[];
};
const TableCard = ({ title, rows }: TableCardProps) => {
  return (
    <div className="shadow-md p-4 rounded-md border-2 border-gray-400">
      <h4 className="text-xl font-semibold leading-snug">{title}</h4>

      <ul>
        {rows.map((row, idx) => {
          return <li key={idx}>{row}</li>;
        })}
      </ul>
    </div>
  );
};

export default TableCard;
