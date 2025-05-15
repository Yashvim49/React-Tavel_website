import React, { useState } from 'react'
import '../Styles/Signup.css'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [credentials, setcredentials] = useState({ name: "", email: "",contactno:"", password: "", cpassword: "" })
    let navigate = useNavigate();
  
    //handelsubmit
    const handelsubmit = async (e) => {
      e.preventDefault();
      const { name, email,contactno, password } = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email,contactno, password })
      });
      const json = await response.json()
      console.log(json)
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/admin");
        alert("Account Created Successfully");
  
      }
      else {
        alert("Invalid Credentials")
      }
    }
  
    //handel on change 
    const onchange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="signup-background">
                <div className="signup-overlay">
                    <div className="signup-glass">
                        <h2 className="form-title">Welcome To WanderWise </h2>
                        <p className="form-subtitle">Create A New Account</p>
                        <form className="signup-form"  onSubmit={handelsubmit}>
                            <input type="text" placeholder="Name" id="name" name="name" onChange={onchange} minLength={3}  required />
                            <input type="email" placeholder="Email" id="email" name="email" onChange={onchange}  required />
                            <input type="text" placeholder="Contact No" id="contactno" name="contactno" onChange={onchange}  minLength={10} required />
                            <input type="password" placeholder="Password" id="password" name="password" onChange={onchange}  minLength={5} required />
                            <input type="password" placeholder="Confirm password" id="cpassword" name="cpassword" onChange={onchange}  minLength={5}  required />
                            <button type="submit">Sign Up</button>
                        </form>
                        <p className="signup-link">
                        Already have an account ? <a href="/admin">Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp