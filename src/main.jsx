import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { LandingPage } from "./LandingPage";
import { Agents } from "./Agents/Agents";
import Maps from "./Map/MapComponent";
import { Weapons } from "./Weapons/Weapons";
import { GameModes } from "./GameModes/GameModes";
import { CompeTiers } from "./Compe/CompeTiers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}>
        
        <Route path="agents" element={<Agents />} />
        <Route path="maps" element={<Maps />} />
        <Route path="weapons" element={<Weapons />} />
        <Route path="gamemodes" element={<GameModes />} />
        <Route path="competetiers" element={<CompeTiers />} />
      </Route>
    </Routes>
  </BrowserRouter>
);