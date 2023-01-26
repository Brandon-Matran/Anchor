import { useState } from "react";
import "./App.css";
import LoginForm from "./accounts/LoginForm.js";
import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TestPage from "./accounts/TestPage.js";
import { AuthProvider, useToken } from "./accounts/Authentication.js";
import Signup from "./accounts/Signup";
import MainPage from "./accounts/MainPage";
import MainPage2 from "./accounts/MainPage2";
import CreateBlogsForm from "./Blogs/CreateBlogsForm";
import UpdateBlog from "./Blogs/update_blog";
import BlogsList from "./Blogs/BlogsList.js";
import JobListings from "./Jobs/JobListings.js";
import MyListings from "./Jobs/MyListings.js";
import UpdateListing from "./Listings/UpdateListingsForm";
import CreateJobsForm from "./Listings/CreateListingsForm";
import GetOneBlog from "./Blogs/GetOneBlog";
import Nav from "./Nav";
import NavFooter from "./NavFooter";
import MyBlogs from "./Blogs/MyBlogs";


function GetToken() {
  useToken();
  return null;
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");


  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav />
        {/* <NavFooter/> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage2 />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs/:id" element={<GetOneBlog />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/listings" element={<JobListings />} />
          <Route path="/listings/mylistings" element={<MyListings />} />
          <Route path="/blogs/update/:id" element={<UpdateBlog />} />
          <Route path="/blogs/create" element={<CreateBlogsForm/>} />
          <Route path="/blogs/myblogs" element={<MyBlogs/>}/>
          <Route path="/listings/create" element={<CreateJobsForm/>} />
          <Route path="/listings/update/:id" element={<UpdateListing/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
