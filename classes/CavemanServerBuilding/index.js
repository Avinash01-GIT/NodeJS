const http = require("http");

const myServer = (req, res) => {
  // Write the logic to handle the request and send the response
  console.log("Request recived");
  console.log(req.url);
  const response = {
    success: true,
    message: "This is my first API",
  };
  if (req.url === "/home") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    if (req.method === "GET") {
      //5
      res.end(
        JSON.stringify({
          success: true,
          message: "GET API called",
        })
      );
    } else if (req.method === "POST") {
      res.end(
        JSON.stringify({
          success: true,
          message: "POST API called",
        })
      );
    } // 5
    // res.end(JSON.stringify(response));
  } else if (req.url === "/login") {
    res.end("Login API is called");
  } else if (req.url === "/logout") {
    res.end("Logout API is called");
  } else if (req.url === "/users-list") {
    res.end("users list API is called");
  } else {
    res.writeHead(404, {
      "Content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        success: false,
        message: "Route not found",
      })
    );
  }
}; //4

const server = http.createServer(myServer); //1

const PORT = 10000; //2

server.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
}); // 3

// This file contains some dummy APIs, and this code cannot be used when the size of the projects increases. It will get muddled up, readability will decrease, and complexity will increase.

// to all of this problems Expressjs 
