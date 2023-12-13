import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Navbar from "./components/navbar/navbar";
import PlayerDataGame from "./components/games/playerdatagame/PlayerDataGame";

function App() {

  return (
    <div className = "App">
      <BrowserRouter>
        <Navbar />
        <div className="Pages">
          <Routes>
            <Route
              path="/"
              element={<PlayerDataGame />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
