import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from '../../utils/constants'
import { useResumePanel } from '../../context/ResumePanelContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { open: openPanel } = useResumePanel()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/80 backdrop-blur-xl border-b border-purple-500/10 shadow-card'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="font-display font-bold text-xl">
          <span className="gradient-text">{PERSONAL_INFO.firstName}</span>
          <span className="text-slate-400">.</span>
        </NavLink>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-purple-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={SOCIAL_LINKS[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-purple-300 transition-colors p-2"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={SOCIAL_LINKS[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-purple-300 transition-colors p-2"
          >
            <FaLinkedin size={18} />
          </a>
          <button
            onClick={openPanel}
            className="ml-1 px-4 py-2 text-sm font-medium border border-purple-500/40 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all duration-200"
          >
            Resume
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-300 hover:text-purple-300 transition-colors p-2"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-navy-800/95 backdrop-blur-xl border-b border-purple-500/10"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-purple-300 bg-purple-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="flex items-center gap-3 px-4 pt-3 border-t border-purple-500/10 mt-2">
                <a href={SOCIAL_LINKS[0].url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-300">
                  <FaGithub size={18} />
                </a>
                <a href={SOCIAL_LINKS[1].url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-300">
                  <FaLinkedin size={18} />
                </a>
                <button onClick={openPanel} className="ml-auto px-4 py-2 text-xs font-medium border border-purple-500/40 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all">
                  Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
