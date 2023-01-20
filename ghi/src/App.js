import { useState } from "react";
import "./App.css";
import LoginForm from "./accounts/LoginForm.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TestPage from "./accounts/TestPage.js";
import { AuthProvider, useToken } from "./accounts/Authentication.js";
import Signup from "./accounts/Signup";
import MainPage from "./accounts/MainPage";
import CreateBlogsForm from "./Blogs/CreateBlogsForm";
import BlogsList from "./Blogs/BlogsList.js";
import JobListings from "./Jobs/JobListings.js";
import UpdateListing from "./Listings/update_listing";
import CreateJobsForm from "./Listings/CreateListingsForm";
import GetOneBlog from "./Blogs/GetOneBlog";
import Nav from "./Nav";
import NavFooter from "./NavFooter";

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
        <Nav />
        <NavFooter/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
          {/* <Route path="/blogs" element={<BlogsList />} />
          <Route path="/listings" element={<JobListings />} /> */}
          <Route path="/blogs/:id" element={<GetOneBlog />} />
=======
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/listings" element={<JobListings />} />
>>>>>>> main
          <Route path="/blogs/create" element={<CreateBlogsForm/>} />
          <Route path="/listings/create" element={<CreateJobsForm/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
