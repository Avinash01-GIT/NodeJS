const express = require("express");
const router = express.Router();

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
];

router.get("/user", (req, res) => {
  try {
    const query = req.query;
    console.log(req.query);
    console.log("users list is called", req.fullname);
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
  } catch (err) {
    next(err);
  }
});

router.post("/register-user", (req, res) => {
  console.log("Body Data", req.body);
  res.json({
    success: true,
    message: "Dummy user registrations API",
  });
});

router.get("/user/:id", (req, res) => {
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

module.exports = router;
