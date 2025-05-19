import React, { useState } from 'react';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setEmailError('');
    setPasswordError('');

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
        toast.success("✅ Logged in successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            })
            
      navigate("/admin/dashboard");
    } else {
      // Handle specific error messages
      if (json.error === "Invalid email") {
        setEmailError("Invalid email");
      } else if (json.error === "Incorrect password") {
        setPasswordError("Incorrect password");
      } else {
         setEmailError("Email format not");
      }
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-background">
      <div className="login-overlay">
        <div className="login-glass">
          <h2 className="form-title">Welcome To WanderWise</h2>
          <p className="form-subtitle">Admin Login to continue</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={handleChange} required />
            {emailError && <div className="error-text">{emailError}</div>}

            <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} required />
            {passwordError && <div className="error-text">{passwordError}</div>}

            <button type="submit">Login</button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/admin/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
