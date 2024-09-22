const express = require("express");
const cors = require("cors");

// Create an Express application
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Static user information
const userInfo = {
  user_id: "Hari_shanker_yadav_07092002",
  email: "ha3154@srmist.edu.in",
  roll_number: "RA2111003030105",
};

// Utility function to separate numbers and alphabets, and find the highest alphabet
const processData = (data) => {
  const numbers = [];
  const alphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (
      typeof item === "string" &&
      item.length === 1 &&
      /[a-zA-Z]/.test(item)
    ) {
      alphabets.push(item);
    }
  });

  const highest_alphabet =
    alphabets.length > 0
      ? [
          alphabets.sort((a, b) =>
            a.toLowerCase() > b.toLowerCase() ? -1 : 1
          )[0],
        ]
      : [];

  return { numbers, alphabets, highest_alphabet };
};

// POST /data endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input" });
  }

  const { numbers, alphabets, highest_alphabet } = processData(data);

  res.json({
    is_success: true,
    ...userInfo,
    numbers,
    alphabets,
    highest_alphabet,
  });
});

// Define GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
