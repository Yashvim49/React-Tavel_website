import React, { useState } from 'react';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  //handelsubmit
  const handelsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      alert("Logged Successfully", "success")
      navigate("/admin/dashboard");
    }
    else {
      alert("Invalid Details")

    }
  }

  //handel on change 
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
    return (
        <>
            <div className="login-background">
                <div className="login-overlay">
                    <div className="login-glass">
                        <h2 className="form-title">Welcome To WanderWise</h2>
                        <p className="form-subtitle">Admin Login to continue</p>
                        <form className="login-form" onSubmit={handelsubmit}>
                            <input type="email" placeholder="Email" name="email" id="email" value={credentials.email} onChange={onchange}  required />
                            <input type="password" placeholder="Password" name="password" id="password" value={credentials.password} onChange={onchange}  required />
                            <button type="submit">Login</button>
                        </form>
                        <p className="signup-link">
                            Don't have an account ? <a href="/admin/signup">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
