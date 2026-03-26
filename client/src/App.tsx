import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/ui/Loader'
import ResumePanel from './components/ui/ResumePanel'
import { ResumePanelProvider, useResumePanel } from './context/ResumePanelContext'

const Home        = lazy(() => import('./pages/Home'))
const Experience  = lazy(() => import('./pages/Experience'))
const Projects    = lazy(() => import('./pages/Projects'))
const Publications = lazy(() => import('./pages/Publications'))
const Contact     = lazy(() => import('./pages/Contact'))
const AdminLogin  = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminResetPassword = lazy(() => import('./pages/admin/ResetPassword'))

import { useLocation } from 'react-router-dom'

// Inner layout that can read the resume panel state for the shrink effect
const AppLayout = () => {
  const { isOpen } = useResumePanel()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen">
      {/* Main content — shrinks when panel is open */}
      <div
        className="flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out"
        style={{
          marginRight: !isAdmin && isOpen ? '600px' : '0px',
        }}
      >
        {!isAdmin && <Navbar />}
        <main className="flex-1">
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/"             element={<Home />} />
              <Route path="/experience"   element={<Experience />} />
              <Route path="/projects"     element={<Projects />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/contact"      element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin"          element={<AdminLogin />} />
              <Route path="/admin/login"    element={<AdminLogin />} />
              <Route path="/admin/reset-password" element={<AdminResetPassword />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        {!isAdmin && <Footer />}
      </div>

      {/* Sliding resume panel */}
      {!isAdmin && <ResumePanel />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ResumePanelProvider>
        <AppLayout />
      </ResumePanelProvider>
    </BrowserRouter>
  )
}

export default App
