import React from 'react';
import { Link } from 'react-router-dom';
import Open from './Open';

const First = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        <Link
          to="/login"
          style={{
            color: 'white',
            marginRight: '20px',
            fontSize: '18px',
            textDecoration: 'none',
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            color: 'white',
            fontSize: '18px',
            textDecoration: 'none',
          }}
        >
          Sign Up
        </Link>
      </div>

      <Open />
    </div>
  );
};

export default First;
