import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Sign from './pages/Sign';
import Launch from './pages/First';
import Home from './pages/Home';
import TicketBooking from './pages/Ticket/book';
import TicketDetails from './pages/Ticket/Genticket';
import BookedTickets from './pages/Ticket/Bookedtickets';
import SendQuery from './pages/team/query';
import BookedMovies from './pages/review/Bookedmovies';
import Booked from './pages/review/Bookedmovies';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} /> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Sign/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/bookticket/:title" element={<TicketBooking />} />
        <Route path='/ticket/:ticketId' element={<TicketDetails />}/>
        <Route path='/booked' element={<BookedTickets />}/>
        <Route path='/team' element={<SendQuery />}/>
        <Route path='/review' element={<Booked />}/>
       

       
     </Routes>
    </Router>
  );
}

export default App;
