import './Signin.css';
import profile from "./images/image/a.png";
import pass from "./images/image/pass.png";
import React, { useState } from "react";
import { signIn, signUp } from './services/auth/index'; // Ensure this is the correct path
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import { persist } from './services/local-storage/index';

function LoginUi() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  if (isLogin) {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          signIn(values)
            .then((res) => {
              if (res.data.success) {
                localStorage.setItem('token', res.data?.data.token);
                persist("user", JSON.stringify(res.data?.data.userCred))
                if(res.data?.data.userCred.userType ==='Admin'){
                  navigate('/home');
                } else {
                  navigate('/profile');
                }
                
              }
              setSubmitting(false);
            })
            .catch((e) => {
              console.log("sign in error: " + e);
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="main">
            <div className="sub-main">
              <div>
                <div className="imgs">
                  <div className="title">
                    {/* <img src={profile} alt="profile" className="profile"/> */}
                    {/* <p>Sign In</p> */}
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <h2>Sign In</h2>
                    <div className="second-input">
                      <img src={pass} alt="pass" className="email" />
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="email1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </div>
                    <div className="second-input">
                      <img src={pass} alt="pass" className="email" />
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <div className="error-message">{errors.password}</div>
                    )}
                    <div className="login-button">
                      <button disabled={isSubmitting} type="submit" className="signin__button">
                        Sign In
                      </button>
                    </div>
                    <button
                      type="button"
                      className="toggle-button"
                      onClick={() => setLogin(false)}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    );
  }

  return (
    <Formik
      initialValues={{ email: "", organizationName: "", password: "", confirmPassword: "" }}
      validate={(values) => {
        const errors = {};
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        signUp(values)
          .then((res) => {
            if (res.data.success) {
              setLogin(true);
            } else{
              alert(res.data.message)
            }
            setSubmitting(false);
          })
          .catch((e) => {
            console.log("sign up error: " + e);
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="main">
          <div className="sub-main">
            <div>
              <div className="imgs">
                <div className="title">
                  {/* <img src={profile} alt="profile" className="profile"/> */}
                  {/* <p>Register</p> */}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <h2>Register</h2>
                  <div className="second-input">
                    <img src={pass} alt="pass" className="email" />
                    <input
                      type="text"
                      id="organizationName"
                      placeholder="Organization Name"
                      className="organizationName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.organizationName}
                    />
                  </div>
                  <div className="second-input">
                    <img src={pass} alt="pass" className="email" />
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Representative Name"
                      className="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                  </div>
                  <div className="email1">
                    <img src={profile} alt="email" className="email" />
                    <input
                      type="email"
                      id="email"
                      placeholder="User Email"
                      className="email1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <div className="second-input">
                    <img src={pass} alt="pass" className="email" />
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                  <div className="second-input">
                    <img src={pass} alt="pass" className="email" />
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="error-message">{errors.confirmPassword}</div>
                  )}
                  <div className="login-button">
                    <button disabled={isSubmitting} type="submit" className="signin__button">
                      Submit
                    </button>
                  </div>
                  <button
                    type="button"
                    className="toggle-button"
                    onClick={() => setLogin(true)}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default LoginUi;
