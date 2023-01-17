import { useState } from "react";
import "./App.css";
import LoginForm from "./accounts/LoginForm.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TestPage from "./accounts/TestPage.js";
import { AuthProvider, useToken } from "./accounts/Authentication.js";
import Signup from "./accounts/Signup";
import MainPage from "./accounts/MainPage";
import Nav from "./Nav";
import CreateBlogsForm from "./Blogs/CreateBlogsForm";
import BlogsList from "./Blogs/BlogsList.js";
import JobListings from "./Jobs/JobListings.js";
function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}


function App() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <LoginForm setToken={setToken} />;
  // }

  return (
    <Router>
      <AuthProvider>
        <GetToken />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/listings" element={<JobListings />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

