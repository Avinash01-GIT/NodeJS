const express = require("express");

const app = express();

const users = [
  {
    id: 1,
    name: "Michael Scott",
    mobNo: "1234567890",
  },
  {
    id: 2,
    name: "Dwight Schrute",
    mobNo: "0987654321",
  },
  {
    id: 3,
    name: "Jim Halpert",
    mobNo: "1111111111",
  },
  {
    id: 4,
    name: "Pam Beesly",
    mobNo: "2222222222",
  },
  {
    id: 5,
    name: "Ryan Howard",
    mobNo: "3333333333",
  },
];

const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apikey === "office101") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Please pass api key",
    });
  }
  console.log("Middleware 1");
};

// Applicaition middleware
app.use(apiKeyMiddleware);

/**** API end points FUNCTIONS ****/
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
});

/**** API end points FUNCTIONS ****/

app.listen(10000, () => {
  console.log(`Express Server is up and running at port 10000`);
});


/*
 http://localhost:10000/user?apikey=office101
 http://localhost:10000/user?apikey=office101&userId=1
*/
