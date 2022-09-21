import React, { useContext, useState } from "react";
import './Login.css';
import firebase from "firebase/compat/app";
import {  Form  } from "react-bootstrap";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { signOut } from "firebase/auth";
import firebaseConfig from "./firebase.config";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from './../../App';
import { useHistory , useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

firebase.initializeApp(firebaseConfig);

const Login = () => {

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const auth = getAuth();

  const [ , setLoggedInUser] = useContext(UserContext);

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignIn: false,

    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });
  console.log(user);
  const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const logInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(logInUser);
        setLoggedInUser(logInUser);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then((res) => {
  //       const signedOutUser = {
  //         isSignIn: false,
  //         name: "",
  //         email: "",
  //         photo: "",
  //       };
  //       setUser(signedOutUser);
  //     })
  //     .catch((err) => {});
  // };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(user);
          updateUserName(user.name);
          history.replace(from);
         
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {})
      .catch((error) => {});
  };

  const handleChange = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div className=" p-5" style={{ maxWidth: "500px", margin: "auto" }}>
      <div>
        {newUser ? (
          <h1 className="text-center">Create New Account</h1>
        ) : (
          <h1 className="text-center">Login Your Account</h1>
        )}

        <Form onSubmit={handleSubmit}>
          {newUser && (
            <input
              className="form-control"
              type="text"
              name="name"
              onBlur={handleChange}
              placeholder="your name"
              required
            />
          )}
          <br />
          <Form.Control
            type="text"
            name="email"
            onBlur={handleChange}
            placeholder="your email"
            required
          />
          <br />
          <Form.Control
            type="password"
            name="password"
            onBlur={handleChange}
            placeholder="your password"
            required
          />

          <input className="mt-3"
            type="checkbox"
            onChange={() => setNewUser(!newUser)}
            name="newUser"
          />
          <label htmlFor="newUser">New User </label>
          <br />
          <br />
          <Form.Control
            style={{ backgroundColor: "#303F9F", color: "white" }}
            type="submit"
            value={newUser ? "Sign up" : "Sign in"}
          />
        </Form>
        <h2 className="text-center my-3">Or</h2>
        {/* {user.isSignIn ? (
        <Button onClick={handleSignOut}>Sign out</Button>
      ) : (
        <Button onClick={signWithGoogle}>Sign In</Button>
      )} */}
        <Button onClick={signWithGoogle} variant="outlined" className="googleSignIn">
          <FcGoogle className="icon" />
          sign is with Google
        </Button>
        <p style={{ color: "red" }}>{user.error}</p>
        {user.success && (
          <p style={{ color: "green" }}>
            User {newUser ? "Created" : "Logged In"} Successfully
          </p>
          
        )}
       
      </div>
    </div>
  );
};

export default Login;