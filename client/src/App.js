import React from "react";
import Header from "./components/layout/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './routes/Home'
function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
