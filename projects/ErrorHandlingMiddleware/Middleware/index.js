const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

// User registration route
app.post("/register", (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (!isValidName(firstName) || !isValidName(lastName)) {
    return res.status(400).json({ error: "First and last name must start with a capital letter" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long" });
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: "Phone number must be at least 10 digits long" });
  }

  res.status(200).json({ message: "User registered successfully" });
});

// Validation functions
function isValidName(name) {
  return /^[A-Z][a-z]*$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

function isValidPhoneNumber(phoneNumber) {
  return /^\d{10,}$/.test(phoneNumber);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
