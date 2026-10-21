import LandingPage from './pages/landing_page'
import FadingLineScrollbar from './components/global/fading_line_scrollbar'
import { Analytics } from "@vercel/analytics/react"
// import './App.css'

function App() {

  return (
    <>
      <LandingPage />
      <FadingLineScrollbar />
    </>
  )
}

export default App
