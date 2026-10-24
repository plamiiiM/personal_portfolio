import LandingPage from './pages/landing_page'
import SmartnetCaseStudy from './pages/smartnet_case_study'
import EquineCaseStudy from './pages/equine_case_study'
import FadingLineScrollbar from './components/global/fading_line_scrollbar'
import { Analytics } from "@vercel/analytics/react"
// import './App.css'

// Every page is opened with a full page load, so picking it by path is all the routing the site needs
const PAGES = {
  "/smartnet": SmartnetCaseStudy,
  "/equine-integration": EquineCaseStudy,
}

function App() {
  const Page = PAGES[window.location.pathname.replace(/\/+$/, "")] ?? LandingPage

  return (
    <>
      <Page />
      <FadingLineScrollbar />
    </>
  )
}

export default App
