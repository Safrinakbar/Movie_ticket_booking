import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import swal from 'sweetalert'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.token) {
        
        localStorage.setItem('token', data.token);

        
        swal({
          title: "Login Successful",
          text: "You have logged in successfully.",
          icon: "success",
          button: "OK",
        });

        
        navigate('/home'); 
      } else {
        swal({
          title: "Login Failed",
          text: data.msg || "Invalid credentials",
          icon: "error",
          button: "OK",
        });
      }
    } catch (err) {
      console.error('Error:', err);
      swal({
        title: "Server Error",
        text: "Something went wrong, please try again later.",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '20px',
      }}
    >
    
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginTop: '5px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginTop: '5px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007BFF',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
          >
            Login
          </button>
        </form>

       
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <span style={{ color: '#555' }}>New? </span>
          <Link
            to="/signup"
            style={{
              color: '#007BFF',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Register!!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
