import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Home } from './views/Home';
import { Games } from './views/Games';
import { Community } from './views/Community';
import { FAQ } from './views/FAQ';
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { GameInfo } from './views/GameInfo';
import { Game } from './views/Game';

export default function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/games" element={ <Games /> } />
            <Route exact path="/games/:gameKey" element={ <GameInfo /> } />
            <Route exact path="/play/:gameKey/:gameId" element={ <Game /> } />
            <Route exact path="/community" element={ <Community /> } />
            <Route exact path="/faq" element={ <FAQ /> } />
            <Route exact path="/login" element={ <Login /> } />
            <Route exact path="/signup" element={ <Signup /> } />
            <Route exact path="/" element={ <Home /> } />
            <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
    </BrowserRouter>
  )
}
