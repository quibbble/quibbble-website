import React, { createContext, useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Home } from './views/Home';
import { Games } from './views/Games';
import { Community } from './views/Community';
import { FAQ } from './views/FAQ';
import { GameInfo } from './views/GameInfo';
import { Game } from './views/Game';
import { CreateID } from './utils/id';
import { useQCorner } from './hooks/QCorner';
import { Error } from './views/Error';
import { GetActivity } from './services/quibbble';

export const QCornerContext = createContext(null);
export const ThemeContext = createContext(null);
export const ActivityContext = createContext(null);

export default function App() {

  let name = localStorage.getItem("name")
  if (!name) {
    name = CreateID()
    localStorage.setItem("name", name)
  }
  
  const [theme, setTheme] = useState("yellow")
  const [activity, setActivity] = useState()
  const [qcorner, send] = useQCorner()

  useEffect(() => {
    let f = async () => {
      let resp = await GetActivity()
      if (resp.status == 200) {
        setActivity(resp.data)
      }
    }
    f()
  }, [])

  return (
    <QCornerContext.Provider value={{ qcorner: qcorner, send: send }}>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <ActivityContext.Provider value={{ activity: activity }}>

          <BrowserRouter>
              <Routes>
                  <Route exact path="/games" element={ <Games /> } />
                  <Route exact path="/games/:gameKey" element={ <GameInfo /> } />
                  <Route exact path="/play/:gameKey/:gameId" element={ <Game /> } />
                  <Route exact path="/community" element={ <Community /> } />
                  <Route exact path="/faq" element={ <FAQ /> } />
                  <Route exact path="/error" element={ <Error /> } />
                  <Route exact path="/" element={ <Home /> } />
                  <Route path="*" element={ <Navigate to="/" /> } />
              </Routes>
          </BrowserRouter>

        </ActivityContext.Provider>
      </ThemeContext.Provider>
    </QCornerContext.Provider>

  )
}
