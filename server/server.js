const express = require('express');
const connectDB = require('./db/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const bookingRoutes=require('./routes/Booking.js')
const movieRoutes = require('./routes/movieRoutes.js')
const ticketRoutes=require('./routes/Ticket.js')
const queryRoutes=require('./routes/Query.js')
const reviewRoutes=require('./routes/review.js')

const app = express();

connectDB();


app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/movies',movieRoutes)
app.use('/api/bookings', bookingRoutes);
app.use('/api/tickets',ticketRoutes);
app.use('/api/query',queryRoutes);
app.use('/api/review',reviewRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
