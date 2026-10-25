import LandingPage from './pages/landing_page'
import SmartnetCaseStudy from './pages/smartnet_case_study'
import EquineCaseStudy from './pages/equine_case_study'
import FadingLineScrollbar from './components/global/fading_line_scrollbar'
import { Analytics } from "@vercel/analytics/react"
import { readPath } from './site'
// import './App.css'

// Every page is opened with a full page load, so picking it by path is all the routing the site needs.
// The path is read without its language (/bg/smartnet is the SmartNet page too)
const PAGES = {
  "/smartnet": SmartnetCaseStudy,
  "/equine-integration": EquineCaseStudy,
}

// The drawn scrollbar is only for computers: a mouse or trackpad as the main input, not a phone's or tablet's touchscreen
const IS_COMPUTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches

function App() {
  const Page = PAGES[readPath(window.location.pathname).path] ?? LandingPage

  return (
    <>
      <Page />
      {IS_COMPUTER && <FadingLineScrollbar />}
    </>
  )
}

export default App
