const fs = require("fs");

// write operation Starts

// const data = "The contents of this file is written using nodejs fs module";

// output:- The contents of this file is written using nodejs fs module

// const dataArray = [
//   "This is the first line.",
//   "This is the second line.",
//   "This is the third line.",
//   "This is the fourth line."
// ];
// const data = dataArray.join('\n');

/* OutPut
This is the first line.
This is the second line.
This is the third line.
This is the fourth line.
*/

// const dataArray = [
//   { id: 1, text: "This is the first line." },
//   { id: 2, text: "This is the second line." },
//   { id: 3, text: "This is the third line." },
//   { id: 4, text: "This is the fourth line." }
// ];
// const data = dataArray.map(item => JSON.stringify(item)).join('\n');

/* output
{"id":1,"text":"This is the first line."}
{"id":2,"text":"This is the second line."}
{"id":3,"text":"This is the third line."}
{"id":4,"text":"This is the fourth line."}
*/

// const dataArray = [
//   { id: 1, text: "This is the first line." },
//   { id: 2, text: "This is the second line." },
//   { id: 3, text: "This is the third line." },
//   { id: 4, text: "This is the fourth line." }
// ];
// const textArray = dataArray.map(item => item.text);
// const data = textArray.join('\n');

/* output
This is the first line.
This is the second line.
This is the third line.
This is the fourth line.
*/

// const dataArray = [
//   { id: 1, text: "This is the first line." },
//   { id: 2, text: "This is the second line." },
//   { id: 3, text: "This is the third line." },
//   { id: 4, text: "This is the fourth line." }
// ];
// const formattedArray = dataArray.map(item => `${item.id} "${item.text}"`);
// const data = formattedArray.join('\n');

/* output
1 "This is the first line."
2 "This is the second line."
3 "This is the third line."
4 "This is the fourth line."
*/

// const writeOperation = () => {
//   fs.writeFile(
//     "sample.txt",
//     data,
//     (err) => {
//       if(err) {
//         console.log("Error Occured While Writting! File",err);
//         return;
//       }
//       console.log("File Written SuccessFullly")
//     }
//   );
// }

// writeOperation();

// Write Operation Ends

//Write + Append Operation + Read Operation

/*

const data = "The contents of this file is written using nodejs fs module.";

const writeOperation = () => {
  fs.writeFile(
    "sample.txt",
    data,
    (err) => {
      if(err) {
        console.log("Error Occured While Writting! File",err);
        return;
      }
      console.log("File Written SuccessFullly")
    }
  );
}

writeOperation();

const newdata = "\n i have been added by fs.appendFile()";

const appendFileOperation = () => {
  fs.appendFile("sample.txt", newdata, (err) => {
    if(err) {
      console.log("Error appending File", err);
      return;
    }
    console.log("Data added to file successfully");
  })
}

appendFileOperation();

const readFileOperation = () => {
  fs.readFile("sample.txt", (err, data) => {
    if(err) {
      console.log("Error Reading File", err);
      return;
    }
    console.log("File Data:", data.toString());
  })
}

readFileOperation();

*/

//Write + Append Operation + Read Operation Ends

// writing a json file

/*

const fileName = "users.json";

const users = [
  {
    id: 1,
    name: "petar parkar",
    age: 22,
  },
  {
    id: 2,
    name: "mary jane",
    age: 22,
  },
];

const newUser = {
  id: 3,
  name: "gwen stacy",
  age: 22,
};

const writeOperation = (filePath, content) => {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log("Error Occured While Writting! File", err);
      return;
    }
    console.log("File Written SuccessFullly");
  });
};

writeOperation(fileName, JSON.stringify(users));

const readFileOperation = (filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("Error Reading File", err);
      return;
    }
    console.log("File Data:", data.toString());
    const usersData = JSON.parse(data.toString());
    usersData.push(newUser);
    console.log(usersData);
    writeOperation(fileName, JSON.stringify(usersData));
  });
};

readFileOperation(fileName);

*/

// adding more to json

/*

const fileName = "users.json";

const users = [
  {
    id: 1,
    name: "petar parkar",
    age: 22,
  },
  {
    id: 2,
    name: "mary jane",
    age: 22,
  },
];

const newUsers = [
  {
    id: 3,
    name: "gwen stacy",
    age: 22,
  },
  {
    id: 4,
    name: "miles morales",
    age: 18,
  }
];

const writeOperation = (filePath, content) => {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log("Error Occurred While Writing File", err);
      return;
    }
    console.log("File Written Successfully");
  });
};

writeOperation(fileName, JSON.stringify(users));

const readFileOperation = (filePath, newUsersArray) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("Error Reading File", err);
      return;
    }
    console.log("File Data:", data.toString());
    const usersData = JSON.parse(data.toString());

    newUsersArray.forEach(newUser => {
      usersData.push(newUser);
    });

    console.log("Updated Users Data:", usersData);
    writeOperation(fileName, JSON.stringify(usersData));
  });
};

readFileOperation(fileName, newUsers);

*/

// Deleting a File
// const fileName = "sample.txt";

// const deleteFileOperation = (filePath) => {
//   fs.unlink(filePath, (err) =>{
//     if(err) {
//       console.log("Error While Deleting a File", err);
//       return;
//     }
//     console.log("File Deleted Successfully");
//   })
// }

// deleteFileOperation(fileName);

/*
1. fs.stat: This function is used to retrieve information about the file specified by filePath. It provides a stats object which includes various details about the file, including its size (stats.size).
2. stats.size: This property gives the size of the file in bytes. If stats.size is 0, it means the file is empty.
*/

// const fileName = "sample.txt";
// const deleteFileOperation = (filePath) => {
//   fs.stat(filePath, (err, stats) => {
//     if (err) {
//       console.log("Error while checking file stats", err);
//       return;
//     }

//     if (stats.size === 0) {
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           console.log("Error while deleting the file", err);
//           return;
//         }
//         console.log("File Deleted Successfully");
//       });
//     } else {
//       console.log("sample.txt has some data");
//     }
//   });
// };

// deleteFileOperation(fileName);


// const fileName = "users.json";

// const users = [
//   {
//     id: 1,
//     name: "petar parkar",
//     age: 22,
//   },
//   {
//     id: 2,
//     name: "mary jane",
//     age: 22,
//   },
// ];

// const newUser = {
//   id: 3,
//   name: "gwen stacy",
//   age: 22,
// };

// const writeOperation = (filePath, content) => {
//   fs.writeFile(filePath, content, (err) => {
//     if (err) {
//       console.log("Error Occured While Writting! File", err);
//       return;
//     }
//     console.log("File Written SuccessFullly");
//   });
// };

// writeOperation(fileName, JSON.stringify(users));

// const readFileOperation = (filePath) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.log("Error Reading File", err);
//       return;
//     }
//     console.log("File Data:", data.toString());
//     const usersData = JSON.parse(data.toString());
//     usersData.push(newUser);
//     console.log(usersData);
//     writeOperation(fileName, JSON.stringify(usersData));
//   });
// };

// readFileOperation(fileName);

// Path Module

const path = require("path");

// console.log(__dirname);

// const fullPath = path.join(__dirname, 'files',"sample1.txt");
// outPut:- D:\NodeJs\classes\day1\files\downloads\sample1.txt

// const fullPath = path.join(__dirname, "files", "../../../", "notes1.txt" );
// outPut:- D:\NodeJs\notes1.txt
// console.log(fullPath);

// const extension = path.extname("D:\NodeJs\classes\day1\files\downloads\mypic.jpg");
// outPut: .jpg
// console.log(extension);

// const pathDetails = path.parse("D:\NodeJs\\classes\\day1\\files\\downloads\\mypic.jpg");
// console.log(pathDetails);
/*
{
  root: 'D:',
  dir: 'D:NodeJs\\classes\\day1\\files\\downloads',
  base: 'mypic.jpg',
  ext: '.jpg',
  name: 'mypic'
}
*/

// const normalizedPath = path.normalize("/path/to/../mypic.jpg");
// console.log(normalizedPath);
//output:- \path\mypic.jpg

// ReadLine Module 

const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter Your Name ", (answer) => {
//   console.log(`Hi, ${answer}!`);
//   rl.close();
// });

// Child_Process: its a module to open other applications in your system

// const ChildProcess = require("child_process");
// ChildProcess.exec("start calc");


