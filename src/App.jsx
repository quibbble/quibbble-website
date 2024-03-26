import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Home } from './views/Home';
import { Games } from './views/Games';
import { Community } from './views/Community';
import { Blog } from './views/Blog';
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { QCorner } from './components/qcorner/QCorner';

export default function App() {

  const qcorner = <QCorner />

  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/games" element={ <Games qcorner={ qcorner } /> } />
            <Route exact path="/games/:key" element={ <div>GAME INFO</div> } />
            <Route exact path="/play/:key/:id" element={ <div>GAME PLAY</div> } />
            <Route exact path="/community" element={ <Community /> } />
            <Route exact path="/blog" element={ <Blog /> } />
            <Route exact path="/login" element={ <Login /> } />
            <Route exact path="/signup" element={ <Signup /> } />
            <Route exact path="/" element={ <Home /> } />
            <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
    </BrowserRouter>
  )
}
