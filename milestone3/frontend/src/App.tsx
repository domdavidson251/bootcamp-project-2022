import React from 'react';
import './App.css';
import Navbar from "./components/navbar";
import About from "./components/About";
import Home from "./components/Home";
import RecipePage from "./components/recipePage";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="externalRecipe/:id" element={<RecipePage external={true}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
