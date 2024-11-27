const express = require("express");
const router = express.Router();
const Query = require("../model/Query");


router.post("/", async (req, res) => {
  const { email, query } = req.body;

  if (!email || !query) {
    return res.status(400).json({ message: "Email and query are required." });
  }

  try {
    
    const newQuery = new Query({
      email,
      query,
    });

    
    await newQuery.save();

    
    res.status(200).json({
      message: "Your query has been submitted. We will look into it shortly.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
});

module.exports = router;
