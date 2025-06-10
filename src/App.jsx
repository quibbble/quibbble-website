import React, { createContext, useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Home } from './views/Home';
import { Games } from './views/Games';
import { Community } from './views/Community';
import { FAQ } from './views/FAQ';
import { GameInfo } from './views/GameInfo';
import { Game } from './views/Game';
import { CreateID } from './utils/id';
import { Error } from './views/Error';
import { GetActivity } from './services/quibbble';
// import { Agree } from './views/Agree';
import { TermsOfService } from './views/TermsOfService';
import { PrivacyPolicy } from './views/PrivacyPolicy';
import { QCornerProvider } from './components/qcorner/QCornerProvider';
import { Profile } from './views/Profile';

export const ThemeContext = createContext(null);
export const ActivityContext = createContext(null);

export default function App() {

  // const [agree, setAgree] = useState(localStorage.getItem("agree"))
  // useEffect(() => { if (agree == "agreed") localStorage.setItem("agree", "agreed") }, [agree])

  let name = localStorage.getItem("name")
  if (!name) {
    name = CreateID()
    localStorage.setItem("name", name)
  }
  
  const [theme, setTheme] = useState("yellow")
  const [activity, setActivity] = useState()

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
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <ActivityContext.Provider value={{ activity: activity }}>
          <QCornerProvider>
            <Routes>
              <Route exact path="/terms-of-service" element={ <TermsOfService /> } />
              <Route exact path="/privacy-policy" element={ <PrivacyPolicy /> } />
              <Route exact path="/games" element={ <Games /> } />
              <Route exact path="/games/:gameKey" element={ <GameInfo /> } />
              <Route exact path="/play/:gameKey/:gameId" element={ <Game /> } />
              <Route exact path="/community" element={ <Community /> } />
              <Route exact path="/faq" element={ <FAQ /> } />
              <Route exact path="/error" element={ <Error /> } />
              <Route exact path="/profile" element={ <Profile /> } />
              <Route exact path="/" element={ <Home /> } />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </QCornerProvider>
        </ActivityContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}
