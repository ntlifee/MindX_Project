import "./styles/main.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from './components/Navbar/Navbar'
import Home from "./pages/Home/Home";
import CarouselGame from "./pages/CarouselGame/CarouselGame";
import Footer from "./components/Footer/Footer";
import SquareGame from "./pages/SquareGame/SquareGame";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import SquareLobby from "./pages/SquareLobby/SquareLobby";

function App() {
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <BurgerMenu isActiveBurger={isActiveBurger} setIsActiveBurger={setIsActiveBurger} />
        <Navbar isActiveBurger={isActiveBurger} setIsActiveBurger={setIsActiveBurger} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carousel" element={<CarouselGame />} />
          <Route path="/carousel/:id" element={<CarouselGame />} />
          <Route path="/square" element={<SquareLobby />} />
          <Route path="/square/:id" element={<SquareGame />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
