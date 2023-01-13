import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import BlogsList from './Blogs/BlogsList.js';
import JobListings from './Jobs/JobListings.js';

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);  

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
      console.log('fastapi url: ', url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, [])


  return (
  <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/listings" element={<JobListings />} />
        </Routes>
  </Router>

  );
}

export default App;
