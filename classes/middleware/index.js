const express = require("express");
const responseTime = require("response-time");
const morgan = require("morgan");
const app = express();

const users = [
  {
    id: 1,
    name: "Michael Scott",
    mobNo: "1234567890",
    profilePicture: "http://localhost:10000/images/michaelscott.png",
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
  next();
};

const m2 = (req, res, next) => {
  console.log("Middleware 2");
  const { firstName, lastName } = req.query;
  const fullname = `${firstName} ${lastName}`;
  req.fullname = fullname;
  next();
};

const m3 = (req, res, next) => {
  console.log("Middleware 3", req.fullname);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.log("ERROR OCCURED IN SYSTEM");
  // save the error in a file using fs module
  res.status(500).json({
    success: false,
    message: "Something went wrong, please try again after sometime",
  });
};

// Applicaition middleware
app.use(express.json()); // req.body built-in-middleware
// app.use(express.urlencoded()); // built-in-middleware
app.use(express.static("images"));
// app.use(responseTime());
// app.use(morgan("dev"));
// app.use(apiKeyMiddleware);
// app.use(m2); // this Middleware enjects the data
app.use(m3); // passing data from m2 to m3

/**** API end points FUNCTIONS ****/

app.get("/user", (req, res) => {
  try {
    const query = req.query;
    console.log(req.query);
    console.log("users list is called", req.fullname);
    const user = users.find((u) => u.id == query.userId);
    // user.fullname + user.abc
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
  } catch (err) {
    next(err);
  }
});

app.post("/register-user", (req, res) => {
  console.log("Body Data", req.body);
  res.json({
    success: true,
    message: "Dummy user registrations API",
  });
});

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
});

/**** API end points FUNCTIONS ****/

app.use(errorHandler);

app.listen(10000, () => {
  console.log(`Express Server is up and running at port 10000`);
});

/*
 http://localhost:10000/user?apikey=office101
 http://localhost:10000/user?apikey=office101&userId=1
*/

/*
http://localhost:10000/user?firstName=Jhon&lastName=Wick
passing data from m2 to m3 
Middleware 2
Middleware 3 Jhon Wick
{ firstName: 'Jhon', lastName: 'Wick' }

 Middleware m2 captures firstName and lastName from the request's query parameters, constructs a fullname by combining them, and stores it in req.fullname. m3 then accesses req.fullname to utilize this enriched data further down the middleware chain or within route handlers. This approach allows for dynamic data manipulation and passing between middleware in an Express.js application.
 if one of the middleware gets its injected data rest of the chain 
 can access the data
*/

/*
http://localhost:10000/michaelscott.png

This Express.js application demonstrates the use of the express.static middleware to serve static files. The app.use(express.static("images")) middleware serves files from the images directory, making them accessible via URLs like http://localhost:10000/michaelscott.png. This allows for easy access to static assets such as images. The server listens on port 10000, showcasing a straightforward example of how to use express.static in an Express.js application to serve static content efficiently.
*/