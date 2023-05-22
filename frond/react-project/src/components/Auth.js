import React, { useState } from "react";

const LoginForm = () => {
  const [authMode, setAuthMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [serveraddress, setServeraddress] = useState("");
  const [password, setPassword] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleServeraddress = (event) => {
    setServeraddress(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (authMode === "signup") {
      // Registration request
      const newUser = {
        username: username,
        password: password,
        email: email,
        serveraddress: serveraddress,
      };

      fetch("http://localhost:3001/auth/registre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log(data);
          // Reset the form
          setUsername("");
          setPassword("");
          setServeraddress("");
          setEmail("");
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error:", error);
        });
    } else {
      // Login request
      const userCredentials = {
        username: username,
        password: password,
      };

      fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log(data);
          // Reset the form
          setUsername("");
          setPassword("");
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleFormSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </h3>
          <div className="text-center">
            {authMode === "signin" ? (
              <>
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </>
            )}
          </div>
          {authMode === "signup" && (
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {authMode === "signup" && (
            <div className="form-group mt-3">
              <label>Server Address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter server address"
                value={serveraddress}
                onChange={handleServeraddress}
              />
            </div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {authMode === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
          {authMode === "signin" && (
            <p className="text-center mt-2">
              Forgot password? <a href="/">Reset password</a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

