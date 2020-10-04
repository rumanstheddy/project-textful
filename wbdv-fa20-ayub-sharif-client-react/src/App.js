import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css"
//import HelloWorld from "./components/HelloWorld";
import CourseCard from "./components/CourseCard";
import ModuleList from "./components/ModuleList";
import WhiteBoard from "./components/WhiteBoard";

function App() {
  return (
      <div className="container">
          <WhiteBoard/>
      </div>

  );
}

export default App;
