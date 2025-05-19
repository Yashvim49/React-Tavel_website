import React, { useState } from 'react';
import '../Styles/Signup.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    contactno: "",
    password: "",
    cpassword: ""
  });

  const [emailError, setEmailError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError('');
    setConfirmError('');

    const { name, email, contactno, password, cpassword } = credentials;

   
    if (password !== cpassword) {
      setConfirmError("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, contactno, password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      toast.success("✅ Account created successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
        navigate("/admin");

    } else {
      if (json.error === "Sorry a user with this email already exists") {
        setEmailError("Email already registered!");
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-background">
      <div className="signup-overlay">
        <div className="signup-glass">
          <h2 className="form-title">Welcome To WanderWise</h2>
          <p className="form-subtitle">Create A New Account</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" id="name" name="name" onChange={handleChange} minLength={3} required />

            <input type="email" placeholder="Email" id="email" name="email" onChange={handleChange} required />
            {emailError && <div className="error-text">{emailError}</div>}

            <input type="text" placeholder="Contact No" id="contactno" name="contactno" onChange={handleChange} minLength={10} required />

            <input type="password" placeholder="Password" id="password" name="password" onChange={handleChange} minLength={5} required />

            <input type="password" placeholder="Confirm Password" id="cpassword" name="cpassword" onChange={handleChange} minLength={5} required />
            {confirmError && <div className="error-text">{confirmError}</div>}

            <button type="submit">Sign Up</button>
          </form>

          <p className="signup-link">
            Already have an account? <a href="/admin">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
