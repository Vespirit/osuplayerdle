import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import PlayerDataGame from "./components/playerdatagame/PlayerDataGame";

function App() {

  return (
    <center>
      <Navbar />
      <PlayerDataGame />
    </center>
  );
}

export default App;
