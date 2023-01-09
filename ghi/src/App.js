import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TestPage from "./components/TestPage.js";
import Nav from "./Nav";
function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <Routes>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
