const express = require('express');
const Movie = require('../model/Movie');  
const router = express.Router();
const mongoose = require('mongoose')

router.post('/add-movie', async (req, res) => {
  const { title, text, image } = req.body;

  try {
    const newMovie = new Movie({
      title,
      text,
      image,
    });

    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add movie' });
  }
});




router.get('/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const movie = await Movie.findOne({ title });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie); // Return movie data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

  
  



  


