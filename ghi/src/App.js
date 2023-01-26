import "./App.css";
import LoginForm from "./accounts/LoginForm.js";
import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TestPage from "./accounts/TestPage.js";
import { AuthProvider, useAuthContext, useToken } from "./accounts/Authentication.js";
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
import MyBlogs from "./Blogs/MyBlogs";


function GetToken() {
  useToken();
  return null;
}

function App() {
  const { token } = useAuthContext();
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
<<<<<<< HEAD
=======

>>>>>>> main

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage2 />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={
            <Routes>
              <Route path="/" element={<BlogsList />} />
              <Route path=":id" element={<GetOneBlog />} />
              <Route path="update/:id" element={<UpdateBlog />} />
              <Route path="create" element={<CreateBlogsForm/>} />
              <Route path="myblogs" element={<MyBlogs/>}/>
            </Routes>
          }/>
          <Route path="/listings" element={
            <Routes>
              <Route path="/" element={<JobListings />} />
              <Route path="mylistings" element={<MyListings />} />
              <Route path="create" element={<CreateJobsForm/>} />
              <Route path="update/:id" element={<UpdateListing/>} />
            </Routes>
          }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
        }

export default App;
