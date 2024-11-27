const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  tickets: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seatNumbers: { type: [Number], required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
