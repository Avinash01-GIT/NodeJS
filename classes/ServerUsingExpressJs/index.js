const express = require("express");

// Server initialization
const app = express(); // step 1

const users = [
  {
    id: 1,
    name: "Peter-Parkar",
    mobNo: "9568746321",
  },
  {
    id: 2,
    name: "Mary-Jane",
    mobNo: "0000000000",
  },
  {
    id: 3,
    name: "Gwen-Stacy",
    mobNo: "1234567890",
  },
];

/**** middlewares step5 ****/
const m1 = (req, res, next) => {
  console.log('Middlerware 1');
  next();
  // res.json({ message: "Response from M1" });
};

const m2 = (req, res, next) => {
  console.log('Middlerware 2');
  next();
  // res.json({ message: "Response from M2" });
};

const m3 = (req, res, next) => {
  console.log('Middlerware 3');
  next();
  // res.json({ message: "Response from M3" });
};

// Applicaition middlewares 
app.use(m1);
app.use(m2);
app.use(m3);

/**** middlewares  ****/

/**** API end points FUNCTIONS ****/
// step 3
app.get("/login", (req, res) => {
  console.log("LOGIN API GET IS CALLED");
  res.json({
    success: true,
    message: "LOGIN GET API",
  });
}); // step 3 get

app.post("/login", (req, res) => {
  console.log("LOGIN API POST IS CALLED");
  res.json({
    success: true,
    message: "LOGIN POST API",
  });
}); // step 3 post

// app.get("/user", (req, res) => {
//   res.json({
//     success: true,
//     message: "Dummy get user API",
//     results: users,
//   });
// }); // step 4

// app.get("/user/:id", (req, res) => {
//   const params = req.params;
//   console.log(params);
//   res.json({
//     success: true,
//     message: "Dummy get user API",
//     results: users,
//   });
// }); // step 4.1

app.get("/user/:id/:name", (req, res) => {
  const params = req.params;
  console.log(params);
  res.json({
    success: true,
    message: "Dummy get user API",
    results: users,
  });
}); // step 4.2 params PSM: http://localhost:10000/user/1/Peter-Parkar

app.get("/user/:id", (req, res) => {
  const params = req.params;
  const user = users.find((u) => u.id == params.id);
  if (!params.id) {
    return res.json({
      success: true,
      results: users,
    });
  }
  if (!user) {
    res.status(404).json({
      success: false,
      message: "USER NOT FOUND",
    });
  } else {
    res.json({
      success: true,
      message: "Dummy get user API",
      results: user,
    });
  }
}); // step 4.3 params PSM: http://localhost:10000/user/1

app.get("/user", (req, res) => {
  const query = req.query;
  console.log(req.query);
  const user = users.find((u) => u.id == query.userId);
  if (!query.userId) {
    return res.json({
      success: true,
      results: users,
    });
  }
  if (!user) {
    res.status(404).json({
      success: false,
      message: "USER NOT FOUND",
    });
  } else {
    res.json({
      success: true,
      message: "Dummy get user API",
      results: user,
    });
  }
}); // step 4.4 query PSM: http://localhost:10000/user?userId=1

/**** API end points FUNCTIONS ****/

app.listen(10000, () =>
  console.log(`Express Server is up and running at port 10000`)
); // step 2
