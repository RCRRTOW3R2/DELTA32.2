import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from './App'
import Home from './pages/home'
import Portfolio from './pages/portfolio'
import Momentum from './pages/momentum'
import Reddit from './pages/reddit'
import Watchlist from './pages/watchlist'
import Contact from './pages/contact'
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="momentum" element={<Momentum />} />
          <Route path="reddit" element={<Reddit />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
