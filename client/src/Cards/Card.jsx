import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CRow,
  CCol,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import lover from '../pages/images/lover.jpg';
import love from '../pages/images/love.jpg';
import dada from '../pages/images/dada.jpeg';
import maara from '../pages/images/maara.jpg';
import maha from '../pages/images/maha.jpeg';
import fir from '../pages/images/fir.jpg';
import sil from '../pages/images/sill.jpeg';
import vk from '../pages/images/vik.jpg';
import imai from '../pages/images/imai.jpg';

function CardGrid() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleBookNow = (movieTitle) => {
    navigate(`/bookticket/${encodeURIComponent(movieTitle)}`);
  };

  const cards = [
    { title: 'Lover', text: 'Manikandan and Sri Gowri priya', image: lover },
    { title: 'Love Today', text: 'Pradeep and Ivana', image: love },
    { title: 'Dada', text: 'Kavin and Aparna', image: dada },
    { title: 'Maara', text: 'Madhavan and Shradha', image: maara },
    { title: 'Maharaja', text: 'Vijay Sethupathi', image: maha },
    { title: 'FIR', text: 'Vishnu vishal and Reba John', image: fir },
    { title: 'Sillunu Oru Kadhal', text: 'Surya and Jyothika', image: sil },
    { title: 'Vinnaithandi varuvaaya', text: 'Simbu and Trisha', image: vk },
    { title: 'Imaikka Nodigal', text: 'Nayanthara and Atharvaa', image: imai },
  ];

  useEffect(() => {
    const saveMoviesToDatabase = async () => {
      try {
        const savedMovies = await Promise.all(
          cards.map(async (card) => {
            const existingMovie = await axios.get(
              `http://localhost:5000/api/movies/${card.title}`
            );
            if (existingMovie.data) {
              return { ...card, _id: existingMovie.data._id };
            }
            const response = await axios.post(
              'http://localhost:5000/api/movies/add-movie',
              {
                title: card.title,
                text: card.text,
                image: card.image,
              }
            );
            return { ...card, _id: response.data._id };
          })
        );
        setMovies(savedMovies);
        console.log('Movies saved to the database');
      } catch (error) {
        console.error('Failed to save movies:', error);
      }
    };

    saveMoviesToDatabase();
  }, []);

  return (
    <div className="card-grid-container" style={{ padding: '0 90px' }}>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <CRow key={rowIndex} className="mb-4">
          {movies.slice(rowIndex * 3, rowIndex * 3 + 3).map((movie, colIndex) => (
            <CCol key={colIndex} sm="4" className="d-flex justify-content-center">
              <CCard
                style={{
                  width: '18rem',
                  margin: '0 40px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <CCardImage
                  orientation="top"
                  src={movie.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <CCardBody>
                  <CCardTitle>{movie.title}</CCardTitle>
                  <CCardText>{movie.text}</CCardText>
                  <CButton color="primary" onClick={() => handleBookNow(movie.title)}>
                    Book Now
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      ))}
    </div>
  );
}

export default CardGrid;
