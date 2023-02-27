import React from "react";
import initSqlJs, { Database } from "sql.js";
import sqlFile from "../../node_modules/sql.js/dist/sql-wasm.wasm?url";
import { handleInitData } from "../constants/sql.constant";

export const useDatabase = (sql: string) => {
  const [db, setDb] = React.useState<Database | null>(null);
  React.useEffect(() => {
    initSqlJs({
      locateFile: (file) => sqlFile,
    }).then((r) => {
      setDb(new r.Database());
    });
  }, []);
  React.useEffect(() => {
    if (db !== null) {
      try {
        db.run(sql);
        const data = handleInitData();
        data.forEach((arr) => {
          arr.forEach((item) => {
            db.run(item[0] as string, item[1] as string[]);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [db]);
  return db;
};
