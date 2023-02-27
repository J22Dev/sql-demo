export const tables = [
  {
    title: "subject",
    rows: ["id INTEGER PRIMARY KEY AUTOINCREMENT", "title text unique"],
  },
  {
    title: "teacher",
    rows: [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "firstName text not null",
      "lastName text not null",
      "email text unique",
      "subjectId integer not null (fk references subject(id))",
      "dateCreated datetime default current_timestamp",
      "dateUpdated datetime default current_timestamp",
    ],
  },
  {
    title: "student",
    rows: [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "firstName text not null",
      "lastName text not null",
      "email text unique",
      "dateCreated datetime default current_timestamp",
      "dateUpdated datetime default current_timestamp",
    ],
  },
  {
    title: "class",
    rows: [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "title text not null",
      "subjectId integer not null (fk references subject(id))",
      "teacherId integer not null (fk references teacher(id))",
      "startDate datetime not null",
      "endDate datetime not null",
    ],
  },
  {
    title: "enrollment",
    rows: [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "classId integer not null (fk references class(id))",
      "studentId integer not null (fk references student(id))",
    ],
  },
  {
    title: "assignment",
    rows: [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "classId integer not null (fk references class(id))",
      "title text not null",
      "description text not null",
      "points integer not null",
    ],
  },
  {
    title: "grade",
    rows: [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "assignmentId integer not null (fk references assignment(id))",
      "studentId integer not null (fk references student(id))",
      "scoredPoints integer not null",
    ],
  },
];
export const handleInitData = () => {
  const statements = {
    subject: "insert into subject (title) values (?)",
    teacher:
      "insert into teacher (firstName,lastName,email,subjectId) values (?,?,?,?)",
    student: "insert into student (firstName,lastName,email) values (?,?,?)",
    class:
      "insert into class (title,subjectId,teacherId,startDate,endDate) values (?,?,?,?,?)",
    enrollment: "insert into enrollment (classId, studentId) values (?,?)",
    assignment:
      "insert into assignment (classId, title, description, points) values (?,?,?,?)",
    grade:
      "insert into grade (assignmentId,studentId,scoredPoints) values (?,?,?)",
  };
  const statementData = {
    subject: ["MATH", "SCIENCE", "ENGLISH"],
    teacher: [
      "James,Smith,js@mail.com,1",
      "Marry,Anne,ma@mail.com,2",
      "Kerry,Schwartz,ks@mail.com,3",
    ],
    student: [`Tim,Smith,ts@mail.com`, "Alexandria,Miller,am@mail.com"],
    class: [
      `Algebra 200,1,1,2020-01-01,2020-06-01`,
      "English 200,3,4,2020-01-01,2020-06-01",
      "Physics 100,2,2,2020-01-01,2020-06-01",
    ],
    enrollment: ["1,1", "1,2", "2,1", "2,2", "3,1", "3,2"],
    assignment: [
      "1,Homework 1,homework assignment,100",
      "2,Homework 1,homework assignment,100",
      "3,Homework 1,homework assignment,100",
    ],
    grade: ["1,1,75", "1,2,85", "2,1,100", "2,2,65", "3,1,100", "3,2,100"],
  };
  const preparedStatements = Object.keys(statements).map((st) => {
    const data = statementData[st as keyof typeof statementData];
    return data.map((item) => {
      if (item.includes(",")) {
        return [
          statements[st as keyof typeof statements],
          [...item.split(",")],
        ];
      }
      return [statements[st as keyof typeof statements], [item]];
    });
  });
  console.log(preparedStatements);
  return preparedStatements;
};
export const initSQL = `
CREATE TABLE subject (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT UNIQUE
);

CREATE TABLE teacher (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE,
  subjectId INTEGER NOT NULL,
  dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
  dateUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subjectId) REFERENCES subject(id)
);

CREATE TABLE student (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE,
  dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
  dateUpdated DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE class (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subjectId INTEGER NOT NULL,
  teacherId INTEGER NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  FOREIGN KEY (subjectId) REFERENCES subject(id),
  FOREIGN KEY (teacherId) REFERENCES teacher(id)
);

CREATE TABLE enrollment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  classId INTEGER NOT NULL,
  studentId INTEGER NOT NULL,
  FOREIGN KEY (classId) REFERENCES class(id),
  FOREIGN KEY (studentId) REFERENCES student(id)
);

CREATE TABLE assignment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  classId INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL,
  FOREIGN KEY (classId) REFERENCES class(id)
);

CREATE TABLE grade (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assignmentId INTEGER NOT NULL,
  studentId INTEGER NOT NULL,
  scoredPoints INTEGER NOT NULL,
  FOREIGN KEY (assignmentId) REFERENCES assignment(id),
  FOREIGN KEY (studentId) REFERENCES student(id)
);

`;
